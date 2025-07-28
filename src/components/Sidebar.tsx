'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserRole, NavItem } from '@/types';
import { 
  ChevronDownIcon, 
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  TrophyIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user, logout } = useAuth();

  // Define navigation items based on user role
  const getNavigationItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Auditions',
        href: '/auditions',
        children: [
          { title: 'Performance List', href: '/auditions/performances' },
          { title: 'Judges', href: '/auditions/judges', requiredRoles: [UserRole.ADMIN, UserRole.JUDGE] },
          { title: 'Results', href: '/auditions/results' }
        ]
      },
      {
        title: 'Finals',
        href: '/finals',
        children: [
          { title: 'Performance List', href: '/finals/performances' },
          { title: 'Judges', href: '/finals/judges', requiredRoles: [UserRole.ADMIN, UserRole.JUDGE] },
          { title: 'Results', href: '/finals/results' }
        ]
      }
    ];

    // Add admin-only navigation
    if (user?.role === UserRole.ADMIN) {
      baseItems.push({
        title: 'Admin',
        href: '/admin',
        requiredRoles: [UserRole.ADMIN],
        children: [
          { title: 'User Management', href: '/admin/users' },
          { title: 'Event Settings', href: '/admin/settings' },
          { title: 'Reports', href: '/admin/reports' }
        ]
      });
    }

    return baseItems;
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const canAccessItem = (item: NavItem): boolean => {
    if (!item.requiredRoles) return true; // Public items
    if (!user) return false; // Private items require login
    return item.requiredRoles.includes(user.role);
  };

  const getIcon = (title: string) => {
    switch (title) {
      case 'Home':
        return <HomeIcon className="w-5 h-5" />;
      case 'Auditions':
      case 'Finals':
        return <MusicalNoteIcon className="w-5 h-5" />;
      case 'Admin':
        return <ShieldCheckIcon className="w-5 h-5" />;
      default:
        return <TrophyIcon className="w-5 h-5" />;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-emerald-600 text-white shadow-lg"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Desktop collapse toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`hidden lg:block fixed top-4 z-50 p-2 rounded-md bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all duration-300 ${
          isCollapsed ? 'left-4' : 'left-60'
        }`}
      >
        {isCollapsed ? <ChevronRightIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 bg-emerald-600 text-white transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-emerald-500">
            {!isCollapsed && (
              <>
                <h1 className="text-2xl font-bold text-center">
                  APMC
                </h1>
                <p className="text-emerald-200 text-sm text-center mt-1">
                  All Pakistan Music Conference
                </p>
              </>
            )}
            {isCollapsed && (
              <div className="text-center">
                <MusicalNoteIcon className="w-8 h-8 mx-auto" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <div className="space-y-1">
                    {/* Parent item */}
                    {item.children ? (
                      <button
                        onClick={() => !isCollapsed && toggleExpanded(item.title)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-emerald-500 transition-colors duration-200"
                        title={isCollapsed ? item.title : undefined}
                      >
                        <div className="flex items-center space-x-3">
                          {getIcon(item.title)}
                          {!isCollapsed && <span className="font-medium">{item.title}</span>}
                        </div>
                        {!isCollapsed && (
                          expandedItems.includes(item.title) ? 
                            <ChevronDownIcon className="w-4 h-4" /> : 
                            <ChevronRightIcon className="w-4 h-4" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-emerald-500 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                        title={isCollapsed ? item.title : undefined}
                      >
                        {getIcon(item.title)}
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </Link>
                    )}

                    {/* Child items */}
                    {item.children && expandedItems.includes(item.title) && !isCollapsed && (
                      <ul className="ml-8 space-y-1">
                        {item.children
                          .filter(canAccessItem)
                          .map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-3 py-2 text-sm rounded-lg hover:bg-emerald-500 transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-emerald-500">
            {user ? (
              <div className="space-y-3">
                {!isCollapsed ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2 bg-emerald-500 rounded-lg">
                      <UserIcon className="w-5 h-5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.username}</p>
                        <p className="text-xs text-emerald-200 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-3 py-2 text-sm bg-maroon text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-center p-2 bg-emerald-500 rounded-lg" title={`${user.username} (${user.role})`}>
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <button
                      onClick={logout}
                      className="w-full p-2 bg-maroon text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      title="Logout"
                    >
                      <XMarkIcon className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`block w-full px-3 py-2 text-sm text-center bg-saffron text-charcoal rounded-lg hover:bg-yellow-400 transition-colors duration-200 ${isCollapsed ? 'px-2' : ''}`}
                onClick={() => setIsOpen(false)}
                title={isCollapsed ? "Login" : undefined}
              >
                {isCollapsed ? <UserIcon className="w-5 h-5 mx-auto" /> : "Login"}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
