import mongoose from "mongoose";

const PreferencesSchema = new mongoose.Schema({
    userId: { type: String, ref: "users", required: true, unique: true }, // Links to User Schema

    // Preferred parking spot size (Minimum required dimensions)
    preferredSpotSize: {
        length: { type: Number, required: true }, // Required to ensure spot is large enough
        width: { type: Number, required: true }
    },

    // Pricing & Distance Preferences
    maxPricePerHour: { type: Number, required: true },  // Required for budget filtering
    maxPricePerDay: { type: Number },  // Optional
    maxPricePerMonth: { type: Number },  // Optional
    preferredSearchRadius: { type: Number, required: true, default: 5 }, // Radius in km

    // Optional Parking Preferences
    coveredParking: { type: Boolean, default: false },  // Default: User does not need covered parking
    EVCharging: { type: Boolean, default: false },  // Default: User does not require EV charging
    securityFeatures: { type: Boolean, default: false },  // Default: User does not require extra security

    // Payment Preferences
    payAsYouGoPreferred: { type: Boolean, default: true },  // Default: User prefers pay-as-you-go
    defaultParkingDuration: { type: Number, default: 2 },  // Default: 2 hours (only used if not pay-as-you-go)

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Preferences = mongoose.model("Preferences", PreferencesSchema);

export default Preferences;