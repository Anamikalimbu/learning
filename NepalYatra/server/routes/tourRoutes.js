const express = require('express');
const { getTours, getTour, createTour } = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../utils/uploadConfig');

const router = express.Router();

router
  .route('/')
  .get(getTours)
  .post(protect, authorize('Admin', 'Provider'), upload.array('images', 5), createTour);

router
  .route('/:id')
  .get(getTour);

module.exports = router;
