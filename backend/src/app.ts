import "dotenv/config";
import express from "express"
import Parking from "./models/greenp"

const app = express();

app.get("/", async (req, res) => {
    const parking_spots = await Parking.find().exec();
    res.status(200).json(parking_spots)
    console.log(parking_spots);
})

export default app;