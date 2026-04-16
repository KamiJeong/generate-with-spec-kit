import { Card, CardContent, CardHeader, CardTitle, Progress } from '@kamijeong/ui';
import { StatusBadge } from '@wiki/components/shared/StatusBadge';
import type { Project } from '@wiki/types';

interface ProjectTimelineProps {
  project: Project;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">프로젝트 현황</CardTitle>
          <StatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">전체 진행률</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} max={100} aria-label="프로젝트 진행률" />
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">시작일</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
          {project.githubRepo && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">저장소</span>
              <span className="font-mono text-xs">{project.githubRepo}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
