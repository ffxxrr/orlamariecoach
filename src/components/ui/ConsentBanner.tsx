'use client';

import React, { useState, useEffect } from 'react';
import PrivacyManager from '@/lib/analytics/privacy';

interface ConsentBannerProps {
  onConsentChange?: (hasConsented: boolean) => void;
}

export default function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [privacyManager] = useState(() => new PrivacyManager());

  useEffect(() => {
    // Check if consent is already given
    const existingConsent = privacyManager.getConsentSettings();
    if (!existingConsent) {
      setIsVisible(true);
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      setIsVisible(false);
      onConsentChange?.(event.detail.analytics);
    };

    window.addEventListener('analyticsConsentChange', handleConsentChange as EventListener);
    
    return () => {
      window.removeEventListener('analyticsConsentChange', handleConsentChange as EventListener);
    };
  }, [privacyManager, onConsentChange]);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await privacyManager.grantConsent();
      setIsVisible(false);
      onConsentChange?.(true);
    } catch (error) {
      console.error('Failed to grant consent:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    setIsProcessing(true);
    try {
      await privacyManager.denyConsent();
      setIsVisible(false);
      onConsentChange?.(false);
    } catch (error) {
      console.error('Failed to deny consent:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLearnMore = () => {
    alert(privacyManager.getPrivacyNoticeText());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-sage-light border-t-2 border-forest-deep p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-forest-deep mb-2">
              Privacy-First Analytics
            </h3>
            <p className="text-forest-deep text-sm leading-relaxed">
              We use privacy-first analytics to improve our website. No cookies are used, and no personal data is collected. 
              You can opt out at any time. Your privacy is our priority.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className="px-6 py-2 bg-forest-deep text-white rounded-md hover:bg-forest-deep/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Accept'}
            </button>
            
            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Decline'}
            </button>
            
            <button
              onClick={handleLearnMore}
              className="px-6 py-2 text-forest-deep underline hover:no-underline transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}