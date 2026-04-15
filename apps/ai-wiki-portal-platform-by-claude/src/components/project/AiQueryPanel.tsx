import { Button } from '@myorg/ui';
import { SendIcon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AI_RESPONSES = [
  '프로젝트의 현재 상태를 분석하면, 진행률이 양호합니다. 다음 단계로 넘어가기 전에 테스트 커버리지를 확인해보세요.',
  '해당 오류는 환경 변수 설정과 관련이 있을 수 있습니다. Blueprint의 환경 가이드를 참조하세요.',
  '이 기능 구현에는 Blueprint에 명시된 API 설계를 기준으로 작업하시면 됩니다.',
];

export function AiQueryPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input.trim() };
    const aiMsg: Message = {
      role: 'ai',
      text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  }

  return (
    <div className="rounded-lg border border-border/70 bg-muted/20 p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <SparklesIcon className="size-4 text-primary" />
        AI에게 질문하기
      </div>
      {messages.length > 0 && (
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-md px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'ml-8 bg-primary text-primary-foreground'
                  : 'mr-8 bg-background border'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="프로젝트 관련 질문을 입력하세요..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" size="sm" disabled={!input.trim()} className="gap-1">
          <SendIcon className="size-3.5" />
          전송
        </Button>
      </form>
    </div>
  );
}
