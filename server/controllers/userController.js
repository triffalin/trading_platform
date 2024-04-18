const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/emailService.js');
const passport = require('passport');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: error.message });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (await UserModel.findOne({ email })) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({
      message: 'Logged in successfully',
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Google OAuth logic consolidated into the controller for clarity
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});
exports.googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
});

// Send password reset email
exports.forgotPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `https://your-frontend-domain.com/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Reset your password by clicking here: ${resetUrl}`
    });
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    handleError(res, error);
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    handleError(res, error);
  }
};

// 2FA Setup
exports.setup2FA = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    await user.save();
    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      if (err) {
        return res.status(500).json({ message: 'Unable to generate QR Code' });
      }
      res.json({ secret: secret.base32, qrCode: image_data });
    });
  } catch (error) {
    handleError(res, error);
  }
};

// 2FA Verify
exports.verify2FA = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: req.body.token
    });
    if (!verified) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.json({ message: '2FA verified successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = exports;
