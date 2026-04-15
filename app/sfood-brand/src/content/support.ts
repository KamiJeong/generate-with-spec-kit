export interface Notice {
	id: string;
	category: "공지" | "업데이트" | "이벤트";
	title: string;
	date: string;
	summary: string;
}

export interface NewsItem {
	id: string;
	title: string;
	date: string;
	summary: string;
	imagePlaceholderColor: string;
}

export type FaqCategory = "제품" | "주문·구매" | "회사" | "파트너십";

export interface FaqItem {
	id: string;
	category: FaqCategory;
	question: string;
	answer: string;
}

export const notices: Notice[] = [
	{
		id: "notice-001",
		category: "공지",
		title: "2026년 SFood 고객 감사 이벤트 안내",
		date: "2026-04-10",
		summary:
			"창립 43주년을 맞아 다양한 고객 감사 행사를 진행합니다. 자세한 내용을 확인해 주세요.",
	},
	{
		id: "notice-002",
		category: "업데이트",
		title: "존쿡 델리미트 신제품 출시 — 트러플 소시지",
		date: "2026-03-28",
		summary: "고급 트러플을 사용한 프리미엄 소시지가 새롭게 출시되었습니다.",
	},
	{
		id: "notice-003",
		category: "공지",
		title: "2026년 1분기 식품 안전 보고서 공개",
		date: "2026-03-15",
		summary: "1분기 HACCP 정기 감사 결과 및 품질 지표를 투명하게 공개합니다.",
	},
	{
		id: "notice-004",
		category: "이벤트",
		title: "서울 식품 박람회 SFood 부스 참가 안내",
		date: "2026-02-20",
		summary:
			"3월 COEX 서울 국제 식품 박람회에서 SFood를 만나보세요. 현장 시식 행사도 진행됩니다.",
	},
	{
		id: "notice-005",
		category: "업데이트",
		title: "온라인 쇼핑몰 리뉴얼 오픈",
		date: "2026-01-15",
		summary:
			"더 편리해진 UI와 빠른 배송으로 새로워진 SFood 공식 쇼핑몰을 이용해 보세요.",
	},
];

export const newsItems: NewsItem[] = [
	{
		id: "news-001",
		title: "SFood, DLG 국제 품평회 12년 연속 금상 수상",
		date: "2026-04-05",
		summary:
			"독일 DLG 국제 품평회에서 SFood 존쿡 델리미트 제품군이 12년 연속 금상을 수상했습니다.",
		imagePlaceholderColor: "bg-sfood-red-light",
	},
	{
		id: "news-002",
		title: "아시아 식품 기업 TOP 20 선정",
		date: "2026-03-18",
		summary:
			"아시아 식품 전문지 Food Asia에서 SFood를 아시아 주목 식품 기업 20위 안에 선정했습니다.",
		imagePlaceholderColor: "bg-blue-100",
	},
	{
		id: "news-003",
		title: "2025 ESG 경영 우수 기업 인증 획득",
		date: "2026-02-10",
		summary:
			"한국 ESG 위원회로부터 지속 가능 경영 우수 기업으로 인증받아 ESG 경영 의지를 재확인했습니다.",
		imagePlaceholderColor: "bg-green-100",
	},
	{
		id: "news-004",
		title: "SFood 캐터링, 대형 기업 단체 급식 계약 체결",
		date: "2026-01-25",
		summary:
			"국내 주요 대기업 3개사와 2026년 단체 급식 공급 계약을 체결하며 B2B 사업 확장을 이어갑니다.",
		imagePlaceholderColor: "bg-yellow-100",
	},
];

export const faqItems: FaqItem[] = [
	{
		id: "faq-001",
		category: "제품",
		question: "존쿡 델리미트 소시지의 보관 방법은?",
		answer:
			"개봉 전: 냉장(0~10°C) 보관하세요. 개봉 후: 밀봉 용기에 옮겨 냉장 보관하고 2~3일 이내 섭취를 권장합니다. 장기 보관을 원하실 경우 -18°C 이하 냉동 보관하세요.",
	},
	{
		id: "faq-002",
		category: "제품",
		question: "제품에 인공 첨가물이 포함되어 있나요?",
		answer:
			"SFood 프리미엄 라인은 인공 보존제, 합성 착색료를 사용하지 않습니다. 천연 향신료와 허브만을 사용하며, 모든 성분은 제품 라벨에 투명하게 표시됩니다.",
	},
	{
		id: "faq-003",
		category: "주문·구매",
		question: "공식 온라인 쇼핑몰에서 구매하는 방법은?",
		answer:
			"SFood 공식 쇼핑몰(sfood.co.kr)에 접속하여 회원가입 후 구매하실 수 있습니다. 비회원 주문도 가능합니다. 신용카드, 계좌이체, 간편결제 등 다양한 결제 수단을 지원합니다.",
	},
	{
		id: "faq-004",
		category: "주문·구매",
		question: "기업 대량 구매나 단체 주문은 어떻게 진행하나요?",
		answer:
			"B2B 대량 구매는 SFood 프로 또는 SFood 캐터링 페이지를 통해 문의해 주세요. 전담 영업 담당자가 맞춤형 견적과 납품 일정을 안내해 드립니다.",
	},
	{
		id: "faq-005",
		category: "주문·구매",
		question: "반품 및 교환 정책은 어떻게 되나요?",
		answer:
			"식품 특성상 단순 변심으로 인한 반품은 어렵습니다. 단, 제품 불량이나 배송 오류의 경우 수령일로부터 7일 이내 고객센터로 연락 주시면 교환 또는 환불 처리해 드립니다.",
	},
	{
		id: "faq-006",
		category: "회사",
		question: "SFood의 주요 생산 공장은 어디에 있나요?",
		answer:
			"주력 생산 공장은 경기도 안성시에 위치하며, HACCP 및 FSSC 22000 인증을 받은 최첨단 시설을 갖추고 있습니다. 공장 견학 프로그램은 별도 문의를 통해 신청하실 수 있습니다.",
	},
	{
		id: "faq-007",
		category: "회사",
		question: "DLG 국제 품평회란 무엇인가요?",
		answer:
			"독일 농업협회(DLG)가 주관하는 세계 최고 권위의 식품 품질 평가 기관입니다. 독립적인 전문가 패널이 맛, 품질, 안전성을 엄격하게 평가하며, SFood는 12년 연속 금상을 수상했습니다.",
	},
	{
		id: "faq-008",
		category: "파트너십",
		question: "유통 파트너십이나 대리점 계약은 어떻게 진행하나요?",
		answer:
			"SFood 파트너십 프로그램에 관심 있으신 유통업체나 소매점은 contact@sfood.co.kr로 연락해 주세요. 담당자가 파트너십 조건 및 절차를 상세히 안내해 드립니다.",
	},
	{
		id: "faq-009",
		category: "파트너십",
		question: "해외 수출 또는 글로벌 파트너십은 가능한가요?",
		answer:
			"현재 일본, 싱가포르, 홍콩에 수출 중이며 글로벌 파트너십을 적극 확대하고 있습니다. 해외 비즈니스 문의는 global@sfood.co.kr로 연락 주시기 바랍니다.",
	},
	{
		id: "faq-010",
		category: "파트너십",
		question: "원료 공급 업체로 등록하려면 어떻게 해야 하나요?",
		answer:
			'SFood는 HACCP 또는 이와 동급의 식품 안전 인증을 보유한 업체를 대상으로 원료 공급 업체를 선정합니다. 공급 업체 등록 신청은 공식 홈페이지의 "파트너 신청" 메뉴를 이용해 주세요.',
	},
];
