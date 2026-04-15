import type { Step } from '../types';

export const mockSteps: Step[] = [
  {
    id: 'step-001',
    number: 1,
    title: '플랫폼 계정 및 환경 확인',
    description: 'AI Wiki Portal에 접속하여 계정을 확인하고 개발에 필요한 기본 환경을 점검합니다.',
    estimatedMinutes: 5,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: 플랫폼 접속 후 우측 상단 프로필 메뉴에서 계정 정보를 확인하세요.</p>
      <p>개발 환경 점검 체크리스트:</p>
      <ul>
        <li>✅ Node.js 20.x 이상 설치 확인: <code>node --version</code></li>
        <li>✅ pnpm 10.x 이상 설치 확인: <code>pnpm --version</code></li>
        <li>✅ Git 설치 확인: <code>git --version</code></li>
      </ul>
    `,
  },
  {
    id: 'step-002',
    number: 2,
    title: 'Blueprint 생성',
    description: '개발하려는 서비스의 요구사항을 자연어로 입력하여 Blueprint를 생성합니다. Blueprint는 PRD, 아키텍처, 환경 가이드, API 설계를 포함합니다.',
    estimatedMinutes: 15,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: 좋은 Blueprint를 위한 요구사항 작성 팁:</p>
      <ul>
        <li>누가 사용하는지 (사용자 역할) 명시하세요.</li>
        <li>핵심 기능 3~5가지를 구체적으로 설명하세요.</li>
        <li>기술 용어보다 업무 용어로 설명하세요.</li>
      </ul>
      <p><strong>예시</strong>: "영업팀이 고객 미팅 일정을 등록하고 알림을 받을 수 있는 캘린더 서비스"</p>
    `,
  },
  {
    id: 'step-003',
    number: 3,
    title: 'GitHub 저장소 생성',
    description: 'GitHub에서 새 저장소를 만들고 프로젝트와 연동합니다.',
    estimatedMinutes: 10,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: GitHub 저장소 생성 순서:</p>
      <ol>
        <li>github.com에서 "New repository" 클릭</li>
        <li>저장소 이름 입력 (영문, 하이픈 사용)</li>
        <li>Private 선택 (사내 프로젝트)</li>
        <li>"Create repository" 클릭</li>
      </ol>
      <pre><code>git init
git remote add origin https://github.com/your-org/your-repo.git</code></pre>
    `,
  },
  {
    id: 'step-004',
    number: 4,
    title: 'AI Agent 설치',
    description: 'Claude Code 또는 Codex CLI를 설치합니다. AI Agent가 코드 생성을 담당합니다.',
    estimatedMinutes: 10,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: Claude Code 설치:</p>
      <pre><code>npm install -g @anthropic-ai/claude-code</code></pre>
      <p>설치 완료 후 프로젝트 폴더에서 <code>claude</code>를 실행하면 AI와 대화하며 개발을 시작할 수 있습니다.</p>
      <p>문제가 발생하면 <a href="/wiki/doc-003">AI Agent 설치 가이드</a>를 참조하세요.</p>
    `,
  },
  {
    id: 'step-005',
    number: 5,
    title: '코드 생성 및 초기 설정',
    description: 'AI Agent를 통해 Blueprint 기반의 초기 프로젝트 코드를 생성합니다.',
    estimatedMinutes: 30,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: Blueprint를 AI에게 전달하는 방법:</p>
      <ol>
        <li>Blueprint 페이지에서 PRD 내용을 복사합니다.</li>
        <li>Claude Code에서 다음과 같이 요청합니다:</li>
      </ol>
      <blockquote>
        <p>"다음 PRD를 바탕으로 React + Node.js 프로젝트의 기본 구조를 만들어줘: [PRD 내용]"</p>
      </blockquote>
    `,
  },
  {
    id: 'step-006',
    number: 6,
    title: '기능 구현 및 테스트',
    description: '핵심 기능을 하나씩 구현하고 동작을 확인합니다. 오류가 발생하면 AI에게 도움을 요청하세요.',
    estimatedMinutes: 120,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: 효과적인 기능 구현 순서:</p>
      <ol>
        <li>가장 핵심적인 기능 하나를 선택합니다.</li>
        <li>AI에게 해당 기능 구현을 요청합니다.</li>
        <li>브라우저에서 동작을 확인합니다.</li>
        <li>오류가 있으면 에러 메시지를 AI에게 붙여넣어 수정을 요청합니다.</li>
        <li>다음 기능으로 넘어갑니다.</li>
      </ol>
    `,
  },
  {
    id: 'step-007',
    number: 7,
    title: 'GitHub에 코드 업로드 및 배포',
    description: '완성된 코드를 GitHub에 푸시하고, 팀원들과 공유합니다.',
    estimatedMinutes: 20,
    isCompleted: false,
    aiHelpHtml: `
      <p><strong>AI 안내</strong>: 코드 업로드 순서:</p>
      <pre><code>git add .
git commit -m "feat: 초기 기능 구현 완료"
git push origin main</code></pre>
      <p>GitHub Actions를 사용하면 push 즉시 자동 배포가 가능합니다. Blueprint의 환경 가이드를 참조하세요.</p>
    `,
  },
];
