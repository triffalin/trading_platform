const express = require('express');
const router = express.Router();
const userController = require('./userController');
const passport = require('passport');

// Authentication Routes
router.post('/sign-up', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

// Google OAuth Routes
router.get('/auth/google', userController.googleAuth);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/sign-in' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// 2FA Routes
router.post('/setup-2fa', userController.setup2FA);
router.post('/verify-2fa', userController.verify2FA);

module.exports = router;
