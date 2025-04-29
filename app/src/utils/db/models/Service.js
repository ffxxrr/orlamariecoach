import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: { // Adding a slug field for URLs
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: { // e.g., "$150 per session", "Contact for quote"
    type: String,
    trim: true,
  },
  duration: { // e.g., "60 minutes", "3-month program"
    type: String,
    trim: true,
  },
  image: { // URL or path to a representative image
    type: String,
    trim: true,
  },
  order: { // For controlling display order on listing pages
    type: Number,
    default: 0,
  },
  isActive: { // To easily enable/disable services
    type: Boolean,
    default: true,
  },
  // You might add fields like 'targetAudience', 'keyBenefits', etc. later
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Add pre-save hook to generate slug if not provided
serviceSchema.pre('save', function(next) {
  if (!this.slug && this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  next();
});

// Avoid recompiling the model if it already exists
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;
