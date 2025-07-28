import GenericPage from '@/components/GenericPage';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default function FinalsPerformancePage() {
  return (
    <GenericPage
      title="Finals - Performance List"
      description="View all scheduled performances for the final round"
      icon={ClipboardDocumentListIcon}
    />
  );
}
