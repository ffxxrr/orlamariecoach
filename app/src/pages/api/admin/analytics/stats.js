import { connectToDatabase } from '../../../../utils/db/connect.js';
import PageView from '../../../../utils/db/models/PageView.js';

// Helper function for consistent JSON responses
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/admin/analytics/stats - Retrieve aggregated analytics data
export async function GET({ url }) {
  try {
    await connectToDatabase();

    // Define time range (e.g., last 30 days)
    const days = parseInt(url.searchParams.get('days') || '30', 10);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // 1. Total Page Views in the period
    const totalViews = await PageView.countDocuments({ timestamp: { $gte: startDate } });

    // 2. Unique Visitors (Approximation using User Agent + potentially other factors later)
    // Note: This is a very basic approximation. Real unique visitor tracking is complex.
    // We group by userAgent for a rough estimate.
    const uniqueVisitorsPipeline = [
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: "$userAgent" } }, // Group by user agent
      { $count: "uniqueCount" }
    ];
    const uniqueVisitorsResult = await PageView.aggregate(uniqueVisitorsPipeline);
    const uniqueVisitors = uniqueVisitorsResult.length > 0 ? uniqueVisitorsResult[0].uniqueCount : 0;


    // 3. Top Pages by Views
    const topPagesPipeline = [
       { $match: { timestamp: { $gte: startDate } } },
       { $group: { _id: "$url", count: { $sum: 1 } } }, // Group by URL and count views
       { $sort: { count: -1 } }, // Sort by count descending
       { $limit: 10 } // Limit to top 10
    ];
    const topPages = await PageView.aggregate(topPagesPipeline);

    // 4. Top Referrers
     const topReferrersPipeline = [
       { $match: { timestamp: { $gte: startDate }, referrer: { $ne: null, $ne: "" } } }, // Exclude direct visits
       // Basic grouping by referrer domain (more robust parsing needed for accuracy)
       { $addFields: { referrerDomain: { $arrayElemAt: [ { $split: [ { $arrayElemAt: [ { $split: [ "$referrer", "//" ] }, 1 ] }, "/" ] }, 0 ] } } },
       { $match: { referrerDomain: { $ne: null } } }, // Filter out entries where domain extraction failed
       { $group: { _id: "$referrerDomain", count: { $sum: 1 } } },
       { $sort: { count: -1 } },
       { $limit: 10 }
    ];
    const topReferrers = await PageView.aggregate(topReferrersPipeline);


    // Combine stats into a response object
    const stats = {
      timePeriodDays: days,
      totalViews,
      uniqueVisitors, // Approximation
      topPages,
      topReferrers,
    };

    return jsonResponse(stats);

  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return jsonResponse({ message: 'Error fetching analytics stats', error: error.message }, 500);
  }
}
