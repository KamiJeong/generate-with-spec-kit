import { ActivityFeed } from '@wiki/components/dashboard/ActivityFeed';
import { ProjectCard } from '@wiki/components/dashboard/ProjectCard';
import { StatsSummary } from '@wiki/components/dashboard/StatsSummary';
import { AppHeader } from '@wiki/components/layout/AppHeader';
import { mockActivityFeed, mockCurrentUser } from '@wiki/mock/users';
import { mockProjects } from '@wiki/mock/projects';

export function DashboardPage() {
  const myProjects = mockProjects.filter((p) =>
    p.participants.some((part) => part.id === mockCurrentUser.id),
  );

  return (
    <div>
      <AppHeader
        title={`안녕하세요, ${mockCurrentUser.name}님`}
        breadcrumbs={[{ label: '대시보드' }]}
      />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6">
        <StatsSummary projects={mockProjects} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">내 프로젝트</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {myProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {myProjects.length === 0 && (
              <p className="text-sm text-muted-foreground">참여 중인 프로젝트가 없습니다.</p>
            )}
          </section>
          <aside>
            <ActivityFeed items={mockActivityFeed.slice(0, 7)} />
          </aside>
        </div>
      </main>
    </div>
  );
}
