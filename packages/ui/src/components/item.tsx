import type * as React from 'react';

import { cn } from '@/lib/utils';

function Item({
  className,
  icon,
  label,
  shortcut,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'label'> & {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
}) {
  return (
    <div
      data-slot="item"
      className={cn(
        'flex min-h-9 items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
        <span>{label}</span>
        {children}
      </span>
      {shortcut ? (
        <span className="font-mono text-xs text-muted-foreground">
          {shortcut}
        </span>
      ) : null}
    </div>
  );
}

export { Item };
