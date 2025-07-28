'use client';

import Layout from '@/components/Layout';

export default function AdminDashboardPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-charcoal mb-6">
          Admin Dashboard
        </h1>
        <div className="bg-card-bg rounded-lg shadow-lg p-8 min-h-96 flex items-center justify-center">
          <p className="text-charcoal-light text-lg">Admin content coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
