/**
 * Next.js configuration file
 * This file contains the configuration settings for the Next.js application,
 * including custom rewrite rules for authentication routes.
 * @type {import('next').NextConfig}
 */

module.exports = {
  async rewrites() {
    return [
      {
        source: '/auth/login',
        destination: '/api/auth/login'
      },
      {
        source: '/auth/registration',
        destination: '/api/auth/registration'
      },
      {
        source: '/auth/forgot-password',
        destination: '/api/auth/forgot-password'
      }
    ];
  }
};
