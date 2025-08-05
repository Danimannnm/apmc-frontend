'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Performer, Score } from '@/types';

interface JudgingInterfaceProps {
  performers: Performer[];
  title: string;
  stage: 'auditions' | 'finals';
}

// Scoring criteria by category
const SCORING_CRITERIA = {
  'Classical': [
    { id: 'technique', name: 'Technical Proficiency', maxPoints: 25, description: 'Voice control, intonation, rhythm' },
    { id: 'expression', name: 'Musical Expression', maxPoints: 25, description: 'Emotional delivery, interpretation' },
    { id: 'tradition', name: 'Traditional Authenticity', maxPoints: 25, description: 'Adherence to classical traditions' },
    { id: 'presentation', name: 'Stage Presence', maxPoints: 25, description: 'Confidence, audience engagement' }
  ],
  'Folk': [
    { id: 'authenticity', name: 'Folk Authenticity', maxPoints: 30, description: 'True to folk traditions' },
    { id: 'storytelling', name: 'Storytelling', maxPoints: 25, description: 'Narrative and emotional connection' },
    { id: 'vocal', name: 'Vocal Quality', maxPoints: 25, description: 'Voice clarity and control' },
    { id: 'presentation', name: 'Stage Presence', maxPoints: 20, description: 'Confidence and charisma' }
  ],
  'Qawwali': [
    { id: 'spiritual', name: 'Spiritual Expression', maxPoints: 30, description: 'Devotional authenticity' },
    { id: 'vocal', name: 'Vocal Power', maxPoints: 25, description: 'Voice strength and control' },
    { id: 'rhythm', name: 'Rhythmic Mastery', maxPoints: 25, description: 'Tabla coordination, timing' },
    { id: 'audience', name: 'Audience Connection', maxPoints: 20, description: 'Spiritual engagement with audience' }
  ]
};

