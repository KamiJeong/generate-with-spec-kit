import { DocContent } from '@wiki/components/wiki/DocContent';
import { DocTree } from '@wiki/components/wiki/DocTree';
import { TableOfContents } from '@wiki/components/wiki/TableOfContents';
import { AppHeader } from '@wiki/components/layout/AppHeader';
import { EmptyState } from '@wiki/components/shared/EmptyState';
import { mockDocumentTree, mockDocuments } from '@wiki/mock/documents';
import { FileTextIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ROUTES } from '@wiki/routes';

export function WikiDocPage() {
  const { docId } = useParams<{ docId: string }>();
  const doc = mockDocuments.find((d) => d.id === docId);

  return (
    <div>
      <AppHeader
        title={doc?.title ?? '문서를 찾을 수 없음'}
        breadcrumbs={[
          { label: 'Wiki 문서', href: ROUTES.WIKI },
          { label: doc?.title ?? docId ?? '' },
        ]}
      />
      <main className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <DocTree items={mockDocumentTree} />
        </aside>
        <div className="min-w-0 flex-1">
          {doc ? (
            <DocContent document={doc} />
          ) : (
            <EmptyState
              icon={<FileTextIcon className="size-5" />}
              title="문서를 찾을 수 없습니다"
              description={`ID "${docId}"에 해당하는 문서가 없습니다.`}
            />
          )}
        </div>
        {doc && doc.headings.length > 0 && (
          <aside className="hidden w-44 shrink-0 xl:block">
            <div className="sticky top-8">
              <TableOfContents headings={doc.headings} />
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
