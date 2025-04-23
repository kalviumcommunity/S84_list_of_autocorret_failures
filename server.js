const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URL;

let dbStatus = "🔴 Not connected";

// MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => {
    dbStatus = "🟢 Connected to MongoDB";
    console.log("✅ MongoDB Connected Successfully!");
  })
  .catch((err) => {
    dbStatus = "🔴 MongoDB Connection Failed";
    console.error("❌ MongoDB Connection Error:", err);
  });

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send(`Hello! Database status: ${dbStatus}`);
});

// Ping route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
