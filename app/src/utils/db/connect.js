import { MongoClient } from 'mongodb';

// Use environment variables defined in .env
const uri = import.meta.env.MONGODB_URI;
const dbName = import.meta.env.MONGODB_DB;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    // Check if the client is still connected
    try {
      await cachedClient.db(dbName).command({ ping: 1 });
      // console.log("Using cached MongoDB connection");
      return { client: cachedClient, db: cachedDb };
    } catch (e) {
      console.error("Cached MongoDB connection lost. Reconnecting...", e);
      cachedClient = null;
      cachedDb = null;
    }
  }

  // console.log("Creating new MongoDB connection");
  const client = new MongoClient(uri, {
    // useNewUrlParser: true, // Deprecated in newer Node.js driver versions
    // useUnifiedTopology: true, // Deprecated in newer Node.js driver versions
  });

  try {
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    console.log("Successfully connected to MongoDB!");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    // Gracefully exit or handle error appropriately in a real application
    // For now, we'll just re-throw to make it obvious during development
    throw error;
  }
}

// Optional: Add a function to gracefully close the connection if needed
// export async function closeDatabaseConnection() {
//   if (cachedClient) {
//     await cachedClient.close();
//     cachedClient = null;
//     cachedDb = null;
//     console.log("MongoDB connection closed.");
//   }
// }
