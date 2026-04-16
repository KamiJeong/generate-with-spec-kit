import { Button, Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { Link } from 'react-router-dom';
import {
  ExecutionStatusBadge,
  ProgressSummary,
  RiskBadge,
} from '@wiki/components/shared/StatusIndicators';
import { projectPath } from '@wiki/routes';
import type { Project } from '@wiki/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{project.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">담당자: {project.owner}</p>
          </div>
          <RiskBadge risk={project.riskState} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <ExecutionStatusBadge status={project.executionStatus} />
          <span className="text-sm text-muted-foreground">{project.currentStage}</span>
        </div>
        <ProgressSummary value={project.completionPercent} label="완료율" />
        <p className="text-sm text-muted-foreground">{project.recentActivity}</p>
        <p className="text-xs text-muted-foreground">{project.lastUpdatedLabel}</p>
        <Button asChild variant="outline" size="sm">
          <Link to={projectPath(project.id)}>프로젝트 상세</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
