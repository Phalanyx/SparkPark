import { Router } from 'express';
import { admin } from './index';
import Users from '../models/users';
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello from auth');
});

router.post("/login", async (req, res) => {
  admin.auth().verifyIdToken(req.headers.authorization?.split(" ")[1])

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



export default router;