const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// 🔒 Prevent duplicate wishlist entries for same user-product
wishlistSchema.index({ user: 1, productId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
