// connect.js
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME || undefined;

  if (!uri) throw new Error('MONGO_URI not set.');

  // Mongoose recommended options
  const opts = {
    dbName,
    autoIndex: true,
    serverSelectionTimeoutMS: 10000,
  };

  await mongoose.connect(uri, opts);
  const db = mongoose.connection;

  db.on('connected', () => {
    console.log(`🗄️  MongoDB connected ${dbName ? `(${dbName})` : ''}`);
  });
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  db.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  return db;
};
