import { connectToDatabase } from '../../../utils/db/connect.js';
import Testimonial from '../../../utils/db/models/Testimonial.js';

// Helper function for consistent JSON responses
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/admin/testimonials - List all testimonials or get one by ID
export async function GET({ url }) {
  try {
    await connectToDatabase();
    const testimonialId = url.searchParams.get('id');

    if (testimonialId) {
      // Get a single testimonial by ID
      const testimonial = await Testimonial.findById(testimonialId);
      if (!testimonial) {
        return jsonResponse({ message: 'Testimonial not found' }, 404);
      }
      return jsonResponse(testimonial);
    } else {
      // Get all testimonials, sorted by the 'order' field, then creation date
      const testimonials = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
      return jsonResponse(testimonials);
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return jsonResponse({ message: 'Error fetching testimonials', error: error.message }, 500);
  }
}

// POST /api/admin/testimonials - Create a new testimonial
export async function POST({ request }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Basic validation
    if (!data.clientName || !data.quote) {
      return jsonResponse({ message: 'Missing required fields: Client Name, Quote' }, 400);
    }

    // Create and save the new testimonial
    const newTestimonial = new Testimonial(data);
    await newTestimonial.save();

    return jsonResponse(newTestimonial, 201); // 201 Created status
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return jsonResponse({ message: 'Error creating testimonial', error: error.message }, 500);
  }
}

// PUT /api/admin/testimonials?id=<testimonialId> - Update an existing testimonial
export async function PUT({ request, url }) {
  try {
    await connectToDatabase();
    const testimonialId = url.searchParams.get('id');
    if (!testimonialId) {
      return jsonResponse({ message: 'Missing testimonial ID for update' }, 400);
    }

    const data = await request.json();

    // Find and update the testimonial
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, data, { new: true, runValidators: true });

    if (!updatedTestimonial) {
      return jsonResponse({ message: 'Testimonial not found for update' }, 404);
    }

    return jsonResponse(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return jsonResponse({ message: 'Error updating testimonial', error: error.message }, 500);
  }
}

// DELETE /api/admin/testimonials?id=<testimonialId> - Delete a testimonial
export async function DELETE({ url }) {
  try {
    await connectToDatabase();
    const testimonialId = url.searchParams.get('id');
    if (!testimonialId) {
      return jsonResponse({ message: 'Missing testimonial ID for deletion' }, 400);
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonialId);

    if (!deletedTestimonial) {
      return jsonResponse({ message: 'Testimonial not found for deletion' }, 404);
    }

    return jsonResponse({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return jsonResponse({ message: 'Error deleting testimonial', error: error.message }, 500);
  }
}
