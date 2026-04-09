# Tasks: Storybook MCP 서버 적용

**입력**: `specs/013-mcp-storybook-short/` 설계 문서
**필수 문서**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**테스트**: 스펙에서 수동 테스트로 명시. 자동화된 테스트 태스크 없음.

**구성**: 태스크는 유저 스토리별로 그룹화하여 독립적 구현 및 검증이 가능하도록 구성.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 해당 유저 스토리 (US1, US2, US3)
- 설명에 정확한 파일 경로 포함

---

## Phase 1: Setup (MCP Addon 설치)

**목적**: `@storybook/addon-mcp` 패키지 설치 및 Storybook 설정에 등록

- [x] T001 `packages/ui` 디렉토리에서 `npx storybook add @storybook/addon-mcp` 실행하여 addon 설치 및 자동 등록
- [x] T002 `packages/ui/.storybook/main.ts`에서 addons 배열에 `@storybook/addon-mcp`가 정상 등록되었는지 확인. 자동 등록 실패 시 수동으로 `'@storybook/addon-mcp'`를 addons 배열 마지막에 추가
- [x] T003 `packages/ui/package.json`의 devDependencies에 `@storybook/addon-mcp`가 추가되었는지 확인

**체크포인트**: addon 설치 완료. `pnpm --filter @myorg/ui storybook` 실행 시 에러 없이 Storybook 시작되어야 함.

---

## Phase 2: Foundational (MCP 서버 연결 설정)

**목적**: AI 에이전트가 MCP 서버에 연결할 수 있도록 프로젝트 설정 구성

**⚠️ CRITICAL**: 유저 스토리 검증 전 반드시 완료 필요

- [x] T004 프로젝트 루트에서 `npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project` 실행하여 MCP 서버 연결 설정 등록 (서버 이름: `storybook`)
- [x] T005 [P] CLAUDE.md의 `## Commands` 섹션에 `pnpm --filter @myorg/ui storybook` 명령 추가 (Storybook 개발 서버 실행 — MCP 서버 포함)
- [x] T006 [P] CLAUDE.md의 `<!-- MANUAL ADDITIONS START -->` 와 `<!-- MANUAL ADDITIONS END -->` 사이에 MCP 사용 지침 섹션 추가. 내용: (1) Storybook 개발 서버 실행 필수 전제조건, (2) 컴포넌트 작업 전 MCP 도구로 문서 조회 필수, (3) 사용 가능한 MCP 도구 6개 목록 (`list-all-documentation`, `get-documentation`, `get-documentation-for-story`, `get-storybook-story-instructions`, `preview-stories`, `run-story-tests`)

**체크포인트**: MCP 서버 연결 설정 및 에이전트 지침 문서화 완료. Storybook 실행 후 `http://localhost:6006/mcp` 접속 시 MCP 엔드포인트 응답 확인.

---

## Phase 3: User Story 1 — AI 에이전트가 컴포넌트 문서를 조회한다 (Priority: P1) 🎯 MVP

**목표**: AI 에이전트가 MCP 도구를 통해 컴포넌트 목록과 상세 문서를 조회할 수 있음을 검증

**독립 테스트**: Storybook 실행 상태에서 AI 에이전트가 `list-all-documentation`, `get-documentation`, `get-documentation-for-story` 도구를 호출하여 결과를 받을 수 있으면 성공

### 구현

- [x] T007 [US1] [수동] Storybook 개발 서버 실행 (`pnpm --filter @myorg/ui storybook`) 후 브라우저에서 `http://localhost:6006/mcp` 접속하여 MCP 엔드포인트 응답 및 도구 목록 표시 확인
- [x] T008 [US1] [수동] AI 에이전트(Claude Code)에서 `list-all-documentation` 도구 호출하여 프로젝트의 전체 컴포넌트 및 문서 목록이 반환되는지 확인
- [x] T009 [US1] [수동] AI 에이전트에서 `get-documentation` 도구로 특정 컴포넌트(예: Button)의 props, 스토리 목록, 사용 예시가 반환되는지 확인
- [x] T010 [US1] [수동] AI 에이전트에서 `get-documentation-for-story` 도구로 특정 스토리의 소스 코드와 관련 문서가 반환되는지 확인

**체크포인트**: Documentation 도구셋의 3개 도구가 정상 동작. AI 에이전트가 컴포넌트 정보를 정확하게 조회 가능.

---

## Phase 4: User Story 2 — AI 에이전트가 스토리를 작성하고 테스트한다 (Priority: P2)

**목표**: AI 에이전트가 스토리 작성 가이드를 참조하고 테스트를 실행할 수 있음을 검증

**독립 테스트**: AI 에이전트가 `get-storybook-story-instructions` 도구로 가이드를 받고, `run-story-tests` 도구로 테스트 결과를 받을 수 있으면 성공

### 구현

- [x] T011 [US2] [수동] AI 에이전트에서 `get-storybook-story-instructions` 도구 호출하여 스토리 작성 가이드 및 인터랙션 테스트 작성 지침이 반환되는지 확인
- [x] T012 [US2] [수동] AI 에이전트에서 `run-story-tests` 도구로 기존 스토리(예: Button)의 테스트를 실행하여 통과/실패 결과와 접근성 이슈가 포함된 결과가 반환되는지 확인

