import mongoose from 'mongoose';

const CoachProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the profile section.'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  bio: {
    type: String,
    required: [true, 'Please provide the main bio content.']
  },
  imageUrl: {
    type: String,
    // Optional: Add validation if needed, e.g., match URL pattern
  },
  // Add timestamps if you want to track creation/update times
  // timestamps: true
});

// Ensure only one profile document exists (Singleton pattern)
// We can enforce this at the application level when creating/updating
// Or potentially use a unique index if we add a specific identifier field.

// Use mongoose.models to prevent overwriting the model during HMR
export default mongoose.models.CoachProfile || mongoose.model('CoachProfile', CoachProfileSchema);
