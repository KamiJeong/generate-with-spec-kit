import { AboutPage } from "@sfood/pages/AboutPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("AboutPage", () => {
	it("미션 문구를 렌더링한다", () => {
		render(
			<MemoryRouter>
				<AboutPage />
			</MemoryRouter>,
		);
		expect(
			screen.getAllByText("더 좋은 식품으로 더 좋은 세상을").length,
		).toBeGreaterThan(0);
	});

	it("FSSC 22000 인증 배지를 표시한다", () => {
		render(
			<MemoryRouter>
				<AboutPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("FSSC 22000")).toBeInTheDocument();
	});

	it("HACCP 인증 배지를 표시한다", () => {
		render(
			<MemoryRouter>
				<AboutPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("HACCP")).toBeInTheDocument();
	});

	it("DLG 국제 품평회 배지를 표시한다", () => {
		render(
			<MemoryRouter>
				<AboutPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("DLG 국제 품평회")).toBeInTheDocument();
	});

	it("회사 연혁 항목을 3개 이상 표시한다", () => {
		render(
			<MemoryRouter>
				<AboutPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("에쓰푸드 창립")).toBeInTheDocument();
		expect(screen.getByText("HACCP 인증 획득")).toBeInTheDocument();
		expect(screen.getByText("DLG 국제 품평회 첫 수상")).toBeInTheDocument();
	});
});
