import type { DocumentTreeItem, WikiDocument } from '../types';

export const mockDocumentTree: DocumentTreeItem[] = [
  {
    id: 'cat-get-started',
    title: '시작하기',
    category: 'get-started',
    children: [
      { id: 'doc-001', title: '플랫폼 소개', category: 'get-started' },
      { id: 'doc-002', title: '개발 환경 구성', category: 'get-started' },
      { id: 'doc-003', title: 'AI Agent 설치 및 설정', category: 'get-started' },
    ],
  },
  {
    id: 'cat-blueprint',
    title: 'Blueprint 가이드',
    category: 'blueprint',
    children: [
      { id: 'doc-004', title: 'Blueprint란 무엇인가', category: 'blueprint' },
      { id: 'doc-005', title: 'Blueprint 작성 방법', category: 'blueprint' },
      { id: 'doc-006', title: 'Blueprint 템플릿 모음', category: 'blueprint' },
    ],
  },
  {
    id: 'cat-ai-agent',
    title: 'AI Agent 활용',
    category: 'ai-agent',
    children: [
      { id: 'doc-007', title: 'Claude Code 사용 가이드', category: 'ai-agent' },
      { id: 'doc-008', title: 'Codex 사용 가이드', category: 'ai-agent' },
    ],
  },
  {
    id: 'cat-github',
    title: 'GitHub 연동',
    category: 'github',
    children: [
      { id: 'doc-009', title: 'GitHub 저장소 연동하기', category: 'github' },
    ],
  },
  {
    id: 'cat-reference',
    title: '레퍼런스',
    category: 'reference',
    children: [
      { id: 'doc-010', title: 'FAQ', category: 'reference' },
    ],
  },
];

