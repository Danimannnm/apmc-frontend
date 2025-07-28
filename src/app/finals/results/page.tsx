import GenericPage from '@/components/GenericPage';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function FinalsResultsPage() {
  return (
    <GenericPage
      title="Finals - Results"
      description="View results and scores from the final round"
      icon={ChartBarIcon}
    />
  );
}
