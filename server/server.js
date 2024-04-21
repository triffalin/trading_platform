require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./passport-config.js');
const authRoutes = require('./routes/authRoutes.js');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorMiddleware.js');

const app = express();

// Apply security measures
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Use environment variable for production
    credentials: true
  })
);

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per 15 minutes
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Session configuration for authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: true, httpOnly: true, sameSite: 'strict' }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/api/users', authRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
