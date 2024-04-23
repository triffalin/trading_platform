import express from 'express';
import passport from '../passport-config.js';
import rateLimit from 'express-rate-limit';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  setup2FA,
  verify2FA
} from '../controllers/userController.js';

const router = express.Router();

// Apply rate limiting to all authentication routes to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Authentication routes
router.post('/sign-up', authLimiter, register);
router.post('/sign-in', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPassword);

// Google OAuth routes
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => res.redirect('/')
);

// Setup 2FA Routes
router.post('/setup-2fa', setup2FA);
router.post('/verify-2fa', verify2FA);

export default router;
