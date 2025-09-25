
const User = require('../models/User');

const crypto = require('crypto'); // Built-in Node.js module
const sendEmail = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      expiresIn: '1h',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please login.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email :email });
        console.log("user",user)
        if (!user) {
            return res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save(); // Save the token and expiry to the user

        // Create reset URL
        const resetUrl = `${process.env.WEB_APP_URL}/reset-password/${resetToken}`;
        console.log(user);
        console.log(resetUrl,"resetUrl")
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>This link will expire in 1 hour.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message,
            });

            res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
        } catch (error) {
            console.log(error);
            // If email fails, clear the token to prevent a broken link
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ success: false, message: 'Email could not be sent. Please try again.' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reset user password
// @route   POST /api/auth/resetpassword/:token
// @access  Public
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Token must not be expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired password reset link.' });
        }

        // Update password
        user.password = password;
        user.resetPasswordToken = undefined; // Clear the token
        user.resetPasswordExpires = undefined; // Clear expiry
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful. You can now login with your new password.' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.me = async (req, res) => {
    try {

        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found or not logged in' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


exports.getall = async (req, res) => {
    try {
        const data = await User.find().select('-__v');
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Fetching meal plans failed...', error: error.message });
    }
}