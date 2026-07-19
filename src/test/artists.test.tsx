import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArtistCard from "@/components/ArtistCard";
import ExhibitionCard from "@/components/ui/ExhibitionCard";
import { artists, featuredArtists } from "@/data/artists";
import Exhibitions from "@/pages/Exhibitions";

describe("artist profile images", () => {
  it("frames homepage exhibition videos in a 9:16 portrait ratio", () => {
    const { container } = render(
      <MemoryRouter>
        <ExhibitionCard
          ex={{
            title: "Almost Real",
            city: "Tel Aviv",
            image: "/placeholder.svg",
            video: "/videos/almost-real.mp4",
            slug: "/exhibitions/almost-real",
          }}
          index={0}
        />
      </MemoryRouter>,
    );

    expect(container.querySelector("video")?.closest(".relative")).toHaveClass("aspect-[9/16]");
  });

  it.each([
    ["nataly-shafir", "/images/artists/nataly-shafir.png"],
    ["maya-elav-nachshon", "/images/artists/maya-elav-nachshon.png"],
    ["ifat-kariv-gurion", "/images/artists/ifat-kariv-gurion.png"],
    ["adi-erlich", "/images/artists/adi-erlich.png"],
    ["noam-naumovsky", "/images/artists/noam-naumovsky.jpg"],
  ])("assigns the approved portrait to %s", (slug, image) => {
    expect(artists.find((artist) => artist.slug === slug)?.image).toBe(image);
  });

  it("assigns Miri Pinko's approved portrait", () => {
    expect(artists.find((artist) => artist.slug === "miri-pinko")?.image).toBe(
      "/images/artists/miri-pinko.jpg",
    );
  });

  it("features every artist with an approved portrait on the homepage", () => {
    const artistsWithImages = artists.filter((artist) => artist.image);

    expect(artistsWithImages).toHaveLength(6);
    expect(artistsWithImages.every((artist) => artist.isFeatured)).toBe(true);
  });

  it("keeps every approved local portrait connected to a real image file", () => {
    const localImages = artists.flatMap((artist) => artist.image?.startsWith("/") ? [artist.image] : []);

    expect(localImages.length).toBeGreaterThan(0);
    expect(localImages.every((image) => existsSync(join(process.cwd(), "public", image)))).toBe(true);
  });

  it("places approved portraits before image-pending profiles", () => {
    const firstImagePendingIndex = featuredArtists.findIndex((artist) => !artist.image);

    expect(firstImagePendingIndex).toBe(6);
    expect(featuredArtists.slice(0, firstImagePendingIndex).every((artist) => artist.image)).toBe(true);
  });

  it("shows the entire approved portrait without cropping", () => {
    const artist = artists.find((candidate) => candidate.slug === "nataly-shafir")!;
    render(
      <MemoryRouter>
        <ArtistCard artist={artist} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img", { name: "Nataly Shafir" })).toHaveClass("object-contain");
  });

  it("fills the portrait frame for Noam's landscape event photo", () => {
    const artist = artists.find((candidate) => candidate.slug === "noam-naumovsky")!;
    render(
      <MemoryRouter>
        <ArtistCard artist={artist} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img", { name: "Noam Naumovsky" })).toHaveClass("object-cover");
  });

  it("connects an artist portrait and name to the dedicated profile", () => {
    const artist = artists.find((candidate) => candidate.slug === "nataly-shafir")!;
    render(
      <MemoryRouter>
        <ArtistCard artist={artist} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "View Nataly Shafir profile image" })).toHaveAttribute(
      "href",
      "/artists/nataly-shafir",
    );
    expect(screen.getByRole("link", { name: "Nataly Shafir" })).toHaveAttribute("href", "/artists/nataly-shafir");
  });

  it("renders profile controls in Hebrew when used on the Hebrew homepage", () => {
    const artist = artists.find((candidate) => candidate.slug === "nataly-shafir")!;
    render(
      <MemoryRouter>
        <ArtistCard artist={artist} locale="he" />
      </MemoryRouter>,
    );

    expect(screen.getByText("מייסדת ומנהלת אמנותית / ישראל")).toBeInTheDocument();
    expect(screen.getByText("תמונת פרופיל מאושרת")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /עדכון הפרופיל/ })).toBeInTheDocument();
  });

  it("connects known exhibition artists to profiles and keeps the submission fallback for unknown artists", () => {
    render(
      <MemoryRouter>
        <Exhibitions />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Maya Elav Nachshon" })).toHaveAttribute(
      "href",
      "/artists/maya-elav-nachshon",
    );
    expect(screen.getByRole("link", { name: "David Chen" })).toHaveAttribute(
      "href",
      "/creator-submission?artist=David%20Chen",
    );
  });
});
