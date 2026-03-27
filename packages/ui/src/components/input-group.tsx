import type * as React from 'react';

import { cn } from '@/lib/utils';

function InputGroup({
  className,
  prefix,
  suffix,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        'border-input focus-within:border-ring focus-within:ring-ring/50 flex min-h-9 w-full items-center overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]',
        className
      )}
      {...props}
    >
      {prefix ? (
        <span className="flex items-center border-r px-3 text-sm text-muted-foreground">
          {prefix}
        </span>
      ) : null}
      <div className="flex-1 [&_input]:border-0 [&_input]:shadow-none [&_input]:focus-visible:ring-0">
        {children}
      </div>
      {suffix ? (
        <span className="flex items-center border-l px-3 text-sm text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

export { InputGroup };
