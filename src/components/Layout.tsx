'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import LogoTab from './LogoTab';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-page-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-charcoal">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg relative">
      {/* Global background pattern */}
      <div className="fixed inset-0 bg-pattern-main opacity-6 pointer-events-none z-0"></div>
      
      <Sidebar />
      <main className="w-full lg:pl-4 relative z-10">
        <div className="pt-16 px-6 pb-6 lg:p-8">
          {children}
        </div>
      </main>
      
      {/* Logo pull tab in bottom right corner */}
      <LogoTab />
    </div>
  );
}
