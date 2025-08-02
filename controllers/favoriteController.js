const Favorite = require('../models/Favorite');

// ✅ POST - Add a product to favorites
const addToFavorites = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Prevent duplicates (same name + category for same user logic can be added if needed)
    const exists = await Favorite.findOne({ name, category });

    if (exists) {
      return res.status(409).json({ message: 'Product already in favorites' });
    }

    const favorite = await Favorite.create({
      name,
      price,
      image,
      category
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.error('❌ Error adding to favorites:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET - Get all favorite products
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    res.status(200).json(favorites);
  } catch (err) {
    console.error('❌ Error fetching favorites:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ DELETE - Remove favorite by ID
const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Favorite.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    console.error('❌ Error deleting favorite:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addToFavorites,
  getFavorites,
  removeFromFavorites
};
