'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [linkStatus, setLinkStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const router = useRouter();

  useEffect(() => {
    // Arriving from an emailed sign-in link?
    const token = new URLSearchParams(window.location.search).get('link');
    if (token) {
      setLinkToken(token);
      return;
    }
    // Check if already authenticated
    checkAuthStatus();
  }, []);

  const requestLink = async () => {
    setLinkStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/admin/auth/forgot', { method: 'POST' });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setLinkStatus('sent');
      } else {
        setError(data.error || 'Sorry, the email could not be sent.');
        setLinkStatus('idle');
      }
    } catch {
      setError('Network error. Please try again.');
      setLinkStatus('idle');
    }
  };

  const signInWithLink = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/auth/magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: linkToken }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'This link did not work.');
        setLinkToken(null);
        window.history.replaceState(null, '', '/admin/login');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth/session');
      if (response.ok) {
        // Already authenticated, redirect to dashboard
        router.push('/admin/dashboard');
      }
    } catch (error) {
      // Not authenticated, stay on login page
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-calm to-living-green flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <Lock className="w-8 h-8 text-forest-deep" />
          </div>
          <h1 className="text-2xl font-crimson font-semibold text-white">
            Admin Dashboard
          </h1>
          <p className="text-white/80 mt-2">
            OrlaMarieCoach Analytics
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {linkToken ? (
            <div className="space-y-6 text-center">
              <p className="text-gray-700">
                Welcome back. Tap the button below to sign in to your dashboard.
              </p>
              <button
                type="button"
                onClick={signInWithLink}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-md shadow-sm text-white bg-forest-deep hover:bg-forest-deep/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign in to the dashboard'}
              </button>
            </div>
          ) : (
          <>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep"
                  placeholder="admin@orlamariecoach.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-deep focus:border-forest-deep"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-forest-deep hover:bg-forest-deep/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-deep disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Forgot password: emails a one-time sign-in link to the admin inbox */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            {linkStatus === 'sent' ? (
              <p className="text-sm text-gray-700">
                A sign-in link is on its way to your admin email inbox. It works once, for 15 minutes.
              </p>
            ) : (
              <button
                type="button"
                onClick={requestLink}
                disabled={linkStatus === 'sending'}
                className="text-sm text-forest-deep underline hover:no-underline disabled:opacity-50"
              >
                {linkStatus === 'sending' ? 'Sending...' : 'Forgot your password? Email me a sign-in link'}
              </button>
            )}
          </div>
          </>
          )}

          {/* Development Note */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Dev Mode:</strong> Use admin@orlamariecoach.com / admin123!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            © 2024 OrlaMarieCoach. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}