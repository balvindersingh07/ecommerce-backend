const express = require('express');
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');

const protect = require('../middleware/authMiddleware');
const validateWishlistItem = require('../middleware/validateWishlistItem'); // ✅ Middleware added

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add a product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *       400:
 *         description: Invalid input or already exists
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all wishlist items for the logged-in user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist items
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /wishlist/{id}:
 *   delete:
 *     summary: Remove a product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       404:
 *         description: Product not found in wishlist
 *       401:
 *         description: Unauthorized
 */

// 🔒 Protected Routes with validation
router.post('/', protect, validateWishlistItem, addToWishlist);
router.get('/', protect, getWishlist);
router.delete('/:id', protect, removeFromWishlist);

module.exports = router;
