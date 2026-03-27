<!--
SYNC IMPACT REPORT
==================
Version Change: [template] → 1.0.0
Constitution: 초기 제정 (Initial ratification)

Modified Principles:
  - [PRINCIPLE_1_NAME] → I. 코드 품질 (Code Quality)
  - [PRINCIPLE_2_NAME] → II. 테스트 표준 (Testing Standards)
  - [PRINCIPLE_3_NAME] → III. 사용자 경험 일관성 (UX Consistency)
  - [PRINCIPLE_4_NAME] → IV. 성능 요구사항 (Performance Requirements)
  - [PRINCIPLE_5_NAME] → V. 단순성 (Simplicity)

Added Sections:
  - 기술 스택 및 의존성 제약사항 (Technical Stack & Dependency Constraints)
  - 개발 워크플로우 및 품질 게이트 (Development Workflow & Quality Gates)
  - Governance

Templates Requiring Updates:
  - ✅ .specify/templates/plan-template.md — Constitution Check section is generic; gates will be
       populated per-feature by /speckit.plan based on this constitution.
  - ✅ .specify/templates/spec-template.md — No structural changes required; success criteria
       section already aligns with performance and UX principles.
  - ✅ .specify/templates/tasks-template.md — Existing phase structure compatible with testing
       and quality gate requirements defined here.

Deferred TODOs:
  - None. All fields resolved.
-->

# Generate with Spec Kit Constitution

## 핵심 원칙 (Core Principles)

### I. 코드 품질 (Code Quality)

모든 코드는 읽기 쉽고, 유지보수가 용이하며, 명확한 의도를 전달해야 한다.

- 함수와 모듈은 **단일 책임 원칙(Single Responsibility Principle)**을 MUST 준수한다.
- 변수명, 함수명, 클래스명은 그 목적을 명확히 표현해야 하며 약어 사용을 MUST 최소화한다.
- 코드 중복은 허용되지 않는다. 동일 로직이 2회 이상 등장하면 반드시 추상화한다 (DRY).
- 모든 PR은 팀원 최소 1인의 코드 리뷰를 MUST 통과해야 병합된다.
- Linter 및 formatter 설정은 프로젝트 루트에 고정하며, CI에서 자동 검증한다.
- 주석은 *왜(why)*를 설명해야 하며, *무엇(what)*을 반복하는 주석은 MUST NOT 작성한다.

**Rationale**: 코드는 작성하는 시간보다 읽히는 시간이 훨씬 길다. 가독성에 투자하는 것이
장기적으로 유지보수 비용을 가장 효과적으로 줄이는 방법이다.

### II. 테스트 표준 (Testing Standards)

테스트는 구현 이전에 작성되며, 품질의 증거이지 형식적 절차가 아니다.

- **TDD(Test-Driven Development) MUST 적용**: 테스트 작성 → 실패 확인 → 구현 → 통과 확인
  순서를 반드시 지킨다.
- 단위 테스트(Unit Test)는 각 모듈/함수 단위로 작성하며, 비즈니스 로직을 포함하는 모든 함수는
  MUST 단위 테스트를 가져야 한다.
- 통합 테스트(Integration Test)는 서비스 간 경계, API 계약(contract), 데이터베이스 연동을
  MUST 검증한다. Mock DB 사용은 MUST NOT 허용한다 — 실제 데이터 레이어를 사용한다.
- 전체 코드 커버리지는 MUST 80% 이상을 유지한다. 핵심 비즈니스 로직은 MUST 100%를 목표로 한다.
- 테스트는 독립적으로 실행 가능해야 하며, 실행 순서에 의존해서는 MUST NOT 된다.
- Flaky test(불안정 테스트)는 발견 즉시 격리하거나 수정해야 한다. 불안정한 테스트를 main에
  병합하는 것은 MUST NOT 허용된다.

**Rationale**: 테스트는 리팩토링과 기능 추가 시 안전망 역할을 한다. Mock 남용은 실제 환경과의
괴리를 만들어 프로덕션 장애로 이어진다.

### III. 사용자 경험 일관성 (UX Consistency)

사용자가 애플리케이션의 어느 부분을 사용하든 동일한 패턴과 동작을 기대할 수 있어야 한다.

- UI 컴포넌트는 **디자인 시스템** 기반으로 구축되며, 임의로 스타일을 오버라이드하는 것은
  MUST NOT 허용된다.
- 에러 메시지, 로딩 상태, 성공 피드백은 애플리케이션 전반에 걸쳐 일관된 패턴을 MUST 따른다.
- 사용자 인터랙션(버튼 클릭, 폼 제출 등)에 대한 피드백은 MUST 200ms 이내에 시각적으로
  제공되어야 한다 (loading indicator 포함).
- 접근성(Accessibility) 기준 WCAG 2.1 AA를 MUST 준수한다: 키보드 내비게이션, 충분한 명암비,
  스크린 리더 호환성.
- 새로운 UI 패턴을 도입할 때는 기존 패턴과의 일관성을 먼저 검토해야 하며, 불일치가 발생하면
  디자인 시스템을 업데이트하거나 기존 패턴을 채택해야 한다.

**Rationale**: 일관성 없는 UX는 사용자의 인지 부하를 높이고 신뢰를 낮춘다. 일관된 인터페이스는
학습 비용을 줄이고 사용자 만족도를 높인다.

### IV. 성능 요구사항 (Performance Requirements)

성능은 사후에 최적화하는 것이 아니라, 설계 단계부터 고려해야 하는 비기능 요구사항이다.

