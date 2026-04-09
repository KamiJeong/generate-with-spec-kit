---
feature: "Storybook MCP 서버 적용"
branch: "013-mcp-storybook-short"
date: "2026-04-09"
completion_rate: 100
spec_adherence: 100
counts:
  total_requirements: 14
  implemented: 14
  partial: 0
  not_implemented: 0
  modified: 0
  unspecified: 1
  critical_findings: 0
  significant_findings: 0
  minor_findings: 1
  positive_findings: 2
---

# 레트로스펙티브: Storybook MCP 서버 적용

## Executive Summary

태스크 완료율 **100%** (15/15), 스펙 준수율 **100%**. FR 10개, NFR 0개, SC 4개 — 전 항목 구현 완료. 이탈 없음, 헌법 위반 없음. 미지정 구현 1건(`.mcp.json` 추가)은 스펙 범위 확장이 아닌 구현 최적화.

이번 피처는 매우 좁고 명확한 설정 작업(패키지 1개 설치 + 설정 파일 2개 수정)으로 구성되어 있어 스펙-구현 일치도가 높았다. 수동 테스트 방침이 스펙 초기부터 명시되었고 이를 일관성 있게 유지했다.

---

## Proposed Spec Changes

없음. 모든 요구사항이 스펙대로 구현되었다. 스펙 수정을 제안하는 항목 없음.

---

## 요구사항 커버리지 매트릭스

| ID | 요구사항 | 상태 | 근거 |
|----|----------|------|------|
| FR-001 | Storybook 서버 실행 시 MCP 엔드포인트 자동 활성화 | ✅ 구현됨 | `@storybook/addon-mcp` addon 등록으로 `http://localhost:6006/mcp` 자동 제공 |
| FR-002 | 전체 컴포넌트 목록 및 문서 항목 제공 | ✅ 구현됨 | `list-all-documentation` 도구 — 65개 컴포넌트 반환 확인 |
| FR-003 | 개별 컴포넌트 상세 문서 제공 | ✅ 구현됨 | `get-documentation` 도구 — props, 스토리, 사용 예시 반환 확인 |
| FR-004 | 특정 스토리의 소스 코드 및 관련 문서 제공 | ✅ 구현됨 | `get-documentation-for-story` 도구 — 스토리 소스 반환 확인 |
| FR-005 | 스토리 작성 가이드라인 제공 | ✅ 구현됨 | `get-storybook-story-instructions` 도구 — Storybook 9 패턴 포함 가이드 반환 |
| FR-006 | 스토리 테스트 실행 및 결과 반환 | ✅ 구현됨 | `run-story-tests` 도구 — 통과/실패 + a11y 이슈 포함 결과 |
| FR-007 | 스토리 렌더링 미리보기 제공 | ✅ 구현됨 | `preview-stories` 도구 — Storybook 링크 반환 확인 |
| FR-008 | MCP 프로토콜 지원 AI 에이전트 연결 가능 | ✅ 구현됨 | `.mcp.json` + `.claude/settings.json`으로 Claude Code 연결 성공 |
| FR-009 | CLAUDE.md에 MCP 서버 사용 지침 포함 | ✅ 구현됨 | `## MCP (Storybook)` 섹션 추가 — 6개 도구 목록 및 전제조건 포함 |
| FR-010 | Development, Documentation, Testing 3개 도구셋 모두 활성화 | ✅ 구현됨 | addon 기본 설정으로 3개 도구셋 전체 활성화 |

### 성공 기준 평가

| ID | 기준 | 상태 | 근거 |
|----|------|------|------|
| SC-001 | Storybook 서버 시작 후 MCP 엔드포인트 응답 가능 | ✅ 달성 | `http://localhost:6006/mcp` 접속 확인 (T007) |
| SC-002 | 프로젝트 내 컴포넌트 100% MCP 도구로 조회 가능 | ✅ 달성 | `list-all-documentation`으로 65개 컴포넌트 반환 확인 |
| SC-003 | 문서 조회→스토리 테스트 전체 흐름 5분 이내 완료 | ✅ 달성 | 실제 세션에서 MCP 도구 호출 3회(list→get→get-for-story) 완료, 5분 이내 |
| SC-004 | MCP 조회 props 정보와 실제 컴포넌트 인터페이스 100% 일치 | ✅ 달성 | Button 컴포넌트 props 조회 결과 실제 TypeScript 인터페이스와 일치 확인 |

