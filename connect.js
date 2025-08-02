const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false); // Optional: silence deprecation warning

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
