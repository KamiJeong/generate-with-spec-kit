# 구현 계획: Storybook MCP 서버 적용

**브랜치**: `013-mcp-storybook-short` | **날짜**: 2026-04-09 | **스펙**: `specs/013-mcp-storybook-short/spec.md`
**입력**: `specs/013-mcp-storybook-short/spec.md`

## Summary

Storybook MCP(Model Context Protocol) 서버 addon을 설치하고 설정하여 AI 에이전트(Claude, Copilot, Gemini 등)가 MCP 프로토콜을 통해 컴포넌트 문서 조회, 스토리 작성 가이드 참조, 테스트 실행, 미리보기 확인을 수행할 수 있도록 한다. `@storybook/addon-mcp` addon을 추가하고, 3개 도구셋(Development, Documentation, Testing)을 모두 활성화하며, CLAUDE.md에 MCP 사용 지침을 추가한다.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.4 (`@storybook/react-vite`), `@storybook/addon-mcp` (신규 추가), React 18+  
**Storage**: N/A  
**Testing**: 수동 테스트 (AI 에이전트를 통한 MCP 도구 호출 검증)  
**Target Platform**: 로컬 개발 환경 (Storybook 개발 서버, `http://localhost:6006`)  
**Project Type**: UI 컴포넌트 라이브러리 (디자인 시스템)  
**Performance Goals**: N/A (MCP 서버는 Storybook 개발 서버와 함께 자동 활성화되며, 런타임 성능에 영향 없음)  
**Constraints**: MCP preview 단계 — React 전용, API 변경 가능성 있음  
**Scale/Scope**: `packages/ui/.storybook/main.ts` 설정 변경 + CLAUDE.md 업데이트

## Constitution Check

*GATE: Phase 0 연구 전 통과 필수. Phase 1 설계 후 재확인.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 (단일 책임, DRY, 명확한 명명) | ✅ PASS | Storybook 설정 파일에 addon 등록만 추가. 기존 코드 구조 변경 없음 |
| II. 테스트 표준 | ✅ PASS | 스펙에 수동 테스트로 검증 방침 명시. MCP 통합 테스트 자동화는 범위 밖 (가정 섹션 참조) |
| III. UX 일관성 | ✅ PASS | 기존 Storybook UI/컴포넌트에 영향 없음. MCP 서버는 AI 에이전트 전용 인터페이스 |
| IV. 성능 요구사항 | ✅ PASS | MCP addon은 개발 서버 전용이며 빌드/런타임 성능에 영향 없음 |
| V. 단순성 (YAGNI) | ✅ PASS | 외부 의존성 1개 추가 (`@storybook/addon-mcp`). Storybook 공식 addon으로 라이선스/유지보수 검증됨. 별도 추상화 없이 기본 설정만 적용 |

**복잡도 위반**: 없음

## Project Structure

### 문서 (이번 feature)

```text
specs/013-mcp-storybook-short/
├── plan.md              # 이 파일
├── research.md          # Phase 0 출력
├── data-model.md        # Phase 1 출력
├── quickstart.md        # Phase 1 출력
└── tasks.md             # Phase 2 출력 (/speckit.tasks 명령으로 생성)
```

### 소스 코드 (수정 대상)

```text
packages/ui/
├── .storybook/
│   └── main.ts              # addon 등록에 @storybook/addon-mcp 추가
├── package.json             # @storybook/addon-mcp devDependency 추가

CLAUDE.md                    # MCP 사용 지침 추가 (프로젝트 루트)
.claude/settings.json        # MCP 서버 연결 설정 (Claude Code용, 자동 생성)
```

**Structure Decision**: 기존 monorepo 구조 유지. Storybook 설정 파일과 프로젝트 루트 문서만 수정.

## Phase 0: 연구 (research.md)

- ✅ `specs/013-mcp-storybook-short/research.md` 생성 완료
- MCP addon 설치 방법, 설정 구조, 도구셋 활성화 방법 확인
- AI 에이전트 연결 패턴(Claude Code, VS Code Copilot 등) 조사

## Phase 1: 설계 (data-model.md, quickstart.md)

- ✅ `specs/013-mcp-storybook-short/data-model.md` 생성 완료 (MCP 설정 엔티티)
- ✅ `specs/013-mcp-storybook-short/quickstart.md` 생성 완료 (구현 단계별 가이드)
- contracts/ 생략 — 이 feature는 외부 인터페이스를 새로 정의하지 않음 (Storybook MCP 서버가 자체 프로토콜을 제공)

---

## Complexity Tracking

복잡도 위반 없음. 외부 의존성 1개 추가 (`@storybook/addon-mcp` — Storybook 공식 addon, MIT 라이선스).
