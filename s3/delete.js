const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: " ",
    secretAccessKey: " ",
  },
});

async function deleteKey(bucketName,key) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key:key
  });

  try {
    const response = await client.send(command);
    console.log(response); // Array of objects
  } catch (err) {
    console.error(err);
  }
}

deleteKey("trainingsample123","my-local-image.png")