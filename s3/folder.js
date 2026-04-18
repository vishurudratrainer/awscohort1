const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// 1. Initialize the S3 Client
const s3Client =   new S3Client({
  region: " ",
  credentials: {
    accessKeyId: " ",
    secretAccessKey: " ",
  },
});

const BUCKET_NAME = "trainingsample123";

/**
 * Recursively uploads a folder and its contents to S3
 * @param {string} localFolderPath - Path to the local folder
 * @param {string} s3Prefix - Optional folder path in S3 (e.g., 'backups/')
 */
async function uploadFolder(localFolderPath, s3Prefix = "") {
    const files = fs.readdirSync(localFolderPath);

    for (const file of files) {
        const localFilePath = path.join(localFolderPath, file);
        const s3Key = path.join(s3Prefix, file).replace(/\\/g, "/"); // Ensure S3 uses forward slashes

        if (fs.lstatSync(localFilePath).isDirectory()) {
            // Recurse into subdirectories
            await uploadFolder(localFilePath, s3Key);
        } else {
            // Upload individual file
            const fileContent = fs.readFileSync(localFilePath);
            const command = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: s3Key,
                Body: fileContent,
            });

            try {
                await s3Client.send(command);
                console.log(`Successfully uploaded: ${s3Key}`);
            } catch (err) {
                console.error(`Error uploading ${s3Key}:`, err);
            }
        }
    }
}

// Usage Example
uploadFolder("./my-local-folder", "remote-destination")
    .then(() => console.log("All files uploaded successfully!"))
    .catch((err) => console.error("Upload failed:", err));
