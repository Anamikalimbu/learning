const express = require('express');
const { getReviews, addReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true }); // Important for getting :destinationId from parent router

router
  .route('/')
  .get(getReviews)
  .post(protect, addReview);

// The delete route handles /api/reviews/:id directly, not nested under destination
const baseRouter = express.Router();
baseRouter.delete('/:id', protect, deleteReview);

module.exports = { destinationReviewRouter: router, reviewRouter: baseRouter };
