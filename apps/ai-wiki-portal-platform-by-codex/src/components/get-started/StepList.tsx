import { Button, Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { Link } from 'react-router-dom';
import { ExecutionStatusBadge } from '@wiki/components/shared/StatusIndicators';
import { wikiDocPath } from '@wiki/routes';
import type { ExecutionStep } from '@wiki/types';

export function StepList({ steps }: { steps: ExecutionStep[] }) {
  return (
    <div className="grid gap-4">
      {steps.map((step, index) => (
        <Card key={step.id}>
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle>
                {index + 1}. {step.title}
              </CardTitle>
              <ExecutionStatusBadge status={step.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{step.description}</p>
            <p className="text-sm">기대 결과: {step.expectedResult}</p>
            <Button asChild variant={step.status === 'blocked' ? 'default' : 'outline'} size="sm">
              <Link to={wikiDocPath(step.linkedDocumentId)}>
                {step.status === 'blocked' ? '막힘 해결 문서 열기' : '관련 문서 열기'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
