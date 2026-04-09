# 태스크: Spec Kit README

**입력**: `/specs/014-speckit-readme/`의 설계 문서  
**전제조건**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**개요**: 프로젝트 루트의 `README.md`를 새로 작성한다. 단일 마크다운 파일 생성이므로 태스크 구조는 간단하다. 코드나 테스트 없이 문서 콘텐츠 작성에 집중한다.

## 형식: `[ID] [P?] [Story] 설명`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 해당 유저 스토리 (US1, US2, US3)
- 각 태스크에 정확한 파일 경로 포함

---

## Phase 1: 셋업 (Setup)

**목적**: 파일 구조 준비 및 README 초안 골격 생성

- [X] T001 `README.md` 파일을 프로젝트 루트에 생성하고 헤더, 개요, 섹션 골격(빈 헤딩) 작성

**체크포인트**: `README.md` 파일이 존재하고 섹션 구조가 잡혀 있음

---

## Phase 2: 파운데이션 (Foundational)

**목적**: 모든 유저 스토리 섹션의 기반이 되는 공통 콘텐츠 작성

**⚠️ 중요**: 이 단계 완료 후 유저 스토리별 섹션 작성 가능

- [X] T002 `README.md`에 프로젝트 소개(Overview) 섹션 작성: 이 프로젝트가 무엇인지, AI 지원 개발 워크플로우의 핵심 개념 1-2단락
- [X] T003 `README.md`에 전체 워크플로우 흐름 다이어그램(텍스트 아스키) 작성: `specify → clarify → plan → tasks → implement → verify` 흐름과 Claude/Codex 역할 분담

**체크포인트**: README에 개요와 워크플로우 흐름이 명확히 설명되어 있음

---

## Phase 3: 유저 스토리 1 - 신규 개발자 온보딩 (Priority: P1) 🎯 MVP

**목표**: 프로젝트를 처음 접하는 개발자가 README만 읽고 AI 지원 워크플로우 전체를 이해할 수 있다.

**독립 테스트**: README를 프로젝트 미경험 개발자에게 보여줬을 때 Claude/Codex 역할과 전체 흐름을 올바르게 설명할 수 있어야 함

### Phase 3 구현

- [X] T004 [US1] `README.md`에 "워크플로우 (Workflow)" 섹션 작성: Claude가 spec/plan/tasks를 생성하는 과정, Codex가 tasks.md를 읽고 구현하는 과정을 단계별로 구체적으로 설명
- [X] T005 [US1] `README.md`에 "빠른 시작 (Quick Start)" 섹션 작성: `/speckit.specify`부터 Codex 실행까지 6단계 커맨드 가이드 (quickstart.md 내용 기반)

**체크포인트**: US1 독립 테스트 통과 — 워크플로우와 Quick Start 섹션만으로 신규 개발자가 흐름을 이해할 수 있음

---

## Phase 4: 유저 스토리 2 - Spec Kit 구성 요소 이해 (Priority: P2)

**목표**: 개발자가 Spec Kit의 4개 구성 요소(문서, 스킬, MCP, 훅/익스텐션)를 이해하고 올바르게 사용할 수 있다.

**독립 테스트**: README에서 각 구성 요소 카테고리를 찾아 최소 1개의 구체적인 예시를 확인할 수 있어야 함

### Phase 4 구현

- [X] T006 [P] [US2] `README.md`에 "Spec Kit 문서 (Documents)" 서브섹션 작성: `spec.md`, `plan.md`, `tasks.md` 각각의 역할과 생성 커맨드 설명 (data-model.md의 엔티티 정보 기반)
- [X] T007 [P] [US2] `README.md`에 "스킬 / 슬래시 커맨드 (Skills)" 서브섹션 작성: 주요 커맨드 목록과 한 줄 설명 포함 (research.md의 커맨드 목록 기반)
- [X] T008 [US2] `README.md`에 "MCP 통합 (MCP Integration)" 서브섹션 작성: Storybook MCP의 역할, 사용 조건(`pnpm storybook` 실행 필요), Claude/Codex에서의 설정 방법 설명 (`.mcp.json`, `.codex/config.toml` 기반)
- [X] T009 [US2] `README.md`에 "훅 & 익스텐션 (Hooks & Extensions)" 서브섹션 작성: before/after 훅 개념 설명, 현재 프로젝트에 구성된 훅 목록 테이블 (`.specify/extensions.yml` 기반)

**체크포인트**: US2 독립 테스트 통과 — 4개 구성 요소 섹션이 모두 존재하고 각각 구체적인 예시 포함

---

## Phase 5: 유저 스토리 3 - AI와 함께 개발하기 가이드 (Priority: P3)

