require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userAuthRoutes = require('./routes/userAuth');

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // Use the MONGO_URI from .env
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Setup rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Use Helmet
app.use(helmet());

// Use routes with the limiter middleware applied
app.use('/api/auth', limiter, userAuthRoutes);

// Root endpoint
app.get('/', limiter, (req, res) => {
  res.send('Backend server is running!');
});

const PORT = process.env.PORT; // Use the PORT from .env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
