import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { BlueprintForm } from '@wiki/components/blueprint/BlueprintForm';
import { BlueprintReadiness } from '@wiki/components/blueprint/BlueprintReadiness';
import { BlueprintResult } from '@wiki/components/blueprint/BlueprintResult';
import { LoadingState } from '@wiki/components/shared/StateFeedback';
import { createBlueprintFromInput } from '@wiki/mock/blueprints';
import type { Blueprint } from '@wiki/types';

export function BlueprintPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [blueprint, setBlueprint] = React.useState<Blueprint | null>(null);

  function handleGenerate(input: string) {
    setIsLoading(true);
    window.setTimeout(() => {
      setBlueprint(createBlueprintFromInput(input));
      setIsLoading(false);
    }, 10);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>Blueprint 시작</CardTitle>
        </CardHeader>
        <CardContent>
          <BlueprintForm onGenerate={handleGenerate} isLoading={isLoading} />
        </CardContent>
      </Card>
      <div className="space-y-4">
        {isLoading ? <LoadingState label="mock Blueprint 결과를 준비하는 중..." /> : null}
        {!isLoading && !blueprint ? (
          <Card>
            <CardHeader>
              <CardTitle>결과 대기</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                요구사항을 입력하면 PRD, 시스템 설계, 환경 가이드, API/data definition mock 결과가 표시됩니다.
              </p>
            </CardContent>
          </Card>
        ) : null}
        {blueprint ? (
          <>
            <BlueprintReadiness blueprint={blueprint} />
            <BlueprintResult blueprint={blueprint} />
          </>
        ) : null}
      </div>
    </div>
  );
}
