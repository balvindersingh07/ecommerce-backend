const Wishlist = require('../models/wishlistModel');

// ✅ POST - Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Prevent duplicate entries (user + product)
    const exists = await Wishlist.findOne({ user: userId, productId });
    if (exists) {
      return res.status(409).json({ message: 'Product already in wishlist' });
    }

    const newItem = await Wishlist.create({ user: userId, productId });
    return res.status(201).json(newItem);
  } catch (err) {
    // Handle unique index violation (duplicate)
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Product already in wishlist' });
    }
    console.error('❌ Error adding to wishlist:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ GET - Get all wishlist items for user
const getWishlist = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const items = await Wishlist
      .find({ user: userId })
      .populate('productId'); // returns product details

    return res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching wishlist:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ DELETE - Remove specific product from wishlist (by productId in :id)
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { id: productId } = req.params;
    const deleted = await Wishlist.findOneAndDelete({ user: userId, productId });

    if (!deleted) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
    return res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (err) {
    console.error('❌ Error removing from wishlist:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist
};
