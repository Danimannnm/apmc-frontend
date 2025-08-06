'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import PerformanceList from '@/components/PerformanceList';
import { Performer } from '@/types';

// Hardcoded finals data - these are the performers who qualified from auditions
const initialFinalsData: Performer[] = [
  {
    id: 1,
    name: "Ayleen Ovais",
    group: "Under 10",
    category: "Folk",
    institution: "LGS Islamabad",
    completed: false
  },
  {
    id: 2,
    name: "Sara Khan",
    group: "Under 15",
    category: "Folk",
    institution: "City School Lahore",
    completed: true
  },
  {
    id: 3,
    name: "Muhammad Ali",
    group: "Under 20",
    category: "Classical",
    institution: "Aitchison College",
    completed: false
  },
  {
    id: 4,
    name: "Zain Malik",
    group: "Adult",
    category: "Folk",
    institution: "University of Punjab",
    completed: true
  },
  {
    id: 5,
    name: "Aisha Bhatti",
    group: "Adult",
    category: "Classical",
    institution: "National College of Arts",
    completed: false
  },
  {
    id: 6,
    name: "Amina Tariq",
    group: "Under 15",
    category: "Semi-Classical",
    institution: "Beaconhouse School",
    completed: false
  },
  {
    id: 7,
    name: "Omar Farooq",
    group: "Under 20",
    category: "Qawwali",
    institution: "Government College University",
    completed: true
  },
  {
    id: 8,
    name: "Mariam Siddique",
    group: "Adult",
    category: "Folk",
    institution: "LUMS",
    completed: false
  }
];

export default function FinalsPerformancesPage() {
  const [performers, setPerformers] = useState<Performer[]>(initialFinalsData);

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
        title="Finals - Performance List"
        onPerformerComplete={handlePerformerComplete}
      />
    </Layout>
  );
}
