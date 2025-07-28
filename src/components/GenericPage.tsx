'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ExclamationTriangleIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';

interface GenericPageProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  allowedRoles?: ('admin' | 'judge')[];
  children?: React.ReactNode;
}

const GenericPage: React.FC<GenericPageProps> = ({ 
  title, 
  description, 
  icon: Icon,
  requiresAuth = false,
  allowedRoles = [],
  children 
}) => {
  const { user, isAuthenticated } = useAuth();

  // Check if user has permission to access this page
  const hasPermission = () => {
    if (!requiresAuth) return true;
    if (!isAuthenticated || !user) return false;
    if (allowedRoles.length === 0) return true;
    return allowedRoles.includes(user.role as 'admin' | 'judge');
  };

  if (requiresAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <LockClosedIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access this page.
            </p>
            <a
              href="/login"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (requiresAuth && !hasPermission()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You don&apos;t have permission to access this page. 
              {allowedRoles.length > 0 && (
                <span className="block mt-2 text-sm">
                  Required role: {allowedRoles.join(' or ')}
                </span>
              )}
            </p>
            <Link
              href="/"
              className="inline-block bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </div>

        {children || (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Icon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This page is currently under development. Content will be available soon with complete 
              functionality for managing {title.toLowerCase()}.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Coming Soon</h3>
              <p className="text-sm text-blue-700">
                This section will include comprehensive tools for managing and viewing {title.toLowerCase()} 
                with role-based access control and real-time updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericPage;
