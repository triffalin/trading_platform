const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('./models/userModel.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // From environment variable or config
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // From environment variable or config
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
