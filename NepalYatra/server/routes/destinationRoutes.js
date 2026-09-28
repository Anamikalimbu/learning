const express = require('express');
const { getDestinations, getDestination, createDestination, updateDestination, deleteDestination } = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../utils/uploadConfig');

// Include other resource routers
const { destinationReviewRouter } = require('./reviewRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:destinationId/reviews', destinationReviewRouter);

router
  .route('/')
  .get(getDestinations)
  .post(protect, authorize('Admin', 'Provider'), upload.array('images', 5), createDestination);

router
  .route('/:id')
  .get(getDestination)
  .put(protect, authorize('Admin', 'Provider'), upload.array('images', 5), updateDestination)
  .delete(protect, authorize('Admin'), deleteDestination);

module.exports = router;
