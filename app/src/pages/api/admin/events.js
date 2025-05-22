import { connectToDatabase } from '../../../utils/db/connect';
import Event from '../../../utils/db/models/Event';
import { verifyAdminSession } from '../../../utils/auth/session'; // Assuming session verification utility

export const prerender = false; // Ensure this is treated as a dynamic API route

// Helper function for sending responses
function createResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET: Fetch all events or a single event by ID
export async function GET({ request }) {
  const isAdmin = await verifyAdminSession(request);
  if (!isAdmin) {
    return createResponse({ message: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    await connectToDatabase();
    if (id) {
      const event = await Event.findById(id);
      if (!event) {
        return createResponse({ message: 'Event not found' }, 404);
      }
      return createResponse(event, 200);
    } else {
      const events = await Event.find({}).sort({ date: -1 }); // Sort by date descending
      return createResponse(events, 200);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    // Distinguish between validation errors and server errors
    if (error.name === 'ValidationError') {
        return createResponse({ message: 'Validation Error', errors: error.errors }, 400);
    } else if (error.name === 'CastError') {
        return createResponse({ message: 'Invalid ID format' }, 400);
    }
    return createResponse({ message: 'Internal Server Error' }, 500);
  }
}

// POST: Create a new event
export async function POST({ request }) {
  const isAdmin = await verifyAdminSession(request);
  if (!isAdmin) {
    return createResponse({ message: 'Unauthorized' }, 401);
  }

  try {
    const data = await request.json();
    await connectToDatabase();

    // Basic validation (Mongoose schema handles more)
    if (!data.name || !data.date || !data.location || !data.type || !data.description) {
        return createResponse({ message: 'Missing required fields' }, 400);
    }

    const newEvent = new Event(data);
    await newEvent.save();
    return createResponse(newEvent, 201); // 201 Created
  } catch (error) {
    console.error('Error creating event:', error);
    if (error.name === 'ValidationError') {
        return createResponse({ message: 'Validation Error', errors: error.errors }, 400);
    }
    return createResponse({ message: 'Internal Server Error' }, 500);
  }
}

// PUT: Update an existing event by ID
export async function PUT({ request }) {
  const isAdmin = await verifyAdminSession(request);
  if (!isAdmin) {
    return createResponse({ message: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return createResponse({ message: 'Event ID is required in query parameters' }, 400);
  }

  try {
    const data = await request.json();
    await connectToDatabase();

    // Ensure slug is not directly updatable if name isn't changing, let pre-hook handle it
    delete data.slug;

    const updatedEvent = await Event.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedEvent) {
      return createResponse({ message: 'Event not found' }, 404);
    }
    return createResponse(updatedEvent, 200);
  } catch (error) {
    console.error('Error updating event:', error);
     if (error.name === 'ValidationError') {
        return createResponse({ message: 'Validation Error', errors: error.errors }, 400);
    } else if (error.name === 'CastError') {
        return createResponse({ message: 'Invalid ID format' }, 400);
    }
    return createResponse({ message: 'Internal Server Error' }, 500);
  }
}

// DELETE: Delete an event by ID
export async function DELETE({ request }) {
  const isAdmin = await verifyAdminSession(request);
  if (!isAdmin) {
    return createResponse({ message: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return createResponse({ message: 'Event ID is required in query parameters' }, 400);
  }

  try {
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return createResponse({ message: 'Event not found' }, 404);
    }
    return createResponse({ message: 'Event deleted successfully' }, 200);
  } catch (error) {
    console.error('Error deleting event:', error);
    if (error.name === 'CastError') {
        return createResponse({ message: 'Invalid ID format' }, 400);
    }
    return createResponse({ message: 'Internal Server Error' }, 500);
  }
}
