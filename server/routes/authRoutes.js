const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passport = require('passport');
const rateLimit = require('express-rate-limit');

// Apply rate limiting to all authentication routes to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Authentication routes
router.post('/sign-up', authLimiter, userController.register);
router.post('/login', authLimiter, userController.login);
router.post('/forgot-password', authLimiter, userController.forgotPassword);
router.post(
  '/reset-password/:token',
  authLimiter,
  userController.resetPassword
);

// Google OAuth routes
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// Setup 2FA Routes
router.post('/setup-2fa', userController.setup2FA);
router.post('/verify-2fa', userController.verify2FA);

module.exports = router;
