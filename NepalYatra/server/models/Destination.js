const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a destination name'],
    trim: true,
    unique: true
  },
  province: {
    type: String,
    required: [true, 'Please select a province'],
    enum: [
      'Koshi', 
      'Madhesh', 
      'Bagmati', 
      'Gandaki', 
      'Lumbini', 
      'Karnali', 
      'Sudurpashchim'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  images: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Trekking', 
      'Heritage', 
      'Wildlife', 
      'Adventure', 
      'Leisure'
    ]
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  bestSeason: {
    type: String
  },
  attractions: {
    type: [String],
    default: []
  },
  activities: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Destination', DestinationSchema);
