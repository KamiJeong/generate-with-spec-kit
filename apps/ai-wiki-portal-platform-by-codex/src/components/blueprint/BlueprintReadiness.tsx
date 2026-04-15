import { Alert, AlertDescription, AlertTitle, Button } from '@myorg/ui';
import { Link } from 'react-router-dom';
import { wikiDocPath } from '@wiki/routes';
import type { Blueprint } from '@wiki/types';

export function BlueprintReadiness({ blueprint }: { blueprint: Blueprint }) {
  const hasMissingInputs = blueprint.readinessStatus === 'missing-inputs';

  return (
    <Alert variant={hasMissingInputs ? 'destructive' : 'default'}>
      <AlertTitle>{hasMissingInputs ? '입력 보강 필요' : '다음 단계 준비 완료'}</AlertTitle>
      <AlertDescription>
        {hasMissingInputs
          ? `누락 항목: ${blueprint.missingInputs.join(', ')}`
          : `${blueprint.generatedAtLabel}. 다음 실행 가이드를 확인하세요.`}
      </AlertDescription>
      <div className="mt-3">
        <Button asChild variant="outline" size="sm">
          <Link to={wikiDocPath(blueprint.linkedExecutionGuideId)}>다음 실행 가이드 열기</Link>
        </Button>
      </div>
    </Alert>
  );
}
