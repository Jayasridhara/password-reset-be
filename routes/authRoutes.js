const express = require('express');
const { register, forgotPassword, resetPassword, login, me, logout, getall } = require('../controllers/authController');
const isAuthenticated = require('../middlewares/auth');

const authRoutes = express.Router();

// Not strictly part of the reset flow, but useful for testing to create users
authRoutes.post('/register', register);
authRoutes.get('/login',login)
authRoutes.post('/forgotpassword', forgotPassword);
authRoutes.post('/resetpassword/:token', resetPassword);
authRoutes.get('/me',isAuthenticated, me);
authRoutes.post('/logout', isAuthenticated, logout);
authRoutes.get('/',getall)
module.exports = authRoutes;    