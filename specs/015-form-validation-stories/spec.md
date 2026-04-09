# Feature Specification: 폼 유효성 검사 스토리

**Feature Branch**: `015-form-validation-stories`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "add form validation stories - use zod 4 for form schema - use react hook form for react components - add stories, email based sign up form, login, simple product register form with message (ex: error message with pattern)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 이메일 기반 회원가입 폼 (Priority: P1)

사용자가 이메일과 비밀번호를 입력하여 회원가입을 시도하는 폼 시나리오. 유효하지 않은 값 입력 시 인라인 오류 메시지가 표시되고, 유효한 값 입력 시 폼이 성공적으로 제출된다.

**Why this priority**: 회원가입 폼은 가장 기본적인 폼 유효성 검사 패턴을 포함하며, 다른 폼 스토리의 기반이 된다.

**Independent Test**: Storybook에서 Sign Up Form 스토리를 열고 잘못된 이메일 형식/짧은 비밀번호를 입력한 후 Submit 시 오류 메시지가 표시되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** 빈 폼이 렌더링될 때, **When** 이메일 필드를 비워두고 제출하면, **Then** "이메일을 입력해주세요" 오류 메시지가 표시된다.
2. **Given** 이메일 필드에 유효하지 않은 형식을 입력할 때, **When** 제출하면, **Then** "올바른 이메일 형식을 입력해주세요" 오류 메시지가 표시된다.
3. **Given** 비밀번호가 최소 길이 미만일 때, **When** 제출하면, **Then** "비밀번호는 최소 8자 이상이어야 합니다" 오류 메시지가 표시된다.
4. **Given** 비밀번호 확인이 비밀번호와 다를 때, **When** 제출하면, **Then** "비밀번호가 일치하지 않습니다" 오류 메시지가 표시된다.
5. **Given** 모든 필드가 유효하게 채워졌을 때, **When** 제출하면, **Then** 성공 상태가 표시된다.

---

### User Story 2 - 로그인 폼 (Priority: P2)

사용자가 이메일과 비밀번호로 로그인을 시도하는 폼 시나리오. 빈 필드나 잘못된 형식 입력 시 즉각적인 피드백을 제공한다.

**Why this priority**: 로그인은 회원가입보다 단순한 유효성 검사 패턴을 가지며, 실무에서 가장 빈번하게 사용되는 폼이다.

**Independent Test**: Storybook에서 Login Form 스토리를 열고 비어있는 상태로 제출 시 오류 메시지가 표시되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** 로그인 폼이 렌더링될 때, **When** 이메일과 비밀번호를 비워두고 제출하면, **Then** 두 필드 모두에 필수 입력 오류 메시지가 표시된다.
2. **Given** 유효하지 않은 이메일 형식을 입력할 때, **When** 제출하면, **Then** 이메일 형식 오류 메시지가 표시된다.
3. **Given** 유효한 이메일과 비밀번호를 입력할 때, **When** 제출하면, **Then** 성공 상태가 표시된다.

---

### User Story 3 - 상품 등록 폼 (Priority: P3)

관리자나 판매자가 상품명, 가격, 설명을 입력하여 상품을 등록하는 폼 시나리오. 각 필드에 특정 패턴 규칙이 적용되며, 오류 발생 시 구체적인 안내 메시지가 함께 표시된다.

**Why this priority**: 여러 필드 타입(텍스트, 숫자, 멀티라인)과 패턴 기반 유효성 검사를 보여주는 더 복잡한 폼 패턴이다.

**Independent Test**: Storybook에서 Product Register Form 스토리를 열고 가격에 음수나 문자를 입력하면 패턴 오류 메시지가 표시되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** 상품명 필드가 비어있을 때, **When** 제출하면, **Then** "상품명을 입력해주세요" 오류 메시지가 표시된다.
2. **Given** 상품명이 최대 길이를 초과할 때, **When** 제출하면, **Then** "상품명은 최대 100자까지 입력 가능합니다" 오류 메시지가 표시된다.
3. **Given** 가격 필드에 음수를 입력할 때, **When** 제출하면, **Then** "가격은 0 이상의 숫자여야 합니다" 오류 메시지가 표시된다.
4. **Given** 가격 필드에 숫자가 아닌 값을 입력할 때, **When** 제출하면, **Then** "올바른 가격 형식을 입력해주세요" 오류 메시지가 표시된다.
5. **Given** 모든 필드가 유효하게 채워졌을 때, **When** 제출하면, **Then** 성공 상태와 함께 입력된 데이터가 표시된다.

