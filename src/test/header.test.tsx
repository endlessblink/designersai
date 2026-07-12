import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders a dedicated RTL Hebrew navigation on the Hebrew homepage", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("dir", "rtl");

    const desktopNav = screen.getByRole("navigation", { name: "ניווט ראשי" });
    expect(within(desktopNav).getByRole("link", { name: "אודות" })).toHaveAttribute("href", "#about");
    expect(within(desktopNav).getByRole("link", { name: "תערוכות" })).toHaveAttribute("href", "#exhibitions");
    expect(within(desktopNav).getByRole("link", { name: "אמנים" })).toHaveAttribute("href", "#artists");
    expect(within(desktopNav).getByRole("link", { name: "הצטרפות" })).toHaveAttribute("href", "#join");
    expect(within(desktopNav).getByRole("link", { name: "English" })).toHaveAttribute("href", "/en");
  });
});
