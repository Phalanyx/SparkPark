import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!
  }
});

console.log("Cloudflare R2 S3 Client initialized :)");

export default s3;
