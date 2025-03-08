import mongoose from "mongoose";


const ListingSchema = new mongoose.Schema({
  ownerId: { type: String, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  size: {
    length: { type: Number, required: true },
    width: { type: Number, required: true }
  },
  images: [{ type: String }], // Store only image URLs
  pricePerHour: { type: Number, required: true },
  pricePerDay: { type: Number },
  pricePerMonth: { type: Number },
  payAsYouGo: { type: Boolean, default: false },
  availability: [{
    date: { type: Date, required: true },
    availableFrom: { type: String, required: true },
    availableUntil: { type: String, required: true }
  }],
  features: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

ListingSchema.index({ location: "2dsphere" }); // Enables geospatial queries


const Listing = mongoose.model("listings", ListingSchema);

export default Listing;

