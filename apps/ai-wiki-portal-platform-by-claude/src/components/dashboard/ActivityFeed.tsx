import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import type { ActivityFeedItem } from '@wiki/types';

interface ActivityFeedProps {
  items: ActivityFeedItem[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-base">최근 활동</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">{item.description}</p>
              <p className="text-xs text-muted-foreground">{formatDate(item.occurredAt)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
