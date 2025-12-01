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

const PORT = process.env.PORT || 5000;

// Validate Mongo URI
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
console.error("❌ ERROR: MONGO_URI is not defined.");
process.exit(1);
}

// Connect (NO deprecated options)
mongoose.connect(mongoUri)
.then(() => {
console.log("✅ MongoDB connected");
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
console.error("❌ MongoDB connection error:", err);
process.exit(1);
});
