import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { Link } from 'react-router-dom';
import { wikiDocPath } from '@wiki/routes';
import type { WikiDocument } from '@wiki/types';

interface DocNavigationProps {
  relatedDocuments: WikiDocument[];
  nextAction: string;
}

export function DocNavigation({ relatedDocuments, nextAction }: DocNavigationProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>다음 행동</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{nextAction}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>관련 문서</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {relatedDocuments.map((document) => (
            <Link
              key={document.id}
              className="block rounded-md border px-3 py-2 text-sm hover:bg-muted"
              to={wikiDocPath(document.id)}
            >
              {document.title}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
