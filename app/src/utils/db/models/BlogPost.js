import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: { // Adding a slug field, useful for URLs, can be generated from title
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
  content: { // Adding a field for the main blog content (Markdown or HTML)
    type: String,
    required: true,
  },
  pubDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedDate: { // Adding an updated date field
    type: Date,
    default: Date.now,
  },
  image: { // URL or path to the featured image
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [{ // Adding tags for better categorization
    type: String,
    trim: true,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  // You might add author, status (draft/published), etc. later
}, {
  timestamps: { createdAt: 'pubDate', updatedAt: 'updatedDate' } // Use Mongoose timestamps
});

// Add pre-save hook to generate slug if not provided (optional but recommended)
blogPostSchema.pre('save', function(next) {
  if (!this.slug && this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  // Update the updatedDate timestamp
  this.updatedDate = new Date();
  next();
});

// Avoid recompiling the model if it already exists
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
