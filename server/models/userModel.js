import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    googleId: String
    // Additional fields as needed
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving a new user
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
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
  if (this.passwordResetToken != null) {
    throw new Error('Password reset token already exists');
  }
  if (!this.email) {
    throw new Error('Email is not set');
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
