const express = require('express');
const cors = require('cors');


const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();


// Middleware
app.use(cors({
    origin: process.env.WEB_APP_URL ,
     credentials: true// Allow requests only from your frontend domain
}));
app.use(express.json()); // Body parser for JSON requests
app.use(cookieParser());
app.use('/api/auth', authRoutes);
module.exports=app;