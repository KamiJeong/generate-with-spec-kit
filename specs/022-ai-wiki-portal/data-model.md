# Data Model: AI Wiki Portal Platform Screen

## Entity: User Role Perspective

**Purpose**: mock 화면에서 사용자 관점별 추천 문서, 프로젝트 강조 정보, 지원 경로를 조정한다.

**Fields**:

- `id`: `non-developer | stakeholder | support`
- `label`: 화면 표시명
- `description`: 역할 관점 설명
- `primaryGoals`: 주요 목표 목록
- `recommendedDocumentIds`: 우선 추천 Wiki Document ID 목록
- `projectEmphasis`: 대시보드에서 강조할 정보 유형
- `preferredSupportPath`: 기본 도움 요청 경로

**Validation Rules**:

- `id`는 3개 허용값 중 하나여야 한다.
- `recommendedDocumentIds`는 존재하는 Wiki Document만 참조해야 한다.
- 역할별 데이터가 없으면 common fallback을 표시해야 한다.

## Entity: Wiki Document

**Purpose**: 포털에서 탐색하고 읽는 실행 중심 Wiki 문서이다.

**Fields**:

- `id`: 고유 문서 ID
- `title`: 문서 제목
- `category`: `get-started | blueprint | environment | ai-agent | github | deployment | troubleshooting`
- `stage`: 사용자가 수행 중인 작업 단계
- `summary`: 목록과 상세 상단에 표시할 요약
- `markdown`: 제한된 markdown subset 본문
- `relatedDocumentIds`: 관련 문서 ID 목록
- `nextAction`: 문서 읽기 후 추천 행동
- `status`: `draft | available | updated | needs-review`
- `lastUpdatedLabel`: 업무용 갱신 표시

**Relationships**:

- 여러 User Role Perspective가 같은 Wiki Document를 추천할 수 있다.
- Execution Step은 관련 Wiki Document를 참조할 수 있다.

**Validation Rules**:

- `title`, `summary`, `markdown`, `nextAction`은 비어 있으면 안 된다.
- `relatedDocumentIds`는 자기 자신을 포함하지 않는다.
- 검색은 `title`, `summary`, `category`, `stage`를 대상으로 한다.

## Entity: Blueprint

**Purpose**: 사용자가 입력한 요구사항에서 생성된 것처럼 보이는 mock 설계 결과를 표현한다.

**Fields**:

- `id`: mock Blueprint ID
- `inputText`: 사용자가 입력한 요구사항
- `projectGoal`: 추출된 프로젝트 목표
- `targetUsers`: 대상 사용자 목록
- `outputs`: PRD, system design, environment guide, API/data definition 요약 목록
- `readinessStatus`: `ready | missing-inputs | needs-review`
- `missingInputs`: 보강이 필요한 입력 항목
- `linkedExecutionGuideId`: 다음 실행 가이드 문서 ID
- `generatedAtLabel`: mock 생성 시각 표시

**State Transitions**:

- `empty` → 사용자가 입력 시작
- `draft-input` → 입력이 유효하면 생성 가능
- `generating` → mock loading state 표시
- `generated` → mock 결과와 다음 행동 표시
- `missing-inputs` → 입력이 부족하면 보강 안내 표시

**Validation Rules**:

- 입력은 trim 후 10자 이상이어야 생성 버튼을 활성화한다.
- mock 결과는 저장되지 않으며 page state로만 유지한다.

## Entity: Project

**Purpose**: dashboard와 project detail에서 simulated monitoring 상태를 보여준다.

**Fields**:

- `id`: 고유 프로젝트 ID
- `name`: 프로젝트명
- `owner`: 담당자 이름
- `roleVisibility`: 강조할 role perspective ID 목록
- `currentStage`: 현재 단계
- `completionPercent`: 0-100 숫자
- `executionStatus`: `not-started | in-progress | blocked | completed | waiting-review`
- `riskState`: `normal | attention | blocked`
- `recentActivity`: 최근 활동 설명
- `lastUpdatedLabel`: 최근 갱신 표시
- `sampleStateChange`: 수동 새로고침 시 보여줄 상태 변화 설명
- `nextRecommendedAction`: 다음 권장 행동
- `repositorySummary`: GitHub 관련 업무용 요약
- `deploymentSummary`: 배포 준비 상태 요약

**Relationships**:

- Project는 여러 Execution Step을 가진다.
- Project는 Integration Status를 GitHub와 knowledge source별로 가질 수 있다.

**Validation Rules**:

- `completionPercent`는 0 이상 100 이하여야 한다.
- `blocked` 상태는 `nextRecommendedAction`과 support path를 반드시 제공한다.
- data가 누락된 필드는 "확인 필요"로 표시한다.

## Entity: Execution Step

**Purpose**: 문서 또는 프로젝트에서 사용자가 따라야 할 단계별 작업이다.

**Fields**:

- `id`: 단계 ID
- `title`: 단계 제목
- `description`: 수행 내용
- `status`: `draft | available | in-progress | blocked | completed | waiting-review`
- `expectedResult`: 완료 시 기대 결과
- `linkedDocumentId`: 관련 Wiki Document ID
- `helpType`: `document | ai-agent | human-support`
- `feedbackEnabled`: 피드백 가능 여부

**Validation Rules**:

- `blocked` 단계는 도움 경로를 하나 이상 제공해야 한다.
- `completed` 단계는 expected result를 보여줘야 한다.

## Entity: AI Assistance Request

**Purpose**: 문서 또는 프로젝트 문제에서 AI Agent 질의 흐름으로 이동할 때 유지되는 맥락이다.

**Fields**:

- `id`: 요청 ID
- `sourceType`: `document | project | execution-step`
- `sourceId`: 출처 ID
- `questionContext`: 질문 전 자동 구성되는 맥락 요약
- `issueType`: `setup-error | code-generation | deployment | unclear-doc | other`
- `status`: `draft | ready-to-ask | answered`
- `recommendedNextAction`: 답변 이후 권장 행동

**Validation Rules**:

- `sourceId`는 sourceType에 해당하는 존재하는 entity를 참조해야 한다.
- 질문 진입점은 context를 잃지 않아야 한다.

## Entity: Feedback Item

**Purpose**: 사용자가 문서 품질, 실행 실패, 개선 의견을 남기는 흐름을 표현한다.

**Fields**:

- `id`: feedback ID
- `sourceDocumentId`: 출처 문서 ID
- `sourceStepId`: 선택된 단계 ID
- `feedbackType`: `unclear | failed-step | suggestion`
- `description`: 사용자 의견
- `reviewStatus`: `draft | submitted | needs-review`

**Validation Rules**:

- 피드백 작성 진입 시 출처 문서 또는 단계가 유지되어야 한다.
- `description`이 비어 있으면 제출할 수 없다.

## Entity: Integration Status

**Purpose**: GitHub, Confluence 등 외부 시스템 상태를 화면에서 업무용으로 요약한다.

**Fields**:

- `serviceName`: `GitHub | Confluence`
- `availability`: `connected | unavailable | unknown`
- `lastCheckedLabel`: 마지막 확인 표시
- `summary`: 사용자용 상태 요약
- `recoveryAction`: 실패 시 다음 행동

**Validation Rules**:

- `unavailable` 또는 `unknown` 상태는 recoveryAction을 반드시 제공한다.
- 실제 credential, token, API 상세는 이 feature의 데이터 모델에 포함하지 않는다.
