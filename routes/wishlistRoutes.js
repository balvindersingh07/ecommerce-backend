const express = require('express');
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');

const protect = require('../middleware/authMiddleware');
const validateWishlistItem = require('../middleware/validateWishlistItem'); // ✅ Middleware

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorites (wishlist) management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteItem:
 *       type: object
 *       required: [productId]
 *       properties:
 *         productId:
 *           type: string
 *           example: "66f0abc1234def5678901234"
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a product to favorites
 *     tags: [Favorites]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteItem'
 *     responses:
 *       201: { description: Product added to favorites }
 *       400: { description: Invalid input or already exists }
 *       401: { description: Unauthorized }
 *   get:
 *     summary: Get all favorites for the logged-in user
 *     tags: [Favorites]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: List of favorite items }
 *       401: { description: Unauthorized }
 *       500: { description: Server error }
 *
 * /favorites/{id}:
 *   delete:
 *     summary: Remove a product from favorites
 *     tags: [Favorites]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Favorite item ID
 *     responses:
 *       200: { description: Product removed from favorites }
 *       404: { description: Product not found in favorites }
 *       401: { description: Unauthorized }
 *
 * /api/favorites:
 *   post:
 *     summary: Add a product to favorites (alias)
 *     tags: [Favorites]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteItem'
 *     responses:
 *       201: { description: Product added to favorites }
 *   get:
 *     summary: Get all favorites (alias)
 *     tags: [Favorites]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: List of favorite items }
 *
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove a product from favorites (alias)
 *     tags: [Favorites]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Product removed from favorites }
 */

// 🔒 Protected Routes with validation
router.post('/', protect, validateWishlistItem, addToWishlist);
router.get('/', protect, getWishlist);
router.delete('/:id', protect, removeFromWishlist);

module.exports = router;
