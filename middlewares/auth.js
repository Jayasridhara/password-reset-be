const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {

    // get the token from the cookies
    const token = req.cookies && req.cookies.token;

    
    // if no token, return 401
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        // proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports=isAuthenticated;