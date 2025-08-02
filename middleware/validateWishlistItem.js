// validateWishlistItem.js
module.exports = function (req, res, next) {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'productId is required' });
  }
  next();
};
