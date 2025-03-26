import "dotenv/config";
import express from "express"
import fileUpload from "express-fileupload";

import Listing from "./models/listing"
import georoutes from "./geolocation"
import auth from "./auth"
import listing from "./listing"
import uploadRoute from "./image/upload";
import preferencesRoutes from "./preferences"
import userRoutes from "./user";
import bookingRoutes from "./booking";
const app = express();
app.use(express.json());
app.use(fileUpload());

app.post("/upload", uploadRoute);
app.use("/geolocation", georoutes);
app.use("/auth", auth);
app.use("/", listing);
app.use("/preferences", preferencesRoutes);
app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);



app.get("/", async (req, res) => {

    const parking_spots = await Listing.find();     
    
    res.status(200).json(parking_spots)

})

export default app;