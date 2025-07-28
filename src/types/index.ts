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
