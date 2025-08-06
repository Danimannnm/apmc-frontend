'use client';

import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FinalsResult, ViewMode } from '@/types';

// Sample finals results data - sorted by score (highest first)
const initialResults: FinalsResult[] = [
  {
    id: 1,
    name: "Ayleen Ovais",
    group: "Under 10",
    category: "Folk",
    score: 95,
    institution: "LGS Islamabad",
    position: 1,
    medal: 'gold',
    trophy: 'Best Folk Performance Under 10'
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    group: "Under 10",
    category: "Classical",
    score: 92,
    institution: "City School Islamabad",
    position: 2,
    medal: 'silver'
  },
  {
    id: 3,
    name: "Sara Khan",
    group: "Under 15",
    category: "Folk",
    score: 91,
    institution: "LGS Lahore",
    position: 3,
    medal: 'bronze'
  },
  {
    id: 4,
    name: "Zain Malik",
    group: "Adult",
    category: "Folk",
    score: 90,
    institution: "University of Punjab",
    position: 4,
    trophy: 'Outstanding Folk Artist'
  },
  {
    id: 5,
    name: "Muhammad Tariq",
    group: "Adult",
    category: "Qawwali",
    score: 88,
    institution: "NAPA Karachi",
    position: 5,
    medal: 'gold',
    trophy: 'Best Qawwali Performance'
  },
  {
    id: 6,
    name: "Fatima Sheikh",
    group: "Under 20",
    category: "Classical",
    score: 87,
    institution: "Lahore Grammar School",
    position: 6,
    medal: 'silver'
  },
  {
    id: 7,
    name: "Aisha Bhatti",
    group: "Adult",
    category: "Classical",
    score: 85,
    institution: "National College of Arts",
    position: 7,
    medal: 'bronze'
  },
  {
    id: 8,
    name: "Omar Farooq",
    group: "Under 20",
    category: "Qawwali",
    score: 83,
    institution: "Government College University",
    position: 8,
    trophy: 'Rising Star Award'
  },
  // Additional entries to create more competition for trophies
  {
    id: 9,
    name: "Mariam Ali",
    group: "Under 10",
    category: "Qawwali",
    score: 89,
    institution: "Beaconhouse School System",
    position: 1,
    medal: 'gold'
  },
  {
    id: 10,
    name: "Hassan Shah",
    group: "Under 15",
    category: "Classical",
    score: 86,
    institution: "Aitchison College",
    position: 2,
    medal: 'silver'
  },
  {
    id: 11,
    name: "Khadija Iqbal",
    group: "Under 15",
    category: "Qawwali",
    score: 84,
    institution: "LGS Lahore",
    position: 1,
    medal: 'gold'
  },
  {
    id: 12,
    name: "Ali Raza",
    group: "Under 20",
    category: "Folk",
    score: 82,
    institution: "Lahore Grammar School",
    position: 1,
    medal: 'gold'
  },
  {
    id: 13,
    name: "Sana Malik",
    group: "Adult",
    category: "Folk",
    score: 81,
    institution: "NAPA Karachi",
    position: 2,
    medal: 'silver'
  },
  {
    id: 14,
    name: "Bilal Ahmed",
    group: "Under 20",
    category: "Classical",
    score: 80,
    institution: "Government College University",
    position: 2,
    medal: 'silver'
  },
  {
    id: 15,
    name: "Hina Fatima",
    group: "Adult",
    category: "Classical",
    score: 79,
    institution: "University of Punjab",
    position: 1,
    medal: 'gold'
  }
];

