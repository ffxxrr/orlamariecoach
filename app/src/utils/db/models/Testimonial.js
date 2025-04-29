import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    trim: true,
  },
  role: { // e.g., "CEO, Example Inc."
    type: String,
    trim: true,
  },
  image: { // URL or path to client's image/avatar
    type: String,
    trim: true,
  },
  rating: { // Optional star rating
    type: Number,
    min: 1,
    max: 5,
  },
  date: { // Optional date of testimonial
    type: Date,
  },
  order: { // For manual sorting
    type: Number,
    default: 0,
  },
  // Add any other fields needed for DB storage but not in content collection schema
  isVisible: { // Example: Control visibility on the public site
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Avoid recompiling the model if it already exists
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
