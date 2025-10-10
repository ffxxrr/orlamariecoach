'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter
} from 'lucide-react';

interface Visitor {
  id: string;
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  pageviews: number;
  sessions: number;
  deviceType: string;
  browser: string;
  country: string;
  city?: string;
  isReturning: boolean;
  totalDuration: number; // in seconds
}

interface VisitorsData {
  visitors: Visitor[];
  totalCount: number;
  newVisitors: number;
  returningVisitors: number;
  avgSessionDuration: number;
}

export default function VisitorsPage() {
  const [visitorsData, setVisitorsData] = useState<VisitorsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, new, returning
  const [sortBy, setSortBy] = useState('lastSeen'); // lastSeen, firstSeen, pageviews
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    fetchVisitorsData();
  }, [currentPage, filterBy, sortBy]);

  const fetchVisitorsData = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would fetch from /api/admin/visitors
      // For now, we'll simulate visitor data
      const mockVisitors: Visitor[] = Array.from({ length: 50 }, (_, i) => {
        const countries = ['Ireland', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'France'];
        const cities = ['Dublin', 'Cork', 'London', 'Belfast', 'New York', 'Toronto', 'Sydney', 'Berlin', 'Paris'];
        const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
        const devices = ['desktop', 'mobile', 'tablet'];
        
        const firstSeen = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within last 30 days
        const lastSeen = new Date(firstSeen.getTime() + Math.random() * (Date.now() - firstSeen.getTime()));
        const isReturning = Math.random() > 0.6;
        
        return {
          id: (i + 1).toString(),
          visitorId: `visitor_${i + 1}`,
          firstSeen: firstSeen.toISOString(),
          lastSeen: lastSeen.toISOString(),
          pageviews: Math.floor(Math.random() * 20) + 1,
          sessions: Math.floor(Math.random() * 5) + 1,
          deviceType: devices[Math.floor(Math.random() * devices.length)],
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          country: countries[Math.floor(Math.random() * countries.length)],
          city: Math.random() > 0.3 ? cities[Math.floor(Math.random() * cities.length)] : undefined,
          isReturning,
          totalDuration: Math.floor(Math.random() * 1800) + 60 // 1-30 minutes
        };
      });
      
      const mockData: VisitorsData = {
        visitors: mockVisitors,
        totalCount: mockVisitors.length,
        newVisitors: mockVisitors.filter(v => !v.isReturning).length,
        returningVisitors: mockVisitors.filter(v => v.isReturning).length,
        avgSessionDuration: mockVisitors.reduce((sum, v) => sum + v.totalDuration, 0) / mockVisitors.length
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setVisitorsData(mockData);
    } catch (error) {
      console.error('Failed to fetch visitors data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredVisitors = () => {
    if (!visitorsData) return [];
    
    let filtered = visitorsData.visitors;
    
    // Apply filter
    if (filterBy === 'new') {
      filtered = filtered.filter(v => !v.isReturning);
    } else if (filterBy === 'returning') {
      filtered = filtered.filter(v => v.isReturning);
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.browser.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'firstSeen':
          return new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime();
        case 'pageviews':
          return b.pageviews - a.pageviews;
        case 'lastSeen':
        default:
          return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
      }
    });
    
    return filtered;
  };

  const getPaginatedVisitors = () => {
    const filtered = getFilteredVisitors();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    const filtered = getFilteredVisitors();
    return Math.ceil(filtered.length / itemsPerPage);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes === 0) return `${remainingSeconds}s`;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getRelativeTime = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4 text-gray-400" />;
      case 'tablet': return <Globe className="h-4 w-4 text-gray-400" />;
      default: return <Monitor className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-deep"></div>
      </div>
    );
  }

  const filteredVisitors = getPaginatedVisitors();
  const totalPages = getTotalPages();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitors</h1>
          <p className="text-gray-600">Detailed visitor information and behavior</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{visitorsData?.totalCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{visitorsData?.newVisitors || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <ArrowDownRight className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Returning</p>
              <p className="text-2xl font-bold text-gray-900">{visitorsData?.returningVisitors || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatDuration(Math.round(visitorsData?.avgSessionDuration || 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or browser..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep"
            >
              <option value="all">All Visitors</option>
              <option value="new">New Visitors</option>
              <option value="returning">Returning Visitors</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep"
            >
              <option value="lastSeen">Last Seen</option>
              <option value="firstSeen">First Seen</option>
              <option value="pageviews">Page Views</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Seen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          visitor.isReturning ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {visitor.isReturning ? 'R' : 'N'}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {visitor.visitorId.substring(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-500">
                          {visitor.isReturning ? 'Returning' : 'New'} visitor
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visitor.country}</div>
                    {visitor.city && (
                      <div className="text-sm text-gray-500">{visitor.city}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(visitor.deviceType)}
                      <div className="ml-2">
                        <div className="text-sm text-gray-900 capitalize">{visitor.deviceType}</div>
                        <div className="text-sm text-gray-500">{visitor.browser}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {visitor.pageviews} pages
                    </div>
                    <div className="text-sm text-gray-500">
                      {visitor.sessions} sessions
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getRelativeTime(visitor.lastSeen)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, getFilteredVisitors().length)} of {getFilteredVisitors().length} results
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}