- **API 응답 시간**: p95 기준 MUST 200ms 이하 (데이터베이스 집약적 엔드포인트는 500ms 이하).
- **페이지 초기 로드(First Contentful Paint)**: MUST 1.5초 이하 (모바일 3G 기준 3초 이하).
- **데이터베이스 쿼리**: N+1 쿼리는 MUST NOT 허용된다. 복잡한 조회는 MUST explain/analyze로
  실행 계획을 검증해야 한다.
- 성능 회귀(regression)는 MUST NOT 허용된다: CI 파이프라인에서 성능 벤치마크를 실행하고,
  기준 대비 20% 이상 저하 시 PR을 자동 차단한다.
- 캐싱 전략은 feature 설계 단계에서 MUST 명시한다. 불필요한 캐싱 추가는 MUST NOT 허용된다.
- Memory leak이 의심되는 코드는 병합 전 MUST 프로파일링을 통해 검증한다.

**Rationale**: 성능 문제는 코드베이스 전반에 걸쳐 누적된다. 초기부터 기준을 설정하고 자동화된
게이트로 방어하는 것이 사후 최적화보다 훨씬 비용이 적다.

### V. 단순성 (Simplicity)

현재 요구사항을 해결하는 가장 단순한 솔루션이 최선이다.

- **YAGNI (You Aren't Gonna Need It)**: 현재 필요하지 않은 기능이나 추상화는 MUST NOT
  추가한다.
- 세 번 이상 반복될 때만 추상화한다. 두 번의 유사 코드는 추상화 대신 복사를 허용한다.
- 외부 의존성(라이브러리) 추가는 팀 검토를 MUST 거쳐야 하며, 표준 라이브러리로 해결 가능한
  경우 외부 의존성을 추가해서는 MUST NOT 된다.
- 설계 복잡도 증가(추가 레이어, 추가 서비스, 추가 패턴)는 반드시 정당화 근거를 plan.md의
  Complexity Tracking 섹션에 문서화해야 한다.

**Rationale**: 복잡성은 버그의 온상이며 유지보수 비용의 주된 원인이다. 단순한 코드는
이해하기 쉽고, 테스트하기 쉽고, 수정하기 쉽다.

## 기술 스택 및 의존성 제약사항 (Technical Stack & Dependency Constraints)

- 새로운 외부 의존성은 라이선스(MIT/Apache 2.0 선호), 유지보수 상태, 번들 크기 영향을 MUST
  검토 후 추가한다.
- 보안 취약점이 발견된 의존성은 MUST 72시간 이내에 패치 버전으로 업데이트하거나 대안을 검토한다.
- 환경 설정(API 키, DB 연결 문자열 등 민감 정보)은 코드에 하드코딩해서는 MUST NOT 되며,
  환경 변수 또는 secret manager를 통해 주입한다.
- 데이터베이스 스키마 변경은 MUST 마이그레이션 파일로 관리하며, 롤백 계획을 MUST 포함한다.

## 개발 워크플로우 및 품질 게이트 (Development Workflow & Quality Gates)

### 브랜치 전략 (Branch Strategy)

- `main` 브랜치는 항상 배포 가능한 상태를 MUST 유지한다.
- 모든 개발은 feature 브랜치에서 진행하며, `###-feature-name` 형식을 MUST 따른다.
- Feature 브랜치는 완료 후 MUST 삭제한다.

### PR 병합 기준 (Merge Criteria)

PR이 `main`에 병합되기 위해서는 다음 게이트를 MUST 모두 통과해야 한다:

1. CI 파이프라인 전체 통과 (lint, test, build)
2. 코드 커버리지 80% 이상 유지
3. 최소 1인의 동료 리뷰 승인
4. 성능 벤치마크 기준 충족 (기존 대비 20% 이내 저하)
5. 접근성 자동화 검사 통과

### 문서화 요구사항 (Documentation Requirements)

- 모든 public API(엔드포인트, 라이브러리 인터페이스)는 MUST 문서화되어야 한다.
- spec.md → plan.md → tasks.md 순서의 설계 문서는 구현 전 MUST 완성되어야 한다.
- 아키텍처 결정(ADR)은 복잡도 정당화가 필요한 경우 plan.md에 MUST 기록한다.

## Governance

이 헌법은 프로젝트의 모든 개발 관행보다 우선한다. 충돌 발생 시 이 헌법의 원칙을 따른다.

### 개정 절차 (Amendment Procedure)

1. 개정 제안은 PR 형태로 제출하며, 팀 전체 검토를 거친다.
2. 주요 변경(원칙 제거/재정의)은 팀 전원 동의를 MUST 필요로 한다.
3. 사소한 변경(표현 수정, 명확화)은 과반수 승인으로 처리한다.
4. 개정 시 버전을 업데이트하고 LAST_AMENDED_DATE를 갱신한다.

### 버전 관리 정책 (Versioning Policy)

- **MAJOR**: 기존 원칙 제거 또는 하위 호환되지 않는 재정의
- **MINOR**: 새 원칙 추가 또는 기존 원칙에 실질적 내용 추가
- **PATCH**: 표현 수정, 오타 수정, 비의미적 개선

### 준수 검토 (Compliance Review)

- 모든 PR 리뷰어는 이 헌법의 원칙 준수 여부를 MUST 확인한다.
- 분기별로 헌법의 현실 적합성을 팀이 검토하고 필요 시 개정을 제안한다.
- `/speckit.verify` 명령어를 통해 구현이 헌법 원칙과 일치하는지 자동 검증한다.

**Version**: 1.0.0 | **Ratified**: 2026-03-27 | **Last Amended**: 2026-03-27
