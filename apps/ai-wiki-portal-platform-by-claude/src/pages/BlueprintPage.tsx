import { BlueprintForm } from '@wiki/components/blueprint/BlueprintForm';
import { BlueprintResult } from '@wiki/components/blueprint/BlueprintResult';
import { AppHeader } from '@wiki/components/layout/AppHeader';
import { mockBlueprint } from '@wiki/mock/blueprints';
import { useState } from 'react';
import type { Blueprint } from '@wiki/types';

export function BlueprintPage() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleGenerate(input: string) {
    setIsLoading(true);
    // Mock: 1.5초 후 결과 표시
    setTimeout(() => {
      setBlueprint({ ...mockBlueprint, inputText: input });
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div>
      <AppHeader
        title="Blueprint 생성"
        breadcrumbs={[{ label: 'Blueprint 생성' }]}
      />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">
            서비스 요구사항을 입력하면 AI가 PRD, 아키텍처, 개발 환경 가이드, API 설계를 자동으로 생성합니다.
          </p>
          <BlueprintForm onGenerate={handleGenerate} isLoading={isLoading} />
        </section>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Blueprint를 생성하고 있습니다...
          </div>
        )}
        {blueprint && !isLoading && <BlueprintResult blueprint={blueprint} />}
      </main>
    </div>
  );
}
