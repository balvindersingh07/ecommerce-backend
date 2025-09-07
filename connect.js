// connect.js
const mongoose = require('mongoose');

async function tryConnect(uri, label) {
  if (!uri) return false;
  try {
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || 'ecommerce',
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB connected (${label})`);
    return true;
  } catch (err) {
    console.warn(`⚠️ ${label} connect failed: ${err.message}`);
    return false;
  }
}

module.exports = async function connectDB() {
  // 1) Prefer REMOTE if provided (Atlas)
  const remote = process.env.MONGO_URI;
  if (await tryConnect(remote, 'remote')) return mongoose.connection;

  // 2) Then try LOCAL (if running)
  const local = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/ecommerce';
  if (await tryConnect(local, 'local')) return mongoose.connection;

  // 3) Fallback to in-memory (no external Mongo required)
  console.warn('⚠️ Using in-memory MongoDB (data resets on restart).');
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mem = await MongoMemoryServer.create();
  const memUri = mem.getUri();
  await mongoose.connect(memUri, { dbName: process.env.DB_NAME || 'ecommerce' });
  console.log('✅ MongoDB connected (memory)');

  const cleanup = async () => {
    await mongoose.disconnect();
    await mem.stop();
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  return mongoose.connection;
};
