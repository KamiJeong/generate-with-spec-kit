import { HomePage } from "@sfood/pages/HomePage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("HomePage", () => {
	it("미션 슬로건을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>,
		);
		expect(
			screen.getByText("더 좋은 식품으로 더 좋은 세상을"),
		).toBeInTheDocument();
	});

	it("DLG 수상 문구를 표시한다", () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>,
		);
		expect(screen.getByText("DLG 수상")).toBeInTheDocument();
	});

	it("브랜드 보기 CTA 버튼을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>,
		);
		const ctaLinks = screen.getAllByText("브랜드 보기");
		expect(ctaLinks.length).toBeGreaterThan(0);
	});

	it("브랜드 카드 미리보기를 렌더링한다", () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>,
		);
		expect(screen.getByText("존쿡 델리미트")).toBeInTheDocument();
	});

	it('"지금 SFood와 함께하세요" 문구를 표시한다', () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>,
		);
		expect(screen.getByText("지금 SFood와 함께하세요")).toBeInTheDocument();
	});
});
