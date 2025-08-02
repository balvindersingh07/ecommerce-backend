const Product = require('../models/Product');

// ✅ GET all products with filters
const getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = category.toLowerCase().trim();
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching filtered products:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("❌ Error fetching product by ID:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase().trim();
    const products = await Product.find({ category });

    if (!products.length) {
      return res.status(404).json({ message: `No products found in '${category}' category` });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products by category:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ POST create new product
const createProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name: name.trim(),
      price,
      image: image.trim(),
      category: category.toLowerCase().trim()
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ PUT update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ DELETE product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
