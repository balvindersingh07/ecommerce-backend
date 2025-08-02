// middleware/validateWishlist.js
module.exports = (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  next();
};
