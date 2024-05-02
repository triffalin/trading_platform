module.exports = {
  async rewrites() {
    return [
      {
        source: '/auth/registration',
        destination: '/api/auth/registration'
      }
    ];
  }
};
