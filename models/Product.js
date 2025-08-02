const mongoose = require('mongoose');

const allowedCategories = [
  'electronics',
  'fashion',
  'home',
  'books',
  'sports',
  'toys',
  'others'
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name must be under 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      lowercase: true,
      trim: true,
      enum: {
        values: allowedCategories,
        message: 'Category must be one of: ' + allowedCategories.join(', ')
      }
    }
  },
  {
    timestamps: true // ➕ Adds createdAt & updatedAt fields
  }
);

// Optional index for faster category queries
productSchema.index({ category: 1 });

// ✅ Create and export the model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