**체크포인트**: Development + Testing 도구셋 정상 동작. AI 에이전트가 스토리 작성 가이드 조회 및 테스트 실행 가능.

---

## Phase 5: User Story 3 — AI 에이전트가 스토리 미리보기를 확인한다 (Priority: P3)

**목표**: AI 에이전트가 렌더링된 스토리의 미리보기를 확인할 수 있음을 검증

**독립 테스트**: AI 에이전트가 `preview-stories` 도구를 호출하여 스토리 렌더링 결과 또는 Storybook 링크를 받을 수 있으면 성공

### 구현

- [x] T013 [US3] [수동] AI 에이전트에서 `preview-stories` 도구 호출하여 특정 스토리의 렌더링 이미지 또는 Storybook 내 해당 스토리 링크가 반환되는지 확인

**체크포인트**: 전체 3개 도구셋(Development, Documentation, Testing)의 6개 도구 모두 정상 동작 확인.

---

## Phase 6: Polish & Cross-Cutting Concerns

**목적**: 문서 정리 및 최종 검증

- [x] T014 [P] CLAUDE.md Stack 섹션의 Storybook 버전 및 addon 목록 최신화 (`@storybook/addon-mcp` 추가 반영)
- [x] T015 quickstart.md 가이드의 전체 단계를 처음부터 재검증 (Storybook 재시작 후 MCP 엔드포인트 → 도구 호출 흐름)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 의존성 없음 — 즉시 시작 가능
- **Foundational (Phase 2)**: Phase 1 완료 필요 — 모든 유저 스토리 차단
- **User Story 1 (Phase 3)**: Phase 2 완료 필요
- **User Story 2 (Phase 4)**: Phase 2 완료 필요 (US1과 독립)
- **User Story 3 (Phase 5)**: Phase 2 완료 필요 (US1, US2와 독립)
- **Polish (Phase 6)**: 모든 유저 스토리 완료 후 실행

### User Story Dependencies

- **User Story 1 (P1)**: Phase 2 완료 후 시작. 다른 스토리에 대한 의존성 없음
- **User Story 2 (P2)**: Phase 2 완료 후 시작. US1과 독립적으로 검증 가능
- **User Story 3 (P3)**: Phase 2 완료 후 시작. US1, US2와 독립적으로 검증 가능

### Within Each User Story

- 모든 검증은 Storybook 개발 서버 실행 상태에서 수행
- 도구별 순차 검증 (각 도구 호출 → 결과 확인)

### Parallel Opportunities

- T005, T006은 병렬 실행 가능 (CLAUDE.md의 서로 다른 섹션 수정)
- Phase 3, 4, 5의 유저 스토리들은 모두 Phase 2 완료 후 병렬 검증 가능
- T014는 다른 태스크와 병렬 실행 가능

---

## Parallel Example: Phase 2 (Foundational)

```bash
# T005와 T006은 CLAUDE.md의 서로 다른 위치를 수정하므로 병렬 가능:
Task: "CLAUDE.md Commands 섹션에 storybook 명령 추가"
Task: "CLAUDE.md MANUAL ADDITIONS 섹션에 MCP 사용 지침 추가"
```

## Parallel Example: User Story 검증

```bash
# Phase 2 완료 후, 3개 유저 스토리를 순차 또는 병렬로 검증:
# (수동 테스트이므로 실제로는 순차 진행이 자연스러움)
Phase 3: Documentation 도구셋 검증 (list-all-documentation, get-documentation, get-documentation-for-story)
Phase 4: Development + Testing 도구셋 검증 (get-storybook-story-instructions, run-story-tests)
Phase 5: Development 도구셋 검증 (preview-stories)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 완료: MCP addon 설치
2. Phase 2 완료: MCP 서버 연결 설정 및 CLAUDE.md 업데이트
3. Phase 3 완료: Documentation 도구셋 검증
4. **중단 및 검증**: AI 에이전트가 컴포넌트 문서를 조회할 수 있는지 확인
5. MVP 달성 — 핵심 가치(AI 에이전트의 컴포넌트 이해) 검증 완료

### Incremental Delivery

1. Setup + Foundational → 기반 완료
2. User Story 1 추가 → Documentation 검증 → MVP 달성
3. User Story 2 추가 → Development + Testing 검증 → 스토리 작성/테스트 루프 가능
4. User Story 3 추가 → Preview 검증 → 전체 기능 완성
5. Polish → 문서 최신화 및 최종 검증

---

## Notes

- 이 feature의 구현 태스크(T001~T006)는 설정 파일 변경 중심이며, 검증 태스크(T007~T013)는 수동 테스트
- MCP 기능은 preview 단계로, Storybook 업데이트 시 API 변경 가능성 있음
- 모든 수동 검증은 Storybook 개발 서버 실행 상태(`pnpm --filter @myorg/ui storybook`)가 전제 조건
