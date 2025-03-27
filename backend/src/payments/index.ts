const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Booking from "../models/booking";
import Payment from "../models/payment";
import mongoose from "mongoose";

// Create payment intent route
router.post('/intent', async (req: any, res: any) => {
    try {
        const { amount, bookingId } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "cad",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                bookingId: bookingId || '' // Store booking ID in metadata if available
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
    } catch (error: any) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

// Payment success route
router.post('/success', async (req: any, res: any) => {
    try {
        const { paymentIntentId, bookingId, userId } = req.body;
        console.log("Payment Success Request:", paymentIntentId, bookingId, userId);
        
        if (!paymentIntentId) {
            return res.status(400).json({ error: "Payment intent ID is required" });
        }
        
        // Validate payment intent ID format (should start with 'pi_')
        if (!paymentIntentId.startsWith('pi_')) {
            console.error("Invalid payment intent ID format:", paymentIntentId);
            return res.status(400).json({ 
                error: "Invalid payment intent ID format. Expected format: pi_XXXXXXXXXX",
                receivedId: paymentIntentId
            });
        }

        console.log("Retrieving payment intent from Stripe:", paymentIntentId);
        
        // Retrieve the payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        console.log("Payment intent retrieved:", paymentIntent.id, "Status:", paymentIntent.status);

        if (!paymentIntent) {
            return res.status(404).json({ error: "Payment intent not found" });
        }

        // Create a new payment record
        const payment = new Payment({
            paymentId: paymentIntent.id,
            bookingId: bookingId || paymentIntent.metadata.bookingId,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            email: paymentIntent.receipt_email,
            userId: userId,
            paymentMethod: paymentIntent.payment_method_types[0],
            status: paymentIntent.status,
            listingId: paymentIntent.metadata.listingId,
            receiptUrl: paymentIntent.charges?.data[0]?.receipt_url,
            metaData: paymentIntent.metadata
        });

        await payment.save();

        console.log("Payment saved");

        // If we have a booking ID, update the booking status
        if (bookingId || paymentIntent.metadata.bookingId) {
            const booking = await Booking.findById(bookingId || paymentIntent.metadata.bookingId);
            
            if (booking) {
                booking.paymentId = paymentIntent.id;
                booking.paymentStatus = "completed";
                booking.status = "confirmed";
                
                if (paymentIntent.receipt_email) {
                    booking.userEmail = paymentIntent.receipt_email;
                }
                
                await booking.save();
            }
        }

        // Return the payment information
        res.json({ 
            success: true, 
            payment: {
                id: payment.paymentId,
                status: payment.status,
                amount: payment.amount / 100, // Convert cents to dollars for display
                receiptUrl: payment.receiptUrl
            }
        });
    } catch (error: any) {
        console.error("Error processing payment success:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get payment by ID
router.get('/:paymentId', async (req: any, res: any) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await Payment.findOne({ paymentId });
        
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        
        res.json({ payment });
    } catch (error: any) {
        console.error("Error retrieving payment:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;