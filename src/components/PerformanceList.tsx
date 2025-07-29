'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface Performer {
  id: number;
  name: string;
  group: string;
  category: string;
  institution: string;
  completed: boolean;
}

interface PerformanceListProps {
  performers: Performer[];
  title: string;
  onPerformerComplete?: (id: number, completed: boolean) => void;
}

export default function PerformanceList({ 
  performers, 
  title, 
  onPerformerComplete 
}: PerformanceListProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Check if user is admin to show completed column
  const isAdmin = user?.role === UserRole.ADMIN;
  
  // Filter performers based on search term
  const filteredPerformers = performers.filter(performer =>
    performer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performer.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performer.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompletedChange = (id: number, completed: boolean) => {
    if (onPerformerComplete) {
      onPerformerComplete(id, completed);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-6">
        {title}
      </h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-charcoal-light" />
          </div>
          <input
            type="text"
            placeholder="Search for performers name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-charcoal placeholder-charcoal-light"
          />
        </div>
      </div>

      {/* Performance List Table */}
      <div className="bg-card-bg rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="min-w-full">
            <thead className="bg-emerald-600 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Institution
                </th>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Completed
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPerformers.map((performer) => (
                <tr 
                  key={performer.id}
                  className={`${
                    performer.completed 
                      ? 'bg-emerald-100' 
                      : 'bg-white hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-charcoal">
                    {performer.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                    {performer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                    {performer.group}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                    {performer.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                    {performer.institution}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                      <input
                        type="checkbox"
                        checked={performer.completed}
                        onChange={(e) => handleCompletedChange(performer.id, e.target.checked)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPerformers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-light text-lg">
              {searchTerm ? 'No performers found matching your search.' : 'No performers found.'}
            </p>
          </div>
        )}
      </div>

      {/* Performance Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card-bg rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-saffron">{performers.length}</div>
          <div className="text-charcoal-light text-sm">Total Performers</div>
        </div>
        <div className="bg-card-bg rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {performers.filter(p => p.completed).length}
          </div>
          <div className="text-charcoal-light text-sm">Completed</div>
        </div>
        <div className="bg-card-bg rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--secondary-saffron)' }}>
            {performers.filter(p => !p.completed).length}
          </div>
          <div className="text-charcoal-light text-sm">Remaining</div>
        </div>
      </div>
    </div>
  );
}
