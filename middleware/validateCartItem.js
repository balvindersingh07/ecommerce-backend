// middleware/validateCartItem.js
module.exports = (req, res, next) => {
  const { name, price, image, category, quantity } = req.body;

  if (!name || !price || !image || !category || quantity == null) {
    return res.status(400).json({ message: 'All cart fields are required' });
  }

  if (typeof price !== 'number' || typeof quantity !== 'number') {
    return res.status(400).json({ message: 'Price and quantity must be numbers' });
  }

  next();
};
