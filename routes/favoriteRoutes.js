const express = require('express');
const router = express.Router();

const {
  addToFavorites,
  getFavorites,
  removeFromFavorites
} = require('../controllers/favoriteController');

const protect = require('../middleware/authMiddleware'); // 🔐 Auth middleware
const validateFavoriteItem = require('../middleware/validateFavoriteItem'); // ✅ Validation middleware

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorites management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteItem:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - image
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 *         category:
 *           type: string
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add product to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteItem'
 *     responses:
 *       201:
 *         description: Product added to favorites
 *       400:
 *         description: Missing fields
 *       409:
 *         description: Product already in favorites
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all favorite items
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteItem'
 *       500:
 *         description: Server error
 *
 * /favorites/{id}:
 *   delete:
 *     summary: Remove product from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Favorite item ID
 *     responses:
 *       200:
 *         description: Product removed
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

// ✅ Routes with middleware
router.post('/', protect, validateFavoriteItem, addToFavorites);
router.get('/', protect, getFavorites);
router.delete('/:id', protect, removeFromFavorites);

module.exports = router;
