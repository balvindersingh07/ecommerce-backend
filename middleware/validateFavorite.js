// middleware/validateFavorite.js
module.exports = (req, res, next) => {
  const { name, price, image, category } = req.body;

  if (!name || !price || !image || !category) {
    return res.status(400).json({ message: 'All favorite fields are required' });
  }

  next();
};
