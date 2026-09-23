const User = require('../models/User');

// @desc    Add destination to wishlist
// @route   POST /api/users/wishlist/:destinationId
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.wishlist.includes(req.params.destinationId)) {
      return res.status(400).json({ success: false, error: 'Destination already in wishlist' });
    }

    user.wishlist.push(req.params.destinationId);
    await user.save();

    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Remove destination from wishlist
// @route   DELETE /api/users/wishlist/:destinationId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.destinationId
    );
    
    await user.save();

    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
