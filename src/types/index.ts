// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  JUDGE = 'judge',
  CONTESTANT = 'contestant',
  GUEST = 'guest'
}

// User interface
export interface User {
  id: string;
  username: string;
  role: UserRole;
  isAuthenticated: boolean;
}

// Navigation item interface
export interface NavItem {
  title: string;
  href: string;
  requiredRoles?: UserRole[];
  children?: NavItem[];
}

// Auth context interface
export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Performance and Scoring interfaces
export interface Performer {
  id: number;
  name: string;
  group: string;
  category: string;
  institution: string;
  completed: boolean;
  hasPerformed?: boolean;
  isCurrentlyJudging?: boolean;
  remarks?: string;
}

export interface ScoreCriterion {
  id: string;
  name: string;
  maxPoints: number;
  description?: string;
}

export interface Score {
  criterionId: string;
  points: number;
}

export interface PerformanceScore {
  performerId: number;
  judgeId: string;
  scores: Score[];
  totalScore: number;
  submittedAt?: Date;
}

// Scoring criteria by category
export interface CategoryCriteria {
  [category: string]: ScoreCriterion[];
}
