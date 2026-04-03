# Tasks: DESIGN.md (AI 코딩 에이전트용)

**Input**: `/specs/003-design-md/` 설계 문서 전체
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**조직**: 사용자 스토리 별로 태스크를 구성하여 각 스토리를 독립적으로 구현·검증 가능하게 함

## 포맷: `[ID] [P?] [Story] 설명`

- **[P]**: 다른 파일에서 병렬 실행 가능 (의존성 없음)
- **[Story]**: 해당 태스크가 속한 사용자 스토리 (US1, US2, US3)
- 설명에 정확한 파일 경로 포함

---

## Phase 1: Setup (파일 뼈대 생성)

**목적**: 프로젝트 루트에 올바른 위치로 파일 생성

- [X] T001 `/DESIGN.md`를 프로젝트 루트에 생성 — awesome-design-md 9섹션 헤딩(Identity & Brand, Typography, Color System, Spacing & Layout, Components, Motion & Animation, Dark Mode, Accessibility, Usage Rules)만 포함한 빈 구조로 초기화

---

## Phase 2: Foundational (기반 섹션 — 모든 스토리 전에 완료)

**목적**: 다른 섹션에서 반복 참조되는 Identity와 Color System을 먼저 확립

**⚠️ CRITICAL**: 이 Phase 완료 전까지 US1 섹션 작성을 시작하지 않는다

- [X] T002 `/DESIGN.md`의 **Section 1 (Identity & Brand)** 작성 — 프로젝트명(`generate-with-spec-kit`), 디자인 철학(기능적·접근 가능한 개발자 도구 UI), 3–5개 핵심 디자인 원칙, 브랜드 색상(`primary`: `#d92b33`)
- [X] T003 `/DESIGN.md`의 **Section 3 (Color System)** 작성 — `packages/tokens/src/semantic/index.ts`를 읽고 모든 시맨틱 토큰을 `CSS Variable | 목적 | Light Hex | 사용 상황` 4열 테이블로 작성; `packages/tokens/src/colors.ts`에서 `gray-50~950`, `primary-50~950` 팔레트 스케일 참조 섹션 추가

**Checkpoint**: Identity + Color System 완료 — US1 구현 시작 가능

---

## Phase 3: User Story 1 — DESIGN.md 핵심 콘텐츠 완성 (Priority: P1) 🎯 MVP

**Goal**: AI 에이전트가 `/DESIGN.md`만 읽고 올바른 컴포넌트와 토큰을 선택해 UI를 생성할 수 있을 만큼 충분한 정보를 모든 9개 섹션에 제공한다.

**Independent Test**: AI 에이전트에게 DESIGN.md만 주고 로그인 폼 생성 요청 → `Field`, `Input`, `Button variant="default"`, 시맨틱 토큰만 사용하는 코드가 나오면 통과

### Implementation for User Story 1

- [X] T004 [US1] `/DESIGN.md`의 **Section 2 (Typography)** 작성 — `packages/tokens/src/typography.ts`를 읽고 폰트 패밀리 스택(NanumBarunGothic 등), 지원 웨이트(400/500/600/700) 각각의 사용 시점, 행간(line-height) 가이드 작성
- [X] T005 [US1] `/DESIGN.md`의 **Section 4 (Spacing & Layout)** 작성 — `packages/tokens/src/` 및 `packages/ui/src/index.css`를 읽고 border-radius 변수(`--radius`: 0.5rem, `lg`/`md`/`sm` variants), 반응형 브레이크포인트(sm:640px, md:768px, lg:1024px), `useIsMobile()` hook(768px) 문서화
- [X] T006 [US1] `/DESIGN.md`의 **Section 5 (Components) — 레이아웃 & 인터랙션** 작성 — `packages/ui/src/components/` 디렉토리에서 아래 컴포넌트 소스를 읽고 각각 `서브컴포넌트 | 주요 Props/Variants | 최소 사용 예시` 형식으로 작성:
  Card, Sidebar, Breadcrumb, NavigationMenu, Tabs, Pagination,
  Button (variant: default/destructive/outline/secondary/ghost/link; size: xs/sm/default/lg/icon/icon-xs/icon-sm/icon-lg),
  Badge, ButtonGroup, Input, InputGroup, InputOTP, NativeSelect, Select, Combobox,
  Checkbox, RadioGroup, Switch, Label, Field
- [X] T007 [US1] `/DESIGN.md`의 **Section 5 (Components) — 다이얼로그 & 오버레이** 작성 — 소스 파일을 읽고 동일 형식으로 작성:
  Dialog, AlertDialog, Drawer, Sheet, Popover, HoverCard, Tooltip,
  ContextMenu, DropdownMenu, Menubar
