import mongoose from 'mongoose';
import slugify from 'slugify';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    // We'll generate this automatically before saving if not provided
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['Workshop', 'Retreat', 'Webinar', 'Talk', 'In-Person', 'Online', 'Other'], // Example types, adjust as needed
    default: 'Workshop',
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
  },
  image: { // Optional image URL
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Pre-save hook to generate slug from name if not provided or changed
eventSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  // Update the updatedAt field
  this.updatedAt = Date.now();
  next();
});

// Pre-update hook for findOneAndUpdate to update the updatedAt field
eventSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  // If name is updated, update the slug too
  const update = this.getUpdate();
  if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});


// Avoid recompiling the model if it already exists
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
