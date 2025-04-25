require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const failureRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', failureRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});