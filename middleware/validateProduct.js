// middleware/validateProduct.js

module.exports = (req, res, next) => {
  let { name, price, image, category } = req.body;

  // Auto-trim strings
  if (typeof name === 'string') name = name.trim();
  if (typeof image === 'string') image = image.trim();
  if (typeof category === 'string') category = category.trim();

  // Required field checks
  const errors = [];

  if (!name) errors.push("Name is required and must be a non-empty string");
  if (!image) errors.push("Image is required and must be a non-empty string");
  if (!category) errors.push("Category is required and must be a non-empty string");
  if (price === undefined || price === null || typeof price !== 'number' || isNaN(price) || price < 0) {
    errors.push("Price is required and must be a valid positive number");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  // ✅ Sanitize + pass clean data forward
  req.body.name = name;
  req.body.image = image;
  req.body.category = category;
  req.body.price = price;

  next();
};
