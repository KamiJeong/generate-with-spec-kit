import { LoaderCircleIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Spinner({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof LoaderCircleIcon> & {
  size?: 'sm' | 'default' | 'lg';
}) {
  return (
    <LoaderCircleIcon
      data-slot="spinner"
      aria-label="Loading"
      className={cn(
        'animate-spin text-primary',
        size === 'sm' && 'size-4',
        size === 'default' && 'size-5',
        size === 'lg' && 'size-6',
        className
      )}
      {...props}
    />
  );
}

export { Spinner };
