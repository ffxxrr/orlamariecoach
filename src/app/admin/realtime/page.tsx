'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Activity,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Wifi
} from 'lucide-react';

interface RealtimeData {
  activeVisitors: number;
  activePages: Array<{
    page: string;
    visitors: number;
    title?: string;
  }>;
  recentPageviews: Array<{
    id: string;
    page: string;
    timestamp: string;
    location: string;
    deviceType: string;
    title?: string;
  }>;
  topReferrers: Array<{
    domain: string;
    visitors: number;
  }>;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geographicData: Array<{
    country: string;
    visitors: number;
  }>;
}

export default function RealtimePage() {
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchRealtimeData();
    
    // Set up auto-refresh every 30 seconds
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchRealtimeData();
      }, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchRealtimeData = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would fetch from /api/admin/analytics/realtime
      // For now, we'll simulate real-time data
      const mockData: RealtimeData = {
        activeVisitors: Math.floor(Math.random() * 25) + 5,
        activePages: [
          { page: '/', visitors: Math.floor(Math.random() * 8) + 2, title: 'Homepage' },
          { page: '/about', visitors: Math.floor(Math.random() * 5) + 1, title: 'About Orla' },
          { page: '/services', visitors: Math.floor(Math.random() * 4) + 1, title: 'Services' },
          { page: '/book-session', visitors: Math.floor(Math.random() * 3) + 1, title: 'Book Session' },
          { page: '/courses', visitors: Math.floor(Math.random() * 2) + 1, title: 'Courses' }
        ].filter(page => page.visitors > 0),
        recentPageviews: Array.from({ length: 10 }, (_, i) => {
          const pages = ['/', '/about', '/services', '/book-session', '/courses'];
          const locations = ['Dublin, Ireland', 'Cork, Ireland', 'London, UK', 'Belfast, UK', 'Galway, Ireland'];
          const devices = ['desktop', 'mobile', 'tablet'];
          const now = new Date();
          
          return {
            id: (i + 1).toString(),
            page: pages[Math.floor(Math.random() * pages.length)],
            timestamp: new Date(now.getTime() - Math.random() * 600000).toISOString(), // Random time within last 10 minutes
            location: locations[Math.floor(Math.random() * locations.length)],
            deviceType: devices[Math.floor(Math.random() * devices.length)],
            title: 'Page View'
          };
        }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
        topReferrers: [
          { domain: 'google.com', visitors: Math.floor(Math.random() * 15) + 5 },
          { domain: 'facebook.com', visitors: Math.floor(Math.random() * 8) + 2 },
          { domain: 'instagram.com', visitors: Math.floor(Math.random() * 6) + 1 },
          { domain: 'direct', visitors: Math.floor(Math.random() * 12) + 8 }
        ],
        deviceBreakdown: {
          desktop: Math.floor(Math.random() * 40) + 30,
          mobile: Math.floor(Math.random() * 50) + 35,
          tablet: Math.floor(Math.random() * 20) + 10
        },
        geographicData: [
          { country: 'Ireland', visitors: Math.floor(Math.random() * 20) + 15 },
          { country: 'United Kingdom', visitors: Math.floor(Math.random() * 15) + 8 },
          { country: 'United States', visitors: Math.floor(Math.random() * 10) + 3 },
          { country: 'Canada', visitors: Math.floor(Math.random() * 8) + 2 },
          { country: 'Australia', visitors: Math.floor(Math.random() * 5) + 1 }
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setRealtimeData(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch realtime data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Globe className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  if (isLoading && !realtimeData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-deep"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Real-time Analytics</h1>
          <p className="text-gray-600">Live visitor activity on your website</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Wifi className="h-4 w-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Auto-refresh</span>
            </label>
            
            <button
              onClick={fetchRealtimeData}
              disabled={isLoading}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Visitors */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Active Visitors</h2>
            <p className="text-sm text-gray-600">Visitors currently on your site</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{realtimeData?.activeVisitors || 0}</div>
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online now
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Pages */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Active Pages</h3>
            <p className="text-sm text-gray-600">Pages being viewed right now</p>
          </div>
          <div className="p-6">
            {realtimeData?.activePages.length ? (
              <div className="space-y-4">
                {realtimeData.activePages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {page.title || page.page}
                      </p>
                      <p className="text-xs text-gray-500">{page.page}</p>
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {page.visitors} {page.visitors === 1 ? 'visitor' : 'visitors'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No active pages</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600">Latest page views</p>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {realtimeData?.recentPageviews.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getDeviceIcon(activity.deviceType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.page}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.location} • {getRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Referrers */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Referrers</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {realtimeData?.topReferrers.map((referrer) => (
                <div key={referrer.domain} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{referrer.domain}</span>
                  <span className="text-sm text-gray-600">{referrer.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Devices</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">Desktop</span>
                </div>
                <span className="text-sm text-gray-600">{realtimeData?.deviceBreakdown.desktop}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">Mobile</span>
                </div>
                <span className="text-sm text-gray-600">{realtimeData?.deviceBreakdown.mobile}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">Tablet</span>
                </div>
                <span className="text-sm text-gray-600">{realtimeData?.deviceBreakdown.tablet}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Data */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Countries</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {realtimeData?.geographicData.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{country.country}</span>
                  <span className="text-sm text-gray-600">{country.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}