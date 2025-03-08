import { Request, Response, NextFunction } from 'express';
import { admin } from './index';

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   if (req.headers.authorization) {
//     admin.auth().verifyIdToken(req.headers.authorization)
//     .then(async function(decodedToken: any) {
//       console.log(decodedToken);
//       req.body.user = { uid: decodedToken.uid, email: decodedToken.email, name: decodedToken.name || "Anonymous" };
//       next();
//     }).catch(function(error: any) {
//       console.log(error);
//       res.status(400).json({ error: error });
//     });
//   } else {
//     res.status(400).json({ error: "No token provided" });
//   }

  next()
}