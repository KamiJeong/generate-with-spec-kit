import { Spinner } from '@myorg/ui';

interface LoadingSpinnerProps {
  size?: 'sm' | 'default' | 'lg';
  label?: string;
}

export function LoadingSpinner({ size = 'default', label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <Spinner size={size} />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
