import { Badge } from '@myorg/ui';
import type { ProjectStatus } from '@wiki/types';

interface StatusBadgeProps {
  status: ProjectStatus;
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  in_progress: '진행 중',
  completed: '완료',
  blocked: '차단됨',
};

const STATUS_VARIANT: Record<ProjectStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  in_progress: 'default',
  completed: 'secondary',
  blocked: 'destructive',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANT[status]}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}
