import { Button } from '@myorg/ui';
import { SparklesIcon } from 'lucide-react';
import { useState } from 'react';

interface BlueprintFormProps {
  onGenerate: (input: string) => void;
  isLoading?: boolean;
}

const PLACEHOLDER =
  '예: 영업팀 직원들이 고객 미팅 일정을 등록하고, 미팅 전날 알림을 받을 수 있는 캘린더 서비스가 필요합니다. 팀장은 전체 팀의 일정을 한눈에 볼 수 있어야 합니다.';

export function BlueprintForm({ onGenerate, isLoading = false }: BlueprintFormProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) onGenerate(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="blueprint-input" className="text-sm font-medium">
          서비스 요구사항을 자연어로 입력하세요
        </label>
        <textarea
          id="blueprint-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={5}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
        <p className="text-xs text-muted-foreground">
          누가 사용하는지, 핵심 기능 3~5가지를 업무 용어로 설명하세요.
        </p>
      </div>
      <Button type="submit" disabled={!value.trim() || isLoading} className="gap-2">
        <SparklesIcon className="size-4" />
        {isLoading ? 'Blueprint 생성 중...' : 'Blueprint 생성'}
      </Button>
    </form>
  );
}
