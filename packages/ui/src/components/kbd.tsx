import type * as React from 'react';

import { cn } from '@/lib/utils';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex min-h-6 items-center rounded-md border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground shadow-xs',
        className
      )}
      {...props}
    />
  );
}

export { Kbd };
