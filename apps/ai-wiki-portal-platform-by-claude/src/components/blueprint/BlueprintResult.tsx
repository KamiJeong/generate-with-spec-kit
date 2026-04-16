import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import type { Blueprint } from '@wiki/types';

interface BlueprintResultProps {
  blueprint: Blueprint;
}

const SECTION_LABELS: Record<string, string> = {
  prd: '기능 요구사항 명세 (PRD)',
  architecture: '시스템 아키텍처',
  environment: '개발 환경 구성 가이드',
  'api-design': 'API 설계',
};

export function BlueprintResult({ blueprint }: BlueprintResultProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border/70 bg-muted/30 px-4 py-3">
        <p className="text-sm font-medium text-muted-foreground">입력된 요구사항</p>
        <p className="mt-1 text-sm">{blueprint.inputText}</p>
      </div>
      <div className="grid gap-4">
        {blueprint.sections.map((section) => (
          <Card key={section.id} className="border-border/70">
            <CardHeader>
              <CardTitle className="text-base">
                {SECTION_LABELS[section.id] ?? section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: mock data only
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
