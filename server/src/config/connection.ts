import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// Get the MongoDB URI from environment variables or use the local fallback
const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/techquiz";

// Log the connection attempt (without showing the full URI for security)
const redactedURI = mongoURI.replace(
  /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
  "mongodb$1://[username]:[password]@"
);
console.log(`Attempting to connect to MongoDB at: ${redactedURI}`);

// Set up connection event handlers
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Connect to MongoDB
mongoose.connect(mongoURI);

export default db;
