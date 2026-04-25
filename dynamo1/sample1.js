import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: ""
  }
});


import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  GetCommand, 
  UpdateCommand, 
  DeleteCommand,
  ScanCommand 
} from "@aws-sdk/lib-dynamodb";

// 1. Initialize Clients
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "Users";

// --- CRUD FUNCTIONS ---

// CREATE: Add a new user
export const createUser = async (user) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: user, // e.g., { id: "1", name: "Alice", email: "alice@example.com" }
  });
  return await docClient.send(command);
};

// READ: Get a user by ID
export const getUser = async (id) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });
  const response = await docClient.send(command);
  return response.Item;
};

// UPDATE: Update a user's name
export const updateUserName = async (id, newName) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "set #n = :name",
    ExpressionAttributeNames: { "#n": "name" },
    ExpressionAttributeValues: { ":name": newName },
    ReturnValues: "ALL_NEW",
  });
  const response = await docClient.send(command);
  return response.Attributes;
};

// DELETE: Remove a user
export const deleteUser = async (id) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });
  return await docClient.send(command);
};

// LIST: Get all users (Scan)
export const listUsers = async () => {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const response = await docClient.send(command);
  return response.Items;
};

//createUser({"id":"2","name":"Vishal","age":45})
//getUser("1").then(res=>console.log(res))
//listUsers().then(res=>console.log(res))
//deleteUser("1").then(res=>console.log(res))
