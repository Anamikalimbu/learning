const express = require('express');
const { getHotels, getHotel } = require('../controllers/hotelController');

const router = express.Router();

router
  .route('/')
  .get(getHotels);

router
  .route('/:id')
  .get(getHotel);

module.exports = router;
