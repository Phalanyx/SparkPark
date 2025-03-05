import "dotenv/config";
import express from "express"
import fileUpload from "express-fileupload";

import Parking from "./models/greenp"
import Users from "./models/users"
import uploadRoute from "./routes/upload"; 


const app = express();
app.use(fileUpload());

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
    .then(function(decodedToken: any) {

      console.log(decodedToken);
      const user = { uid: decodedToken.uid, email: decodedToken.email }

      Users.create(user).then((user: any) => {

        res.status(200).json({message: "Hello World"})
      }
      ).catch((error: any) => {
        res.status(400).json({error: error})
      });
    }).catch(function(error: any) {
      res.status(400).json({error: error})
    });
})

app.post("/upload", uploadRoute);

export default app;