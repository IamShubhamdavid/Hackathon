const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['environmental-data', 'blog-post'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  content: {
    type: String,
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'deforestation',
      'marine',
      'air-quality',
      'wildlife',
      'climate-change',
      'environmental-tips',
      'sustainability',
      'conservation',
      'renewable-energy'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  location: {
    latitude: {
      type: Number,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180
    },
    address: String
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  images: [{
    url: String,
    caption: String
  }],
  metadata: {
    dataType: String,
    measurements: mongoose.Schema.Types.Mixed,
    equipment: String,
    methodology: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
contributionSchema.index({ user: 1, type: 1 });
contributionSchema.index({ category: 1, status: 1 });
contributionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contribution', contributionSchema);
