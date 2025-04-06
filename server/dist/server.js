e import express from "express";
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
db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});
