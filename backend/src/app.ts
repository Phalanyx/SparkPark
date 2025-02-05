import "dotenv/config";
import express from "express"
import Parking from "./models/greenp"

const app = express();
var admin = require("firebase-admin");

var serviceAccount = require("./big-oh-firebase-adminsdk-fbsvc-385aadbde6.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.get("/", async (req, res) => {
    const parking_spots = await Parking.find().exec();
    res.status(200).json(parking_spots)
    console.log(parking_spots);
})

app.post("/test", async (req, res) => {

    admin.auth().verifyIdToken(req.headers.authorization)
    // .then(function(decodedToken) {
    //   var uid = decodedToken.uid;
    //   console.log(uid);
    //   res.status(200).json({message: "Hello World"})
    // }).catch(function(error) {
    //   res.status(400).json({message: "Hello World"})
    // });
    res.status(200).json({message: "Hello World"})
}
)

export default app;