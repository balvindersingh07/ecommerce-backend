const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
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
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
