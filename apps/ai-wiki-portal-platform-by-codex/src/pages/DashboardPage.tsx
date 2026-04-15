import * as React from 'react';
import { ActivityFeed } from '@wiki/components/dashboard/ActivityFeed';
import { ProjectCard } from '@wiki/components/dashboard/ProjectCard';
import { StatsSummary } from '@wiki/components/dashboard/StatsSummary';
import { EmptyState } from '@wiki/components/shared/StateFeedback';
import { useRolePerspective } from '@wiki/lib/role-context';
import { getProjectsForRole, getRolePerspective } from '@wiki/mock/selectors';

export function DashboardPage() {
  const { roleId } = useRolePerspective();
  const [refreshed, setRefreshed] = React.useState(false);
  const role = getRolePerspective(roleId);
  const projects = getProjectsForRole(roleId);

  if (projects.length === 0) {
    return (
      <EmptyState
        title="프로젝트 상태가 없습니다"
        description="공통 추천과 공통 프로젝트 상태를 확인하세요."
      />
    );
  }

  return (
    <div className="space-y-6">
      <StatsSummary projects={projects} role={role} />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <ActivityFeed projects={projects} refreshed={refreshed} onRefresh={() => setRefreshed(true)} />
      </div>
    </div>
  );
}
