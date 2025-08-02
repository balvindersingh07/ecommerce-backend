module.exports = function (req, res, next) {
  const { name, price, image, category } = req.body;

  if (!name || !price || !image || !category) {
    return res.status(400).json({ message: 'All fields are required: name, price, image, category' });
  }

  next();
};
