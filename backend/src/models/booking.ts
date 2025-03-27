import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, ref: "users", required: true }, // Reference to User model
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "listings", required: true }, // Reference to Listing model
  
  // Booking details
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  
  // Booking status
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },
  
  // Vehicle details (optional)
  vehicleDetails: {
    make: String,
    model: String,
    licensePlate: String,
    color: String
  },
  
  // Payment information
  paymentId: { type: String },
  paymentMethod: { type: String },
  userEmail: { type: String },
  
  // Payment status
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending"
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp before saving
BookingSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

const Booking = mongoose.model("bookings", BookingSchema);

export default Booking; 