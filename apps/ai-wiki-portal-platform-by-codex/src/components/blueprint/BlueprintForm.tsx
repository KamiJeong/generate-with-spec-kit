import * as React from 'react';
import { Button, Field, Textarea } from '@myorg/ui';
import { Sparkles } from 'lucide-react';

interface BlueprintFormProps {
  onGenerate: (input: string) => void;
  isLoading?: boolean;
}

export function BlueprintForm({ onGenerate, isLoading = false }: BlueprintFormProps) {
  const [value, setValue] = React.useState('');
  const trimmed = value.trim();
  const error = trimmed.length > 0 && trimmed.length < 10 ? '요구사항은 10자 이상 입력하세요.' : undefined;

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (trimmed.length >= 10) onGenerate(trimmed);
      }}
    >
      <Field label="서비스 요구사항" error={error} required>
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={6}
          placeholder="예: 영업팀이 고객 미팅 일정을 등록하고 전날 알림을 받을 수 있는 서비스를 만들고 싶습니다."
        />
      </Field>
      <p className="text-sm text-muted-foreground">
        누가 사용하는지, 어떤 문제를 해결하는지, 필요한 기능 3가지를 업무 용어로 적어주세요.
      </p>
      <Button type="submit" disabled={trimmed.length < 10 || isLoading} className="gap-2">
        <Sparkles className="size-4" aria-hidden="true" />
        {isLoading ? 'mock Blueprint 생성 중...' : 'mock Blueprint 생성'}
      </Button>
    </form>
  );
}
