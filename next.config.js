module.exports = {
  async rewrites() {
    return [
      {
        source: '/auth//login',
        destination: '/api/auth//login',
        source: '/auth/registration',
        destination: '/api/auth/registration',
        source: '/auth/forgot-password',
        destination: '/api/auth/forgot-password'
      }
    ];
  }
};
