# 구현 계획: DESIGN.md (AI 코딩 에이전트용)

**Branch**: `003-design-md` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: `/specs/003-design-md/spec.md`

## 요약 (Summary)

Claude Code와 Codex가 `@myorg/ui` 디자인 시스템을 올바르게 사용하도록 안내하는 단일 Markdown 문서 `/DESIGN.md`를 프로젝트 루트에 생성한다. 이 파일은 [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 9섹션 품질 기준을 따르며, 53개의 UI 컴포넌트, 전체 디자인 토큰, 접근성 규칙, 사용 가이드를 포함한다. 추가로 Codex용 `/AGENTS.md`를 생성해 두 에이전트 모두 디자인 시스템과 speckit 워크플로우를 인식하도록 한다.

## 기술 컨텍스트 (Technical Context)

**Language/Version**: Markdown (plain text)  
**Primary Dependencies**: 없음 (정적 문서)  
**Storage**: 파일 시스템 — `/DESIGN.md`, `/AGENTS.md` (프로젝트 루트)  
**Testing**: 수동 검증 — AI 에이전트 출력물이 디자인 토큰 및 컴포넌트명을 올바르게 사용하는지 확인  
**Target Platform**: 프로젝트 루트 (Claude Code, Codex 자동 탐색 경로)  
**Project Type**: 문서화 산출물 (documentation artifact)  
**Performance Goals**: 파일 크기 50KB 이하 (AI 컨텍스트 창 제한 고려)  
**Constraints**: 단일 Markdown 파일, awesome-design-md 9섹션 구조 준수, 코드 예시 최소화(개요 수준)  
**Scale/Scope**: 파일 2개 (`/DESIGN.md`, `/AGENTS.md`), 53개 컴포넌트 및 전체 디자인 토큰 커버

## 헌법 검토 (Constitution Check)

*게이트: Phase 0 리서치 전 반드시 통과해야 함*

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 | ✅ 통과 | 문서 아티팩트 — 각 섹션이 단일 관심사를 다루도록 SRP 적용 |
| II. 테스트 표준 | ✅ 해당 없음 | 정적 문서; 콘텐츠는 `packages/tokens/` 소스 대비 수동 검증 |
| III. UX 일관성 | ✅ 직접 지원 | AI 에이전트가 디자인 시스템 일관성을 유지하도록 하는 핵심 산출물 |
| IV. 성능 요구사항 | ✅ 해당 없음 | 정적 파일 — 성능 목표 적용 불가 |
| V. 단순성 | ✅ 통과 | 단일 파일 접근법 채택; 불필요한 자동화 없음 |

**결론**: 모든 게이트 통과. Complexity Tracking 불필요.

## 프로젝트 구조 (Project Structure)

### 문서화 (이 기능)

```text
specs/003-design-md/
├── plan.md              # 이 파일 (/speckit.plan 출력)
├── research.md          # Phase 0 출력 (/speckit.plan)
├── data-model.md        # Phase 1 출력 (/speckit.plan)
├── quickstart.md        # Phase 1 출력 (/speckit.plan)
├── contracts/           # 해당 없음 (외부 인터페이스 없음)
└── tasks.md             # Phase 2 출력 (/speckit.tasks — 이 명령에서 생성 안 함)
```

### 소스 코드 (저장소 루트)

```text
/
├── DESIGN.md            # 메인 출력물 — AI 에이전트용 디자인 시스템 문서
└── AGENTS.md            # Codex용 에이전트 규칙 (speckit 워크플로우 + DESIGN.md 참조)
```

**구조 결정**: 단일 프로젝트 구조. 두 파일 모두 프로젝트 루트에 위치하여 Claude Code와 Codex가 자동으로 탐색할 수 있도록 한다. `docs/` 또는 하위 디렉토리 배치는 AI 에이전트 자동 탐색을 방해할 수 있어 채택하지 않는다.
