const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/emailService.js');
const passport = require('passport');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Helper function to handle errors
const handleErrorResponse = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ message: error.message });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (await UserModel.findOne({ email })) {
      return handleErrorResponse(res, new Error('Email already in use'), 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleErrorResponse(res, new Error('Invalid credentials'), 401);
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
    handleErrorResponse(res, error);
  }
};

// OAuth Google Login
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// OAuth Google Callback
exports.googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
});

// Send password reset email
exports.forgotPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return handleErrorResponse(res, new Error('User not found'), 404);
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `https://your-frontend-domain.com/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Reset your password by clicking here: ${resetUrl}`
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    handleErrorResponse(res, error);
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
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return handleErrorResponse(res, new Error('Invalid token'), 400);
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// 2FA Setup
exports.setup2FA = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFactorSecret = secret.base32;
    await user.save();

    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      if (err) {
        return handleErrorResponse(
          res,
          new Error('Unable to generate QR Code'),
          500
        );
      }
      res.json({ secret: secret.base32, qrCode: image_data });
    });
  } catch (error) {
    handleErrorResponse(res, error);
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
      return handleErrorResponse(res, new Error('Invalid token'), 400);
    }

    res.json({ message: '2FA verified successfully' });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = exports;
