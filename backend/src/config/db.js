const config = require('./config');
const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    const dbURL = config.database.url;

    // Connect to MongoDB
    await mongoose.connect(dbURL)

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = {
  connectDatabase,
};
