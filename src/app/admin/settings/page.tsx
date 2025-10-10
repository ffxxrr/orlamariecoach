'use client';

import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  Shield,
  Database,
  Bell,
  User,
  Save,
  RefreshCw,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface AdminSettings {
  privacy: {
    enableTracking: boolean;
    anonymizeIPs: boolean;
    cookieConsent: boolean;
    dataRetentionDays: number;
  };
  notifications: {
    emailReports: boolean;
    reportFrequency: 'daily' | 'weekly' | 'monthly';
    adminEmail: string;
    alertThresholds: {
      highTraffic: number;
      lowPerformance: number;
    };
  };
  analytics: {
    trackingId: string;
    sessionTimeout: number;
    batchSize: number;
    enableRealtime: boolean;
  };
  account: {
    adminEmail: string;
    adminName: string;
    timezone: string;
    dateFormat: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    privacy: {
      enableTracking: true,
      anonymizeIPs: true,
      cookieConsent: true,
      dataRetentionDays: 365
    },
    notifications: {
      emailReports: false,
      reportFrequency: 'weekly',
      adminEmail: 'admin@orlamariecoach.com',
      alertThresholds: {
        highTraffic: 1000,
        lowPerformance: 5000
      }
    },
    analytics: {
      trackingId: 'ORL_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      sessionTimeout: 30,
      batchSize: 10,
      enableRealtime: true
    },
    account: {
      adminEmail: 'admin@orlamariecoach.com',
      adminName: 'Orla Marie',
      timezone: 'Europe/Dublin',
      dateFormat: 'DD/MM/YYYY'
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeTab, setActiveTab] = useState('privacy');

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to /api/admin/settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save settings. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      // In a real implementation, this would export analytics data
      alert('Data export functionality would be implemented here.');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleDeleteData = async () => {
    if (window.confirm('Are you sure you want to delete all analytics data? This action cannot be undone.')) {
      try {
        // In a real implementation, this would delete all analytics data
        alert('Data deletion functionality would be implemented here.');
      } catch (error) {
        console.error('Deletion failed:', error);
      }
    }
  };

  const updateSetting = (category: keyof AdminSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (category: keyof AdminSettings, subKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subKey]: {
          ...(prev[category] as any)[subKey],
          [key]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'privacy', name: 'Privacy & GDPR', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'analytics', name: 'Analytics', icon: Database },
    { id: 'account', name: 'Account', icon: User }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your analytics dashboard and privacy settings</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {saveMessage && (
            <span className={`text-sm ${
              saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest-deep hover:bg-forest-deep/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-deep disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-forest-deep text-forest-deep'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Privacy & GDPR Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy & GDPR Compliance</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Enable Analytics Tracking</label>
                      <p className="text-sm text-gray-500">Allow visitor tracking on your website</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.enableTracking}
                      onChange={(e) => updateSetting('privacy', 'enableTracking', e.target.checked)}
                      className="h-4 w-4 text-forest-deep focus:ring-forest-deep border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Anonymize IP Addresses</label>
                      <p className="text-sm text-gray-500">Automatically anonymize visitor IP addresses for privacy</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.anonymizeIPs}
                      onChange={(e) => updateSetting('privacy', 'anonymizeIPs', e.target.checked)}
                      className="h-4 w-4 text-forest-deep focus:ring-forest-deep border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cookie Consent Banner</label>
                      <p className="text-sm text-gray-500">Show GDPR-compliant cookie consent banner</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.cookieConsent}
                      onChange={(e) => updateSetting('privacy', 'cookieConsent', e.target.checked)}
                      className="h-4 w-4 text-forest-deep focus:ring-forest-deep border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={settings.privacy.dataRetentionDays}
                        onChange={(e) => updateSetting('privacy', 'dataRetentionDays', parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-20"
                      />
                      <span className="text-sm text-gray-500">days</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Analytics data will be automatically deleted after this period</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Reports</label>
                      <p className="text-sm text-gray-500">Receive regular analytics reports via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailReports}
                      onChange={(e) => updateSetting('notifications', 'emailReports', e.target.checked)}
                      className="h-4 w-4 text-forest-deep focus:ring-forest-deep border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Frequency</label>
                    <select
                      value={settings.notifications.reportFrequency}
                      onChange={(e) => updateSetting('notifications', 'reportFrequency', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={settings.notifications.adminEmail}
                      onChange={(e) => updateSetting('notifications', 'adminEmail', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full max-w-md"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Alert Thresholds</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">High Traffic Alert (visitors/day)</label>
                        <input
                          type="number"
                          value={settings.notifications.alertThresholds.highTraffic}
                          onChange={(e) => updateNestedSetting('notifications', 'alertThresholds', 'highTraffic', parseInt(e.target.value))}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Slow Performance Alert (ms)</label>
                        <input
                          type="number"
                          value={settings.notifications.alertThresholds.lowPerformance}
                          onChange={(e) => updateNestedSetting('notifications', 'alertThresholds', 'lowPerformance', parseInt(e.target.value))}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tracking ID</label>
                    <input
                      type="text"
                      value={settings.analytics.trackingId}
                      onChange={(e) => updateSetting('analytics', 'trackingId', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full max-w-md"
                      readOnly
                    />
                    <p className="text-sm text-gray-500 mt-1">Unique identifier for your analytics tracking</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={settings.analytics.sessionTimeout}
                        onChange={(e) => updateSetting('analytics', 'sessionTimeout', parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-20"
                      />
                      <span className="text-sm text-gray-500">minutes</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Time before a session expires due to inactivity</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                    <input
                      type="number"
                      value={settings.analytics.batchSize}
                      onChange={(e) => updateSetting('analytics', 'batchSize', parseInt(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-20"
                    />
                    <p className="text-sm text-gray-500 mt-1">Number of events to batch before sending to server</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Enable Real-time Analytics</label>
                      <p className="text-sm text-gray-500">Show live visitor activity</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.analytics.enableRealtime}
                      onChange={(e) => updateSetting('analytics', 'enableRealtime', e.target.checked)}
                      className="h-4 w-4 text-forest-deep focus:ring-forest-deep border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              {/* Data Management */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-deep"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </button>
                  
                  <button
                    onClick={handleDeleteData}
                    className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Data
                  </button>
                </div>
                <div className="mt-2 flex items-center text-sm text-yellow-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Data deletion is permanent and cannot be undone
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
                    <input
                      type="text"
                      value={settings.account.adminName}
                      onChange={(e) => updateSetting('account', 'adminName', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full max-w-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={settings.account.adminEmail}
                      onChange={(e) => updateSetting('account', 'adminEmail', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep w-full max-w-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.account.timezone}
                      onChange={(e) => updateSetting('account', 'timezone', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep max-w-md"
                    >
                      <option value="Europe/Dublin">Europe/Dublin</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="America/Los_Angeles">America/Los_Angeles</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={settings.account.dateFormat}
                      onChange={(e) => updateSetting('account', 'dateFormat', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep max-w-md"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}