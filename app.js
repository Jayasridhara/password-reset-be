const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();


// Middleware
app.use(cors({
    origin: process.env.WEB_APP_URL ,
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     credentials: true
}));

app.use(express.json()); // Body parser for JSON requests
app.use(cookieParser());
app.use('/api/auth', authRoutes);
module.exports=app;