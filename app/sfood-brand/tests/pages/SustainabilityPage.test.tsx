import { SustainabilityPage } from "@sfood/pages/SustainabilityPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("SustainabilityPage", () => {
	it("환경 영역 제목을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<SustainabilityPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("탄소 중립을 향한 여정")).toBeInTheDocument();
	});

	it("사회 영역 제목을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<SustainabilityPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("지역사회와 함께하는 성장")).toBeInTheDocument();
	});

	it("식품 안전 영역 제목을 렌더링한다", () => {
		render(
			<MemoryRouter>
				<SustainabilityPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("타협 없는 식품 안전")).toBeInTheDocument();
	});

	it("2030 목표 문구를 렌더링한다", () => {
		render(
			<MemoryRouter>
				<SustainabilityPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("2030 지속가능 목표")).toBeInTheDocument();
	});
});
