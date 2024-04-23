import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const applySecurityMiddleware = app => {
  app.use(
    helmet({
      noSniff: false
    })
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      legacyHeaders: false
    })
  );

  return app;
};

export default applySecurityMiddleware;
