const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
  googleId: String
  // Additional fields as needed
});

// Pre-save hook to hash password before saving a new user
userSchema.pre('save', async function (next) {
  // If the password is not being modified, do not continue
  if (!this.isModified('password')) return next();

  // If the password is null or undefined, throw an error
  if (!this.password) {
    next(new Error('A password is required'));
    return;
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare provided password with the hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!candidatePassword) {
    throw new Error('A candidate password is required');
  }

  if (!this.password) {
    throw new Error('No password hash found');
  }

  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate a password reset token
userSchema.methods.createPasswordResetToken = function () {
  if (!this.email) {
    throw new Error('Email is required to generate a password reset token');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token and set to the passwordResetToken field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set the token expiration time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
