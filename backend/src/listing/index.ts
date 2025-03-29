import { Router, Request, Response } from "express";

import middleware from "../auth/middleware";

import Listing from "../models/listing";
import Preferences from "../models/preferences"; // Import preferences model
import Users from "../models/users";
import { admin } from "../auth";
import { auth } from "firebase-admin";

const router = Router();

export default router;

router.use(middleware);

router.post("/add-listing", async (req, res) => {
  
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Authorization token required" });
        return;
    }

    try {
      const token = req.headers.authorization?.split(" ")[1];

      // Verify Firebase token and get the user ID
      const decodedToken = await admin.auth().verifyIdToken(token);
      const ownerId = decodedToken.uid;

  
      // Extract listing details from the request body
      const {
        title, description, address, location, size, images,
        pricePerHour, pricePerDay, pricePerMonth, payAsYouGo, availability, features,
      } = req.body;
  
      // Check for required fields
      if (!title || !description || !location || !address || !size || !pricePerHour || !images || images.length === 0) {
        res.status(400).json({ message: "Missing required fields" });
        return;
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
  // Search parking spots by size & availability
  router.get("/search-parking", async (req, res) => {
    try {
      const minLength = req.query.minLength ? String(req.query.minLength) : "";
      const minWidth = req.query.minWidth ? String(req.query.minWidth) : "";
      const date = req.query.date ? String(req.query.date) : "";
      const time = req.query.time ? String(req.query.time) : "";
  
      const queryObj: Record<string, any> = {};
  
      // Add length filter if provided
      if (minLength) {
        const carLength = parseFloat(minLength);
        queryObj["size.length"] = { $gte: carLength };
      }
      // Add width filter if provided
      if (minWidth) {
        const carWidth = parseFloat(minWidth);
        queryObj["size.width"] = { $gte: carWidth };
      }
      // Add availability filter based on provided date and time
      if (date && time) {
        const queryDate = new Date(date);
        queryObj["availability"] = {
          $elemMatch: {
            date: queryDate,
            availableFrom: { $lte: time },
            availableUntil: { $gte: time },
          },
        };
      } else if (date) {
        const queryDate = new Date(date);
        queryObj["availability"] = {
          $elemMatch: {
            date: queryDate,
          },
        };
      } else if (time) {
        queryObj["availability"] = {
          $elemMatch: {
            availableFrom: { $lte: time },
            availableUntil: { $gte: time },
          },
        };
      }
  
      const parkingSpots = await Listing.find(queryObj);
      res.status(200).json(parkingSpots);
    } catch (error) {
      res.status(500).json({ message: "Error searching for parking spots", error });
    }
  });

  
  // GET: Fetch all listings of the logged-in user
router.get("/user-listings", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

    // Verify Firebase token and get user ID
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

    const token = authHeader.split(" ")[1]; // Extract the token part
    const decodedToken = await admin.auth().verifyIdToken(token);
    const ownerId = decodedToken.uid;

    // Find listings where ownerId matches
    const userListings = await Listing.find({ ownerId });

    res.status(200).json(userListings); // ✅ Returning response properly
  } catch (error) {
    console.error("Error fetching user listings:", error);
    res.status(500).json({ message: "Error fetching user listings", error });
  }
});
  
  // Fetch user info by userId (No authentication required)
  router.get("/user-info", async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      res.status(400).json({ message: "Missing required userId" });
      return;
    }
  
    try {
      // Find user info from the database
      const userInfo = await Users.findOne({ uid: userId });
  
      if (!userInfo) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      res.status(200).json(userInfo);
  
    } catch (error) {
      console.error("Error fetching user info:", error);
      res.status(500).json({ message: "Error fetching user info", error });
    }
  });

// Define response interface for TypeScript
interface BestSpotResponse {
  title: string;
  address: string;
  pricePerHour?: number;
  pricePerDay?: number;
  pricePerMonth?: number;
  payAsYouGo: boolean;
  features?: string[];
  distance: number;
}

/**
 * @route   GET /best-parking-spot
 * @desc    Returns the best available parking spot based on user preferences
 * @access  Private (Requires Authentication)
 */
router.get("/best-parking-spot", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const preferences = await Preferences.findOne({ userId });

    if (!preferences) {
      res.status(404).json({ message: "No preferences found for this user" });
      return;
    }

    const {
      preferredSpotSize,
      maxPricePerHour,
      maxPricePerDay,
      maxPricePerMonth,
      preferredSearchRadius,
      coveredParking,
      EVCharging,
      securityFeatures,
      payAsYouGoPreferred,
      defaultParkingDuration
    } = preferences;

    const latitude = req.query.latitude as string;
    const longitude = req.query.longitude as string;
    const date = req.query.date as string;
    const time = req.query.time as string;

    if (!latitude || !longitude || !date || !time) {
      res.status(400).json({ message: "Missing required query parameters" });
      return;
    }

    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);
    const queryDate = new Date(date);

    if (isNaN(userLatitude) || isNaN(userLongitude) || isNaN(queryDate.getTime())) {
      res.status(400).json({ message: "Invalid latitude, longitude, or date format" });
      return;
    }

    if (!preferredSpotSize) {
      res.status(400).json({ message: "User preferences missing preferredSpotSize" });
      return;
    }

    let query: any = {
      "size.length": { $gte: preferredSpotSize.length },
      "size.width": { $gte: preferredSpotSize.width },
      $or: [
        { pricePerHour: { $lte: maxPricePerHour } },
        { pricePerDay: { $lte: maxPricePerDay } },
        { pricePerMonth: { $lte: maxPricePerMonth } }
      ],
      availability: {
        $elemMatch: {
          date: queryDate,
          availableFrom: { $lte: time },
          availableUntil: { $gte: time }
        }
      }
    };

    query.features = [];
    if (coveredParking) query.features.push("Covered Parking");
    if (EVCharging) query.features.push("EV Charging");
    if (securityFeatures) query.features.push("Security");
    if (query.features.length === 0) delete query.features;

    if (payAsYouGoPreferred) {
      query.payAsYouGo = true;
    } else {
      const endTime = new Date(queryDate);
      endTime.setHours(endTime.getHours() + defaultParkingDuration);
      query.availability = {
        $elemMatch: {
          date: queryDate,
          availableFrom: { $lte: time },
          availableUntil: { $gte: endTime.toISOString().split("T")[1].slice(0, 5) }
        }
      };
    }

    const bestSpot = await Listing.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [userLongitude, userLatitude] },
          distanceField: "distance",
          maxDistance: preferredSearchRadius * 1000,
          spherical: true
        }
      },
      { $match: query },
      { $sort: { distance: 1, pricePerHour: 1 } },
      { $limit: 1 }
    ]);

    if (!bestSpot || bestSpot.length === 0) {
      res.status(404).json({ message: "No suitable parking spot found" });
      return;
    }

    // Send the full matching listing to the frontend
    res.status(200).json(bestSpot[0]);

  } catch (error) {
    console.error("Error finding best parking spot:", error);
    res.status(500).json({ message: "Error fetching best parking spot", error });
  }
});

// GET: Fetch a listing by its ID (No authentication required)
router.get("/listing/:id", async (req: Request, res: Response) => {
  const listingId = req.params.id;
  console.log(listingId)
  if (!listingId) {
    res.status(400).json({ message: "Listing ID is required" });
    return;
  }

  try {
    const listing = await Listing.findById(listingId);
    console.log(listing)
    if (!listing) {
      res.status(404).json({ message: "Listing not found" });
      return;
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    res.status(500).json({ message: "Error fetching listing details", error });
  }
});
