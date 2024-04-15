const express = require('express');
const app = express();
const userAuthRoutes = require('./routes/userAuth');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Setup rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

// Middleware for parsing JSON and handling CORS
app.use(express.json()); // for parsing application/json
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Adjust the CORS policy as needed

// Use Helmet
app.use(helmet());

// Use routes
app.use('/api/auth', limiter, userAuthRoutes);

app.get('/', limiter, (req, res) => {
  res.send('Backend server is running!');
});

// Other middleware can be set up here, such as helmet for security

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
