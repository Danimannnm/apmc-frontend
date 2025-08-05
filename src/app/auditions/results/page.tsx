'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import Layout from '@/components/Layout';
import { 
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface AuditionResult {
  id: number;
  name: string;
  group: string;
  category: string;
  score: number;
  institution: string;
  qualifiedForFinals: boolean;
}

// Sample audition results data - sorted by score (highest first)
const initialResults: AuditionResult[] = [
  {
    id: 1,
    name: "Ayleen Ovais",
    group: "Under 10",
    category: "Folk",
    score: 92,
    institution: "LGS Islamabad",
    qualifiedForFinals: true
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    group: "Under 10",
    category: "Classical",
    score: 89,
    institution: "City School Islamabad",
    qualifiedForFinals: true
  },
  {
    id: 3,
    name: "Sara Khan",
    group: "Under 15",
    category: "Folk",
    score: 88,
    institution: "LGS Lahore",
    qualifiedForFinals: true
  },
  {
    id: 4,
    name: "Zain Malik",
    group: "Adult",
    category: "Folk",
    score: 87,
    institution: "University of Punjab",
    qualifiedForFinals: true
  },
  {
    id: 5,
    name: "Muhammad Tariq",
    group: "Adult",
    category: "Qawwali",
    score: 85,
    institution: "NAPA Karachi",
    qualifiedForFinals: true
  },
  {
    id: 6,
    name: "Fatima Sheikh",
    group: "Under 20",
    category: "Classical",
    score: 84,
    institution: "Lahore Grammar School",
    qualifiedForFinals: true
  },
  {
    id: 7,
    name: "Aisha Bhatti",
    group: "Adult",
    category: "Classical",
    score: 82,
    institution: "National College of Arts",
    qualifiedForFinals: true
  },
  {
    id: 8,
    name: "Omar Farooq",
    group: "Under 20",
    category: "Qawwali",
    score: 80,
    institution: "Government College University",
    qualifiedForFinals: true
  },
  {
    id: 9,
    name: "Ovais Ashraf",
    group: "Under 10",
    category: "Folk",
    score: 78,
    institution: "LGS Islamabad",
    qualifiedForFinals: false
  },
  {
    id: 10,
    name: "Fareeha Irfan",
    group: "Under 10",
    category: "Folk",
    score: 75,
    institution: "Beacon House Islamabad",
    qualifiedForFinals: false
  },
  {
    id: 11,
    name: "Ali Raza",
    group: "Under 15",
    category: "Folk",
    score: 72,
    institution: "Beacon House Lahore",
    qualifiedForFinals: false
  },
  {
    id: 12,
    name: "Hassan Ahmad",
    group: "Adult",
    category: "Qawwali",
    score: 70,
    institution: "University of Karachi",
    qualifiedForFinals: false
  }
];

export default function AuditionResultsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [results, setResults] = useState<AuditionResult[]>(initialResults);

  // Check if user is admin (for finals checkbox editing)
  const isAdmin = user?.role === UserRole.ADMIN;

  // Get unique groups and categories
  const groups = useMemo(() => {
    const uniqueGroups = [...new Set(results.map(r => r.group))];
    return uniqueGroups.sort();
  }, [results]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(results.map(r => r.category))];
    return uniqueCategories.sort();
  }, [results]);

  // Filter and search results
  const filteredResults = useMemo(() => {
    return results.filter(result => {
      const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.institution.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = selectedGroup === 'all' || result.group === selectedGroup;
      const matchesCategory = selectedCategory === 'all' || result.category === selectedCategory;
      
      return matchesSearch && matchesGroup && matchesCategory;
    });
  }, [results, searchTerm, selectedGroup, selectedCategory]);

  // Handle finals qualification toggle
  const handleFinalsToggle = (id: number, qualified: boolean) => {
    if (!isAdmin) return;
    
    setResults(prev => 
      prev.map(result => 
        result.id === id 
          ? { ...result, qualifiedForFinals: qualified }
          : result
      )
    );

    // Auto-save to backend (in production, this would be an API call)
    const result = results.find(r => r.id === id);
    if (result) {
      console.log('Auto-saving finals qualification:', {
        performerId: id,
        qualified,
        performer: result.name,
        timestamp: new Date().toISOString()
      });
      
      // Here you would make an API call to save the qualification status
      // Example: await updateFinalsQualification({ performerId: id, qualified });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-charcoal mb-6">
          Auditions - Results
        </h1>

        {/* Search and Filters */}
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
                <option value="all">All Groups</option>
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
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-card-bg rounded-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-emerald-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">
                    Finals
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResults.map((result, index) => (
                  <tr 
                    key={result.id}
                    className={`${
                      result.qualifiedForFinals 
                        ? 'bg-emerald-50 hover:bg-emerald-100' 
                        : 'bg-white hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {/* Position */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-charcoal">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                      <span className={result.qualifiedForFinals ? 'font-semibold' : ''}>
                        {result.name}
                      </span>
                    </td>

                    {/* Group */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                      {result.group}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                      {result.category}
                    </td>

                    {/* Score */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span className={`text-sm font-semibold ${
                        result.qualifiedForFinals ? 'text-emerald-600' : 'text-charcoal'
                      }`}>
                        {result.score}
                      </span>
                    </td>

                    {/* Institution */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal">
                      {result.institution}
                    </td>

                    {/* Finals Qualification */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {isAdmin ? (
                        <input
                          type="checkbox"
                          checked={result.qualifiedForFinals}
                          onChange={(e) => handleFinalsToggle(result.id, e.target.checked)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                      ) : (
                        <div className="flex justify-center">
                          {result.qualifiedForFinals ? (
                            <div className="w-4 h-4 bg-emerald-600 rounded flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-charcoal-light text-lg">
                {searchTerm ? 'No results found matching your search.' : 'No results found.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
