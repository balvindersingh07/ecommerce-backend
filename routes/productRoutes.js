// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const validateProduct = require('../middleware/validateProduct');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required: [name, price, image, category]
 *       properties:
 *         name: { type: string, example: "Wireless Mouse" }
 *         price: { type: number, example: 29.99 }
 *         image: { type: string, example: "/images/mouse.jpg" }
 *         category: { type: string, example: "electronics" }
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Product' }
 *     responses:
 *       201:
 *         description: Product created
 */

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category (explicit path)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: List of products in the category
 */

/**
 * @swagger
 * /products/{category}:
 *   get:
 *     summary: Get products by category (guideline alias e.g., /products/electronics)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: List of products in the category
 */

/**
 * @swagger
 * /products/id/{id}:
 *   get:
 *     summary: Get a product by ID (prefixed path to avoid conflicts)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Product retrieved
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Product' }
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted
 */

// ---------- Routes (order matters) ----------
router.get('/', getAllProducts);

// ID routes FIRST & prefixed -> no regex needed, no clashes
router.get('/id/:id', getProductById);
router.put('/id/:id', validateProduct, updateProduct);
router.delete('/id/:id', deleteProduct);

// Explicit category path
router.get('/category/:category', getProductsByCategory);

// Guideline alias: /products/:category (MUST be last)
router.get('/:category', getProductsByCategory);

// Create
router.post('/', validateProduct, createProduct);

module.exports = router;
