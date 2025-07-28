'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
  requiresRole?: 'admin' | 'judge';
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Auditions',
    children: [
      { title: 'Performance List', href: '/auditions/performances' },
      { title: 'Judges', href: '/auditions/judges', requiresRole: 'judge' },
      { title: 'Results', href: '/auditions/results' },
    ],
  },
  {
    title: 'Finals',
    children: [
      { title: 'Performance List', href: '/finals/performances' },
      { title: 'Judges', href: '/finals/judges', requiresRole: 'judge' },
      { title: 'Results', href: '/finals/results' },
    ],
  },
  {
    title: 'Admin',
    href: '/admin',
    requiresRole: 'admin',
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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

    return (
      <div key={item.title}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
              level > 0 ? 'pl-8 text-sm' : 'text-base font-medium'
            }`}
          >
            <span>{item.title}</span>
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </button>
        ) : (
          <Link
            href={item.href || '#'}
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 hover:bg-blue-50 transition-colors ${
              level > 0 ? 'pl-8 text-sm' : 'text-base font-medium'
            }`}
          >
            {item.title}
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <div className="bg-gray-50">
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
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
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-900">APMC</h1>
          <p className="text-sm text-gray-600">All Pakistan Music Conference</p>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>

        {/* User info and logout */}
        <div className="border-t border-gray-200 p-4">
          {user ? (
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-sm text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-sm text-center border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