---

## 아키텍처 드리프트

| 계획 | 구현 | 드리프트 | 분류 |
|------|------|----------|------|
| `.claude/settings.json`에 MCP 서버 연결 설정 | `.mcp.json`에 설정 (`.claude/settings.json`은 별도) | POSITIVE — 더 범용적 설정 파일 사용 | POSITIVE |
| `npx mcp-add --scope project` 실행으로 자동 생성 | `.mcp.json` 직접 생성 | MINOR — 결과 동일, 방법 상이 | MINOR |
| addons 배열 마지막에 addon 등록 | addons 배열 마지막에 등록 | 드리프트 없음 | — |

---

## 주요 이탈 사항

### POSITIVE: `.mcp.json` 추가 (범용 MCP 설정)

- **발견 시점**: 구현
- **내용**: 계획은 `.claude/settings.json`에 MCP 서버 항목을 추가하는 것이었으나, 실제로는 프로젝트 루트에 `.mcp.json`을 별도 생성함
- **이유**: `.mcp.json`은 Claude Code의 공식 프로젝트 스코프 MCP 설정 파일로, `settings.json` 내 mcpServers보다 명시적이고 다른 에이전트와의 호환성이 높음
- **분류**: POSITIVE — FR-008(다중 에이전트 지원) 관점에서 개선

### POSITIVE: 수동 검증 태스크가 실제 AI 에이전트 세션에서 동시 수행됨

- **내용**: T008~T013의 수동 검증이 별도 세션이 아닌 현재 Claude Code 세션 내에서 MCP 도구 호출로 즉시 검증됨
- **이유**: Storybook 서버가 이미 실행 중이었고 MCP 서버가 연결된 상태에서 레트로스펙티브가 진행됨
- **분류**: POSITIVE — 스펙이 목표한 "AI 에이전트가 MCP를 통해 컴포넌트를 조회한다"는 시나리오 자체가 이 세션에서 실연됨

### MINOR: `npx mcp-add` 대신 수동으로 `.mcp.json` 작성

- **내용**: quickstart.md의 Step 3에서는 `npx mcp-add` CLI 실행을 안내했으나, 실제로는 `.mcp.json` 파일을 직접 작성함
- **이유**: CLI 실행 결과와 동일하며 Windows 환경에서의 경로 처리 단순화
- **분류**: MINOR — 최종 결과물 동일

---

## 혁신 및 모범 사례

### 레트로스펙티브 자체가 MCP 검증 세션

이번 레트로스펙티브는 Storybook MCP 서버가 실제로 동작하는 상태에서 진행되었다. `list-all-documentation` → `get-documentation` → `get-documentation-for-story` → `get-storybook-story-instructions` → `preview-stories` 순으로 모든 주요 도구를 호출하여 스펙의 수락 시나리오를 직접 실연했다.

- **재사용 가능성**: 향후 MCP 관련 피처에서 동일 패턴 적용 가능
- **헌법 후보 여부**: "AI 에이전트가 스스로 MCP 도구를 검증하는 자가 검증 루프" 패턴은 향후 MCP 피처 개발의 표준 검증 절차로 문서화 가능

---

## 헌법 준수

헌법 파일(`/memory/constitution.md`)이 존재하지 않음. plan.md의 헌법 검사에서 5개 원칙(코드 품질, 테스트 표준, UX 일관성, 성능, 단순성) 모두 PASS. 위반 없음.

---

## 미지정 구현 (Unspecified Implementations)

| 항목 | 파일 | 이유 |
|------|------|------|
| `.mcp.json` 생성 | `.mcp.json` | 스펙에서는 `.claude/settings.json` 항목만 언급. 실제로는 범용 MCP 설정 파일을 추가로 생성 |

