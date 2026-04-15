import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import type { ProjectParticipant } from '@wiki/types';

interface ParticipantListProps {
  participants: ProjectParticipant[];
}

export function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">참여 멤버 ({participants.length}명)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {participants.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <img
              src={p.avatarUrl}
              alt={p.name}
              className="size-8 rounded-full border border-border"
            />
            <span className="text-sm">{p.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
