import { SparklesIcon, XIcon } from 'lucide-react';
import { Button } from '@myorg/ui';

interface AiHelpPanelProps {
  aiHelpHtml: string;
  onClose: () => void;
}

export function AiHelpPanel({ aiHelpHtml, onClose }: AiHelpPanelProps) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <SparklesIcon className="size-4" />
          <span className="text-sm font-medium">AI 도움말</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="size-7 p-0">
          <XIcon className="size-4" />
          <span className="sr-only">닫기</span>
        </Button>
      </div>
      <div
        className="prose prose-sm max-w-none dark:prose-invert text-sm"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: mock data only
        dangerouslySetInnerHTML={{ __html: aiHelpHtml }}
      />
    </div>
  );
}
