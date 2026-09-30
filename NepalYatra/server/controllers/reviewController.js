const Review = require('../models/Review');

// @desc    Get reviews for a destination
// @route   GET /api/destinations/:destinationId/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ destination: req.params.destinationId }).populate({
      path: 'user',
      select: 'name profileImage'
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Add review
// @route   POST /api/destinations/:destinationId/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    req.body.destination = req.params.destinationId;
    req.body.user = req.user.id;

    const review = await Review.create(req.body);

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    // MongoError 11000 is duplicate key (user already reviewed)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'You have already reviewed this destination' });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to update review' });
    }

    await review.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
