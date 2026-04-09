# 데이터 모델: Spec Kit README

**날짜**: 2026-04-09  
**기능**: 014-speckit-readme  
**참고**: 이 기능은 순수 문서 파일(`README.md`) 생성이다. 코드, 데이터베이스, 상태 전환이 없으므로 전통적 의미의 데이터 모델은 해당되지 않는다. 대신 README의 정보 구조를 정의한다.

---

## README 문서 구조 (정보 아키텍처)

### 섹션 계층

```
README.md
├── 1. 헤더 (프로젝트명, 한 줄 설명)
├── 2. 개요 (Overview)
│   ├── 이 프로젝트가 무엇인지
│   └── AI 지원 개발 워크플로우 소개
├── 3. 워크플로우 (Workflow)
│   ├── 전체 흐름 다이어그램 (텍스트)
│   ├── Claude 역할 (specify → clarify → plan → tasks)
│   └── Codex 역할 (implement)
├── 4. 구성 요소 (Components)
│   ├── 4.1 Spec Kit 문서 (spec.md, plan.md, tasks.md)
│   ├── 4.2 스킬/슬래시 커맨드
│   ├── 4.3 MCP 통합
│   ├── 4.4 훅 (Hooks)
│   └── 4.5 익스텐션 (Extensions)
├── 5. 빠른 시작 (Quick Start)
│   └── 단계별 새 기능 시작 가이드
└── 6. AI와 함께 개발하기 (Developing with AI)
    ├── 역할 분담 (인간 vs AI)
    └── 효과적인 기능 설명 작성 팁
```

### 핵심 엔티티 (README가 설명하는 개념들)

| 엔티티 | 타입 | 설명 | 관련 섹션 |
|--------|------|------|----------|
| Spec Kit Workflow | 프로세스 | specify → clarify → plan → tasks → implement 전체 흐름 | 3 |
| Claude | AI 에이전트 | 명세/계획/태스크 생성 담당 | 3, 4.2 |
| Codex | AI 에이전트 | 구현 실행 담당 | 3 |
| spec.md | 문서 | 기능 명세 (무엇을, 왜) | 4.1 |
| plan.md | 문서 | 구현 계획 (설계, 아키텍처) | 4.1 |
| tasks.md | 문서 | 구현 태스크 목록 | 4.1 |
| 스킬/슬래시 커맨드 | 도구 | Claude Code에서 실행하는 `/speckit.*` 커맨드 | 4.2 |
| MCP 통합 | 통합 | Storybook MCP 서버 (UI 작업 지원) | 4.3 |
| 훅 | 자동화 | before/after 단계별 자동 실행 커맨드 | 4.4 |
| 익스텐션 | 품질 게이트 | docguard, verify, sync, retrospective | 4.5 |

### 관계

```
Claude ──[generates]──► spec.md
Claude ──[generates]──► plan.md
Claude ──[generates]──► tasks.md
Codex  ──[reads]──────► tasks.md
Codex  ──[implements]──► Source Code
Hooks  ──[trigger]────► Extensions (docguard, verify, sync)
Skills ──[invoke]─────► Spec Kit Workflow
MCP    ──[provides]───► Live tool access (Storybook)
```
