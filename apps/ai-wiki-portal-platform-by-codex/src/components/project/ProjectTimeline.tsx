import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { Link } from 'react-router-dom';
import { ExecutionStatusBadge } from '@wiki/components/shared/StatusIndicators';
import { wikiDocPath } from '@wiki/routes';
import type { ExecutionStep } from '@wiki/types';

export function ProjectTimeline({ steps }: { steps: ExecutionStep[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>실행 단계</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="rounded-md border px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{step.title}</p>
              <ExecutionStatusBadge status={step.status} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            <Link className="mt-2 inline-block text-sm font-medium text-primary" to={wikiDocPath(step.linkedDocumentId)}>
              관련 문서 열기
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
