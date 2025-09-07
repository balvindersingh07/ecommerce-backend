// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/ecommerce';
const dbName = process.env.DB_NAME || 'ecommerce';

const products = [
  { name: 'Wireless Mouse',    price: 29.99, image: 'https://picsum.photos/seed/mouse/600/400',    category: 'electronics' },
  { name: 'Gaming Keyboard',   price: 79.99, image: 'https://picsum.photos/seed/keyboard/600/400', category: 'electronics' },
  { name: 'Coffee Mug',        price: 9.99,  image: 'https://picsum.photos/seed/mug/600/400',      category: 'home' },
  { name: 'Cotton T-Shirt',    price: 14.99, image: 'https://picsum.photos/seed/tshirt/600/400',   category: 'fashion' },
];

(async () => {
  try {
    await mongoose.connect(uri, { dbName });
    console.log('✅ Connected to', uri, 'db:', dbName);

    const col = mongoose.connection.collection('products');
    await col.deleteMany({});
    const result = await col.insertMany(products);
    console.log(`🌱 Seeded products: ${result.insertedCount}`);

    await col.createIndex({ category: 1 });
    await col.createIndex({ name: 'text' });

    await mongoose.disconnect();
    console.log('🎉 Done.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
})();
