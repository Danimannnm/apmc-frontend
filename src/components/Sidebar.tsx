'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { 
  HomeIcon,
  MicrophoneIcon,
  TrophyIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface MenuItem {
  title: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
  requiresRole?: 'admin' | 'judge';
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: HomeIcon,
  },
  {
    title: 'Auditions',
    icon: MicrophoneIcon,
    children: [
      { title: 'Performance List', href: '/auditions/performances', icon: ClipboardDocumentListIcon },
      { title: 'Judges', href: '/auditions/judges', icon: UserGroupIcon, requiresRole: 'judge' },
      { title: 'Results', href: '/auditions/results', icon: ChartBarIcon },
    ],
  },
  {
    title: 'Finals',
    icon: TrophyIcon,
    children: [
      { title: 'Performance List', href: '/finals/performances', icon: ClipboardDocumentListIcon },
      { title: 'Judges', href: '/finals/judges', icon: UserGroupIcon, requiresRole: 'judge' },
      { title: 'Results', href: '/finals/results', icon: ChartBarIcon },
    ],
  },
  {
    title: 'Admin',
    href: '/admin',
    icon: Cog6ToothIcon,
    requiresRole: 'admin',
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Auditions', 'Finals']);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const shouldShowItem = (item: MenuItem): boolean => {
    if (!item.requiresRole) return true;
    if (item.requiresRole === 'admin') return user?.role === 'admin';
    if (item.requiresRole === 'judge') return user?.role === 'judge' || user?.role === 'admin';
    return false;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (!shouldShowItem(item)) return null;

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const IconComponent = item.icon;

    return (
      <div key={item.title} className="w-full">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 group ${
              level > 0 
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm ml-4' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium'
            }`}
          >
            <div className="flex items-center space-x-3">
              {IconComponent && <IconComponent className={`${level > 0 ? 'h-4 w-4' : 'h-5 w-5'}`} />}
              <span>{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 transition-transform duration-200" />
            )}
          </button>
        ) : (
          <Link
            href={item.href || '#'}
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              level > 0 
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm ml-4' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium'
            }`}
          >
            {IconComponent && <IconComponent className={`${level > 0 ? 'h-4 w-4' : 'h-5 w-5'}`} />}
            <span>{item.title}</span>
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">APMC</h1>
                <p className="text-xs text-gray-500">Music Conference</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 p-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
