const Hotel = require('../models/Hotel');

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
exports.getHotels = async (req, res, next) => {
  try {
    let query;

    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit', 'keyword', 'province'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Hotel.find(JSON.parse(queryStr)).populate('destination', 'name province');

    // Keyword search
    if (req.query.keyword) {
      query = query.find({
        name: { $regex: req.query.keyword, $options: 'i' }
      });
    }

    const hotels = await query;

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single hotel
// @route   GET /api/hotels/:id
// @access  Public
exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('destination', 'name province description');

    if (!hotel) {
      return res.status(404).json({ success: false, error: 'Hotel not found' });
    }

    res.status(200).json({
      success: true,
      data: hotel
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
