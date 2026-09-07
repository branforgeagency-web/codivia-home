const mongoose = require('mongoose');

/**
 * Connect to MongoDB instance (local or MongoDB Atlas / AWS DocumentDB).
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codivia', {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.warn('Backend will continue running in memory / offline mode for local development.');
  }
};

module.exports = connectDB;
