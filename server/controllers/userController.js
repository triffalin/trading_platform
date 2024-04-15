const UserModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async userData => {
  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  // Create user document and save to database
  const user = new UserModel({
    ...userData,
    password: hashedPassword
  });
  await user.save();
  return user;
};

const login = async credentials => {
  // Find user by email or username
  const user = await UserModel.findOne({ email: credentials.email });
  if (!user) {
    throw new Error('User not found');
  }
  // Check password
  const isMatch = await bcrypt.compare(credentials.password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }
  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return { user, token };
};

module.exports = {
  register,
  login
};
