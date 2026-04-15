import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { IntegrationBadge } from '@wiki/components/shared/StatusIndicators';
import type { IntegrationStatus } from '@wiki/types';

export function GithubStatusCard({ integrations }: { integrations: IntegrationStatus[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub 및 지식 저장소 상태</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.serviceName} className="rounded-md border px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{integration.serviceName}</p>
              <IntegrationBadge availability={integration.availability} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{integration.summary}</p>
            <p className="mt-1 text-xs text-muted-foreground">{integration.lastCheckedLabel}</p>
            <p className="mt-2 text-sm font-medium">{integration.recoveryAction}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
