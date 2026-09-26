const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const Hotel = require('../models/Hotel');

// @desc    Create new booking (Mock)
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { itemModel, itemId, startDate, endDate, travelers } = req.body;

    let item;
    if (itemModel === 'Tour') {
      item = await Tour.findById(itemId);
    } else {
      item = await Hotel.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ success: false, error: `${itemModel} not found` });
    }

    // Calculate mock price
    const pricePerUnit = itemModel === 'Tour' ? item.price : item.pricePerNight;
    const days = itemModel === 'Tour' ? 1 : Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = pricePerUnit * travelers * days;

    const booking = await Booking.create({
      user: req.user.id,
      itemModel,
      item: itemId,
      provider: item.provider,
      startDate,
      endDate: itemModel === 'Hotel' ? endDate : undefined,
      travelers,
      totalPrice,
      status: 'Pending'
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('item');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
