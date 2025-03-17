// In routes/upload.ts
import { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import s3 from "../config/cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// Remove the explicit return type
const uploadRoute = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  if (!req.files || !req.files.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  console.log(`Time after validation: ${Date.now() - startTime}ms`);

  const file = req.files.file as fileUpload.UploadedFile;
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name}`;
  console.log(`Time after preparation: ${Date.now() - startTime}ms`);

  try {
    const uploadParams = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: fileName,
      Body: file.data,
      ContentType: file.mimetype,
    };
    console.log(`Time before R2 upload: ${Date.now() - startTime}ms`);


    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`Time after R2 upload: ${Date.now() - startTime}ms`);

    const fileUrl = `https://pub-5a69287373af4fea95d825b39ebd6b85.r2.dev/${fileName}`;
    console.log(`Total upload time: ${Date.now() - startTime}ms`);

    res.json({ fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

export default uploadRoute;