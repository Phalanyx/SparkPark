import { Router, Request, Response } from "express";
import middleware from "../auth/middleware";
import Listing from "../models/listing";
import Booking from "../models/booking";
import { admin } from "../auth";

const router = Router();

export default router;

router.use(middleware);

// Create new booking and update listing availability
router.post("/create", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

    // Verify Firebase token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;


    
    // Extract booking details from request body
    const {
      listingId,
      startTime,
      endTime,
      vehicleDetails
    } = req.body;

    // Validate required fields
    if (!listingId || !startTime || !endTime) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      res.status(404).json({ message: "Listing not found" });
      return;
    }

    // Convert times to Date objects
    const bookingStart = new Date(startTime);
    const bookingEnd = new Date(endTime);

    // Check if the time slot is available
    const isAvailable = listing.availability.some(slot => {
      const slotDate = new Date(slot.date);
      const slotStart = new Date(`${slotDate.toISOString().split('T')[0]}T${slot.availableFrom}`);
      const slotEnd = new Date(`${slotDate.toISOString().split('T')[0]}T${slot.availableUntil}`);
      
      return (
        bookingStart >= slotStart &&
        bookingEnd <= slotEnd &&
        slotDate.toDateString() === bookingStart.toDateString()
      );
    });

    if (!isAvailable) {
      res.status(400).json({ message: "Selected time slot is not available" });
      return;
    }

    // Calculate total price based on duration
    const durationInHours = (bookingEnd.getTime() - bookingStart.getTime()) / (1000 * 60 * 60);
    let totalPrice = 0;

    if (listing.payAsYouGo) {
      totalPrice = durationInHours * listing.pricePerHour;
    } else {
      if (durationInHours <= 24) {
        totalPrice = durationInHours * listing.pricePerHour;
      } else if (durationInHours <= 168) { // 7 days
        totalPrice = Math.ceil(durationInHours / 24) * (listing.pricePerDay || listing.pricePerHour * 24);
      } else {
        totalPrice = Math.ceil(durationInHours / (24 * 30)) * (listing.pricePerMonth || listing.pricePerHour * 24 * 30);
      }
    }

    // Create new booking
    const newBooking = new Booking({
      userId,
      listingId,
      startTime: bookingStart,
      endTime: bookingEnd,
      totalPrice,
      vehicleDetails,
      status: "pending",
      paymentStatus: "pending"
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Update listing availability
    const updatedAvailability = listing.availability.map(slot => {
      const slotDate = new Date(slot.date);
      if (slotDate.toDateString() === bookingStart.toDateString()) {
        const slotStart = new Date(`${slotDate.toISOString().split('T')[0]}T${slot.availableFrom}`);
        const slotEnd = new Date(`${slotDate.toISOString().split('T')[0]}T${slot.availableUntil}`);
        
        // If booking takes up the entire slot, remove it
        if (bookingStart.getTime() === slotStart.getTime() && bookingEnd.getTime() === slotEnd.getTime()) {
          return null;
        }
        
        // If booking is at the start of the slot
        if (bookingStart.getTime() === slotStart.getTime()) {
          return {
            date: slot.date,
            availableFrom: bookingEnd.toTimeString().slice(0, 5),
            availableUntil: slot.availableUntil
          };
        }
        
        // If booking is at the end of the slot
        if (bookingEnd.getTime() === slotEnd.getTime()) {
          return {
            date: slot.date,
            availableFrom: slot.availableFrom,
            availableUntil: bookingStart.toTimeString().slice(0, 5)
          };
        }
        
        // If booking is in the middle of the slot, split it into two slots
        return [
          {
            date: slot.date,
            availableFrom: slot.availableFrom,
            availableUntil: bookingStart.toTimeString().slice(0, 5)
          },
          {
            date: slot.date,
            availableFrom: bookingEnd.toTimeString().slice(0, 5),
            availableUntil: slot.availableUntil
          }
        ];
      }
      return slot;
    }).filter(Boolean).flat();

    // Update the listing with new availability

    listing.availability = updatedAvailability as any;
    await listing.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
      updatedListing: listing
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
});
