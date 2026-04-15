import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { useParams } from 'react-router-dom';
import { AiQueryPanel } from '@wiki/components/project/AiQueryPanel';
import { GithubStatusCard } from '@wiki/components/project/GithubStatusCard';
import { ProjectTimeline } from '@wiki/components/project/ProjectTimeline';
import { SupportContextPanel } from '@wiki/components/project/SupportContextPanel';
import { FeedbackEntry } from '@wiki/components/shared/FeedbackEntry';
import { EmptyState } from '@wiki/components/shared/StateFeedback';
import { ProgressSummary, RiskBadge } from '@wiki/components/shared/StatusIndicators';
import { useRolePerspective } from '@wiki/lib/role-context';
import {
  getIntegrationsForProject,
  getProjectById,
  getProjectSteps,
  getRolePerspective,
} from '@wiki/mock/selectors';

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const { roleId } = useRolePerspective();
  const project = getProjectById(projectId);
  const role = getRolePerspective(roleId);

  if (!project) {
    return <EmptyState title="프로젝트를 찾을 수 없습니다" description="대시보드에서 프로젝트를 다시 선택하세요." />;
  }

  const steps = getProjectSteps(project.id);
  const integrations = getIntegrationsForProject(project.id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                담당자 {project.owner} · {project.lastUpdatedLabel}
              </p>
            </div>
            <RiskBadge risk={project.riskState} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProgressSummary value={project.completionPercent} label="프로젝트 완료율" />
          <p className="text-sm text-muted-foreground">{project.nextRecommendedAction}</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ProjectTimeline steps={steps} />
        <div className="space-y-4">
          <GithubStatusCard integrations={integrations} />
          <SupportContextPanel project={project} role={role} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <AiQueryPanel sourceLabel={project.name} context={`${project.name} 프로젝트의 ${project.currentStage} 단계에서 질문합니다.`} />
        <FeedbackEntry sourceLabel={project.name} />
      </div>
    </div>
  );
}
