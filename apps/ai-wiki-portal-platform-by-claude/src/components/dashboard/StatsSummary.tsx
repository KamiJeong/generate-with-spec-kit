import { Card, CardContent } from '@kamijeong/ui';
import type { Project } from '@wiki/types';

interface StatsSummaryProps {
  projects: Project[];
}

export function StatsSummary({ projects }: StatsSummaryProps) {
  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === 'in_progress').length;
  const completed = projects.filter((p) => p.status === 'completed').length;
  const blocked = projects.filter((p) => p.status === 'blocked').length;

  const stats = [
    { label: '전체 프로젝트', value: total },
    { label: '진행 중', value: inProgress },
    { label: '완료', value: completed },
    { label: '차단됨', value: blocked },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value }) => (
        <Card key={label} className="border-border/70">
          <CardContent className="p-6">
            <p className="text-3xl font-semibold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
