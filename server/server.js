require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema Definition
const failureSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  intended: {
    type: String,
    required: true,
  },
  failLevel: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically sets the timestamp if not provided
  },
});

// Model Export
const Failure = mongoose.model("Failure", failureSchema);

// Routes

// Create
app.post("/failures", async (req, res) => {
  try {
    const newFailure = new Failure(req.body); // Create a new failure record
    await newFailure.save(); // Save it to the database
    res.status(201).json(newFailure); // Respond with the created failure
  } catch (err) {
    res.status(500).json({ error: err.message }); // If error, send it
  }
});

// Read All
app.get("/failures", async (req, res) => {
  try {
    const failures = await Failure.find(); // Find all failure records
    res.json(failures); // Send the failures as a response
  } catch (err) {
    res.status(500).send("Server Error"); // If error, send it
  }
});

// Read One by ID
app.get("/failures/:id", async (req, res) => {
  try {
    const failure = await Failure.findById(req.params.id); // Find failure by ID
    if (!failure) {
      return res.status(404).send("Failure not found");
    }
    res.json(failure); // Send the failure as a response
  } catch (err) {
    res.status(500).send("Server Error"); // If error, send it
  }
});

// Update (PUT request)
app.put("/failures/:id", async (req, res) => {
  try {
    // Find the failure by ID and update it with the new data
    const updatedFailure = await Failure.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure data passes the model validations
    });

    if (!updatedFailure) {
      return res.status(404).send("Failure not found");
    }

    res.json(updatedFailure); // Send the updated failure as a response
  } catch (err) {
    res.status(500).json({ error: err.message }); // If error, send it
  }
});

// Delete
app.delete("/failures/:id", async (req, res) => {
  try {
    const deletedFailure = await Failure.findByIdAndDelete(req.params.id); // Delete failure by ID
    if (!deletedFailure) {
      return res.status(404).send("Failure not found");
    }
    res.json({ message: "Deleted successfully" }); // Confirm deletion
  } catch (err) {
    res.status(500).send("Server Error"); // If error, send it
  }
});

// Seed data route (optional, to insert sample data)
app.post("/seed", async (req, res) => {
  const sampleFails = [
    {
      text: "Let’s meat at noon",
      intended: "Let’s meet at noon",
      failLevel: "moderate",
      context: "Lunch planning",
      submittedBy: "funnyUser99",
      timestamp: new Date(),
    },
    {
      text: "I'll duck off now",
      intended: "I'll back off now",
      failLevel: "mild",
      context: "Apology",
      submittedBy: "autocorrectQueen",
      timestamp: new Date(),
    },
  ];
  try {
    await Failure.insertMany(sampleFails);
    res.send("Seeded successfully!");
  } catch (err) {
    res.status(500).send("Seeding failed.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
