const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

// Initialize S3 Client
const s3Client = new S3Client({
  region: " ",
  credentials: {
    accessKeyId: " ",
    secretAccessKey: " ",
  },
});

async function downloadFile(bucket, key, localPath) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });

    try {
        const response = await s3Client.send(command);
        // The Body is a ReadableStream in Node.js
        const fileStream = fs.createWriteStream(localPath);
        response.Body.pipe(fileStream);

        return new Promise((resolve, reject) => {
            fileStream.on("finish", resolve);
            fileStream.on("error", reject);
        });
    } catch (err) {
        console.error("Error downloading file:", err);
    }
}

// Usage
downloadFile("trainingsample123", "sample4.png", "./downloaded_file.png");
