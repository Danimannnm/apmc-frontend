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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="bg-yellow-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <LockClosedIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You need to be logged in to access this page.
            </p>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (requiresAuth && !hasPermission()) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="bg-red-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You don&apos;t have permission to access this page. 
              {allowedRoles.length > 0 && (
                <span className="block mt-3 text-sm font-medium text-gray-800">
                  Required role: {allowedRoles.join(' or ')}
                </span>
              )}
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3">
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 text-lg">{description}</p>
            </div>
          </div>
        </div>

        {children || (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="bg-gray-50 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <Icon className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              This page is currently under development. Content will be available soon with complete 
              functionality for managing {title.toLowerCase()}.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Coming Soon</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
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
