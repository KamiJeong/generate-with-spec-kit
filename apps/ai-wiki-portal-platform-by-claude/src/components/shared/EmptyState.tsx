import { Empty } from '@kamijeong/ui';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <Empty icon={icon} title={title} description={description} />
      {action && <div>{action}</div>}
    </div>
  );
}
