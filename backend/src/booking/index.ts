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

    let userId = "2iFn07CYG9aiNbLnqcsbET6kYqL2"

    if (!token) {
        console.log("No token provided, using default user ID")
    }

    // Verify Firebase token and get user ID
    else {
        const decodedToken = await admin.auth().verifyIdToken(token);
        userId = decodedToken.uid;
    }




    
    // Extract booking details from request body
    const {
      listingId,
      startTime,
      endTime,
      vehicleDetails
    } = req.body;
    console.log("Booking details:", req.body);
    // Validate required fields
    if (!listingId || !startTime || !endTime) {
      console.log("Missing required fields");
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      console.log("Listing not found");
      res.status(404).json({ message: "Listing not found" });
      return;
    }

    // Convert times to Date objects
    const bookingStart = new Date(startTime);
    const bookingEnd = new Date(endTime);
    
    // Add 20 hours to compensate for timezone
    bookingStart.setHours(bookingStart.getHours() + 20);
    bookingEnd.setHours(bookingEnd.getHours() + 20);

    console.log(bookingStart, bookingEnd)

    // Check if the time slot is available
    const isAvailable = listing.availability.some(slot => {
      const slotDate = new Date(slot.date);
      const datePart = slotDate.toISOString().split('T')[0]; // Extract YYYY-MM-DD

      const slotStart = new Date(`${datePart}T${slot.availableFrom}:00.000Z`);
      const slotEnd = new Date(`${datePart}T${slot.availableUntil}:00.000Z`);



      return (
        bookingStart >= slotStart &&
        bookingEnd <= slotEnd &&
        slotDate.toUTCString().replace(/^.*, (\d{2} \w{3} \d{4}) .*$/, "$1") === bookingStart.toUTCString().replace(/^.*, (\d{2} \w{3} \d{4}) .*$/, "$1")
      );
    });


    if (!isAvailable) {
        console.log("Selected time slot is not available");
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

    // For payment integration - include payment info in the response
    const paymentInfo = {
      bookingId: savedBooking._id,
      amount: Math.round(totalPrice * 100), // Convert to cents for Stripe
      currency: "cad"
    };
    // Update listing availability
    const updatedAvailability = listing.availability.map(slot => {
      const slotDate = new Date(slot.date);
      if (slotDate.toUTCString().replace(/^.*, (\d{2} \w{3} \d{4}) .*$/, "$1") === bookingStart.toUTCString().replace(/^.*, (\d{2} \w{3} \d{4}) .*$/, "$1")) {
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
            availableFrom: bookingStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }),
            availableUntil: slot.availableUntil
          };
        }
        
        // If booking is at the end of the slot
        if (bookingEnd.getTime() === slotEnd.getTime()) {
          return {
            date: slot.date,
            availableFrom: slot.availableFrom,
            availableUntil: bookingEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })
          };
        }


        // If booking is in the middle of the slot, split it into two slots
        return [
          {
            date: slot.date,
            availableFrom: slot.availableFrom,
            availableUntil: bookingStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })
          },
          {
            date: slot.date,
            availableFrom: bookingEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }),
            availableUntil: slot.availableUntil
          }
        ];
      }
      return slot;
    }).filter(Boolean).flat();

    // Update the listing with new availability
    listing.availability = updatedAvailability as any;
    await listing.save();
    console.log("Booking created successfully");
    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
      updatedListing: listing,
      paymentInfo // Include payment info in the response
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
});


router.get("/all", async (req, res) => {
  try {
    console.log("Fetching all bookings");
    let bookings = await Booking.find();

    const token = req.headers.authorization?.split(" ")[1];

    let userId = "2iFn07CYG9aiNbLnqcsbET6kYqL2"

    if (!token) {
        console.log("No token provided, using default user ID")
    }
    else{
      const decodedToken = await admin.auth().verifyIdToken(token);
      userId = decodedToken.uid;
    }

    bookings = bookings.filter((booking) => booking.userId === userId);


    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});