- [X] T008 [US1] `/DESIGN.md`의 **Section 5 (Components) — 데이터/피드백/특수** 작성 — 소스 파일을 읽고 동일 형식으로 작성:
  Table, DataTable (columns/data/searchKey/pageSize props 포함),
  Chart (ChartContainer + config 객체 구조),
  Progress, Skeleton, Spinner (size: sm/default/lg),
  Alert (variant: default/destructive), Sonner (toast.success/error/loading),
  Accordion, Collapsible, Separator, Textarea, KBD, Empty, Item,
  Avatar (size: sm/default/lg + AvatarGroup), Carousel, Command, Direction,
  Resizable, AspectRatio, Calendar, DatePicker
- [X] T009 [US1] `/DESIGN.md`의 **Section 6 (Motion & Animation)** 작성 — `packages/tokens/src/motion/index.ts`를 읽고 duration 토큰(fast: 0.15s, normal: 0.25s, slow: 0.4s)과 각 사용 상황, easing 곡선(ease/easeIn/easeOut), framer-motion spring 설정 문서화
- [X] T010 [US1] `/DESIGN.md`의 **Section 7 (Dark Mode)** 작성 — 시맨틱 토큰이 자동으로 다크 모드를 처리함을 명시, `.dark` 클래스 / `[data-theme="dark"]` 셀렉터 패턴, 구조적 변경에만 `dark:` prefix 사용, Sidebar 특수 변수(`--sidebar-*`) 주의사항
- [X] T011 [US1] `/DESIGN.md`의 **Section 8 (Accessibility)** 작성 — 필수 `aria-*` 패턴 목록(aria-invalid, aria-label, aria-current, aria-disabled), `focus-visible:ring-2 focus-visible:ring-ring` 클래스 패턴, `Field` 컴포넌트가 aria-* 자동 연결 처리를 담당함을 명시, WCAG 2.1 AA 준수 선언

**Checkpoint**: Phase 3 완료 시 US1 독립 테스트 가능 — DESIGN.md의 9개 섹션 중 1–4, 6–8 완성

---

## Phase 4: User Story 2 — 검증 가능한 명확성 확보 (Priority: P2)

**Goal**: 개발자가 AI 생성 코드를 리뷰할 때 DESIGN.md만으로 모든 네이밍·variant 질문에 30초 이내에 답할 수 있다.

**Independent Test**: AI 생성 코드에서 임의의 토큰명/컴포넌트명을 골라 DESIGN.md에서 찾아 기능을 확인 — 30초 이내에 소스 파일 없이 답변 가능하면 통과

### Implementation for User Story 2

