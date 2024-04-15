const mongoose = require('mongoose');

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

// You can also add methods or static functions here if needed
// userSchema.methods.someMethod = function () { ... };

// Create the model from the schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
