const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security configuration for express
const applySecurityMiddleware = app => {
  if (!app) {
    throw new ReferenceError('app is not defined');
  }

  app.use(helmet());
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });
  app.use(limiter);
};

module.exports = { applySecurityMiddleware };
