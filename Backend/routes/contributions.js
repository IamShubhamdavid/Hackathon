const express = require('express');
const Contribution = require('../Models/Contribution');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Submit Environmental Data
router.post('/environmental-data', protect, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      severity,
      metadata,
      images
    } = req.body;

    const contribution = await Contribution.create({
      user: req.user._id,
      type: 'environmental-data',
      title,
      description,
      category,
      location,
      severity,
      metadata,
      images
    });

    res.status(201).json({
      success: true,
      message: 'Environmental data submitted successfully',
      data: contribution
    });

  } catch (error) {
    console.error('Submit environmental data error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during data submission'
    });
  }
});

// Submit Blog Post
router.post('/blog-posts', protect, async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      tags
    } = req.body;

    const contribution = await Contribution.create({
      user: req.user._id,
      type: 'blog-post',
      title,
      description: content.substring(0, 500) + '...', // Create description from content
      content,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    res.status(201).json({
      success: true,
      message: 'Blog post submitted successfully',
      data: contribution
    });

  } catch (error) {
    console.error('Submit blog post error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during blog submission'
    });
  }
});

// Get User's Contributions
router.get('/my-contributions', protect, async (req, res) => {
  try {
    const contributions = await Contribution.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', 'firstName lastName email');

    const stats = {
      total: contributions.length,
      environmentalData: contributions.filter(c => c.type === 'environmental-data').length,
      blogPosts: contributions.filter(c => c.type === 'blog-post').length,
      approved: contributions.filter(c => c.status === 'approved').length,
      pending: contributions.filter(c => c.status === 'pending').length
    };

    res.status(200).json({
      success: true,
      data: {
        contributions,
        stats
      }
    });

  } catch (error) {
    console.error('Get contributions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contributions'
    });
  }
});

// Get All Contributions (for admin/public view)
router.get('/all', async (req, res) => {
  try {
    const { type, category, status, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const contributions = await Contribution.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'firstName lastName userType');

    const total = await Contribution.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        contributions,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get all contributions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contributions'
    });
  }
});

module.exports = router;
