import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { StepList } from '@wiki/components/get-started/StepList';
import { AiQueryPanel } from '@wiki/components/project/AiQueryPanel';
import { FeedbackEntry } from '@wiki/components/shared/FeedbackEntry';
import { useRolePerspective } from '@wiki/lib/role-context';
import { executionSteps, getRolePerspective } from '@wiki/mock/selectors';

export function GetStartedPage() {
  const { roleId } = useRolePerspective();
  const role = getRolePerspective(roleId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {role.label} 관점에서 문서, 실행, 피드백 흐름을 따라갑니다.
          </p>
          <p className="text-sm font-medium">선호 지원 경로: {role.preferredSupportPath}</p>
        </CardContent>
      </Card>
      <StepList steps={executionSteps} />
      <div className="grid gap-4 lg:grid-cols-2">
        <AiQueryPanel sourceLabel="Get Started" context="현재 실행 단계와 막힘 상태를 포함해 AI Agent에게 질문합니다." />
        <FeedbackEntry sourceLabel="Get Started 실행 가이드" />
      </div>
    </div>
  );
}
