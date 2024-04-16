const UserModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Register User
const register = async userData => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new UserModel({
    ...userData,
    password: hashedPassword
  });
  await user.save();
  return user;
};

// User Login
const login = async credentials => {
  const user = await UserModel.findOne({ email: credentials.email });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(credentials.password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return { user, token };
};

// Send password reset email
const forgotPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send('User not found');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `https://your-frontend-domain.com/reset-password/${resetToken}`;
  const message = `Reset your password by clicking here: ${resetUrl}`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message
    });

    res.status(200).send('Email sent');
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(500).send('Email could not be sent');
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Invalid token');
  }

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).send('Password reset successful');
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};
