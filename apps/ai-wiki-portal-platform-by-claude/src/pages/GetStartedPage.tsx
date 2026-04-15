import { StepList } from '@wiki/components/get-started/StepList';
import { AppHeader } from '@wiki/components/layout/AppHeader';
import { mockSteps } from '@wiki/mock/steps';
import { useState } from 'react';

export function GetStartedPage() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function toggleStep(id: string) {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const total = mockSteps.length;
  const done = completedIds.size;

  return (
    <div>
      <AppHeader
        title="Get Started"
        breadcrumbs={[{ label: 'Get Started' }]}
      />
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            AI Wiki Portal을 시작하는 단계별 가이드입니다.
          </p>
          <span className="text-sm font-medium text-primary">
            {done} / {total} 완료
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <StepList steps={mockSteps} completedIds={completedIds} onToggle={toggleStep} />
      </main>
    </div>
  );
}
