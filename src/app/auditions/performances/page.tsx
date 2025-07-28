'use client';

import React from 'react';
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  UserIcon,
  MusicalNoteIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const AuditionsPerformancePage = () => {
  const performances = [
    {
      id: 'A001',
      contestant: 'Ahmad Hassan',
      category: 'Classical Vocal',
      piece: 'Raag Yaman - Khayal',
      timeSlot: '10:00 AM',
      venue: 'Hall A',
      status: 'Scheduled'
    },
    {
      id: 'A002',
      contestant: 'Fatima Khan',
      category: 'Folk Music',
      piece: 'Punjabi Lok Geet',
      timeSlot: '10:30 AM',
      venue: 'Hall A',
      status: 'Scheduled'
    },
    {
      id: 'A003',
      contestant: 'Ali Raza',
      category: 'Contemporary',
      piece: 'Modern Fusion',
      timeSlot: '11:00 AM',
      venue: 'Hall B',
      status: 'Completed'
    },
    {
      id: 'A004',
      contestant: 'Sara Ahmed',
      category: 'Classical Instrumental',
      piece: 'Sitar - Raag Bhairav',
      timeSlot: '11:30 AM',
      venue: 'Hall A',
      status: 'In Progress'
    },
    {
      id: 'A005',
      contestant: 'Muhammad Bilal',
      category: 'Qawwali',
      piece: 'Traditional Qawwali',
      timeSlot: '12:00 PM',
      venue: 'Hall C',
      status: 'Scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Classical Vocal':
        return 'bg-purple-100 text-purple-800';
      case 'Folk Music':
        return 'bg-green-100 text-green-800';
      case 'Contemporary':
        return 'bg-blue-100 text-blue-800';
      case 'Classical Instrumental':
        return 'bg-indigo-100 text-indigo-800';
      case 'Qawwali':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
              <ClipboardDocumentListIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Auditions - Performance List</h1>
              <p className="text-gray-600">View all scheduled performances for the audition round</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Performances</p>
                  <p className="text-2xl font-bold text-gray-900">{performances.length}</p>
                </div>
                <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {performances.filter(p => p.status === 'Completed').length}
                  </p>
                </div>
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {performances.filter(p => p.status === 'In Progress').length}
                  </p>
                </div>
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {performances.filter(p => p.status === 'Scheduled').length}
                  </p>
                </div>
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Schedule</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contestant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Piece
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performances.map((performance) => (
                  <tr key={performance.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {performance.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <UserIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{performance.contestant}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(performance.category)}`}>
                        {performance.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MusicalNoteIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{performance.piece}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{performance.timeSlot}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{performance.venue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(performance.status)}`}>
                        {performance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Guidelines</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Contestants must arrive 30 minutes before their scheduled time</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Performance duration: Maximum 10 minutes</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Accompaniment instruments will be provided</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Recording equipment available in all venues</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Venue Information</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Hall A</h4>
                <p className="text-sm text-gray-600">Main auditorium - Capacity: 200 | Classical performances</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">Hall B</h4>
                <p className="text-sm text-gray-600">Contemporary hall - Capacity: 150 | Modern & fusion</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-medium text-gray-900">Hall C</h4>
                <p className="text-sm text-gray-600">Traditional space - Capacity: 100 | Folk & Qawwali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditionsPerformancePage;
