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
  it("uses image-approved leads as temporary showcase content", () => {
    render(
      <MemoryRouter>
        <HomepageCommunity artists={artists} />
      </MemoryRouter>,
    );

    const artistsSection = screen.getByRole("heading", { name: "Community Artists" }).closest("section")!;
    const showcase = within(artistsSection).getByLabelText("Community artists");
    expect(within(artistsSection).getAllByRole("link", { name: "Miri Pinko" })).not.toHaveLength(0);
    expect(within(artistsSection).queryByRole("link", { name: "Nataly Shafir" })).not.toBeInTheDocument();
    expect(showcase.children[0]).toHaveAttribute("data-orientation", "horizontal");
    expect(showcase.children[0]).toHaveAttribute("data-autoplay", "false");
    expect(showcase.children[0].querySelector("article")).toHaveClass("w-[72vw]", "max-w-[18rem]");
    expect(showcase.children[0].querySelector("img")).toHaveClass("object-cover");
    expect(showcase.children[2]).toHaveClass("grid-cols-3", "lg:grid");
  });

  it("showcases only image-approved non-leads and links them to their profiles", () => {
    const artistsWithShowcasePortrait = artists.map((artist) =>
      artist.slug === "sivan-darmon-pritsker" ? { ...artist, image: "/images/artists/sivan-darmon-pritsker.jpg" } : artist,
    );

    render(
      <MemoryRouter>
        <HomepageCommunity artists={artistsWithShowcasePortrait} />
      </MemoryRouter>,
    );

    const artistsSection = screen.getByRole("heading", { name: "Community Artists" }).closest("section")!;
    expect(within(artistsSection).getAllByRole("link", { name: "Sivan Darmon Pritsker" })).not.toHaveLength(0);
    expect(within(artistsSection).getAllByRole("link", { name: "Sivan Darmon Pritsker" })[0]).toHaveAttribute(
      "href",
      "/artists/sivan-darmon-pritsker",
    );
    expect(within(artistsSection).getAllByRole("img", { name: "Sivan Darmon Pritsker" })).not.toHaveLength(0);
    expect(within(artistsSection).queryByRole("link", { name: "Miri Pinko" })).not.toBeInTheDocument();
  });

  it("shows the Too Much Manuela location at a readable caption size", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <Index />
      </MemoryRouter>,
    );

    expect(screen.getByText("Basel, Switzerland")).toHaveClass("text-base", "md:text-lg");
  });

  it("separates the founder, community leads, and artist showcase", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <Index />
      </MemoryRouter>,
    );

    const founderHeading = screen.getByRole("heading", { name: "Founder & Artistic Director" });
    const leadsHeading = screen.getByRole("heading", { name: "Community Leads" });
    const artistsHeading = screen.getByRole("heading", { name: "Community Artists" });
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
    });
    expect(within(leadsSection).getByRole("link", { name: "Miri Pinko" }).querySelector("img")).toHaveAttribute(
      "src",
      "/images/artists/miri-pinko.jpg",
    );
    expect(within(leadsSection).getAllByText("Community Lead")).toHaveLength(5);
  });

  it("keeps the founder presentation compact", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <Index />
      </MemoryRouter>,
    );

    const founderHeading = screen.getByRole("heading", { name: "Founder & Artistic Director" });
    const founderSection = founderHeading.closest("section")!;
    const founderImageFrame = within(founderSection).getByRole("img", { name: "Nataly Shafir" }).parentElement!;

    expect(founderSection).toHaveClass("py-16", "md:py-20");
    expect(founderHeading).toHaveClass("text-3xl", "md:text-4xl");
    expect(founderImageFrame).toHaveClass("aspect-[4/3]", "max-w-sm");
  });

  it("keeps the complete lead roster when the CMS only returns some artists", () => {
    render(
      <MemoryRouter>
        <HomepageCommunity artists={[artists[0]]} />
      </MemoryRouter>,
    );

    const leadsSection = screen.getByRole("heading", { name: "Community Leads" }).closest("section")!;
    communityLeads.forEach((name) => expect(within(leadsSection).getByRole("link", { name })).toBeInTheDocument());
  });

  it("renders the hierarchy and Basel caption in Hebrew", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <IndexHe />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "צוות הובלת הקהילה" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "יוצרים בקהילה" })).toBeInTheDocument();
    expect(screen.getByText("באזל, שווייץ")).toHaveClass("text-base", "md:text-lg");
  });
});
