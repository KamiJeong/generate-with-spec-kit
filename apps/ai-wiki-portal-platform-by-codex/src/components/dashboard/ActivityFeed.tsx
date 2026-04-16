import { Button, Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { RefreshCw } from 'lucide-react';
import type { Project } from '@wiki/types';

interface ActivityFeedProps {
  projects: Project[];
  refreshed: boolean;
  onRefresh: () => void;
}

export function ActivityFeed({ projects, refreshed, onRefresh }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>최근 활동</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={onRefresh} className="gap-2">
          <RefreshCw className="size-4" aria-hidden="true" />
          수동 새로고침
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-md border px-3 py-2">
            <p className="text-sm font-medium">{project.name}</p>
            <p className="text-sm text-muted-foreground">
              {refreshed ? project.sampleStateChange : project.recentActivity}
            </p>
          </div>
        ))}
        {refreshed ? (
          <p role="status" className="text-sm text-muted-foreground">
            mock 데이터가 갱신되었습니다.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
