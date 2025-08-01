'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import JudgingInterface from '@/components/JudgingInterface';
import { Performer } from '@/types';

// Finals data - Top qualifiers from auditions in sequential performance order
const initialFinalsData: Performer[] = [
  // Under 10 - Folk Category Winners (performed first)
  {
    id: 11,
    name: "Ayleen Ovais",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: false,
    hasPerformed: true,
    isCurrentlyJudging: false,
    remarks: "Excellent folk authenticity and emotional connection - audition winner"
  },
  {
    id: 12,
    name: "Zara Ahmed",
    group: "Under 10",
    category: "Folk",
    institution: "Beacon House Lahore",
    completed: false,
    hasPerformed: true,
    isCurrentlyJudging: false,
    remarks: "Strong storytelling ability, great stage presence"
  },
  
  // Under 10 - Classical Category Winners (currently performing)
  {
    id: 13,
    name: "Ahmed Hassan",
    group: "Under 10",
    category: "Classical",
    institution: "City School Islamabad",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: true
  },
  {
    id: 14,
    name: "Hamza Ali",
    group: "Under 10",
    category: "Classical",
    institution: "Roots School Karachi",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  
  // Under 15 - Folk Category Winners (upcoming)
  {
    id: 15,
    name: "Sara Khan",
    group: "Under 15",
    category: "Folk",
    institution: "LGS Lahore",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  {
    id: 16,
    name: "Noor Fatima",
    group: "Under 15",
    category: "Folk",
    institution: "City School DHA",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  
  // Under 15 - Classical Category Winners (upcoming)
  {
    id: 17,
    name: "Maham Siddiqui",
    group: "Under 15",
    category: "Classical",
    institution: "Convent of Jesus & Mary",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  {
    id: 18,
    name: "Bilal Hassan",
    group: "Under 15",
    category: "Classical",
    institution: "Beacon House Gulberg",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  
  // Adult - Qawwali Category Winners (upcoming)
  {
    id: 19,
    name: "Usman Shah",
    group: "Adult",
    category: "Qawwali",
    institution: "NAPA Lahore",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  {
    id: 20,
    name: "Tariq Mehmood",
    group: "Adult",
    category: "Qawwali",
    institution: "Government College University",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  }
];

export default function FinalsJudgesPage() {
  const [performers] = useState<Performer[]>(initialFinalsData);

  return (
    <Layout>
      <JudgingInterface 
        performers={performers}
        title="Finals - Judging Panel"
        stage="finals"
      />
    </Layout>
  );
}
