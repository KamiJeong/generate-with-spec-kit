import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { useParams } from 'react-router-dom';
import { FeedbackEntry } from '@wiki/components/shared/FeedbackEntry';
import { EmptyState } from '@wiki/components/shared/StateFeedback';
import { DocumentStatusBadge } from '@wiki/components/shared/StatusIndicators';
import { AiQueryPanel } from '@wiki/components/project/AiQueryPanel';
import { DocNavigation } from '@wiki/components/wiki/DocNavigation';
import { MarkdownViewer } from '@wiki/components/wiki/MarkdownViewer';
import { getDocumentById, getRelatedDocuments } from '@wiki/mock/selectors';

export function WikiDocPage() {
  const { docId } = useParams();
  const document = getDocumentById(docId);

  if (!document) {
    return (
      <EmptyState
        title="문서를 찾을 수 없습니다"
        description="문서 목록으로 돌아가거나 다른 키워드로 검색하세요."
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-2xl">{document.title}</CardTitle>
            <DocumentStatusBadge status={document.status} />
          </div>
          <p className="text-sm text-muted-foreground">{document.summary}</p>
        </CardHeader>
        <CardContent>
          <MarkdownViewer markdown={document.markdown} />
        </CardContent>
      </Card>
      <DocNavigation relatedDocuments={getRelatedDocuments(document.id)} nextAction={document.nextAction} />
      <div className="grid gap-4 lg:grid-cols-2">
        <AiQueryPanel sourceLabel={document.title} context={`${document.title} 문서의 현재 단계에서 AI Agent에게 질문합니다.`} />
        <FeedbackEntry sourceLabel={document.title} />
      </div>
    </div>
  );
}
