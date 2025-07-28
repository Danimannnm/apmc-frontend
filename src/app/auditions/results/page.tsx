import GenericPage from '@/components/GenericPage';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function AuditionsResultsPage() {
  return (
    <GenericPage
      title="Auditions - Results"
      description="View results and scores from the audition round"
      icon={ChartBarIcon}
    />
  );
}
