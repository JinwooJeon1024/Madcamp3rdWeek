// config.js

module.exports = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 5000,
  },
  database: {
    url: process.env.DB_URL || 'mongodb+srv://richie4:10244854s@cluster0.32z58i2.mongodb.net/Week3',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  },
  featureFlags: {
    enableFeatureX: process.env.ENABLE_FEATURE_X === 'true',
    enableFeatureY: process.env.ENABLE_FEATURE_Y === 'true',
  },
};
