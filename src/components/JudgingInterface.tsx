'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Performer, ScoreCriterion, Score, PerformanceScore } from '@/types';
import { 
  MagnifyingGlassIcon,
  StarIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

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

export default function JudgingInterface({ performers, title, stage }: JudgingInterfaceProps) {
  const { user } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerformer, setSelectedPerformer] = useState<number | null>(null);
  const [scores, setScores] = useState<{ [performerId: number]: Score[] }>({});
  const [submittedScores, setSubmittedScores] = useState<{ [performerId: number]: boolean }>({});
  const [remarks, setRemarks] = useState<{ [performerId: number]: string }>({});

  // Check if user is authorized
  const isAuthorized = user?.role === UserRole.ADMIN || user?.role === UserRole.JUDGE;

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

  // Get unique groups and categories
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
      const matchesSearch = performer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           performer.institution.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = selectedGroup === 'all' || performer.group === selectedGroup;
      const matchesCategory = selectedCategory === 'all' || performer.category === selectedCategory;
      
      return matchesSearch && matchesGroup && matchesCategory;
    });
  }, [performers, searchTerm, selectedGroup, selectedCategory]);

  // Handle score change
  const handleScoreChange = (performerId: number, criterionId: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [performerId]: [
        ...(prev[performerId] || []).filter(s => s.criterionId !== criterionId),
        { criterionId, points }
      ]
    }));
  };

  // Handle remarks change
  const handleRemarksChange = (performerId: number, remarksText: string) => {
    setRemarks(prev => ({
      ...prev,
      [performerId]: remarksText
    }));
  };

  // Submit scores for a performer
  const handleSubmitScores = (performerId: number) => {
    const performerScores = scores[performerId] || [];
    const performer = performers.find(p => p.id === performerId);
    
    if (!performer) return;

    const criteria = SCORING_CRITERIA[performer.category as keyof typeof SCORING_CRITERIA] || [];
    
    // Check if all criteria are scored
    if (performerScores.length !== criteria.length) {
      alert('Please score all criteria before submitting.');
      return;
    }

    setSubmittedScores(prev => ({ ...prev, [performerId]: true }));
    
    // Here you would typically send the scores and remarks to your backend
    console.log('Submitted scores for performer:', performerId, {
      scores: performerScores,
      remarks: remarks[performerId] || '',
      totalScore: getTotalScore(performerId)
    });
  };

  // Get total score for a performer
  const getTotalScore = (performerId: number) => {
    const performerScores = scores[performerId] || [];
    return performerScores.reduce((total, score) => total + score.points, 0);
  };

  // Get maximum possible score for a category
  const getMaxScore = (category: string) => {
    const criteria = SCORING_CRITERIA[category as keyof typeof SCORING_CRITERIA] || [];
    return criteria.reduce((total, criterion) => total + criterion.maxPoints, 0);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-6">
        {title}
      </h1>

      {/* Filters */}
      <div className="bg-card-bg rounded-lg p-6 mb-6 border border-gray-100">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-charcoal-light" />
            </div>
            <input
              type="text"
              placeholder="Search performers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Group Filter */}
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

          {/* Category Filter */}
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

          {/* Legend */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Performed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-emerald-200 rounded"></div>
              <span>Currently Judging</span>
            </div>
            <div className="flex items-center space-x-1">
              <StarIcon 
                className="w-4 h-4 fill-current" 
                style={{ color: '#f8d273' }}
              />
              <span>Scored</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performers List */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg rounded-lg border border-gray-100 overflow-hidden">
            <div className="bg-emerald-600 text-white px-4 py-3">
              <h2 className="font-semibold">Performers ({filteredPerformers.length})</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredPerformers.map((performer) => (
                <div
                  key={performer.id}
                  onClick={() => setSelectedPerformer(performer.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    selectedPerformer === performer.id
                      ? 'border-l-4 border-l-emerald-600 font-bold'
                      : ''
                  } ${
                    performer.isCurrentlyJudging 
                      ? 'bg-emerald-100 hover:bg-emerald-150' 
                      : performer.hasPerformed 
                        ? 'bg-gray-100 text-gray-600 opacity-75 hover:bg-gray-150' 
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-medium ${
                        performer.hasPerformed && !performer.isCurrentlyJudging 
                          ? 'text-gray-500' 
                          : 'text-charcoal'
                      }`}>
                        {performer.name}
                      </h3>
                      <p className={`text-sm ${
                        performer.hasPerformed && !performer.isCurrentlyJudging 
                          ? 'text-gray-400' 
                          : 'text-charcoal-light'
                      }`}>
                        {performer.group} • {performer.category}
                      </p>
                      <p className={`text-xs ${
                        performer.hasPerformed && !performer.isCurrentlyJudging 
                          ? 'text-gray-400' 
                          : 'text-charcoal-light'
                      }`}>
                        {performer.institution}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {submittedScores[performer.id] && (
                        <StarIcon 
                          className="w-5 h-5 fill-current" 
                          style={{ color: '#f8d273' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scoring Panel */}
        <div className="lg:col-span-2">
          {selectedPerformer ? (
            <ScoringPanel
              performer={performers.find(p => p.id === selectedPerformer)!}
              scores={scores[selectedPerformer] || []}
              remarks={remarks[selectedPerformer] || ''}
              onScoreChange={(criterionId, points) => handleScoreChange(selectedPerformer, criterionId, points)}
              onRemarksChange={(remarksText) => handleRemarksChange(selectedPerformer, remarksText)}
              onSubmit={() => handleSubmitScores(selectedPerformer)}
              totalScore={getTotalScore(selectedPerformer)}
              maxScore={getMaxScore(performers.find(p => p.id === selectedPerformer)?.category || '')}
              isSubmitted={submittedScores[selectedPerformer] || false}
            />
          ) : (
            <div className="bg-card-bg rounded-lg border border-gray-100 p-8 text-center">
              <AdjustmentsHorizontalIcon className="w-16 h-16 text-charcoal-light mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal mb-2">Select a Performer to Judge</h3>
              <p className="text-charcoal-light">
                Choose a performer from the list to begin scoring their performance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Scoring Panel Component
interface ScoringPanelProps {
  performer: Performer;
  scores: Score[];
  remarks: string;
  onScoreChange: (criterionId: string, points: number) => void;
  onRemarksChange: (remarksText: string) => void;
  onSubmit: () => void;
  totalScore: number;
  maxScore: number;
  isSubmitted: boolean;
}

function ScoringPanel({ 
  performer, 
  scores, 
  remarks,
  onScoreChange, 
  onRemarksChange,
  onSubmit, 
  totalScore, 
  maxScore, 
  isSubmitted 
}: ScoringPanelProps) {
  const criteria = SCORING_CRITERIA[performer.category as keyof typeof SCORING_CRITERIA] || [];
  
  const getScoreForCriterion = (criterionId: string) => {
    return scores.find(s => s.criterionId === criterionId)?.points || 0;
  };

  return (
    <div className="bg-card-bg rounded-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4">
        <h2 className="text-xl font-semibold">{performer.name}</h2>
        <p className="text-emerald-100">
          {performer.group} • {performer.category} • {performer.institution}
        </p>
      </div>

      {/* Scoring Form */}
      <div className="p-6">
        <div className="space-y-6">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-charcoal">{criterion.name}</h3>
                  <p className="text-sm text-charcoal-light">{criterion.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-emerald-600">
                    {getScoreForCriterion(criterion.id)}/{criterion.maxPoints}
                  </span>
                </div>
              </div>
              
              <select
                value={getScoreForCriterion(criterion.id)}
                onChange={(e) => onScoreChange(criterion.id, parseInt(e.target.value))}
                disabled={isSubmitted}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100"
              >
                <option value={0}>Select Score</option>
                {Array.from({ length: criterion.maxPoints + 1 }, (_, i) => (
                  <option key={i} value={i}>{i} points</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Remarks Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Judge's Remarks
          </label>
          <textarea
            value={remarks}
            onChange={(e) => onRemarksChange(e.target.value)}
            disabled={isSubmitted}
            placeholder="Enter your comments and observations about the performance..."
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:text-gray-500 resize-none"
          />
        </div>

        {/* Total Score */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-emerald-700">Total Score:</span>
            <span className="text-2xl font-bold text-emerald-600">
              {totalScore} / {maxScore}
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${maxScore > 0 ? (totalScore / maxScore) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          {isSubmitted ? (
            <div className="flex items-center justify-center space-x-2 text-emerald-600">
              <StarIcon 
                className="w-5 h-5 fill-current" 
                style={{ color: '#f8d273' }}
              />
              <span className="font-medium">Scores Submitted</span>
            </div>
          ) : (
            <button
              onClick={onSubmit}
              disabled={scores.length !== criteria.length}
              className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Scores
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
