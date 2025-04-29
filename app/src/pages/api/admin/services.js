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

    // Create and save the new service
    const newService = new Service(data);
    await newService.save(); // Mongoose handles slug generation via schema hook

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
    // delete data.slug; // Optionally prevent direct slug update

    // Find and update the service
    const updatedService = await Service.findByIdAndUpdate(serviceId, data, { new: true, runValidators: true });

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
