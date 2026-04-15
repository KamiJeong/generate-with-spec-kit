import { navItems, siteConfig } from "@sfood/content/site";
import { describe, expect, it } from "vitest";

describe("siteConfig", () => {
	it("name 필드를 가진다", () => {
		expect(siteConfig.name).toBe("SFood");
	});

	it("tagline 필드를 가진다", () => {
		expect(typeof siteConfig.tagline).toBe("string");
		expect(siteConfig.tagline.length).toBeGreaterThan(0);
	});
});

describe("navItems", () => {
	it("배열 형식이다", () => {
		expect(Array.isArray(navItems)).toBe(true);
	});

	it("5개 이상의 항목을 가진다", () => {
		expect(navItems.length).toBeGreaterThanOrEqual(5);
	});

	it("모든 항목은 label과 href를 가진다", () => {
		for (const item of navItems) {
			expect(typeof item.label).toBe("string");
			expect(typeof item.href).toBe("string");
		}
	});

	it("고객지원 항목은 자식 메뉴를 가진다", () => {
		const support = navItems.find((item) => item.label === "고객지원");
		expect(support).toBeDefined();
		expect(support?.children).toBeDefined();
		expect(support?.children?.length).toBeGreaterThan(0);
	});

	it("고객지원 자식 메뉴에는 공지사항, 회사소식, FAQ가 포함된다", () => {
		const support = navItems.find((item) => item.label === "고객지원");
		const labels = support?.children?.map((c) => c.label) ?? [];
		expect(labels).toContain("공지사항");
		expect(labels).toContain("회사소식");
		expect(labels).toContain("자주 묻는 질문");
	});
});
