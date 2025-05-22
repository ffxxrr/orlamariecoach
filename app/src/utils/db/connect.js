import mongoose from 'mongoose';

// Read prefixed env variables using Astro's import.meta.env
const uri = import.meta.env.PRIVATE_MONGODB_URI;
const dbName = import.meta.env.PRIVATE_MONGODB_DB; // Mongoose uses dbName from URI by default, but good to have

// Perform checks at module load time.
if (!uri) {
  console.error("connect.js: PRIVATE_MONGODB_URI not found in import.meta.env at module load time.");
  throw new Error('PRIVATE_MONGODB_URI not found in import.meta.env. Ensure it is defined in .env.development (app/) with the PRIVATE_ prefix and the server was restarted.');
}

// Define cache variable for Mongoose connection state
let cachedConnection = null;

export async function connectToDatabase() {
  // Check cache first - if connection exists and is ready, return it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    // console.log("Using cached Mongoose connection");
    return cachedConnection;
  }

  // If no cached connection or connection lost, create a new one
  // console.log("Creating new Mongoose connection");
  try {
    // Mongoose handles connection pooling internally.
    // The `connect` method returns a promise that resolves to the Mongoose instance.
    const connection = await mongoose.connect(uri, {
      // Mongoose 6+ uses the dbName specified in the connection string URI by default
      // dbName: dbName, // Usually not needed if part of URI
      // Options like useNewUrlParser, useUnifiedTopology, useCreateIndex, useFindAndModify
      // are no longer needed in Mongoose 6+
      serverSelectionTimeoutMS: 15000 // Increased timeout to 15s (default is 30s, buffer timeout is 10s)
    });

    cachedConnection = connection; // Cache the Mongoose instance

    console.log("Successfully connected to MongoDB via Mongoose!");
    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB via Mongoose", error);
    // Clear cache on failure
    cachedConnection = null;
    // Rethrow or handle error appropriately
    throw error;
  }
}

// Optional: Add a function to gracefully close the Mongoose connection
// export async function closeDatabaseConnection() {
//   if (cachedConnection) {
//     await mongoose.disconnect();
//     cachedConnection = null;
//     console.log("Mongoose connection closed.");
//   }
// }
