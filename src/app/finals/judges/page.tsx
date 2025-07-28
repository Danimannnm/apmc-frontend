import GenericPage from '@/components/GenericPage';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function FinalsJudgesPage() {
  return (
    <GenericPage
      title="Finals - Judges"
      description="Manage and view judges for the final round"
      icon={UserGroupIcon}
      requiresAuth={true}
      allowedRoles={['judge', 'admin']}
    />
  );
}
