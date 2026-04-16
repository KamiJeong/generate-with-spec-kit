import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { GitBranchIcon, GitCommitHorizontalIcon } from 'lucide-react';
import type { GithubStatus } from '@wiki/types';

interface GithubStatusCardProps {
  status: GithubStatus;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });
}

export function GithubStatusCard({ status }: GithubStatusCardProps) {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">GitHub 현황</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <GitBranchIcon className="size-4 text-muted-foreground" />
          <span className="font-mono text-xs">{status.branch}</span>
          <span className="ml-auto text-xs text-muted-foreground">
            미해결 이슈 {status.openIssueCount}건
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">최근 커밋</p>
          {status.recentCommits.map((commit) => (
            <div key={commit.sha} className="flex items-start gap-2">
              <GitCommitHorizontalIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs">{commit.message}</p>
                <p className="text-xs text-muted-foreground">
                  {commit.author} · {formatDate(commit.committedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
