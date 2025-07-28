import GenericPage from '@/components/GenericPage';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function AuditionsJudgesPage() {
  return (
    <GenericPage
      title="Auditions - Judges"
      description="Manage and view judges for the audition round"
      icon={UserGroupIcon}
      requiresAuth={true}
      allowedRoles={['judge', 'admin']}
    />
  );
}
