require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
res.send("Backend is running...");
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Use PORT from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// Get MongoDB URI from environment
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
console.error("Error: MONGO_URI is not defined. Please set it in .env or Render dashboard.");
process.exit(1);
}

// Connect to MongoDB and start server
mongoose.connect(mongoUri, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log("MongoDB connected successfully.");
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch(err => {
console.error("MongoDB connection error:", err);
process.exit(1);
});
