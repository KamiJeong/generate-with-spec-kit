import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { ProgressSummary, RiskBadge } from '@wiki/components/shared/StatusIndicators';
import type { Project, UserRolePerspective } from '@wiki/types';

export function StatsSummary({ projects, role }: { projects: Project[]; role: UserRolePerspective }) {
  const blocked = projects.filter((project) => project.riskState === 'blocked').length;
  const average =
    projects.length === 0
      ? 0
      : Math.round(projects.reduce((sum, project) => sum + project.completionPercent, 0) / projects.length);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>전체 프로젝트</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{projects.length}</p>
          <p className="text-sm text-muted-foreground">{role.projectEmphasis}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>평균 진행률</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressSummary value={average} label="평균 완료율" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>막힘 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-3xl font-semibold">{blocked}</p>
          <RiskBadge risk={blocked > 0 ? 'blocked' : 'normal'} />
        </CardContent>
      </Card>
    </div>
  );
}
