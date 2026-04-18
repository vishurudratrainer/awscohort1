const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: " ",
  credentials: {
    accessKeyId: " ",
    secretAccessKey: " ",
  },
});

async function listObjects(bucketName) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
  });

  try {
    const response = await client.send(command);
    console.log(response.Contents); // Array of objects
  } catch (err) {
    console.error(err);
  }
}
listObjects("trainingsample123")