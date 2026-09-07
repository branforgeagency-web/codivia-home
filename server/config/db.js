const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows / ISP DNS blocking MongoDB Atlas SRV records:
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if custom dns servers cannot be set
}

/**
 * Connect to MongoDB instance (local, Atlas SRV, or Atlas Direct Shards).
 */
const connectDB = async () => {
  let uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/codivia';

  // If using default local placeholder, connect directly
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 6000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
    return;
  } catch (error) {
    // If SRV lookup failed on cluster0.ytkhxbk.mongodb.net, fallback to direct shards
    if (error.message.includes('querySrv') && uri.includes('cluster0.ytkhxbk.mongodb.net')) {
      console.log('[MongoDB]: SRV lookup blocked by ISP DNS. Falling back to direct cluster shards...');
      
      const match = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@/);
      if (match) {
        const username = match[1];
        const password = match[2];
        const directUri = `mongodb://${username}:${password}@ac-muaytxd-shard-00-00.ytkhxbk.mongodb.net:27017,ac-muaytxd-shard-00-01.ytkhxbk.mongodb.net:27017,ac-muaytxd-shard-00-02.ytkhxbk.mongodb.net:27017/codivia?ssl=true&replicaSet=atlas-n3pyh9-shard-0&authSource=admin&retryWrites=true&w=majority`;

        try {
          const directConn = await mongoose.connect(directUri, {
            serverSelectionTimeoutMS: 6000,
          });
          console.log(`[MongoDB Connected via Direct Shards]: ${directConn.connection.host} (${directConn.connection.name})`);
          return;
        } catch (directError) {
          console.error(`[MongoDB Connection Error]: ${directError.message}`);
        }
      }
    } else {
      console.error(`[MongoDB Connection Error]: ${error.message}`);
    }

    console.warn('Backend will continue running in memory / offline mode for local development.');
  }
};

module.exports = connectDB;
