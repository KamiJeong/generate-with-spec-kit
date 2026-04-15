import * as React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Field, Textarea } from '@myorg/ui';

interface FeedbackEntryProps {
  sourceLabel: string;
}

export function FeedbackEntry({ sourceLabel }: FeedbackEntryProps) {
  const [value, setValue] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const error = value.trim().length === 0 && submitted ? '개선 의견을 입력하세요.' : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>문서 피드백</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <p className="text-sm text-muted-foreground">출처: {sourceLabel}</p>
          <Field label="개선 의견" error={error}>
            <Textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="불명확한 단계나 실패한 내용을 적어주세요."
            />
          </Field>
          <Button type="submit" variant="outline">
            피드백 제출
          </Button>
          {submitted && value.trim() ? (
            <p role="status" className="text-sm text-muted-foreground">
              피드백이 mock 상태로 접수되었습니다.
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
