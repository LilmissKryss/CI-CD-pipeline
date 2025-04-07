import express from "express";
// import path from 'node:path';
import db from "./config/connection.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Add security headers
app.use((_req, res, next) => {
  // In development, allow unsafe-eval for Vite's HMR
  const scriptSrc =
    process.env.NODE_ENV === "production" ? "'self'" : "'self' 'unsafe-eval'";

  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; script-src ${scriptSrc}; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';`
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(routes);

// Add a fallback route for the SPA
app.get("*", (_req, res) => {
  res.sendFile("index.html", { root: "../client/dist" });
});

// Add a health check endpoint for Render
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start the server regardless of database connection
console.log(`Starting server on port ${PORT}`);
const portNumber = parseInt(PORT.toString(), 10);
app.listen(portNumber, "0.0.0.0", () => {
  console.log(`🌍 Server is running on port ${portNumber}`);
});

// Log when database connects
db.once("open", () => {
  console.log(`🌍 MongoDB connection established successfully`);
});
