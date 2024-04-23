import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/emailService.js';
import passport from '../passport-config.js';
import { generateSecret } from 'speakeasy';
import QRCode from 'qrcode';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const googleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
});

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.password = await bcrypt.hash(
      newPassword,
      await bcrypt.genSaltSync(10)
    );
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};

export const setup2FA = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = generateSecret({ length: 20 }).base32;
    user.twoFactorSecret = secret;
    await UserModel.findByIdAndUpdate(user._id, { twoFactorSecret: secret });

    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      if (err) {
        throw new Error('Unable to generate QR Code');
      }
      res.json({ secret, qrCode: image_data });
    });
  } catch (error) {
    next(error);
  }
};

export const verify2FA = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).lean();
    if (!user) {
      throw new Error('User not found');
    }

    const verified = generateSecret.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: req.body.token
    });

    if (!verified) {
      throw new Error('Invalid token');
    }

    res.json({ message: '2FA verified successfully' });
  } catch (error) {
    next(error);
  }
};
