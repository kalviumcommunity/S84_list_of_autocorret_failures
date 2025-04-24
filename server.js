const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

// Schema & Model
const failSchema = new mongoose.Schema({
  text: String,
  intended: String,
  failLevel: String,
  context: String,
  submittedBy: String,
  timestamp: String,
});

const Fail = mongoose.model('Fail', failSchema);

// Route to get fails
app.get('/fails', async (req, res) => {
  try {
    const fails = await Fail.find();
    res.json(fails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
