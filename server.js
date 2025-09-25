require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
    origin: process.env.WEB_APP_URL ,
     credentials: true// Allow requests only from your frontend domain
}));
app.use(express.json()); // Body parser for JSON requests
app.use(cookieParser());
// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Password Reset Backend API is running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});