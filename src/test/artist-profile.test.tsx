import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";

describe("artist profile routes", () => {
  afterEach(() => {
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
});
