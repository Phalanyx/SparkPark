import { Router } from 'express';
import login from './login';
import middleware from './middleware';
const router = Router();
router.use("/", login);
router.use(middleware);
export var admin = require("firebase-admin");

var serviceAccount = {
  "type": "service_account",
  "project_id": "big-oh",
  "private_key_id": process.env.FIREBASE_ID,
  "private_key": process.env.FIREBASE_KEY,
  "client_email": "firebase-adminsdk-fbsvc@big-oh.iam.gserviceaccount.com",
  "client_id": "110972353710271475335",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40big-oh.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default router;