import { Router } from "express";
import middleware from "../auth/middleware";
import Preferences from "../models/preferences";
import { admin } from "../auth";

const router = Router();

export default router;

router.use(middleware);

/**
 * @route   POST /preferences/add
 * @desc    Add or update user preferences
 * @access  Private (Requires Authentication)
 */
router.post("/add", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Authorization token required" });
            return;
        }

        // Verify Firebase token and get user ID
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const {
            preferredSpotSize,  // <-- Renamed from preferredVehicleSize
            maxPricePerHour,
            maxPricePerDay,
            maxPricePerMonth,
            preferredSearchRadius,
            coveredParking,
            EVCharging,
            securityFeatures,
            payAsYouGoPreferred,
            defaultParkingDuration,
        } = req.body;

        let preferences = await Preferences.findOne({ userId });

        if (!preferences) {
            // Create new preferences entry if not found
            preferences = new Preferences({
                userId,
                preferredSpotSize,
                maxPricePerHour,
                maxPricePerDay,
                maxPricePerMonth,
                preferredSearchRadius,
                coveredParking,
                EVCharging,
                securityFeatures,
                payAsYouGoPreferred,
                defaultParkingDuration,
            });

            await preferences.save();
            res.status(201).json({ message: "Preferences added successfully", preferences });
            return;
        }

        // Update existing preferences
        preferences.preferredSpotSize = preferredSpotSize || preferences.preferredSpotSize;
        preferences.maxPricePerHour = maxPricePerHour || preferences.maxPricePerHour;
        preferences.maxPricePerDay = maxPricePerDay || preferences.maxPricePerDay;
        preferences.maxPricePerMonth = maxPricePerMonth || preferences.maxPricePerMonth;
        preferences.preferredSearchRadius = preferredSearchRadius || preferences.preferredSearchRadius;
        preferences.coveredParking = coveredParking !== undefined ? coveredParking : preferences.coveredParking;
        preferences.EVCharging = EVCharging !== undefined ? EVCharging : preferences.EVCharging;
        preferences.securityFeatures = securityFeatures !== undefined ? securityFeatures : preferences.securityFeatures;
        preferences.payAsYouGoPreferred = payAsYouGoPreferred !== undefined ? payAsYouGoPreferred : preferences.payAsYouGoPreferred;
        preferences.defaultParkingDuration = defaultParkingDuration || preferences.defaultParkingDuration;

        await preferences.save();
        res.status(200).json({ message: "Preferences updated successfully", preferences });

    } catch (error) {
        console.error("Error adding/updating preferences:", error);
        res.status(500).json({ message: "Error processing preferences", error });
    }
});

/**
 * @route   GET /preferences/get
 * @desc    Get user preferences
 * @access  Private (Requires Authentication)
 */
router.get("/get", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Authorization token required" });
            return;
        }

        // Verify Firebase token and get user ID
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        // Fetch user preferences
        const preferences = await Preferences.findOne({ userId });

        if (!preferences) {
            res.status(404).json({ message: "No preferences found for this user" });
            return;
        }

        res.status(200).json(preferences);
    } catch (error) {
        console.error("Error fetching preferences:", error);
        res.status(500).json({ message: "Error fetching preferences", error });
    }
});

/**
 * @route   DELETE /preferences/delete
 * @desc    Delete user preferences
 * @access  Private (Requires Authentication)
 */
router.delete("/delete", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Authorization token required" });
            return;
        }

        // Verify Firebase token and get user ID
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const deletedPreferences = await Preferences.findOneAndDelete({ userId });

        if (!deletedPreferences) {
            res.status(404).json({ message: "No preferences found to delete" });
            return;
        }

        res.status(200).json({ message: "Preferences deleted successfully" });
    } catch (error) {
        console.error("Error deleting preferences:", error);
        res.status(500).json({ message: "Error deleting preferences", error });
    }
});

/**
 * @route   PUT /preferences/change
 * @desc    Update existing user preferences partially
 * @access  Private (Requires Authentication)
 */
router.put("/change", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Authorization token required" });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const updateFields = req.body;

        if (Object.keys(updateFields).length === 0) {
            res.status(400).json({ message: "At least one preference field must be provided." });
            return;
        }

        const updatedPreferences = await Preferences.findOneAndUpdate(
            { userId },
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedPreferences) {
            res.status(404).json({ message: "Preferences not found for this user." });
            return;
        }

        res.status(200).json({ message: "Preferences updated successfully", preferences: updatedPreferences });

    } catch (error) {
        console.error("Error changing preferences:", error);
        res.status(500).json({ message: "Error updating preferences", error });
    }
});