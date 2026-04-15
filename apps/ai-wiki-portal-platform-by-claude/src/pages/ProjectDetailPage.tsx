import { GithubStatusCard } from '@wiki/components/project/GithubStatusCard';
import { ParticipantList } from '@wiki/components/project/ParticipantList';
import { ProjectTimeline } from '@wiki/components/project/ProjectTimeline';
import { AiQueryPanel } from '@wiki/components/project/AiQueryPanel';
import { AppHeader } from '@wiki/components/layout/AppHeader';
import { EmptyState } from '@wiki/components/shared/EmptyState';
import { mockProjects } from '@wiki/mock/projects';
import { mockGithubStatus } from '@wiki/mock/github';
import { FolderOpenIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ROUTES } from '@wiki/routes';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = mockProjects.find((p) => p.id === projectId);
  const githubStatus = projectId ? mockGithubStatus[projectId] : undefined;

  if (!project) {
    return (
      <div>
        <AppHeader title="프로젝트 없음" breadcrumbs={[{ label: '대시보드', href: ROUTES.DASHBOARD }, { label: '프로젝트' }]} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <EmptyState
            icon={<FolderOpenIcon className="size-5" />}
            title="프로젝트를 찾을 수 없습니다"
            description={`ID "${projectId}"에 해당하는 프로젝트가 없습니다.`}
          />
        </main>
      </div>
    );
  }

  return (
    <div>
      <AppHeader
        title={project.name}
        breadcrumbs={[
          { label: '대시보드', href: ROUTES.DASHBOARD },
          { label: project.name },
        ]}
      />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6">
        <p className="text-sm text-muted-foreground max-w-2xl">{project.description}</p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <ProjectTimeline project={project} />
            {githubStatus && <GithubStatusCard status={githubStatus} />}
            <AiQueryPanel />
          </div>
          <aside>
            <ParticipantList participants={project.participants} />
          </aside>
        </div>
      </main>
    </div>
  );
}