- [X] T012 [US2] `/DESIGN.md`의 **Section 9 (Usage Rules & Don'ts)** 작성 — Do/Don't 두 열로 명시: 시맨틱 토큰 우선 사용, `Field` 필수 래핑, `cn()` 사용, variant 명시 / 원시 hex 사용 금지, 팔레트 스케일 직접 사용 금지, CSS 임의 오버라이드 금지, 불필요한 컴포넌트 재빌드 금지
- [X] T013 [US2] `/DESIGN.md`의 모든 CSS 변수명 및 토큰명을 `packages/tokens/src/index.ts` exports와 대조 검증 — 불일치 항목 수정
- [X] T014 [US2] `/DESIGN.md`의 모든 컴포넌트명과 서브컴포넌트명을 `packages/ui/src/components/` 디렉토리 실제 파일 목록과 대조 검증 — 불일치 항목 수정

**Checkpoint**: Phase 4 완료 시 US2 독립 테스트 가능 — DESIGN.md 9개 섹션 모두 완성

---

## Phase 5: User Story 3 — AGENTS.md 생성 + 참조 업데이트 (Priority: P3)

**Goal**: Codex가 이 프로젝트에서 작업할 때 디자인 시스템과 speckit 워크플로우를 자동으로 인식한다. 개발자가 DESIGN.md의 특정 섹션을 쉽게 업데이트할 수 있다.

**Independent Test**: Codex 세션에서 AGENTS.md를 읽고 DESIGN.md 존재 여부 및 speckit 워크플로우 명령어를 인식하면 통과

### Implementation for User Story 3

- [X] T015 [US3] 프로젝트 루트에 `/AGENTS.md` 생성 — 아래 5개 섹션으로 구성:
  1. 프로젝트 개요 (모노레포 구조: `packages/tokens`, `packages/ui`)
  2. 디자인 시스템 참조 (`DESIGN.md` 위치와 용도 안내)
  3. Speckit 워크플로우 (`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → 구현)
  4. 주요 제약사항 (헌법 핵심 원칙 요약: 시맨틱 토큰 강제, `Field` 래핑, 코드 품질, TDD)
  5. 명령어 참조 (`pnpm --filter @myorg/tokens build`, `pnpm --filter @myorg/ui build` 등)
- [X] T016 [P] [US3] `/CLAUDE.md`에 **DESIGN.md 참조 섹션** 추가 — "Design System" 섹션을 추가하고 `/DESIGN.md` 경로와 "UI 작업 시 이 파일을 먼저 읽을 것" 지시 포함

**Checkpoint**: Phase 5 완료 시 US3 독립 테스트 가능 — AGENTS.md 생성, CLAUDE.md 업데이트 완료

---

## Polish Phase: 최종 검토

**목적**: 전체 DESIGN.md 일관성 검토 및 포맷 정리

- [X] T017 `/DESIGN.md` 전체 검토 — 섹션 헤딩 일관성, 마크다운 테이블 정렬, 코드 블록 언어 태그, 내부 링크 유효성 확인; 파일 크기가 50KB를 초과하지 않는지 확인
- [X] T018 [P] DocGuard `AGENTS.md` 경고 해소 확인 — `npx docguard-cli@latest diagnose` 재실행 후 `[Spec-Kit] constitution.md exists but no AGENTS.md found` 경고가 사라졌는지 확인

---

## 의존성 및 실행 순서

### Phase 의존성

- **Phase 1 (Setup)**: 의존성 없음 — 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 시작 — US1 작업을 블록함
- **Phase 3 (US1)**: Phase 2 완료 후 시작 — T004~T011은 모두 동일 파일(`/DESIGN.md`) 수정이므로 순차 실행
- **Phase 4 (US2)**: Phase 3 완료 후 시작 (Section 5~8 작성이 완료되어야 검증 가능)
- **Phase 5 (US3)**: Phase 4 완료 후 시작 (DESIGN.md 콘텐츠가 안정된 후 참조 문서 작성)
- **Polish**: 모든 Phase 완료 후

### 사용자 스토리 의존성

- **US1 (P1)**: Foundational 완료 후 시작 — 다른 스토리에 의존하지 않음
- **US2 (P2)**: US1 완료 후 시작 — DESIGN.md 섹션이 있어야 검증 가능
- **US3 (P3)**: US2 완료 후 시작 — DESIGN.md 콘텐츠 안정화 후 AGENTS.md 작성 권장
  - T016(`/CLAUDE.md` 업데이트)은 [P] — `/DESIGN.md`와 다른 파일이므로 T015와 병렬 가능

### 병렬 실행 기회

- T015와 T016은 [P] — 각각 `/AGENTS.md`와 `/CLAUDE.md`를 수정하므로 동시 실행 가능
- T017과 T018은 [P] — 각각 읽기 전용 검토와 CLI 실행이므로 동시 실행 가능

---

## 병렬 실행 예시: User Story 3

```bash
# T015와 T016을 동시에 실행:
Task: "T015 — /AGENTS.md 생성 (Codex용 에이전트 규칙)"
Task: "T016 — /CLAUDE.md에 Design System 섹션 추가"

# T017과 T018을 동시에 실행:
Task: "T017 — /DESIGN.md 전체 검토 및 포맷 정리"
Task: "T018 — DocGuard 재실행으로 AGENTS.md 경고 해소 확인"
```

---

## 구현 전략

### MVP First (US1만 구현)

1. Phase 1: Setup 완료 (`/DESIGN.md` 파일 뼈대 생성)
2. Phase 2: Foundational 완료 (Identity + Color System)
3. Phase 3: US1 완료 (나머지 7개 섹션 작성)
4. **STOP & VALIDATE**: AI 에이전트에게 로그인 폼 생성 요청으로 US1 독립 테스트
5. 유효하면 Phase 4, 5 진행

### 점진적 제공

1. Setup + Foundational → 기반 완료
2. US1 완료 → AI 에이전트가 디자인 시스템을 따르는 UI 생성 가능 (MVP!)
3. US2 완료 → 개발자가 AI 출력을 DESIGN.md로 검증 가능
4. US3 완료 → Codex도 동일한 가이드라인 자동 인식, DocGuard 경고 해소

---

## Notes

- **[P]** 태스크 = 다른 파일을 수정하므로 의존성 없이 병렬 실행 가능
- T004–T011은 모두 `/DESIGN.md` 파일을 수정하므로 순차 실행 필수
- T012–T014(검증)는 반드시 T006–T011(섹션 작성) 완료 후 실행
- 각 Phase 완료 후 Checkpoint에서 해당 스토리를 독립 검증
- 토큰/컴포넌트명 검증(T013, T014)에서 불일치 발견 시 즉시 수정 후 다음 Phase 진행

