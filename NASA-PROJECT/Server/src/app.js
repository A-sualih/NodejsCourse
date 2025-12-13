const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const api=require("./routes/api")
const app = express();
app.use(
  cors({
    origin: "*", // Allows all origins
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/v1",api)

app.use((req, res, next) => {
  // Skip if request is for API routes
  if (req.path.startsWith("/planets") || req.path.startsWith("/launches")) {
    return next();
  }

  // For all other routes, serve index.html
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
