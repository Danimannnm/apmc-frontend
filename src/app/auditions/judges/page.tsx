'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import JudgingInterface from '@/components/JudgingInterface';
import { Performer } from '@/types';

// Sample auditions data with sequential performance order
const initialAuditionsData: Performer[] = [
  // Under 10 - Folk Category (performed first)
  {
    id: 1,
    name: "Ayleen Ovais",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: true,
    hasPerformed: true,
    isCurrentlyJudging: false,
    remarks: "Beautiful voice quality, strong folk tradition understanding"
  },
  {
    id: 2,
    name: "Ovais Ashraf",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: true,
    hasPerformed: true,
    isCurrentlyJudging: false,
    remarks: "Good performance, needs confidence on stage"
  },
  {
    id: 3,
    name: "Fareeha Irfan",
    group: "Under 10",
    category: "Folk",
    institution: "Beacon House Islamabad",
    completed: false,
    hasPerformed: true,
    isCurrentlyJudging: false
  },
  
  // Under 10 - Classical Category (currently performing)
  {
    id: 4,
    name: "Ahmed Hassan",
    group: "Under 10",
    category: "Classical",
    institution: "City School Islamabad",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: true
  },
  {
    id: 5,
    name: "Zainab Khan",
    group: "Under 10",
    category: "Classical",
    institution: "Roots School Islamabad",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  
  // Under 15 - Folk Category (upcoming)
  {
    id: 6,
    name: "Sara Khan",
    group: "Under 15",
    category: "Folk",
    institution: "LGS Lahore",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  {
    id: 7,
    name: "Ali Raza",
    group: "Under 15",
    category: "Folk",
    institution: "Beacon House Lahore",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  
  // Under 15 - Classical Category (upcoming)
  {
    id: 8,
    name: "Fatima Sheikh",
    group: "Under 15",
    category: "Classical",
    institution: "City School Lahore",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  
  // Adult - Qawwali Category (upcoming)
  {
    id: 9,
    name: "Muhammad Tariq",
    group: "Adult",
    category: "Qawwali",
    institution: "NAPA Karachi",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  },
  {
    id: 10,
    name: "Hassan Ahmad",
    group: "Adult",
    category: "Qawwali",
    institution: "University of Karachi",
    completed: false,
    hasPerformed: false,
    isCurrentlyJudging: false
  }
];

export default function AuditionJudgesPage() {
  const [performers] = useState<Performer[]>(initialAuditionsData);

  return (
    <Layout>
      <JudgingInterface 
        performers={performers}
        title="Auditions - Judging Panel"
        stage="auditions"
      />
    </Layout>
  );
}
