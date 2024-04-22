const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passport = require('../passport-config.js');
const rateLimit = require('express-rate-limit');

// Apply rate limiting to all authentication routes to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Authentication routes
router.post('/sign-up', authLimiter, (req, res, next) => {
  if (!req.body) {
    next(new Error('Missing request body'));
  } else {
    userController.register(req, res, next);
  }
});
router.post('/sign-in', authLimiter, (req, res, next) => {
  if (!req.body) {
    next(new Error('Missing request body'));
  } else {
    userController.login(req, res, next);
  }
});
router.post('/forgot-password', authLimiter, (req, res, next) => {
  if (!req.body || !req.body.email) {
    next(new Error('Missing email in request body'));
  } else {
    userController.forgotPassword(req, res, next);
  }
});

router.post('/reset-password/:token', authLimiter, (req, res, next) => {
  if (!req.params.token) {
    next(new Error('Missing token in request parameters'));
  } else if (!req.body) {
    next(new Error('Missing request body'));
  } else {
    userController.resetPassword(req, res, next);
  }
});

// Google OAuth routes
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res, next) => {
    if (!req.user) {
      next(new Error('Failed to authenticate with Google'));
    } else {
      res.redirect('/');
    }
  }
);

// Setup 2FA Routes
router.post('/setup-2fa', (req, res, next) => {
  if (!req.user) {
    next(new Error('User not authenticated'));
  } else {
    userController.setup2FA(req, res, next);
  }
});
router.post('/verify-2fa', (req, res, next) => {
  if (!req.user) {
    next(new Error('User not authenticated'));
  } else if (!req.body || !req.body.token) {
    next(new Error('Missing token in request body'));
  } else {
    userController.verify2FA(req, res, next);
  }
});

module.exports = router;
