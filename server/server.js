import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './passport-config.js';
import authRoutes from './routes/authRoutes.js';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// Checking essential environment variables early
const requiredEnv = ['PORT', 'MONGO_URI', 'SESSION_SECRET', 'CORS_ORIGIN'];
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    throw new Error(`${env} environment variable is not defined.`);
  }
});

const app = express();

// Apply security measures
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

// Rate limiting to prevent brute force attacks
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
    message: 'Too many requests from this IP, please try again after 15 minutes'
  })
);

// Body parsing middleware
app.use(json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  });

// Session configuration for authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      touchAfter: 24 * 3600 // time period in seconds
    }),
    cookie: {
      secure: process.env.SECURE_COOKIE === 'true', // Ensure you're using 'true' in production
      httpOnly: true,
      sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/api/users', authRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = parseInt(process.env.PORT, 10);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