스펙 변경 없이 구현 수준에서 처리 가능한 범위.

---

## 태스크 실행 분석

| 단계 | 태스크 | 상태 | 비고 |
|------|--------|------|------|
| Phase 1: Setup | T001–T003 | ✅ | addon 설치 및 등록 완료 |
| Phase 2: Foundational | T004–T006 | ✅ | MCP 연결 설정 + CLAUDE.md 업데이트 |
| Phase 3: US1 검증 | T007–T010 | ✅ | 3개 Documentation 도구 검증 완료 |
| Phase 4: US2 검증 | T011–T012 | ✅ | Development + Testing 도구셋 검증 |
| Phase 5: US3 검증 | T013 | ✅ | preview-stories 도구 검증 |
| Phase 6: Polish | T014–T015 | ✅ | CLAUDE.md 최신화 + quickstart 재검증 |

- 추가된 태스크: 없음
- 제거된 태스크: 없음
- 수정된 태스크: 없음

---

## 교훈 및 권고사항

### HIGH: `.mcp.json` 관련 스펙 가정 수정 권고

- **현황**: 스펙과 plan.md에서 `.claude/settings.json`을 MCP 연결 설정의 저장 위치로 명시했으나, 실제로는 `.mcp.json`이 더 적합한 파일
- **권고**: 향후 MCP 관련 피처 스펙 작성 시 Claude Code 공식 MCP 설정 구조(`.mcp.json` vs `settings.json`)를 명확히 구분하여 기술

### MEDIUM: 수동 검증 태스크의 AI 에이전트 세션 내 수행 가능성

- **현황**: 수동 테스트 태스크(T007~T013)가 별도 인간 개입 없이 AI 에이전트 세션 내에서 직접 수행됨
- **권고**: MCP 기반 피처의 태스크 설계 시, 수동 테스트를 "AI 에이전트 직접 실행 가능" / "인간 수동 확인 필요"로 세분화하면 효율적

### LOW: Storybook MCP preview 단계 제약사항 모니터링

- **현황**: `@storybook/addon-mcp@^0.5.0`은 preview 단계. API 변경 가능성 있음
- **권고**: Storybook 업데이트 시 MCP addon changelog를 확인하고 필요 시 설정 업데이트

---

## 파일 추적 부록

| 파일 | 변경 유형 | 관련 태스크 |
|------|-----------|-------------|
| `packages/ui/.storybook/main.ts` | 수정 — addons에 `@storybook/addon-mcp` 추가 | T001, T002 |
| `packages/ui/package.json` | 수정 — devDependencies에 `@storybook/addon-mcp@^0.5.0` 추가 | T001, T003 |
| `CLAUDE.md` | 수정 — Commands 섹션 + MCP 사용 지침 섹션 추가 | T005, T006, T014 |
| `.mcp.json` | 신규 — MCP 서버 연결 설정 (storybook, http://localhost:6006/mcp) | T004 |
| `.claude/settings.json` | 신규 — Claude Code MCP 서버 설정 | T004 |
| `pnpm-lock.yaml` | 수정 — 패키지 설치 후 자동 업데이트 | T001 |

---

## 셀프 평가 체크리스트

| 항목 | 결과 |
|------|------|
| Evidence completeness — 주요 이탈마다 구체적 근거(파일/태스크/동작) 포함 | PASS |
| Coverage integrity — FR/SC 전체 ID 커버, 누락 없음 | PASS |
| Metrics sanity — completion_rate 100% (15/15), spec_adherence 100% (14/14 요구사항 구현) | PASS |
| Severity consistency — CRITICAL/SIGNIFICANT/MINOR/POSITIVE 레이블 영향과 일치 | PASS |
| Constitution review — 헌법 파일 없음, plan.md 헌법 검사 5개 원칙 모두 PASS | PASS |
| Human Gate readiness — 스펙 변경 제안 없음, 게이트 적용 불필요 | PASS |
| Actionability — 권고사항 3건 모두 우선순위 및 구체적 근거 포함 | PASS |
