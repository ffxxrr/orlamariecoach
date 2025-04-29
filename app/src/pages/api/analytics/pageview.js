import { connectToDatabase } from '../../../utils/db/connect.js';
import PageView from '../../../utils/db/models/PageView.js';

// Helper function for consistent JSON responses
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST /api/analytics/pageview - Record a page view event
export async function POST({ request }) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.url || !data.timestamp) {
      return jsonResponse({ message: 'Missing required fields: url, timestamp' }, 400);
    }

    await connectToDatabase();

    // Extract user agent from request headers
    const userAgent = request.headers.get('user-agent') || '';

    // Create and save the new page view record
    const newPageView = new PageView({
      url: data.url,
      referrer: data.referrer || '',
      screenWidth: data.screenWidth,
      timestamp: new Date(data.timestamp), // Ensure timestamp is a Date object
      userAgent: userAgent,
    });
    await newPageView.save();

    // Return a minimal success response (201 Created or 204 No Content)
    // Avoid sending back the saved data to minimize response size
    return new Response(null, { status: 204 });

  } catch (error) {
    console.error('Error recording page view:', error);
    // Avoid sending detailed errors back to the client for analytics endpoints
    return jsonResponse({ message: 'Error recording analytics data' }, 500);
  }
}

// Optional: Handle GET or other methods if needed (e.g., return 405 Method Not Allowed)
export async function GET() {
    return jsonResponse({ message: 'Method Not Allowed' }, 405);
}
