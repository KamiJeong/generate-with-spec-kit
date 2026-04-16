import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { Link } from 'react-router-dom';
import { DocumentStatusBadge } from '@wiki/components/shared/StatusIndicators';
import { wikiDocPath } from '@wiki/routes';
import type { WikiDocument } from '@wiki/types';

interface DocTreeProps {
  documents: WikiDocument[];
}

export function DocTree({ documents }: DocTreeProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {documents.map((document) => (
        <Card key={document.id}>
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{document.title}</CardTitle>
              <DocumentStatusBadge status={document.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{document.summary}</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>{document.category}</span>
              <span>{document.stage}</span>
              <span>{document.lastUpdatedLabel}</span>
            </div>
            <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" to={wikiDocPath(document.id)}>
              문서 열기
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
