const UserModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/emailService.js');
const passport = require('../passport-config.js');
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
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    if (await UserModel.findOne({ email })) {
      throw new Error('Email already in use');
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
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
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
    const { email } = req.body;
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
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
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Invalid token');
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
    const user = await UserModel.findById(req.user.id).lean();
    if (!user) {
      throw new Error('User not found');
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFactorSecret = secret.base32;
    await UserModel.findByIdAndUpdate(user._id, user);

    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      if (err) {
        throw new Error('Unable to generate QR Code');
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
    const user = await UserModel.findById(req.user.id).lean();
    if (!user) {
      throw new Error('User not found');
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: req.body.token
    });

    if (!verified) {
      throw new Error('Invalid token');
    }

    res.json({ message: '2FA verified successfully' });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = exports;
