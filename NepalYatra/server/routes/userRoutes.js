const express = require('express');
const { addToWishlist, removeFromWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/wishlist/:destinationId', protect, addToWishlist);
router.delete('/wishlist/:destinationId', protect, removeFromWishlist);

module.exports = router;
