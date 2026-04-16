import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import type { Project, UserRolePerspective } from '@wiki/types';

export function SupportContextPanel({
  project,
  role,
}: {
  project: Project;
  role: UserRolePerspective;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>지원 맥락</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{role.preferredSupportPath}</p>
        <div className="rounded-md border px-3 py-2">
          <p className="text-sm font-medium">다음 권장 행동</p>
          <p className="text-sm text-muted-foreground">{project.nextRecommendedAction}</p>
        </div>
        <div className="rounded-md border px-3 py-2">
          <p className="text-sm font-medium">최근 활동</p>
          <p className="text-sm text-muted-foreground">{project.recentActivity}</p>
        </div>
      </CardContent>
    </Card>
  );
}
