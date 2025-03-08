const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    phone: String,
    role: { type: String, enum: ["owner", "renter", "both"], default: "renter" },
    createdAt: { type: Date, default: Date.now },
    ratings: {
        count: { type: Number, default: 0 },
        average: { type: Number, default: 0 }
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const parkingSpotSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    description: String,
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    address: String,
    pricePerHour: Number,
    pricePerDay: Number,
    pricePerMonth: Number,
    payAsYouGo: { type: Boolean, default: false },
    availability: [{
        date: Date,
        availableFrom: String,
        availableUntil: String
    }],
    features: [String],
    rating: {
        count: { type: Number, default: 0 },
        average: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now }
});

parkingSpotSchema.index({ location: "2dsphere" }); // Enables GeoJSON location search

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);
module.exports = ParkingSpot;

const bookingSchema = new mongoose.Schema({
    renterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parkingSpotId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalPrice: Number,
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

const payAsYouGoSchema = new mongoose.Schema({
    renterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parkingSpotId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot", required: true },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ["active", "completed"], default: "active" },
    totalAmount: Number,
});

const PayAsYouGoSession = mongoose.model("PayAsYouGoSession", payAsYouGoSchema);
module.exports = PayAsYouGoSession;