import type * as React from 'react';

import { cn } from '@/lib/utils';

function ButtonGroup({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        'inline-flex items-center gap-2',
        orientation === 'vertical' && 'flex-col items-stretch',
        className
      )}
      role="group"
      {...props}
    />
  );
}

export { ButtonGroup };
