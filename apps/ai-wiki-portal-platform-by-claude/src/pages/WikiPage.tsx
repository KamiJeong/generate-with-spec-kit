import { DocTree } from '@wiki/components/wiki/DocTree';
import { AppHeader } from '@wiki/components/layout/AppHeader';
import { EmptyState } from '@wiki/components/shared/EmptyState';
import { mockDocumentTree, mockDocuments } from '@wiki/mock/documents';
import { BookOpenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { wikiDocPath } from '@wiki/routes';

export function WikiPage() {
  const firstDoc = mockDocuments[0];

  return (
    <div>
      <AppHeader title="Wiki 문서" breadcrumbs={[{ label: 'Wiki 문서' }]} />
      <main className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <DocTree items={mockDocumentTree} />
        </aside>
        <div className="flex-1">
          <EmptyState
            icon={<BookOpenIcon className="size-5" />}
            title="문서를 선택하세요"
            description="왼쪽 목록에서 읽을 문서를 선택하세요."
            action={
              firstDoc && (
                <Link
                  to={wikiDocPath(firstDoc.id)}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  첫 번째 문서 보기 →
                </Link>
              )
            }
          />
        </div>
      </main>
    </div>
  );
}
