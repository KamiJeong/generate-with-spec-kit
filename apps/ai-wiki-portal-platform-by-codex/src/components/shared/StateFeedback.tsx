import { Alert, AlertDescription, AlertTitle, Button, Empty, Spinner } from '@myorg/ui';
import { AlertCircle, Inbox, RefreshCw } from 'lucide-react';

interface StateFeedbackProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function LoadingState({ label = '화면을 준비하는 중...' }: { label?: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center gap-3" role="status">
      <Spinner size="default" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function EmptyState({ title, description, actionLabel, onAction }: StateFeedbackProps) {
  return (
    <div className="space-y-3">
      <Empty
        icon={<Inbox className="size-5" aria-hidden="true" />}
        title={title}
        description={description}
      />
      {actionLabel && onAction ? (
        <div className="flex justify-center">
          <Button type="button" variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function UnavailableState({ title, description, actionLabel, onAction }: StateFeedbackProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" aria-hidden="true" />
      <AlertTitle>{title}</AlertTitle>
      {description ? <AlertDescription>{description}</AlertDescription> : null}
      {actionLabel && onAction ? (
        <div className="mt-3">
          <Button type="button" variant="outline" size="sm" onClick={onAction}>
            <RefreshCw className="size-4" aria-hidden="true" />
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </Alert>
  );
}

export function ErrorState(props: StateFeedbackProps) {
  return <UnavailableState {...props} />;
}