export default function JudgingInterface({ performers, title }: JudgingInterfaceProps) {
  const { user } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPerformer, setSelectedPerformer] = useState<number | null>(null);
  const [scores, setScores] = useState<{ [performerId: number]: Score[] }>({});
  const [remarks, setRemarks] = useState<{ [performerId: number]: string }>({});

  // Check if user is authorized
  const isAuthorized = user?.role === UserRole.ADMIN || user?.role === UserRole.JUDGE;

  // Get unique groups and categories - moved before early return
  const groups = useMemo(() => {
    const uniqueGroups = [...new Set(performers.map(p => p.group))];
    return uniqueGroups.sort();
  }, [performers]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(performers.map(p => p.category))];
    return uniqueCategories.sort();
  }, [performers]);

  // Filter performers
  const filteredPerformers = useMemo(() => {
    return performers.filter(performer => {
      const matchesGroup = selectedGroup === 'all' || performer.group === selectedGroup;
      const matchesCategory = selectedCategory === 'all' || performer.category === selectedCategory;
      
      return matchesGroup && matchesCategory;
    });
  }, [performers, selectedGroup, selectedCategory]);

  if (!isAuthorized) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-maroon/10 border border-maroon/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-maroon mb-2">Access Restricted</h2>
          <p className="text-charcoal-light">This page is only accessible to judges and administrators.</p>
        </div>
      </div>
    );
  }

  // Handle score change with auto-save
  const handleScoreChange = (performerId: number, criterionId: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [performerId]: [
        ...(prev[performerId] || []).filter(s => s.criterionId !== criterionId),
        { criterionId, points }
      ]
    }));

    // Auto-save to backend (in production, this would be an API call)
    const performer = performers.find(p => p.id === performerId);
    if (performer) {
      console.log('Auto-saving score change:', {
        performerId,
        criterionId,
        points,
        performer: performer.name,
        timestamp: new Date().toISOString()
      });
      
      // Here you would make an API call to save the individual score
      // Example: await saveScore({ performerId, criterionId, points });
    }
  };

  // Handle remarks change (only update state, don't save yet)
  const handleRemarksChange = (performerId: number, remarksText: string) => {
    setRemarks(prev => ({
      ...prev,
      [performerId]: remarksText
    }));
  };

  // Handle remarks blur (save to backend when user clicks out)
  const handleRemarksBlur = (performerId: number, remarksText: string) => {
    // Auto-save remarks to backend when user unfocuses the input
    const performer = performers.find(p => p.id === performerId);
    if (performer) {
      console.log('Auto-saving remarks on blur:', {
        performerId,
        remarks: remarksText,
        performer: performer.name,
        timestamp: new Date().toISOString()
      });
      
      // Here you would make an API call to save the remarks
      // Example: await saveRemarks({ performerId, remarks: remarksText });
    }
  };

  // Get total score for a performer
  const getTotalScore = (performerId: number) => {
    const performerScores = scores[performerId] || [];
    return performerScores.reduce((total, score) => total + score.points, 0);
  };

  // Get score for a specific criterion of a performer
  const getScoreForCriterion = (performerId: number, criterionId: string) => {
    const performerScores = scores[performerId] || [];
    return performerScores.find(s => s.criterionId === criterionId)?.points || 0;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-6">
        {title}
      </h1>

      {/* Filters */}
      <div className="bg-card-bg rounded-lg p-6 mb-6 border border-gray-100">
        {/* Group and Category Filters */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Group Filter */}
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

          {/* Category Filter */}
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

      {/* Scoring Table */}
      <div className="bg-card-bg rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  No.
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Name
                </th>
                {/* Dynamic criterion columns based on filtered category */}
                {selectedCategory !== 'all' && SCORING_CRITERIA[selectedCategory as keyof typeof SCORING_CRITERIA] ? 
                  SCORING_CRITERIA[selectedCategory as keyof typeof SCORING_CRITERIA].map((criterion) => (
                    <th key={criterion.id} className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">
                      {criterion.name.split(' ')[0]} {/* Show first word */}
                    </th>
                  )) : 
                  // Show generic columns when "all" categories selected
                  <>
                    <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">Sur</th>
                    <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">Lei</th>
                    <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">Tarana</th>
                  </>
                }
                <th className="px-4 py-3 text-center text-sm font-medium uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPerformers.map((performer) => {
                const criteria = SCORING_CRITERIA[performer.category as keyof typeof SCORING_CRITERIA] || [];
                const isSelected = selectedPerformer === performer.id;
                const hasPerformed = performer.hasPerformed || false;
                
                return (
                  <tr 
                    key={performer.id}
                    onClick={() => setSelectedPerformer(performer.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'border-2' : ''
                    } ${
                      hasPerformed ? 'bg-emerald-100 hover:bg-emerald-150' : 'bg-white hover:bg-gray-50'
                    }`}
                    style={isSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: '#f8d273' } : {}}
                  >
                    {/* Row Number */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={isSelected ? 'font-bold text-charcoal' : 'text-charcoal'}>
                        {performer.id}
                      </span>
                    </td>

                    {/* Performer Name */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={isSelected ? 'font-bold text-charcoal' : 'text-charcoal'}>
                        {performer.name}
                      </span>
                    </td>

                    {/* Scoring Columns */}
                    {selectedCategory !== 'all' && SCORING_CRITERIA[selectedCategory as keyof typeof SCORING_CRITERIA] ? 
                      // Show actual criteria when specific category is selected
                      SCORING_CRITERIA[selectedCategory as keyof typeof SCORING_CRITERIA].map((criterion) => (
                        <td key={criterion.id} className="px-4 py-3 text-center">
                          {performer.category === selectedCategory ? (
                            <select
                              value={getScoreForCriterion(performer.id, criterion.id)}
                              onChange={(e) => handleScoreChange(performer.id, criterion.id, parseInt(e.target.value))}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-emerald-500 focus:border-emerald-500"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value={0}>0</option>
                              {Array.from({ length: criterion.maxPoints }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      )) : 
                      // Show performer's actual criteria when "all" is selected
                      criteria.slice(0, 3).map((criterion) => (
                        <td key={criterion.id} className="px-4 py-3 text-center">
                          <select
                            value={getScoreForCriterion(performer.id, criterion.id)}
                            onChange={(e) => handleScoreChange(performer.id, criterion.id, parseInt(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-emerald-500 focus:border-emerald-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value={0}>0</option>
                            {Array.from({ length: criterion.maxPoints }, (_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </td>
                      ))
                    }

                    {/* Fill empty columns if needed */}
                    {selectedCategory === 'all' && criteria.length < 3 && 
                      Array.from({ length: 3 - criteria.length }, (_, i) => (
                        <td key={`empty-${i}`} className="px-4 py-3 text-center">
                          <span className="text-gray-400">-</span>
                        </td>
                      ))
                    }

                    {/* Total Score */}
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-semibold ${isSelected ? 'font-bold' : ''} text-emerald-600`}>
                        {getTotalScore(performer.id)}
                      </span>
                    </td>

                    {/* Remarks */}
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={remarks[performer.id] || ''}
                        onChange={(e) => handleRemarksChange(performer.id, e.target.value)}
                        onBlur={(e) => handleRemarksBlur(performer.id, e.target.value)}
                        placeholder="Enter remarks..."
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-emerald-500 focus:border-emerald-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPerformers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-light text-lg">
              No performers found matching the selected filters.
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-card-bg rounded-lg p-4 border border-gray-100">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-emerald-200 rounded"></div>
            <span>Performed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f8d273' }}></div>
            <span>Selected </span>
          </div>
        </div>
      </div>
    </div>
  );
}
