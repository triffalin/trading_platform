const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security configuration for express
const applySecurityMiddleware = app => {
  app.use(helmet()); // Helmet helps secure Express apps with various HTTP headers
  // Rate limiting to prevent brute-force attacks
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
};

module.exports = { applySecurityMiddleware };
