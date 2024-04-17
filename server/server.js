require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userAuthRoutes = require('./routes/userAuth.js');
const authRoutes = require('./routes/authRoutes.js');
const UserModel = require('./models/userModel.js');

const app = express();

// Passport Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return done(err);
        if (!user) {
          user = new UserModel({
            googleId: profile.id /* ...other profile information... */
          });
          user.save(function (err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          // found user. Return
          return done(err, user);
        }
      });
    }
  )
);

// Serialize user into the sessions
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});

// Trust the first proxy in front of the server
app.set('trust proxy', 1);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: !process.env.DEVELOPMENT } // Enable secure cookies on production
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

// Use the user authentication routes
app.use('/api/auth', userAuthRoutes);
app.use('/api/users', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
