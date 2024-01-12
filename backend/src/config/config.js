// config.js

module.exports = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 5000,
  },
  database: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/mydatabase',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  },
  featureFlags: {
    enableFeatureX: process.env.ENABLE_FEATURE_X === 'true',
    enableFeatureY: process.env.ENABLE_FEATURE_Y === 'true',
  },
};