export default function FinalsResultsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('positions');

  // Get unique groups and categories
  const groups = useMemo(() => {
    const uniqueGroups = [...new Set(initialResults.map(r => r.group))];
    return uniqueGroups.sort();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(initialResults.map(r => r.category))];
    return uniqueCategories.sort();
  }, []);

  // Calculate institutional awards based on top positions
  const calculateInstitutionalAwards = () => {
    const institutionsByGroup: { [key: string]: { [key: string]: number } } = {};
    
    // Count top 3 positions for each institution by group
    initialResults.forEach(result => {
      if (result.position <= 3) {
        if (!institutionsByGroup[result.group]) {
          institutionsByGroup[result.group] = {};
        }
        
        if (!institutionsByGroup[result.group][result.institution]) {
          institutionsByGroup[result.group][result.institution] = 0;
        }
        
        institutionsByGroup[result.group][result.institution]++;
      }
    });

    // Find the institution with most top positions in each group
    const groupWinners: Array<{ id: number; name: string; group: string; category: string; score: number; institution: string; position: number }> = [];
    let id = 1;

    Object.entries(institutionsByGroup).forEach(([group, institutions]) => {
      const sortedInstitutions = Object.entries(institutions).sort((a, b) => b[1] - a[1]);
      if (sortedInstitutions.length > 0) {
        const [winningInstitution] = sortedInstitutions[0];
        groupWinners.push({
          id: id++,
          name: winningInstitution,
          group: group,
          category: '',
          score: 0,
          institution: winningInstitution,
          position: 1
        });
      }
    });

    return groupWinners;
  };

  // Filter and search results based on view mode
  const filteredResults = useMemo(() => {
    let results = initialResults;

    // Filter by view mode
    if (viewMode === 'medals') {
      // In medals view, only show medal winners without any other filters
      results = results.filter(result => result.medal);
    } else if (viewMode === 'trophies') {
      // For trophies view, show institutional awards
      return calculateInstitutionalAwards();
    }

    // Apply search and filters only for non-medals views
    if (viewMode !== 'medals') {
      return results.filter(result => {
        const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             result.institution.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGroup = selectedGroup === 'all' || result.group === selectedGroup;
        const matchesCategory = selectedCategory === 'all' || result.category === selectedCategory;
        
        return matchesSearch && matchesGroup && matchesCategory;
      });
    }

    return results;
  }, [searchTerm, selectedGroup, selectedCategory, viewMode]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-charcoal mb-6">
          Finals Results
        </h1>

        {/* View Mode Buttons */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setViewMode('positions')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'positions' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-charcoal hover:bg-gray-200'
              }`}
            >
              Positions
            </button>
            <button
              onClick={() => setViewMode('medals')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'medals' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-charcoal hover:bg-gray-200'
              }`}
            >
              Medals
            </button>
            <button
              onClick={() => setViewMode('trophies')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'trophies' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-charcoal hover:bg-gray-200'
              }`}
            >
              Trophies
            </button>
          </div>
        </div>

        {/* Search and Filters - Hidden in medals and trophies view */}
        {viewMode !== 'medals' && viewMode !== 'trophies' && (
          <div className="bg-card-bg rounded-lg p-6 mb-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search Bar - Takes 2 columns (half width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">Search:</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-charcoal-light" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or institution..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Group Filter - Takes 1 column */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Group:</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All</option>
                  {groups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter - Takes 1 column */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        <div className="bg-card-bg rounded-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-emerald-600 text-white sticky top-0 z-10">
                <tr>
                  {viewMode !== 'medals' && viewMode !== 'trophies' && (
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      Position
                    </th>
                  )}
                  {viewMode === 'trophies' ? (
                    <>
                      <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                        Group
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                        Institution
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                        Group
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                        Category
                      </th>
                      {viewMode !== 'medals' && (
                        <>
                          <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                            Institution
                          </th>
                        </>
                      )}
                      {viewMode === 'medals' && (
                        <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">
                          Award
                        </th>
                      )}
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResults.map((result) => (
                  <tr 
                    key={result.id}
                    className="bg-white hover:bg-gray-50 transition-colors"
                  >
                    {viewMode === 'trophies' ? (
                      <>
                        {/* Group */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                          {result.group}
                        </td>
                        {/* Institution */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                          {result.institution}
                        </td>
                      </>
                    ) : (
                      <>
                        {/* Position - Hidden in medals view */}
                        {viewMode !== 'medals' && (
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-charcoal">
                            {result.position}
                          </td>
                        )}

                        {/* Name */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                          {result.name}
                        </td>

                        {/* Group */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                          {result.group}
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                          {result.category}
                        </td>

                        {/* Score - Hidden in medals view */}
                        {viewMode !== 'medals' && (
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className="text-sm font-semibold text-charcoal">
                              {result.score}
                            </span>
                          </td>
                        )}

                        {/* Institution - Hidden in medals view */}
                        {viewMode !== 'medals' && (
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                            {result.institution}
                          </td>
                        )}

                        {/* Medal Column (only shown in medals view) */}
                        {viewMode === 'medals' && (
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className="text-sm text-charcoal capitalize">
                              {(result as FinalsResult).medal} Medal
                            </span>
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-charcoal-light text-lg">
                {searchTerm ? 'No results found matching your search.' : 
                 viewMode === 'medals' ? 'No medal winners found.' :
                 viewMode === 'trophies' ? 'No trophy winners found.' :
                 'No results found.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
