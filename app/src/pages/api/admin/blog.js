import { connectToDatabase } from '../../../utils/db/connect.js';
import BlogPost from '../../../utils/db/models/BlogPost.js';


// Helper function for consistent JSON responses
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/admin/blog - List all blog posts or get one by ID
export async function GET({ url }) {
  // loadEnv(); // Removed - loading is now at module top
  try {
    await connectToDatabase();
    const postId = url.searchParams.get('id');

    if (postId) {
      // Get a single post by ID
      const post = await BlogPost.findById(postId);
      if (!post) {
        return jsonResponse({ message: 'Blog post not found' }, 404);
      }
      return jsonResponse(post);
    } else {
      // Get all posts, sorted by most recent publication date
      const posts = await BlogPost.find({}).sort({ pubDate: -1 });
      return jsonResponse(posts);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return jsonResponse({ message: 'Error fetching blog posts', error: error.message }, 500);
  }
}

// POST /api/admin/blog - Create a new blog post
export async function POST({ request }) {
  // loadEnv(); // Removed - loading is now at module top
  try {
    await connectToDatabase();
    const data = await request.json();

    // Basic validation (can be expanded based on model requirements)
    if (!data.title || !data.description || !data.content || !data.category) {
      return jsonResponse({ message: 'Missing required fields: Title, Description, Content, Category' }, 400);
    }

    // Prepare data for the model, including the optional slug
    const postToCreate = {
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        image: data.image || null, // Handle optional image
        // Include slug only if it's provided and not empty
        ...(data.slug && data.slug.trim() !== '' && { slug: data.slug.trim().toLowerCase() }),
    };


    // Create and save the new blog post
    const newPost = new BlogPost(postToCreate);
    await newPost.save(); // Mongoose pre-save hook handles slug generation IF not provided here

    return jsonResponse(newPost, 201); // 201 Created status
  } catch (error) {
    console.error('Error creating blog post:', error);
    // Handle potential duplicate slug error (code 11000)
    if (error.code === 11000) {
        return jsonResponse({ message: 'Error creating blog post: Slug already exists. Try a different title.', error: error.message }, 409); // 409 Conflict
    }
    return jsonResponse({ message: 'Error creating blog post', error: error.message }, 500);
  }
}

// PUT /api/admin/blog?id=<postId> - Update an existing blog post
export async function PUT({ request, url }) {
  // loadEnv(); // Removed - loading is now at module top
  try {
    await connectToDatabase();
    const postId = url.searchParams.get('id');
    if (!postId) {
      return jsonResponse({ message: 'Missing blog post ID for update' }, 400);
    }

    const data = await request.json();

    // Prepare update data, handling the slug explicitly
    const updateData = { ...data }; // Copy incoming data

    // If slug is provided and not empty, use it (and lowercase it)
    if (data.slug && data.slug.trim() !== '') {
        updateData.slug = data.slug.trim().toLowerCase();
    } else {
        // If slug is empty or not provided, remove it from updateData
        // This allows the pre-save hook to potentially regenerate it based on title change
        delete updateData.slug;
    }

    // Find and update the post using the prepared updateData
    // { new: true } returns the updated document
    // { runValidators: true } ensures schema validation rules are applied on update
    const updatedPost = await BlogPost.findByIdAndUpdate(postId, updateData, { new: true, runValidators: true });

    if (!updatedPost) {
      return jsonResponse({ message: 'Blog post not found for update' }, 404);
    }

    return jsonResponse(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
     if (error.code === 11000) {
        return jsonResponse({ message: 'Error updating blog post: Slug already exists. Try a different title.', error: error.message }, 409);
    }
    return jsonResponse({ message: 'Error updating blog post', error: error.message }, 500);
  }
}

// DELETE /api/admin/blog?id=<postId> - Delete a blog post
export async function DELETE({ url }) {
  // loadEnv(); // Removed - loading is now at module top
  try {
    await connectToDatabase();
    const postId = url.searchParams.get('id');
    if (!postId) {
      return jsonResponse({ message: 'Missing blog post ID for deletion' }, 400);
    }

    const deletedPost = await BlogPost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return jsonResponse({ message: 'Blog post not found for deletion' }, 404);
    }

    return jsonResponse({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return jsonResponse({ message: 'Error deleting blog post', error: error.message }, 500);
  }
}
