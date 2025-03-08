import "dotenv/config";
import express from "express"
import Parking from "./models/greenp"
import georoutes from "./geolocation"
import auth from "./auth"
import listing from "./listing"

const app = express();
app.use(express.json());



app.use("/geolocation", georoutes);
app.use("/auth", auth);
app.use("/", listing);




app.get("/", async (req, res) => {

    const parking_spots = await Parking.find();     


    res.status(200).json(parking_spots)

})

export default app;