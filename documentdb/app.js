const { MongoClient } = require('mongodb');
const fs = require('fs');

// 1. Connection settings
const username = '';
const password = '$';
const host = ''; // e.g., mycluster.node.us-east-1.docdb.amazonaws.com
const port = '27017';

// 2. Load the CA certificate
const ca = [fs.readFileSync("global-bundle.pem")];

// 3. Build the connection string
// Note: DocumentDB requires 'tls=true' and 'replicaSet=rs0'
const url = `mongodb://${username}:${password}@${host}:${port}/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

async function run() {
  const client = new MongoClient(url, {
    tlsCAFile: `global-bundle.pem`, // Path to your downloaded .pem file
  });

  try {
    await client.connect();
    console.log("Connected successfully to DocumentDB");

    const db = client.db("testDatabase");
    const collection = db.collection("testCollection");

    // Insert a document
    await collection.insertOne({ name: "DocumentDB", type: "NoSQL" });
    
    // Find the document
    const doc = await collection.findOne({ name: "DocumentDB" });
    console.log("Found Document:", doc);

  } catch (err) {
    console.error("Connection error:", err.stack);
  } finally {
    await client.close();
  }
}

run();

