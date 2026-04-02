import * as React from 'react';

import { Label } from '@/components/label';
import { cn } from '@/lib/utils';

function Field({
  className,
  label,
  error,
  required,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  label: string;
  error?: string;
  required?: boolean;
}) {
  const descriptionId = React.useId();
  const child = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{
          'aria-describedby'?: string;
          'aria-invalid'?: boolean;
        }>,
        {
          'aria-describedby': error ? descriptionId : undefined,
          'aria-invalid': Boolean(error),
        }
      )
    : children;

  return (
    <div data-slot="field" className={cn('grid gap-2', className)} {...props}>
      <Label>
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {child}
      {error ? (
        <p id={descriptionId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { Field };
