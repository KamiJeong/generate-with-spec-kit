import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import type { Blueprint } from '@wiki/types';

export function BlueprintResult({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>mock Blueprint 결과</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-medium">{blueprint.projectGoal}</p>
          <p className="text-sm text-muted-foreground">
            화면 검증용 mock 결과입니다. 저장 또는 실제 프로젝트 생성은 수행하지 않습니다.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {blueprint.targetUsers.map((user) => (
              <span key={user} className="rounded-md border px-2 py-1">
                {user}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {blueprint.outputs.map((output) => (
          <Card key={output.id}>
            <CardHeader>
              <CardTitle>{output.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{output.summary}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {output.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
