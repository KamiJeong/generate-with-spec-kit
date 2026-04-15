import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { DocTree } from '@wiki/components/wiki/DocTree';
import { WikiFilters } from '@wiki/components/wiki/WikiFilters';
import { useRolePerspective } from '@wiki/lib/role-context';
import {
  filterDocuments,
  getRecommendedDocuments,
  getRolePerspective,
  wikiDocuments,
} from '@wiki/mock/selectors';
import type { DocumentCategory } from '@wiki/types';
import { EmptyState } from '@wiki/components/shared/StateFeedback';

export function WikiPage() {
  const { roleId } = useRolePerspective();
  const role = getRolePerspective(roleId);
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<DocumentCategory | 'all'>('all');
  const [stage, setStage] = React.useState('all');
  const stages = Array.from(new Set(wikiDocuments.map((document) => document.stage)));
  const documents = filterDocuments({ query, category, stage });
  const recommended = getRecommendedDocuments(roleId);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Wiki 문서</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get Started, Blueprint, 환경 구성, AI Agent, GitHub/배포, 문제 해결 문서를 탐색합니다.
            </p>
            <WikiFilters
              query={query}
              category={category}
              stage={stage}
              stages={stages}
              onQueryChange={setQuery}
              onCategoryChange={setCategory}
              onStageChange={setStage}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>{role.label} 추천 문서</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recommended.map((document) => (
              <p key={document.id} className="rounded-md border px-3 py-2 text-sm">
                {document.title}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>
      {documents.length > 0 ? (
        <DocTree documents={documents} />
      ) : (
        <EmptyState
          title="검색 결과가 없습니다"
          description="검색어를 줄이거나 카테고리 탐색, 문제 해결 문서로 이동해보세요."
        />
      )}
    </div>
  );
}
