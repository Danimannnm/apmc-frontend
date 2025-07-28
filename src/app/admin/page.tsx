'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BellIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const adminSections = [
    {
      title: 'User Management',
      description: 'Manage judges, contestants, and admin accounts',
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      items: ['Add New Judge', 'Manage Contestants', 'Admin Permissions', 'User Analytics']
    },
    {
      title: 'Competition Settings',
      description: 'Configure auditions and finals parameters',
      icon: AdjustmentsHorizontalIcon,
      color: 'bg-purple-500',
      items: ['Audition Rules', 'Scoring Criteria', 'Competition Categories', 'Time Limits']
    },
    {
      title: 'Results Management',
      description: 'Oversee scoring and result publication',
      icon: ChartBarIcon,
      color: 'bg-green-500',
      items: ['Review Scores', 'Publish Results', 'Generate Reports', 'Export Data']
    },
    {
      title: 'Content Management',
      description: 'Manage performance lists and announcements',
      icon: DocumentTextIcon,
      color: 'bg-yellow-500',
      items: ['Performance Schedule', 'Announcements', 'News Updates', 'Media Gallery']
    },
    {
      title: 'Notifications',
      description: 'Send alerts and updates to participants',
      icon: BellIcon,
      color: 'bg-red-500',
      items: ['Broadcast Messages', 'Email Templates', 'SMS Alerts', 'Notification History']
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings and security',
      icon: CircleStackIcon,
      color: 'bg-indigo-500',
      items: ['Database Backup', 'Security Settings', 'API Configuration', 'System Logs']
    }
  ];

  const recentActivity = [
    { action: 'New judge registered', user: 'Judge Smith', time: '2 hours ago', type: 'user' },
    { action: 'Audition results published', user: 'System', time: '4 hours ago', type: 'result' },
    { action: 'Performance schedule updated', user: 'Admin User', time: '6 hours ago', type: 'content' },
    { action: 'Notification sent to all participants', user: 'Admin User', time: '1 day ago', type: 'notification' }
  ];

  const stats = [
    { label: 'Total Contestants', value: '245', change: '+12%', color: 'text-blue-600' },
    { label: 'Active Judges', value: '8', change: '+1', color: 'text-green-600' },
    { label: 'Completed Auditions', value: '156', change: '+45', color: 'text-purple-600' },
    { label: 'Pending Results', value: '12', change: '-8', color: 'text-yellow-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-3">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${stat.color}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Sections */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Management Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminSections.map((section, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 cursor-pointer group"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`${section.color} rounded-lg p-3 group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'result' ? 'bg-green-100' :
                      activity.type === 'content' ? 'bg-purple-100' :
                      'bg-yellow-100'
                    }`}>
                      {activity.type === 'user' && <UserGroupIcon className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'result' && <ChartBarIcon className="h-4 w-4 text-green-600" />}
                      {activity.type === 'content' && <DocumentTextIcon className="h-4 w-4 text-purple-600" />}
                      {activity.type === 'notification' && <BellIcon className="h-4 w-4 text-yellow-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-sm text-blue-600 hover:text-blue-500 font-medium">
                  View All Activity
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Add New Judge
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Publish Results
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Send Announcement
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
