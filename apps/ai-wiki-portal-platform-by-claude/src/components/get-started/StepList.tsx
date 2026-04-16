import { Button } from '@kamijeong/ui';
import { CheckCircle2Icon, CircleIcon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { AiHelpPanel } from './AiHelpPanel';
import type { Step } from '@wiki/types';

interface StepListProps {
  steps: Step[];
  completedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function StepList({ steps, completedIds, onToggle }: StepListProps) {
  const [openHelpId, setOpenHelpId] = useState<string | null>(null);

  return (
    <ol className="space-y-4">
      {steps.map((step) => {
        const isCompleted = completedIds.has(step.id);
        const isHelpOpen = openHelpId === step.id;

        return (
          <li key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onToggle(step.id)}
                aria-label={isCompleted ? `${step.title} 완료 취소` : `${step.title} 완료 처리`}
                className="mt-1 shrink-0 text-muted-foreground hover:text-primary transition-colors"
              >
                {isCompleted ? (
                  <CheckCircle2Icon className="size-5 text-green-500" />
                ) : (
                  <CircleIcon className="size-5" />
                )}
              </button>
              {step.number < steps.length && (
                <div className="mt-2 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-6 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    {step.number}. {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">약 {step.estimatedMinutes}분</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpenHelpId(isHelpOpen ? null : step.id)}
                  className="shrink-0 gap-1 text-xs"
                >
                  <SparklesIcon className="size-3.5" />
                  AI에게 질문
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {isHelpOpen && (
                <AiHelpPanel
                  aiHelpHtml={step.aiHelpHtml}
                  onClose={() => setOpenHelpId(null)}
                />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
