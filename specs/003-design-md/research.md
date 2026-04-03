# 리서치: DESIGN.md for AI Coding Agents

**Feature**: 003-design-md | **Date**: 2026-04-03

## 결정 사항 (Decisions)

### 1. DESIGN.md 구조: awesome-design-md 9섹션 형식 채택

**결정**: awesome-design-md CONTRIBUTING.md 품질 기준의 9섹션 구조를 그대로 채택한다.

**근거**: 
- 55개 이상의 실제 DESIGN.md 사례(Claude, Vercel, Stripe, Linear, Supabase 등)가 이 구조를 검증함
- AI 에이전트(Claude Code, Codex)가 일관된 위치에서 필요한 정보를 찾을 수 있음
- 품질 기준이 명확히 정의되어 있어 누락 항목 검증이 용이함

**검토한 대안**: 자유 형식 문서화 — 기각, 에이전트가 일관성 없는 문서에서 정보를 추론해야 하는 부담 발생

**9섹션 구조**:
1. Identity & Brand
2. Typography
3. Color System
4. Spacing & Layout
5. Components
6. Motion & Animation
7. Dark Mode
8. Accessibility
9. Usage Rules & Don'ts

---

### 2. Claude Code 및 Codex의 파일 탐색 방식

**결정**: `/DESIGN.md`는 프로젝트 루트에 배치한다. Codex를 위한 `/AGENTS.md`를 별도로 생성하고 DESIGN.md를 참조시킨다.

**근거**:
- Claude Code는 세션 시작 시 프로젝트 루트의 `CLAUDE.md`를 자동으로 읽음. `DESIGN.md`는 개발자가 명시적으로 참조하거나 AI 에이전트가 파일 탐색으로 발견함
- Codex(OpenAI)는 `AGENTS.md`를 자동으로 읽으며, 이 파일에서 `DESIGN.md`로 안내하는 것이 최적
- DocGuard 진단 결과 `AGENTS.md`가 없다는 경고가 확인됨 — 이번 기능에서 함께 생성
- `CLAUDE.md`에 DESIGN.md 참조를 추가하면 Claude Code 세션에서 자동으로 인식됨

**검토한 대안**: `docs/DESIGN.md` — 기각, 에이전트 자동 탐색에서 누락될 위험

---

### 3. Speckit 워크플로우와의 통합

**결정**: `AGENTS.md`에 speckit 워크플로우(`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → 구현)를 문서화한다. `DESIGN.md`는 디자인 시스템 전용으로 유지하여 단일 책임을 지킨다.

**근거**:
- DESIGN.md는 "UI를 어떻게 만드는가"에 집중해야 하며, "워크플로우를 어떻게 따르는가"는 별개 관심사
- AGENTS.md는 에이전트 행동 규칙 전반을 담는 적합한 위치 (DocGuard 권고사항이기도 함)
- speckit constitution에서 모든 개발은 spec.md → plan.md → tasks.md 순서를 따르도록 규정함

**검토한 대안**: DESIGN.md에 speckit 워크플로우 포함 — 기각, 단일 책임 원칙 위반

---

### 4. 컴포넌트 문서화 깊이

**결정**: 53개 컴포넌트 각각에 대해 이름, 주요 서브컴포넌트, variant/size 옵션, 최소 사용 예시를 포함한다. 전체 prop 타입 정의는 포함하지 않는다.

**근거**:
- 파일 크기를 50KB 이하로 유지하기 위해 핵심 정보만 포함
- AI 에이전트가 전체 TypeScript 타입보다 자연어 설명 + 짧은 예시에서 더 정확하게 패턴을 학습함
- 상세 타입 정의는 소스 코드에서 확인 가능; DESIGN.md는 "어떤 컴포넌트를, 어떤 variant로" 선택하는 판단을 돕는 것이 목적

**검토한 대안**: 전체 TypeScript 인터페이스 포함 — 기각, 파일 크기 초과 및 중복 정보

---

### 5. 색상 토큰 문서화 방식

**결정**: 시맨틱 토큰(CSS 변수 이름)을 primary로 문서화하고, 팔레트 스케일(gray-50 ~ gray-950 등)은 참조용으로 포함한다. 모든 색상 항목에 semantic name + hex + functional role 3요소를 포함한다.

**근거**:
- awesome-design-md CONTRIBUTING.md 필수 요구사항: "every color must have semantic name + hex + functional role"
- AI 에이전트가 `primary` 토큰을 사용해야 하는 시점과 이유를 알아야 원시 hex 값을 추측하지 않음
- HSL 색상 값도 병기하여 CSS 변수 패턴(`hsl(var(--primary) / 0.5)`)을 설명

**검토한 대안**: 팔레트만 문서화 — 기각, 에이전트가 올바른 시맨틱 토큰을 선택하는 데 도움이 안 됨
