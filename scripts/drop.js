// scripts/drop.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/ecommerce';
    const dbName = process.env.DB_NAME || 'ecommerce';
    await mongoose.connect(uri, { dbName });
    await mongoose.connection.dropDatabase();
    console.log('🧹 Dropped DB:', dbName);
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error('❌ Drop error:', e.message);
    process.exit(1);
  }
})();
