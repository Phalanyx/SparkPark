import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  // Payment identifiers
  paymentId: { type: String, required: true, unique: true }, // Stripe payment intent ID
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "bookings" }, // Reference to booking
  
  // Payment details
  amount: { type: Number, required: true },
  currency: { type: String, default: "cad" },
  
  // Customer information
  email: { type: String },
  userId: { type: String, ref: "users" }, // Reference to user
  
  // Transaction details
  paymentMethod: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "succeeded", "failed", "refunded", "canceled"],
    default: "pending"
  },
  
  // Associated resources
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "listings" },
  
  // Receipt and additional info
  receiptUrl: { type: String },
  metaData: { type: Object },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp before saving
PaymentSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

const Payment = mongoose.model("payments", PaymentSchema);

export default Payment; 