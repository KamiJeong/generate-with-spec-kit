import type * as React from 'react';

import { cn } from '@/lib/utils';

function Empty({
  className,
  icon,
  title,
  description,
  ...props
}: React.ComponentProps<'div'> & {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div
      data-slot="empty"
      role="status"
      className={cn(
        'flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/30 px-6 py-8 text-center',
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      ) : null}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

export { Empty };
