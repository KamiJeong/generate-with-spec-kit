import { FaqPage } from "@sfood/pages/support/FaqPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("FaqPage", () => {
	it("FAQ 질문 목록을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<FaqPage />
			</MemoryRouter>,
		);
		expect(
			screen.getByText("존쿡 델리미트 소시지의 보관 방법은?"),
		).toBeInTheDocument();
		expect(
			screen.getByText("제품에 인공 첨가물이 포함되어 있나요?"),
		).toBeInTheDocument();
	});

	it("카테고리 필터 탭을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<FaqPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("전체")).toBeInTheDocument();
		expect(screen.getByText("제품")).toBeInTheDocument();
		expect(screen.getByText("주문·구매")).toBeInTheDocument();
	});

	it("아코디언 클릭 시 답변이 펼쳐진다", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter>
				<FaqPage />
			</MemoryRouter>,
		);

		const question = screen.getByText("존쿡 델리미트 소시지의 보관 방법은?");
		await user.click(question);

		expect(screen.getByText(/개봉 전: 냉장/)).toBeInTheDocument();
	});

	it("카테고리 필터링이 동작한다", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter>
				<FaqPage />
			</MemoryRouter>,
		);

		const productTab = screen.getByText("제품");
		await user.click(productTab);

		expect(
			screen.getByText("존쿡 델리미트 소시지의 보관 방법은?"),
		).toBeInTheDocument();
		expect(
			screen.queryByText("공식 온라인 쇼핑몰에서 구매하는 방법은?"),
		).not.toBeInTheDocument();
	});
});
