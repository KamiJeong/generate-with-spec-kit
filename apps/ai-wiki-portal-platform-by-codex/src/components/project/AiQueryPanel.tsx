import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';

interface AiQueryPanelProps {
  sourceLabel: string;
  context: string;
}

export function AiQueryPanel({ sourceLabel, context }: AiQueryPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Agent 질문</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">출처: {sourceLabel}</p>
        <div className="rounded-md border bg-muted/30 px-3 py-3 text-sm">
          {context}
        </div>
      </CardContent>
    </Card>
  );
}
