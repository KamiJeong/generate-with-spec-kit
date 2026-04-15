import { Field, Input, NativeSelect } from '@myorg/ui';
import type { DocumentCategory } from '@wiki/types';

const categories: Array<{ value: DocumentCategory | 'all'; label: string }> = [
  { value: 'all', label: '전체 카테고리' },
  { value: 'get-started', label: 'Get Started' },
  { value: 'blueprint', label: 'Blueprint' },
  { value: 'environment', label: '환경 구성' },
  { value: 'ai-agent', label: 'AI Agent' },
  { value: 'github', label: 'GitHub' },
  { value: 'deployment', label: '배포' },
  { value: 'troubleshooting', label: '문제 해결' },
];

interface WikiFiltersProps {
  query: string;
  category: DocumentCategory | 'all';
  stage: string;
  stages: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: DocumentCategory | 'all') => void;
  onStageChange: (value: string) => void;
}

export function WikiFilters({
  query,
  category,
  stage,
  stages,
  onQueryChange,
  onCategoryChange,
  onStageChange,
}: WikiFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_180px]">
      <Field label="문서 검색">
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Blueprint, GitHub, 오류 등"
        />
      </Field>
      <Field label="카테고리">
        <NativeSelect
          aria-label="문서 카테고리"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as DocumentCategory | 'all')}
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect>
      </Field>
      <Field label="작업 단계">
        <NativeSelect
          aria-label="작업 단계"
          value={stage}
          onChange={(event) => onStageChange(event.target.value)}
        >
          <option value="all">전체 단계</option>
          {stages.map((stageValue) => (
            <option key={stageValue} value={stageValue}>
              {stageValue}
            </option>
          ))}
        </NativeSelect>
      </Field>
    </div>
  );
}
