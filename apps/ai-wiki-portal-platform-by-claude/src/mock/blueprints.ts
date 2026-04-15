import type { Blueprint } from '../types';

export const mockBlueprint: Blueprint = {
  id: 'bp-001',
  inputText: '영업팀 직원들이 고객 미팅 일정을 등록하고, 미팅 전날 알림을 받을 수 있는 캘린더 서비스가 필요합니다. 팀장은 전체 팀의 일정을 한눈에 볼 수 있어야 합니다.',
  sections: [
    {
      id: 'prd',
      title: '기능 요구사항 명세 (PRD)',
      contentHtml: `
        <h3>핵심 사용자</h3>
        <ul>
          <li><strong>영업팀 직원</strong> — 미팅 일정 등록 및 관리</li>
          <li><strong>팀장</strong> — 전체 팀 일정 조회 및 모니터링</li>
        </ul>
        <h3>핵심 기능</h3>
        <ol>
          <li><strong>미팅 일정 등록</strong>: 날짜, 시간, 고객사, 장소, 참석자 입력</li>
          <li><strong>캘린더 뷰</strong>: 월간/주간/일간 뷰 전환 가능</li>
          <li><strong>알림 기능</strong>: 미팅 전날 오전 9시 이메일/푸시 알림</li>
          <li><strong>팀 전체 뷰</strong>: 팀장 전용 팀원 일정 통합 뷰</li>
          <li><strong>미팅 결과 기록</strong>: 미팅 후 메모 및 다음 액션 아이템 기록</li>
        </ol>
        <h3>비기능 요구사항</h3>
        <ul>
          <li>로그인은 사내 SSO 연동</li>
          <li>모바일 반응형 지원</li>
          <li>데이터 보존 기간: 3년</li>
        </ul>
      `,
    },
    {
      id: 'architecture',
      title: '시스템 아키텍처',
      contentHtml: `
        <h3>기술 스택 제안</h3>
        <ul>
          <li><strong>프론트엔드</strong>: React + TypeScript (SPA)</li>
          <li><strong>백엔드</strong>: Node.js + Express (REST API)</li>
          <li><strong>데이터베이스</strong>: PostgreSQL (일정 데이터), Redis (알림 큐)</li>
          <li><strong>인프라</strong>: AWS (EC2 + RDS + ElastiCache)</li>
        </ul>
        <h3>시스템 구성도</h3>
        <pre>
[사용자 브라우저]
      ↓ HTTPS
[React SPA (S3 + CloudFront)]
      ↓ REST API
[Node.js API Server (EC2)]
      ↓               ↓
[PostgreSQL (RDS)]  [Redis (ElastiCache)]
                          ↓
                   [알림 스케줄러]
        </pre>
        <h3>핵심 설계 결정</h3>
        <ul>
          <li>알림은 Redis 큐 + cron 스케줄러로 구현</li>
          <li>권한 관리: 직원/팀장 역할 기반 접근 제어</li>
        </ul>
      `,
    },
    {
      id: 'environment',
      title: '개발 환경 구성 가이드',
      contentHtml: `
        <h3>로컬 개발 환경 설정</h3>
        <ol>
          <li>Node.js 20.x 설치</li>
          <li>PostgreSQL 15.x 설치 및 DB 생성: <code>createdb sales_calendar</code></li>
          <li>Redis 7.x 설치: <code>redis-server</code></li>
          <li>저장소 클론 후 의존성 설치: <code>pnpm install</code></li>
          <li>환경 변수 설정: <code>cp .env.example .env.local</code></li>
          <li>DB 마이그레이션: <code>pnpm migrate</code></li>
          <li>개발 서버 실행: <code>pnpm dev</code></li>
        </ol>
        <h3>필요한 환경 변수</h3>
        <pre>
DATABASE_URL=postgresql://localhost:5432/sales_calendar
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
SSO_ISSUER_URL=https://sso.company.com
        </pre>
      `,
    },
    {
      id: 'api-design',
      title: 'API 설계',
      contentHtml: `
        <h3>주요 엔드포인트</h3>
        <table>
          <thead>
            <tr><th>Method</th><th>Path</th><th>설명</th></tr>
          </thead>
          <tbody>
            <tr><td>GET</td><td>/api/meetings</td><td>내 미팅 목록 조회</td></tr>
            <tr><td>POST</td><td>/api/meetings</td><td>미팅 등록</td></tr>
            <tr><td>PUT</td><td>/api/meetings/:id</td><td>미팅 수정</td></tr>
            <tr><td>DELETE</td><td>/api/meetings/:id</td><td>미팅 삭제</td></tr>
            <tr><td>GET</td><td>/api/team/meetings</td><td>팀 전체 미팅 조회 (팀장 전용)</td></tr>
            <tr><td>POST</td><td>/api/meetings/:id/notes</td><td>미팅 메모 저장</td></tr>
          </tbody>
        </table>
        <h3>미팅 데이터 구조</h3>
        <pre>
{
  "id": "uuid",
  "title": "고객사 A 미팅",
  "startTime": "2026-04-20T14:00:00Z",
  "endTime": "2026-04-20T15:00:00Z",
  "location": "강남 사무소 2층 회의실",
  "clientName": "고객사 A",
  "attendees": ["user-001", "user-002"],
  "notes": "다음 분기 계약 갱신 논의",
  "createdBy": "user-001"
}
        </pre>
      `,
    },
  ],
  createdAt: '2026-04-15T10:00:00Z',
};
