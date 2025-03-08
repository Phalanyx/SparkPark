import { Router } from 'express';
import login from './login';
import middleware from './middleware';
const router = Router();
router.use("/", login);
router.use(middleware);
export var admin = require("firebase-admin");

var serviceAccount = require("../big-oh-firebase-adminsdk-fbsvc-385aadbde6.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default router;