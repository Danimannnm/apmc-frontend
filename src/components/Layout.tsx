'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';

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
    <div className="min-h-screen bg-page-bg">
      <Sidebar />
      <main className="w-full lg:pl-4">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
