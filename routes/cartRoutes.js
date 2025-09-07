const express = require('express');
const router = express.Router();

// Controllers
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartItem
} = require('../controllers/cartController');

// Middlewares
const protect = require('../middleware/authMiddleware');            // 🔐 Protect routes
const validateCartItem = require('../middleware/validateCartItem'); // ✅ For adding item
const validateCartQuantity = require('../middleware/validateCartQuantity'); // ✅ For updating quantity

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - image
 *         - category
 *         - quantity
 *       properties:
 *         name:     { type: string,  example: "iPhone 13" }
 *         price:    { type: number,  example: 999.99 }
 *         image:    { type: string,  example: "https://example.com/image.jpg" }
 *         category: { type: string,  example: "electronics" }
 *         quantity: { type: number,  example: 1 }
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CartItem' }
 *     responses:
 *       201: { description: Product added to cart }
 *       400: { description: Missing required fields }
 *       500: { description: Server error }
 *   get:
 *     summary: Get all cart items for the logged-in user
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of items in the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/CartItem' }
 *       500: { description: Server error }
 *
 * /cart/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Cart item ID
 *     responses:
 *       200: { description: Item removed }
 *       404: { description: Item not found }
 *       500: { description: Server error }
 *   put:
 *     summary: Update quantity of cart item
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity: { type: number, example: 2 }
 *     responses:
 *       200: { description: Quantity updated }
 *       400: { description: Invalid input }
 *       404: { description: Item not found }
 *       500: { description: Server error }
 *
 * /api/cart:
 *   post:
 *     summary: Add product to cart (alias)
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CartItem' }
 *     responses:
 *       201: { description: Product added to cart }
 *   get:
 *     summary: Get all cart items (alias)
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of items in the cart
 *
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove item from cart (alias)
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Item removed }
 *   put:
 *     summary: Update quantity of cart item (alias)
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity: { type: number, example: 2 }
 *     responses:
 *       200: { description: Quantity updated }
 */

// ✅ Routes
router.post('/', protect, validateCartItem, addToCart);
router.get('/', protect, getCartItems);
router.delete('/:id', protect, removeFromCart);
router.put('/:id', protect, validateCartQuantity, updateCartItem);

module.exports = router;
