import type { ReactNode } from 'react';

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-muted px-1 py-0.5 text-sm">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} className="text-primary underline-offset-4 hover:underline">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export function MarkdownViewer({ markdown }: { markdown: string }) {
  const lines = markdown.trim().split('\n');
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];
  let ordered = false;
  let codeLines: string[] = [];
  let inCode = false;

  function flushList(key: string) {
    if (listItems.length === 0) return;
    const children = listItems.map((item) => <li key={item}>{renderInline(item)}</li>);
    nodes.push(
      ordered ? (
        <ol key={key} className="list-decimal space-y-1 pl-5">
          {children}
        </ol>
      ) : (
        <ul key={key} className="list-disc space-y-1 pl-5">
          {children}
        </ul>
      ),
    );
    listItems = [];
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (line.startsWith('```')) {
      if (inCode) {
        nodes.push(
          <pre key={`code-${index}`} className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
            <code>{codeLines.join('\n')}</code>
          </pre>,
        );
        codeLines = [];
        inCode = false;
      } else {
        flushList(`list-${index}`);
        inCode = true;
      }
      return;
    }
    if (inCode) {
      codeLines.push(rawLine);
      return;
    }
    if (!line) {
      flushList(`list-${index}`);
      return;
    }
    if (line.startsWith('# ')) {
      flushList(`list-${index}`);
      nodes.push(
        <h1 key={index} className="text-2xl font-semibold tracking-tight">
          {renderInline(line.slice(2))}
        </h1>,
      );
      return;
    }
    if (line.startsWith('## ')) {
      flushList(`list-${index}`);
      nodes.push(
        <h2 key={index} className="text-xl font-semibold">
          {renderInline(line.slice(3))}
        </h2>,
      );
      return;
    }
    if (line.startsWith('- ')) {
      ordered = false;
      listItems.push(line.slice(2));
      return;
    }
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      ordered = true;
      listItems.push(orderedMatch[1]);
      return;
    }
    flushList(`list-${index}`);
    nodes.push(
      <p key={index} className="leading-relaxed text-muted-foreground">
        {renderInline(line)}
      </p>,
    );
  });
  flushList('list-final');

  return <article className="space-y-5">{nodes}</article>;
}