export const mockDocuments: WikiDocument[] = [
  {
    id: 'doc-001',
    title: '플랫폼 소개',
    category: 'get-started',
    headings: [
      { id: 'intro', text: '소개', level: 2 },
      { id: 'goals', text: '플랫폼 목표', level: 2 },
      { id: 'workflow', text: '워크플로우', level: 2 },
    ],
    contentHtml: `
      <h2 id="intro">소개</h2>
      <p>AI Wiki Portal은 비개발자도 AI를 활용하여 실제 서비스를 개발할 수 있도록 지원하는 플랫폼입니다.</p>
      <p>Blueprint 기반으로 프로젝트를 설계하고, AI Agent를 통해 코드를 생성하며, GitHub 연동으로 배포까지 이어지는 전체 개발 사이클을 지원합니다.</p>
      <h2 id="goals">플랫폼 목표</h2>
      <ul>
        <li>비개발자의 개발 진입 장벽 제거</li>
        <li>문서를 실행 가능한 형태로 발전</li>
        <li>AI 중심의 자동화된 개발 프로세스 구축</li>
      </ul>
      <h2 id="workflow">워크플로우</h2>
      <ol>
        <li><strong>Blueprint 생성</strong> — 요구사항을 입력하면 프로젝트 설계가 자동 생성됩니다.</li>
        <li><strong>환경 구성</strong> — 가이드 문서를 따라 개발 환경을 설정합니다.</li>
        <li><strong>AI 코드 생성</strong> — Claude Code 또는 Codex로 코드를 생성합니다.</li>
        <li><strong>배포</strong> — GitHub 연동으로 자동 배포합니다.</li>
      </ol>
    `,
    updatedAt: '2026-04-10T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-002',
    title: '개발 환경 구성',
    category: 'get-started',
    headings: [
      { id: 'requirements', text: '사전 요구사항', level: 2 },
      { id: 'node', text: 'Node.js 설치', level: 2 },
      { id: 'pnpm', text: 'pnpm 설치', level: 2 },
      { id: 'verify', text: '설치 확인', level: 2 },
    ],
    contentHtml: `
      <h2 id="requirements">사전 요구사항</h2>
      <p>개발 환경을 구성하기 전에 다음 사항을 확인하세요.</p>
      <ul>
        <li>Windows 10/11, macOS 12+, 또는 Ubuntu 20.04+</li>
        <li>인터넷 연결</li>
        <li>관리자 권한</li>
      </ul>
      <h2 id="node">Node.js 설치</h2>
      <p>Node.js 20.x 이상을 설치합니다. <a href="https://nodejs.org">nodejs.org</a>에서 LTS 버전을 다운로드하세요.</p>
      <pre><code>node --version  # v20.x.x 이상이어야 합니다</code></pre>
      <h2 id="pnpm">pnpm 설치</h2>
      <pre><code>npm install -g pnpm
pnpm --version  # 10.x 이상이어야 합니다</code></pre>
      <h2 id="verify">설치 확인</h2>
      <pre><code>node --version && pnpm --version</code></pre>
    `,
    updatedAt: '2026-04-12T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-003',
    title: 'AI Agent 설치 및 설정',
    category: 'get-started',
    headings: [
      { id: 'claude', text: 'Claude Code 설치', level: 2 },
      { id: 'codex', text: 'Codex CLI 설치', level: 2 },
    ],
    contentHtml: `
      <h2 id="claude">Claude Code 설치</h2>
      <p>Claude Code는 Anthropic의 공식 CLI입니다. 터미널에서 다음 명령어로 설치합니다.</p>
      <pre><code>npm install -g @anthropic-ai/claude-code</code></pre>
      <p>설치 후 <code>claude</code> 명령어로 실행합니다.</p>
      <h2 id="codex">Codex CLI 설치</h2>
      <p>OpenAI Codex CLI를 설치합니다.</p>
      <pre><code>npm install -g @openai/codex</code></pre>
    `,
    updatedAt: '2026-04-11T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-004',
    title: 'Blueprint란 무엇인가',
    category: 'blueprint',
    headings: [
      { id: 'definition', text: 'Blueprint 정의', level: 2 },
      { id: 'structure', text: 'Blueprint 구성', level: 2 },
    ],
    contentHtml: `
      <h2 id="definition">Blueprint 정의</h2>
      <p>Blueprint는 서비스 개발의 청사진입니다. 요구사항을 입력하면 AI가 자동으로 기능 명세서(PRD), 아키텍처 설계, 개발 환경 가이드, API 설계를 생성합니다.</p>
      <h2 id="structure">Blueprint 구성</h2>
      <ul>
        <li><strong>PRD</strong> — 기능 요구사항 명세서</li>
        <li><strong>아키텍처</strong> — 시스템 아키텍처 설계</li>
        <li><strong>환경 가이드</strong> — 개발 환경 구성 지침</li>
        <li><strong>API 설계</strong> — 엔드포인트 및 데이터 구조</li>
      </ul>
    `,
    updatedAt: '2026-04-08T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-005',
    title: 'Blueprint 작성 방법',
    category: 'blueprint',
    headings: [
      { id: 'tips', text: '좋은 요구사항 작성 팁', level: 2 },
      { id: 'example', text: '작성 예시', level: 2 },
    ],
    contentHtml: `
      <h2 id="tips">좋은 요구사항 작성 팁</h2>
      <ul>
        <li>구체적인 사용자와 목적을 명시하세요.</li>
        <li>핵심 기능 3~5개를 중심으로 설명하세요.</li>
        <li>기술 용어보다 업무 용어로 설명하세요.</li>
      </ul>
      <h2 id="example">작성 예시</h2>
      <blockquote>
        <p>"영업팀 직원들이 고객 미팅 일정을 등록하고, 미팅 전날 알림을 받을 수 있는 캘린더 서비스가 필요합니다. 팀장은 전체 팀의 일정을 한눈에 볼 수 있어야 합니다."</p>
      </blockquote>
    `,
    updatedAt: '2026-04-09T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-006',
    title: 'Blueprint 템플릿 모음',
    category: 'blueprint',
    headings: [
      { id: 'templates', text: '템플릿 목록', level: 2 },
    ],
    contentHtml: `
      <h2 id="templates">템플릿 목록</h2>
      <ul>
        <li>관리자 대시보드 템플릿</li>
        <li>챗봇 서비스 템플릿</li>
        <li>데이터 분석 툴 템플릿</li>
        <li>사내 포털 템플릿</li>
      </ul>
    `,
    updatedAt: '2026-04-07T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-007',
    title: 'Claude Code 사용 가이드',
    category: 'ai-agent',
    headings: [
      { id: 'basic', text: '기본 사용법', level: 2 },
      { id: 'prompts', text: '효과적인 프롬프트', level: 2 },
    ],
    contentHtml: `
      <h2 id="basic">기본 사용법</h2>
      <p>프로젝트 디렉토리에서 <code>claude</code> 명령어를 실행하면 AI와 대화하며 코드를 작성할 수 있습니다.</p>
      <pre><code>cd my-project
claude</code></pre>
      <h2 id="prompts">효과적인 프롬프트</h2>
      <ul>
        <li>구현할 기능을 명확히 설명하세요.</li>
        <li>기존 코드 구조를 먼저 설명하세요.</li>
        <li>한 번에 하나의 기능을 요청하세요.</li>
      </ul>
    `,
    updatedAt: '2026-04-13T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-008',
    title: 'Codex 사용 가이드',
    category: 'ai-agent',
    headings: [
      { id: 'setup', text: '설정', level: 2 },
      { id: 'usage', text: '사용법', level: 2 },
    ],
    contentHtml: `
      <h2 id="setup">설정</h2>
      <p>OpenAI API 키를 환경 변수로 설정합니다.</p>
      <pre><code>export OPENAI_API_KEY=your-api-key</code></pre>
      <h2 id="usage">사용법</h2>
      <pre><code>codex "로그인 페이지를 만들어줘"</code></pre>
    `,
    updatedAt: '2026-04-13T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-009',
    title: 'GitHub 저장소 연동하기',
    category: 'github',
    headings: [
      { id: 'create', text: '저장소 생성', level: 2 },
      { id: 'connect', text: '플랫폼 연동', level: 2 },
    ],
    contentHtml: `
      <h2 id="create">저장소 생성</h2>
      <p>GitHub에서 새 저장소를 만들고 로컬 프로젝트와 연결합니다.</p>
      <pre><code>git init
git remote add origin https://github.com/your-org/your-repo.git</code></pre>
      <h2 id="connect">플랫폼 연동</h2>
      <p>프로젝트 상세 페이지에서 GitHub 저장소 URL을 입력하면 커밋 현황과 이슈가 자동으로 표시됩니다.</p>
    `,
    updatedAt: '2026-04-06T00:00:00Z',
    author: '플랫폼 팀',
  },
  {
    id: 'doc-010',
    title: 'FAQ',
    category: 'reference',
    headings: [
      { id: 'q1', text: '코딩 경험이 없어도 되나요?', level: 2 },
      { id: 'q2', text: 'AI가 코드를 잘못 작성하면 어떻게 하나요?', level: 2 },
      { id: 'q3', text: '어떤 서비스를 만들 수 있나요?', level: 2 },
    ],
    contentHtml: `
      <h2 id="q1">코딩 경험이 없어도 되나요?</h2>
      <p>네, 이 플랫폼은 코딩 경험 없이도 서비스를 개발할 수 있도록 설계되었습니다. AI Agent가 코드 작성을 대신하며, 가이드 문서를 따라가면 됩니다.</p>
      <h2 id="q2">AI가 코드를 잘못 작성하면 어떻게 하나요?</h2>
      <p>오류가 발생하면 AI에게 에러 메시지를 그대로 붙여넣고 수정을 요청하세요. "AI에게 질문" 버튼을 통해 도움을 받을 수 있습니다.</p>
      <h2 id="q3">어떤 서비스를 만들 수 있나요?</h2>
      <p>웹 기반의 관리자 대시보드, 사내 포털, 챗봇, 데이터 분석 도구 등 다양한 업무용 서비스를 만들 수 있습니다.</p>
    `,
    updatedAt: '2026-04-14T00:00:00Z',
    author: '플랫폼 팀',
  },
];
