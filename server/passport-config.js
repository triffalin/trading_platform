const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('./models/userModel.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Ensure profile and profile.id are not null
        if (!profile || !profile.id) {
          throw new Error('Invalid Google profile data');
        }

        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          // If the user does not exist, create a new user
          user = new UserModel({
            googleId: profile.id,
            email: profile.emails?.[0]?.value
            // Populate additional profile fields as necessary
          });
          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        if (err instanceof Error) {
          return cb(err);
        } else {
          return cb(new Error(err));
        }
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  if (!user || !user.id) {
    return done(new Error('User is not valid'));
  }
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser((id, done) => {
  if (!id) {
    return done(new Error('Invalid session data'));
  }
  UserModel.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
    done(err, user);
  });
});

module.exports = passport;
