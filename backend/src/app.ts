import "dotenv/config";
import express from "express"
import Parking from "./models/greenp"
import Listing from "./models/listings"
import Users from "./models/users"
import georoutes from "./geolocation"
import auth from "./auth"
import { admin } from "./auth";
const app = express();
app.use(express.json());



app.use("/geolocation", georoutes);
app.use("/auth", auth);





app.get("/", async (req, res) => {

    const parking_spots = await Parking.find();     


    res.status(200).json(parking_spots)

})






app.post("/add-listing", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization token required" });
  }

  try {
    // Verify Firebase token and get the user ID
    const decodedToken = await admin.auth().verifyIdToken(authHeader);
    const ownerId = decodedToken.uid;

    // Extract listing details from the request body
    const {
      title, description, address, location, size, images,
      pricePerHour, pricePerDay, pricePerMonth, payAsYouGo, availability, features,
    } = req.body;

    // Check for required fields
    if (!title || !description || !location || !address || !size || !pricePerHour || !images || images.length === 0) {
      res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new listing with the authenticated user as the owner
    const newListing = new Listing({
      ownerId, title, description, address, location, size, images,
      pricePerHour, pricePerDay, pricePerMonth, payAsYouGo, availability, features,
    });

    // Save the listing to the database
    const savedListing = await newListing.save();
    res.status(201).json({ message: "Listing added successfully", listing: savedListing });

  } catch (error) {
    console.error("Error adding listing:", error);
    res.status(500).json({ message: "Error adding listing", error });
  }
});

// Search parking spots by size & availability
app.get("/search-parking", async (req, res) => {
  try {
    const minLength = req.query.minLength ? String(req.query.minLength) : "";
    const minWidth = req.query.minWidth ? String(req.query.minWidth) : "";
    const date = req.query.date ? String(req.query.date) : "";
    const time = req.query.time ? String(req.query.time) : "";

    if (!minLength || !minWidth || !date || !time) {
      res.status(400).json({ message: "Missing required filters" });
    }

    const carLength = parseFloat(minLength);
    const carWidth = parseFloat(minWidth);
    const queryDate = new Date(date);
    const queryTime = time;

    const parkingSpots = await Listing.find({
      "size.length": { $gte: carLength },
      "size.width": { $gte: carWidth },
      "availability": {
        $elemMatch: {
          date: queryDate,
          availableFrom: { $lte: queryTime },
          availableUntil: { $gte: queryTime },
        },
      },
    });

    res.status(200).json(parkingSpots);
  } catch (error) {
    res.status(500).json({ message: "Error searching for parking spots", error });
  }
});

// GET: Fetch all listings of the logged-in user
app.get("/user-listings", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization token required" });
  }

  try {
    // Verify Firebase token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(authHeader);
    const ownerId = decodedToken.uid;

    // Find listings where ownerId matches
    const userListings = await Listing.find({ ownerId });

    res.status(200).json(userListings);

  } catch (error) {
    console.error("Error fetching user listings:", error);
    res.status(500).json({ message: "Error fetching user listings", error });
  }
});

// Fetch user info by userId (No authentication required)
app.get("/user-info", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "Missing required userId" });
  }

  try {
    // Find user info from the database
    const userInfo = await Users.findOne({ uid: userId });

    if (!userInfo) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userInfo);

  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Error fetching user info", error });
  }
});
export default app;