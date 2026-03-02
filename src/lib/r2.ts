import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "./config";

function getR2Client(): S3Client {
  if (!config.r2.accountId || !config.r2.accessKeyId || !config.r2.secretAccessKey) {
    throw new Error("R2 not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY.");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2.accessKeyId,
      secretAccessKey: config.r2.secretAccessKey,
    },
  });
}

/**
 * Upload a buffer to Cloudflare R2 and return the public CDN URL.
 * Falls back to throwing if R2 is not configured -- callers should
 * handle this gracefully with a try/catch.
 */
export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const client = getR2Client();
  const key = `generated/${fileName}`;

  await client.send(
    new PutObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  // Return public URL -- requires a custom domain or R2 public bucket URL
  if (config.r2.publicUrl) {
    return `${config.r2.publicUrl}/${key}`;
  }

  // Fallback: construct URL from account ID and bucket name
  return `https://${config.r2.bucketName}.${config.r2.accountId}.r2.dev/${key}`;
}
