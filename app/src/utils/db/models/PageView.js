import mongoose from 'mongoose';

const pageViewSchema = new mongoose.Schema({
  url: { // The path of the page viewed (e.g., /services/career-coaching)
    type: String,
    required: true,
    trim: true,
    index: true, // Index for faster querying by URL
  },
  referrer: { // The referring URL
    type: String,
    trim: true,
  },
  userAgent: { // Browser/device information
    type: String,
    trim: true,
  },
  screenWidth: { // Screen width for basic device info
    type: Number,
  },
  timestamp: { // When the page view occurred
    type: Date,
    required: true,
    default: Date.now,
    index: true, // Index for time-based queries
  },
  // Optional: Add user ID if tracking logged-in users, session ID, IP hash, etc.
}, {
  timestamps: { createdAt: 'timestamp', updatedAt: false } // Use 'timestamp' for creation time
});

// Avoid recompiling the model if it already exists
const PageView = mongoose.models.PageView || mongoose.model('PageView', pageViewSchema);

export default PageView;
