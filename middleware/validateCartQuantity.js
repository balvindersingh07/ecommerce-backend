// middleware/validateCartQuantity.js

module.exports = (req, res, next) => {
  const { quantity } = req.body;

  // Check if quantity is a valid number greater than 0
  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({
      message: 'Quantity must be a positive number (minimum 1)',
    });
  }

  next(); // ✅ All good, proceed to controller
};
