const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
