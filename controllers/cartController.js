const Cart = require('../models/Cart');

// ✅ POST - Add product to cart
const addToCart = async (req, res) => {
  try {
    const { name, price, image, category, quantity } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cartItem = new Cart({
      user: req.user._id,
      name: name.trim(),
      price,
      image: image.trim(),
      category: category.toLowerCase().trim(),
      quantity: quantity || 1
    });

    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("❌ Error adding to cart:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET - Get logged-in user's cart items
const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user._id });
    res.status(200).json(items);
  } catch (err) {
    console.error("❌ Error fetching cart items:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ DELETE - Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in your cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("❌ Error removing from cart:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ PUT - Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    const item = await Cart.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { quantity },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in your cart" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error("❌ Error updating cart item:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartItem
};