---

### Edge Cases

- 폼 제출 중(로딩 상태)일 때 Submit 버튼이 비활성화되는가?
- 실시간 유효성 검사(onChange)와 제출 시 유효성 검사(onSubmit)가 적절히 구분되는가?
- 모든 오류 메시지가 스크린 리더 등 접근성 도구에서 인식 가능한가?
- 비밀번호 필드가 마스킹 처리되는가?
- 상품 가격에서 소수점 입력은 허용되는가?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 각 폼은 Storybook 스토리로 독립적으로 렌더링되고 테스트 가능해야 한다.
- **FR-002**: 회원가입 폼은 이메일 형식, 비밀번호 최소 길이(8자), 비밀번호 확인 일치를 검사해야 한다.
- **FR-003**: 로그인 폼은 이메일 형식과 비밀번호 필수 입력을 검사해야 한다.
- **FR-004**: 상품 등록 폼은 상품명 필수/최대 길이(100자), 가격 숫자 형식/최솟값(0), 설명 선택 입력을 검사해야 한다.
- **FR-005**: 유효성 검사 실패 시 해당 필드 아래에 구체적인 오류 메시지가 표시되어야 한다.
- **FR-006**: 오류 메시지는 어떤 규칙이 위반되었는지 명확히 설명해야 한다(예: "이메일 형식", "최소 8자").
- **FR-007**: 각 폼은 기본(Default), 오류(WithErrors), 성공(Success) 등 다양한 상태를 스토리로 제공해야 한다.
- **FR-008**: 모든 폼 스토리는 인터랙션 테스트를 포함해야 한다.

### Key Entities

- **SignUpFormData**: 이메일, 비밀번호, 비밀번호 확인 필드로 구성되는 회원가입 데이터
- **LoginFormData**: 이메일, 비밀번호 필드로 구성되는 로그인 데이터
- **ProductFormData**: 상품명, 가격, 설명(선택) 필드로 구성되는 상품 등록 데이터
- **FormValidationSchema**: 각 폼별 유효성 검사 규칙 집합

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 3개의 폼(회원가입, 로그인, 상품 등록) 스토리가 모두 오류 없이 Storybook에서 렌더링된다.
- **SC-002**: 각 폼에서 잘못된 입력 시 100%의 경우 오류 메시지가 해당 필드 근처에 즉시 표시된다.
- **SC-003**: 모든 인터랙션 테스트(`run-story-tests`)가 통과된다.
- **SC-004**: 각 폼은 최소 3가지 상태(기본, 오류, 성공)의 스토리 변형을 제공한다.
- **SC-005**: 오류 메시지가 어떤 규칙을 위반했는지 명확히 설명하여 사용자가 올바른 입력 방법을 즉시 이해할 수 있다.

## Assumptions

- 폼은 실제 API 제출 없이 Storybook 내에서 mock 제출 핸들러로 동작한다.
- 디자인은 프로젝트의 기존 디자인 시스템(`/DESIGN.md`) 및 shadcn/ui 컴포넌트를 따른다.
- 비밀번호 규칙은 최소 8자 이상으로 가정하며, 특수문자 필수 여부는 요구되지 않은 것으로 간주한다.
- 상품 가격은 0 이상의 숫자(소수점 포함 허용)로 가정한다.
- 모든 오류 메시지는 한국어로 작성된다.
- 폼 컴포넌트는 `packages/ui` 패키지 내에 위치한다.
- 인터랙션 테스트는 `@storybook/addon-vitest`를 통해 실행된다.
