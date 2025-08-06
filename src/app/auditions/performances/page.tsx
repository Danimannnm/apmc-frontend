'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import PerformanceList from '@/components/PerformanceList';
import { Performer } from '@/types';

// Hardcoded auditions data
const initialAuditionsData: Performer[] = [
  {
    id: 1,
    name: "Ayleen Ovais",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: true
  },
  {
    id: 2,
    name: "Ovais Ashraf",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: true
  },
  {
    id: 3,
    name: "Fareeha Irfan",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: false
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    group: "Under 15",
    category: "Classical",
    institution: "Beacon House School",
    completed: false
  },
  {
    id: 5,
    name: "Sara Khan",
    group: "Under 15",
    category: "Folk",
    institution: "City School Lahore",
    completed: true
  },
  {
    id: 6,
    name: "Muhammad Ali",
    group: "Under 20",
    category: "Classical",
    institution: "Aitchison College",
    completed: false
  },
  {
    id: 7,
    name: "Fatima Sheikh",
    group: "Under 20",
    category: "Semi-Classical",
    institution: "Lahore Grammar School",
    completed: false
  },
  {
    id: 8,
    name: "Zain Malik",
    group: "Adult",
    category: "Folk",
    institution: "University of Punjab",
    completed: true
  },
  {
    id: 9,
    name: "Aisha Bhatti",
    group: "Adult",
    category: "Classical",
    institution: "National College of Arts",
    completed: false
  },
  {
    id: 10,
    name: "Hassan Ahmad",
    group: "Adult",
    category: "Qawwali",
    institution: "University of Karachi",
    completed: false
  }
];

export default function AuditionPerformancesPage() {
  const [performers, setPerformers] = useState<Performer[]>(initialAuditionsData);

  const handlePerformerComplete = (id: number, completed: boolean) => {
    setPerformers(prev => 
      prev.map(performer => 
        performer.id === id 
          ? { ...performer, completed }
          : performer
      )
    );
  };

  return (
    <Layout>
      <PerformanceList 
        performers={performers}
        title="Auditions - Performance List"
        onPerformerComplete={handlePerformerComplete}
      />
    </Layout>
  );
}
