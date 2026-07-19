import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import HomepageCommunity from "@/components/HomepageCommunity";
import { artists } from "@/data/artists";
import Index from "@/pages/Index";
import IndexHe from "@/pages/IndexHe";

const communityLeads = [
  "Maya Elav Nachshon",
  "Noam Naumovsky",
  "Ifat Kariv Gurion",
  "Adi Erlich",
  "Miri Pinko",
];

describe("homepage community hierarchy", () => {
  it("shows the Too Much Manuela location at a readable caption size", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <Index />
      </MemoryRouter>,
    );

    expect(screen.getByText("Basel, Switzerland")).toHaveClass("text-base", "md:text-lg");
  });

  it("separates the founder, community leads, and complete non-founder artist roster", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <Index />
      </MemoryRouter>,
    );

    const founderHeading = screen.getByRole("heading", { name: "Founder & Artistic Director" });
    const leadsHeading = screen.getByRole("heading", { name: "Community Leads" });
    const artistsHeading = screen.getByRole("heading", { name: "All Artists" });
    const founderSection = founderHeading.closest("section")!;
    const leadsSection = leadsHeading.closest("section")!;
    const artistsSection = artistsHeading.closest("section")!;

    expect(founderSection.compareDocumentPosition(leadsSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(leadsSection.compareDocumentPosition(artistsSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(
      within(founderSection)
        .getAllByRole("link", { name: "Nataly Shafir" })
        .every((link) => link.getAttribute("href") === "/artists/nataly-shafir"),
    ).toBe(true);

    communityLeads.forEach((name) => {
      expect(within(leadsSection).getByRole("link", { name })).toBeInTheDocument();
      expect(within(artistsSection).getByRole("link", { name })).toBeInTheDocument();
    });
    expect(within(leadsSection).getAllByText("Community Lead")).toHaveLength(5);
    expect(within(artistsSection).queryByRole("link", { name: "Nataly Shafir" })).not.toBeInTheDocument();
    expect(within(artistsSection).getAllByRole("listitem")).toHaveLength(
      artists.filter((artist) => artist.slug !== "nataly-shafir").length,
    );
  });

  it("keeps the complete roster when the CMS only returns some artists", () => {
    render(
      <MemoryRouter>
        <HomepageCommunity artists={[artists[0]]} />
      </MemoryRouter>,
    );

    const artistsSection = screen.getByRole("heading", { name: "All Artists" }).closest("section")!;
    expect(within(artistsSection).getAllByRole("listitem")).toHaveLength(artists.length - 1);
  });

  it("renders the hierarchy and Basel caption in Hebrew", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <IndexHe />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "צוות הובלת הקהילה" })).toBeInTheDocument();
    const artistsSection = screen.getByRole("heading", { name: "כל האמנים" }).closest("section")!;
    expect(within(artistsSection).getByRole("link", { name: "Miri Pinko" })).toBeInTheDocument();
    expect(screen.getByText("באזל, שווייץ")).toHaveClass("text-base", "md:text-lg");
  });
});
