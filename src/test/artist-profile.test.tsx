import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";

describe("artist profile routes", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    window.history.pushState({}, "", "/");
  });

  it("renders the matching artist at the dedicated profile URL", async () => {
    window.history.pushState({}, "", "/artists/nataly-shafir");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Nataly Shafir" })).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveAttribute("dir", "ltr");
    expect(screen.getByRole("img", { name: "Nataly Shafir" })).toHaveAttribute(
      "src",
      "/images/artists/nataly-shafir.png",
    );
    expect(screen.getByRole("link", { name: "Update profile" })).toHaveAttribute(
      "href",
      "/creator-submission?artist=nataly-shafir",
    );
  });

  it("shows an intentional placeholder when an artist image is pending", async () => {
    window.history.pushState({}, "", "/artists/sivan-darmon-pritsker");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Sivan Darmon Pritsker" })).toBeInTheDocument();
    expect(screen.getByText("SD")).toBeInTheDocument();
    expect(screen.getByText("Image coming soon")).toBeInTheDocument();
  });

  it("shows a directory recovery link for an unknown artist", async () => {
    window.history.pushState({}, "", "/artists/not-a-real-artist");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Artist not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to all artists" })).toHaveAttribute("href", "/artists");
  });

  it("shows the curated Community Lead role on existing lead profiles", async () => {
    window.history.pushState({}, "", "/artists/maya-elav-nachshon");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Maya Elav Nachshon" })).toBeInTheDocument();
    expect(screen.getByText("Community Lead")).toBeInTheDocument();
  });

  it("fills Noam's profile frame with the supplied event photo", async () => {
    window.history.pushState({}, "", "/artists/noam-naumovsky");

    render(<App />);

    const portrait = await screen.findByRole("img", { name: "Noam Naumovsky" });
    expect(portrait).toHaveAttribute("src", "/images/artists/noam-naumovsky.jpg");
    expect(portrait).toHaveClass("object-cover");
  });

  it("keeps Miri Pinko available when the CMS returns a partial roster", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        artists: [{ slug: "nataly-shafir", name: "Nataly Shafir", title: "Founder", bio: "Founder bio" }],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    window.history.pushState({}, "", "/artists/miri-pinko");

    render(<App />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(await screen.findByRole("heading", { name: "Miri Pinko" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Miri Pinko" })).toHaveAttribute(
      "src",
      "/images/artists/miri-pinko.jpg",
    );
    expect(screen.getByText("Community Lead")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Update profile" })).toHaveAttribute(
      "href",
      "/creator-submission?artist=miri-pinko",
    );
  });
});
