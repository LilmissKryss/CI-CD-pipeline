// Import the database connection
import "./config/connection.js";

console.log("Testing MongoDB connection...");

// Set a timeout to close the connection after 5 seconds
setTimeout(() => {
  console.log("Closing connection after timeout");
  process.exit(0);
}, 5000);

// The connection events are already set up in the connection.js file
// If the connection is successful, you'll see the success message
// If it fails, you'll see the error message
