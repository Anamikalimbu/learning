const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a hotel name'],
    trim: true,
  },
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: 'Destination',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please add base price per night']
  },
  amenities: {
    type: [String],
    default: []
  },
  rooms: [{
    type: { type: String, enum: ['Single', 'Double', 'Suite', 'Family'] },
    capacity: Number,
    price: Number,
    availableCount: Number
  }],
  images: {
    type: [String],
    default: []
  },
  provider: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hotel', HotelSchema);
