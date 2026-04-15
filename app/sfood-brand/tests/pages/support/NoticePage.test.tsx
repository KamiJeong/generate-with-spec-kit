import { NoticePage } from "@sfood/pages/support/NoticePage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("NoticePage", () => {
	it("공지사항 제목 목록을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<NoticePage />
			</MemoryRouter>,
		);
		expect(
			screen.getByText("2026년 SFood 고객 감사 이벤트 안내"),
		).toBeInTheDocument();
		expect(
			screen.getByText("존쿡 델리미트 신제품 출시 — 트러플 소시지"),
		).toBeInTheDocument();
		expect(
			screen.getByText("2026년 1분기 식품 안전 보고서 공개"),
		).toBeInTheDocument();
	});

	it("카테고리 배지를 표시한다", () => {
		render(
			<MemoryRouter>
				<NoticePage />
			</MemoryRouter>,
		);
		expect(screen.getAllByText("공지").length).toBeGreaterThan(0);
		expect(screen.getAllByText("업데이트").length).toBeGreaterThan(0);
	});
});
