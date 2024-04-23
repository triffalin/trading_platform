import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from './models/userModel.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await UserModel.findOneAndUpdate(
        { googleId: profile.id },
        { googleId: profile.id, email: profile.emails?.[0]?.value },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      cb(null, user);
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser((id, done) => {
  UserModel.findById(id, done);
});

export default passport;
