const Wishlist = require('../models/wishlistModel');

// ✅ POST - Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Prevent duplicate entries
    const exists = await Wishlist.findOne({ userId: req.user._id, productId });
    if (exists) {
      return res.status(409).json({ message: 'Product already in wishlist' });
    }

    const newItem = await Wishlist.create({
      userId: req.user._id,
      productId
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error('❌ Error adding to wishlist:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ GET - Get all wishlist items for user
const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.user._id }).populate('productId');
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching wishlist:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ DELETE - Remove specific product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const deleted = await Wishlist.findOneAndDelete({
      userId: req.user._id,
      productId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (err) {
    console.error('❌ Error removing from wishlist:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist
};
