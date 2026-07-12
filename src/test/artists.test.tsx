import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArtistCard from "@/components/ArtistCard";
import { artists, featuredArtists } from "@/data/artists";

describe("artist profile images", () => {
  it.each([
    ["nataly-shafir", "/images/artists/nataly-shafir.png"],
    ["maya-elav-nachshon", "/images/artists/maya-elav-nachshon.png"],
    ["ifat-kariv-gurion", "/images/artists/ifat-kariv-gurion.png"],
    ["adi-erlich", "/images/artists/adi-erlich.png"],
    ["noam-naumovsky", "/images/artists/noam-naumovsky.png"],
  ])("assigns the approved portrait to %s", (slug, image) => {
    expect(artists.find((artist) => artist.slug === slug)?.image).toBe(image);
  });

  it("features every artist with an approved portrait on the homepage", () => {
    const artistsWithImages = artists.filter((artist) => artist.image);

    expect(artistsWithImages).toHaveLength(5);
    expect(artistsWithImages.every((artist) => artist.isFeatured)).toBe(true);
  });

  it("places approved portraits before image-pending profiles", () => {
    const firstImagePendingIndex = featuredArtists.findIndex((artist) => !artist.image);

    expect(firstImagePendingIndex).toBe(5);
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
});
