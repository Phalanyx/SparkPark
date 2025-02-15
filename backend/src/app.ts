import "dotenv/config";
import express from "express"
import Parking from "./models/greenp"
import Users from "./models/users"
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

app.post("/login", async (req, res) => {
  admin.auth().verifyIdToken(req.headers.authorization)
  .then(async function(decodedToken: any) {
    console.log(decodedToken);
    const user = { uid: decodedToken.uid, email: decodedToken.email, name: decodedToken.name || "Anonymous" };

    try {
      let existingUser = await Users.findOne({ uid: user.uid }).exec();
      if (existingUser) {
        console.log(existingUser);
        console.log("User already exists:");
        res.status(200).json(existingUser);
      } else {
        let newUser = await Users.create(user);
        console.log("New user created:");
        console.log(newUser);
        res.status(200).json(newUser);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }).catch(function(error: any) {
    console.log(error);
    res.status(400).json({ error: error });
  });
});

export default app;