import { connectToDatabase } from '../../../utils/db/connect.js';
import Service from '../../../utils/db/models/Service.js';

// Helper function for consistent JSON responses
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/admin/services - List all services or get one by ID
export async function GET({ url }) {
  try {
    await connectToDatabase();
    const serviceId = url.searchParams.get('id');

    if (serviceId) {
      // Get a single service by ID
      const service = await Service.findById(serviceId);
      if (!service) {
        return jsonResponse({ message: 'Service not found' }, 404);
      }
      return jsonResponse(service);
    } else {
      // Get all services, sorted by the 'order' field, then title
      const services = await Service.find({}).sort({ order: 1, title: 1 });
      return jsonResponse(services);
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return jsonResponse({ message: 'Error fetching services', error: error.message }, 500);
  }
}

// POST /api/admin/services - Create a new service
export async function POST({ request }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Basic validation
    if (!data.title || !data.description) {
      return jsonResponse({ message: 'Missing required fields: Title, Description' }, 400);
    }

     // Prepare data for the model, including the optional slug
    const serviceToCreate = {
        title: data.title,
        description: data.description,
        price: data.price || null,
        duration: data.duration || null,
        image: data.image || null,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true, // Default to true if not provided
        // Include slug only if it's provided and not empty
        ...(data.slug && data.slug.trim() !== '' && { slug: data.slug.trim().toLowerCase() }),
    };

    // Create and save the new service
    const newService = new Service(serviceToCreate);
    await newService.save(); // Mongoose pre-save hook handles slug generation IF not provided here

    return jsonResponse(newService, 201); // 201 Created status
  } catch (error) {
    console.error('Error creating service:', error);
    if (error.code === 11000) {
        return jsonResponse({ message: 'Error creating service: Slug already exists. Try a different title.', error: error.message }, 409);
    }
    return jsonResponse({ message: 'Error creating service', error: error.message }, 500);
  }
}

// PUT /api/admin/services?id=<serviceId> - Update an existing service
export async function PUT({ request, url }) {
  try {
    await connectToDatabase();
    const serviceId = url.searchParams.get('id');
    if (!serviceId) {
      return jsonResponse({ message: 'Missing service ID for update' }, 400);
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

    // Find and update the service using the prepared updateData
    const updatedService = await Service.findByIdAndUpdate(serviceId, updateData, { new: true, runValidators: true });

    if (!updatedService) {
      return jsonResponse({ message: 'Service not found for update' }, 404);
    }

    return jsonResponse(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
     if (error.code === 11000) {
        return jsonResponse({ message: 'Error updating service: Slug already exists. Try a different title.', error: error.message }, 409);
    }
    return jsonResponse({ message: 'Error updating service', error: error.message }, 500);
  }
}

// DELETE /api/admin/services?id=<serviceId> - Delete a service
export async function DELETE({ url }) {
  try {
    await connectToDatabase();
    const serviceId = url.searchParams.get('id');
    if (!serviceId) {
      return jsonResponse({ message: 'Missing service ID for deletion' }, 400);
    }

    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return jsonResponse({ message: 'Service not found for deletion' }, 404);
    }

    return jsonResponse({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return jsonResponse({ message: 'Error deleting service', error: error.message }, 500);
  }
}
