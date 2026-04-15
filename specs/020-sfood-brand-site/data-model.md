# 데이터 모델: SFood 브랜드 사이트

## 개요

첫 버전은 서버 저장소 없이 TypeScript 정적 데이터로 콘텐츠를 보관한다. 모든 엔티티는 `src/content/site.ts`와 `src/routes/route-map.ts`에서 정의되고, 렌더링 컴포넌트는 이 데이터를 읽어 페이지를 구성한다.

## Page

**의미**: SFood 브랜드 사이트의 공개 목적지.

**필드**:

- `path`: URL 경로. `/`, `/about`, `/sustainability`, `/brands`, `/talent`, `/support/notice`, `/support/news`, `/support/faq` 중 하나여야 한다.
- `label`: 내비게이션에 표시할 한국어 라벨.
- `title`: 페이지 대표 제목.
- `description`: 페이지 목적을 설명하는 짧은 문장.
- `navGroup`: `primary` 또는 `support`.
- `pageKey`: 렌더링할 페이지 컴포넌트를 식별하는 키.

**관계**:

- 하나의 `Page`는 하나의 `Navigation Item`으로 노출될 수 있다.
- `support` 그룹 페이지는 `SupportNav`에서 함께 노출된다.

**검증 규칙**:

- 모든 요청 URL은 정확히 하나의 `Page`와 매핑되어야 한다.
- 활성 페이지는 `aria-current="page"`로 표시되어야 한다.
- 지원 페이지는 서로 이동할 수 있는 관련 내비게이션을 가져야 한다.

## Navigation Item

**의미**: 방문자를 페이지 또는 지원 카테고리로 이동시키는 메뉴 항목.

**필드**:

- `label`: 사용자에게 표시할 메뉴명.
- `href`: 이동 대상 URL.
- `group`: `primary` 또는 `support`.
- `order`: 표시 순서.

**관계**:

- 각 `Navigation Item`은 하나의 `Page`를 참조한다.

**검증 규칙**:

- `href`는 `Page.path` 중 하나와 일치해야 한다.
- 현재 경로와 일치하는 항목은 시각적 활성 상태와 접근성 상태를 함께 가져야 한다.

## Brand Line

**의미**: SFood의 소비자 브랜드 또는 비즈니스 솔루션 라인.

**필드**:

- `name`: 브랜드 라인명.
- `audience`: `consumer` 또는 `business`.
- `positioning`: 브랜드가 전달하는 핵심 가치.
- `categories`: 햄, 소시지, 베이컨, 바비큐, 치즈, 빵, 소스, HMR 등 대표 제품군 배열.
- `summary`: 카드 또는 섹션에 표시할 설명.
- `proofPoint`: 일반화된 품질 또는 전문성 신뢰 문구.

**관계**:

- `/brands` 페이지에서 여러 `Brand Line`을 표시한다.

**검증 규칙**:

- 최소 하나의 `consumer` 라인과 최소 하나의 `business` 라인이 있어야 한다.
- 제품군은 명세의 대표 카테고리 중 일부를 포함해야 한다.
- 정확한 인증/수상 명칭을 포함하지 않아야 한다.

## Content Entry

**의미**: 공지사항 또는 회사소식 목록에 표시되는 정적 샘플 항목.

**필드**:

- `type`: `notice` 또는 `news`.
- `title`: 항목 제목.
- `dateLabel`: 날짜 또는 날짜형 라벨.
- `category`: 공지/소식 분류.
- `summary`: 상세 페이지 없이 읽을 수 있는 요약.

**관계**:

- `/support/notice`는 `type = notice` 항목만 표시한다.
- `/support/news`는 `type = news` 항목만 표시한다.

**검증 규칙**:

- 상세 URL, 상세 버튼, "자세히 보기"처럼 별도 상세 페이지를 암시하는 필드는 만들지 않는다.
- 각 목록 페이지는 최소 3개 샘플 항목을 제공한다.
- 각 항목은 제목, 날짜형 라벨, 요약을 가져야 한다.

## FAQ Item

**의미**: FAQ 페이지에서 표시되는 질문과 답변.

**필드**:

- `question`: 질문 문장.
- `answer`: 답변 문장.
- `category`: `brand`, `product`, `quality`, `business`, `talent` 중 하나.
- `order`: 표시 순서.

**관계**:

- `/support/faq` 페이지에서 `Accordion` 항목으로 표시한다.

**검증 규칙**:

- 명세에 나온 다섯 주제(브랜드, 제품, 품질, 구매/제휴, 채용)를 모두 최소 1개 이상 포함해야 한다.
- 질문과 답변은 한국어를 기본으로 작성한다.

## Hiring Step

**의미**: 인재 채용 페이지에서 표시되는 채용 프로세스 단계.

**필드**:

- `step`: 숫자 순서.
- `title`: 단계명.
- `description`: 지원자에게 기대되는 행동 또는 회사의 검토 내용.

**관계**:

- `/talent` 페이지에서 순서대로 표시한다.

**검증 규칙**:

- 단계는 1부터 시작해 중복 없이 증가해야 한다.
- 지원부터 최종 결정까지의 흐름을 포함해야 한다.

## 상태 전이

- 정적 사이트이므로 서버 상태 전이는 없다.
- 클라이언트 상태는 현재 경로와 FAQ Accordion 열림 상태로 제한한다.
- 잘못된 경로는 `NotFoundPage`로 표시하되 공통 헤더와 푸터는 유지한다.
