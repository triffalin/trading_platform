const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('./models/userModel.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      UserModel.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return cb(err);
        if (!user) {
          // Create a new user if one doesn't exist
          user = new UserModel({
            googleId: profile.id
            // ... other profile information from Google
          });
          user.save(function (err) {
            if (err) console.log(err);
            return cb(null, user);
          });
        } else {
          // Existing user, just return it
          return cb(null, user);
        }
      });
    }
  )
);