**목표**: 개발자가 AI와의 협업 방식과 역할 분담을 이해하고 효과적인 기능 설명 작성법을 알 수 있다.

**독립 테스트**: README에 AI 협업 가이드 섹션이 존재하고 역할 분담(인간 vs Claude vs Codex)이 명확히 설명되어 있어야 함

### Phase 5 구현

- [X] T010 [US3] `README.md`에 "AI와 함께 개발하기 (Developing with AI)" 섹션 작성: 역할 분담(인간이 "무엇을" 결정, Claude가 "명세/계획"을 생성, Codex가 "구현"을 실행), 효과적인 기능 설명 작성 팁, 명확화(clarify) 단계의 중요성
- [X] T011 [US3] `README.md`에 엣지 케이스 대응 가이드 작성: 스펙이 의도와 다를 때 대처법(`/speckit.clarify` 재실행), Codex 구현 실패 시 대처법(`/speckit.implement` 또는 재시도), 스펙 없이 구현 시작 시 위험성

**체크포인트**: US3 독립 테스트 통과 — AI 협업 가이드 섹션이 존재하고 실용적인 팁 포함

---

## Phase 6: 마무리 & 크로스 커팅 (Polish)

**목적**: README 전체 품질 검증 및 마무리

- [X] T012 [P] `README.md` 전체 검토: 섹션 순서, 헤딩 계층, 마크다운 문법 유효성 확인
- [X] T013 [P] `README.md` 내 AI 에이전트 설정 파일 커버리지 확인: `.agent`, `.agents`, `.claude`, `.codex`, `.mcp.json` 언급 여부 검증 (docguard Docs-Coverage 경고 해소)
- [X] T014 docguard Docs-Coverage 경고 해소 확인: `npx docguard-cli@latest diagnose` 재실행하여 `.agent`, `.agents`, `.claude`, `.codex`, `.mcp.json` 관련 경고가 사라졌는지 확인

**체크포인트**: README 완성 — 모든 섹션 존재, 마크다운 유효, docguard 경고 일부 해소

---

## 의존성 & 실행 순서

### 페이즈 의존성

- **Setup (Phase 1)**: 즉시 시작 가능
- **Foundational (Phase 2)**: Phase 1 완료 후 시작
- **US1 (Phase 3)**: Phase 2 완료 후 시작 — MVP
- **US2 (Phase 4)**: Phase 2 완료 후 시작 — Phase 3와 병렬 가능
- **US3 (Phase 5)**: Phase 2 완료 후 시작 — Phase 3, 4와 병렬 가능
- **Polish (Phase 6)**: 원하는 모든 유저 스토리 완료 후 실행

### 유저 스토리 의존성

- **US1 (P1)**: Phase 2 완료 후 독립 실행 가능
- **US2 (P2)**: Phase 2 완료 후 독립 실행 가능 (US1과 무관)
- **US3 (P3)**: Phase 2 완료 후 독립 실행 가능 (US1, US2와 무관)

### 병렬 실행 기회

```bash
# Phase 4에서 T006, T007 병렬 실행 가능 (독립적인 섹션):
Task: "T006 [P] [US2] Spec Kit 문서 서브섹션 작성"
Task: "T007 [P] [US2] 스킬/슬래시 커맨드 서브섹션 작성"

# Phase 6에서 T012, T013 병렬 실행 가능:
Task: "T012 [P] README 전체 검토"
Task: "T013 [P] AI 에이전트 설정 파일 커버리지 확인"
```

---

## 구현 전략

### MVP 우선 (유저 스토리 1만)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료
3. Phase 3: US1 완료 → README에 개요, 워크플로우, Quick Start 완성
4. **중단 & 검증**: 신규 개발자에게 보여주고 흐름 이해 여부 확인
5. 충분하면 PR 생성 가능

### 점진적 확장

1. Phase 1+2 → 기본 골격 완성
2. Phase 3(US1) → MVP README (온보딩 목적 충족)
3. Phase 4(US2) → 구성 요소 설명 추가
4. Phase 5(US3) → AI 협업 가이드 추가
5. Phase 6 → 마무리

---

## 노트

- **[P]** 태스크 = 다른 섹션 작성, 상호 의존성 없음
- **[Story]** 레이블 = 해당 유저 스토리와의 추적성
- 각 유저 스토리는 독립적으로 완성 및 테스트 가능
- research.md의 커맨드 목록과 훅 정보를 그대로 활용할 것
- T013, T014는 docguard 경고 해소를 위해 중요 — README가 `.agent`, `.agents`, `.claude`, `.codex`, `.mcp.json`을 명시적으로 언급해야 함
