const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }
    // Add any other user attributes you need, such as roles, profiles, etc.
    // ...
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving a new user
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare provided password with the hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;