const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// 1. Initialize the S3 Client
const s3Client = new S3Client({
  region: " ",
  credentials: {
    accessKeyId: " ",
    secretAccessKey: " ",
  },
});

async function uploadFile(filePath, bucketName) {
  const fileStream = fs.createReadStream(filePath);
  const fileName = path.basename(filePath);

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName, // The name the file will have in S3
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Upload Success:", data);
  } catch (err) {
    console.error("Upload Error:", err);
  }
}

// Usage: replace with your local file path and bucket name
uploadFile("./my-local-image.png", "trainingsample123");
