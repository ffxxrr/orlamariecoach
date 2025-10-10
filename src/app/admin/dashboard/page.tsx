'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

interface AnalyticsData {
  visitors: {
    total: number;
    today: number;
    change: number;
  };
  pageviews: {
    total: number;
    today: number;
    change: number;
  };
  sessions: {
    average: number;
    bounceRate: number;
    change: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    change: number;
  }>;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'pageview' | 'session' | 'conversion';
    page: string;
    timestamp: string;
    location?: string;
  }>;
}

export default function AdminDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch real analytics data from API
      const response = await fetch(`/api/admin/analytics?timeRange=${timeRange}`);
      
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        console.error('Failed to fetch analytics data:', response.statusText);
        
        // Fallback to mock data if API fails
        const fallbackData: AnalyticsData = {
          visitors: { total: 0, today: 0, change: 0 },
          pageviews: { total: 0, today: 0, change: 0 },
          sessions: { average: 0, bounceRate: 0, change: 0 },
          topPages: [],
          devices: { desktop: 0, mobile: 0, tablet: 0 },
          recentActivity: []
        };
        setAnalyticsData(fallbackData);
      }
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      
      // Fallback to empty data on error
      const fallbackData: AnalyticsData = {
        visitors: { total: 0, today: 0, change: 0 },
        pageviews: { total: 0, today: 0, change: 0 },
        sessions: { average: 0, bounceRate: 0, change: 0 },
        topPages: [],
        devices: { desktop: 0, mobile: 0, tablet: 0 },
        recentActivity: []
      };
      setAnalyticsData(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-deep"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-600">Your website performance at a glance</p>
        </div>
        
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-forest-deep text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visitors */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analyticsData?.visitors.total || 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getChangeIcon(analyticsData?.visitors.change || 0)}
            <span className={`ml-1 text-sm font-medium ${getChangeColor(analyticsData?.visitors.change || 0)}`}>
              {analyticsData?.visitors.change || 0}%
            </span>
            <span className="text-sm text-gray-600 ml-1">vs last period</span>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analyticsData?.pageviews.total || 0)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getChangeIcon(analyticsData?.pageviews.change || 0)}
            <span className={`ml-1 text-sm font-medium ${getChangeColor(analyticsData?.pageviews.change || 0)}`}>
              {analyticsData?.pageviews.change || 0}%
            </span>
            <span className="text-sm text-gray-600 ml-1">vs last period</span>
          </div>
        </div>

        {/* Avg Session */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Session</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(analyticsData?.sessions.average || 0)}s
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getChangeIcon(analyticsData?.sessions.change || 0)}
            <span className={`ml-1 text-sm font-medium ${getChangeColor(analyticsData?.sessions.change || 0)}`}>
              {analyticsData?.sessions.change || 0}%
            </span>
            <span className="text-sm text-gray-600 ml-1">vs last period</span>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData?.sessions.bounceRate || 0}%
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getChangeIcon(-(analyticsData?.sessions.change || 0))}
            <span className={`ml-1 text-sm font-medium ${getChangeColor(-(analyticsData?.sessions.change || 0))}`}>
              {Math.abs(analyticsData?.sessions.change || 0)}%
            </span>
            <span className="text-sm text-gray-600 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Pages</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData?.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {page.page === '/' ? 'Homepage' : page.page}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {formatNumber(page.views)} views
                    </span>
                    <div className="flex items-center">
                      {getChangeIcon(page.change)}
                      <span className={`ml-1 text-sm ${getChangeColor(page.change)}`}>
                        {page.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Device Types</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Desktop</span>
                </div>
                <span className="text-sm text-gray-600">{analyticsData?.devices.desktop}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Mobile</span>
                </div>
                <span className="text-sm text-gray-600">{analyticsData?.devices.mobile}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Tablet</span>
                </div>
                <span className="text-sm text-gray-600">{analyticsData?.devices.tablet}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {analyticsData?.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'pageview' ? 'bg-blue-50' :
                  activity.type === 'session' ? 'bg-green-50' : 'bg-purple-50'
                }`}>
                  <Activity className={`h-4 w-4 ${
                    activity.type === 'pageview' ? 'text-blue-600' :
                    activity.type === 'session' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.type === 'pageview' ? 'Page View' :
                     activity.type === 'session' ? 'New Session' : 'Conversion'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.page} • {activity.location}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}