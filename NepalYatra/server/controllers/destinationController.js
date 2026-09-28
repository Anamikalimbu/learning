const Destination = require('../models/Destination');
const fs = require('fs');
const path = require('path');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let parsedQuery = JSON.parse(queryStr);

    // Keyword Search across name and description
    if (req.query.keyword) {
      const keyword = req.query.keyword;
      parsedQuery = {
        ...parsedQuery,
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      };
      delete parsedQuery.keyword;
    }

    query = Destination.find(parsedQuery);

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Destination.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const destinations = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: destinations.length,
      pagination,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ success: false, error: 'Destination not found' });
    }

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private (Admin, Provider)
exports.createDestination = async (req, res) => {
  try {
    // Add uploaded images to body
    if (req.files) {
      req.body.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Parse array fields if they come as strings
    if (req.body.attractions && typeof req.body.attractions === 'string') {
      req.body.attractions = req.body.attractions.split(',').map(item => item.trim());
    }
    if (req.body.activities && typeof req.body.activities === 'string') {
      req.body.activities = req.body.activities.split(',').map(item => item.trim());
    }

    const destination = await Destination.create(req.body);

    res.status(201).json({ success: true, data: destination });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private (Admin, Provider)
exports.updateDestination = async (req, res) => {
  try {
    let destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ success: false, error: 'Destination not found' });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      req.body.images = [...destination.images, ...newImages];
    }

    // Parse array fields if they come as strings
    if (req.body.attractions && typeof req.body.attractions === 'string') {
      req.body.attractions = req.body.attractions.split(',').map(item => item.trim());
    }
    if (req.body.activities && typeof req.body.activities === 'string') {
      req.body.activities = req.body.activities.split(',').map(item => item.trim());
    }

    destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private (Admin)
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ success: false, error: 'Destination not found' });
    }

    // Optional: Delete images from filesystem
    if (destination.images && destination.images.length > 0) {
      destination.images.forEach(img => {
        const filePath = path.join(__dirname, '..', img);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await destination.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
