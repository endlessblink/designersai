import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Image } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Artist, artists as fallbackArtists, getArtistDisplayTitle, getArtistImageFitClass, getArtistInitials } from "@/data/artists";
import { fetchPublishedArtists } from "@/lib/cms";

const ArtistProfile = () => {
  const { slug = "" } = useParams();
  const fallbackArtist = fallbackArtists.find((artist) => artist.slug === slug);
  const [artist, setArtist] = useState<Artist | undefined>(fallbackArtist);
  const [loading, setLoading] = useState(!fallbackArtist);

  useEffect(() => {
    let active = true;

    fetchPublishedArtists().then((publishedArtists) => {
      if (!active) return;
      setArtist(
        publishedArtists.find((candidate) => candidate.slug === slug)
          ?? fallbackArtists.find((candidate) => candidate.slug === slug),
      );
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div dir="ltr" className="container flex min-h-[70vh] items-center justify-center pt-24 text-sm text-muted-foreground">
          Loading artist profile…
        </div>
      </PageLayout>
    );
  }

  if (!artist) {
    return (
      <PageLayout>
        <section dir="ltr" className="container flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Community artist</p>
          <h1 className="mt-3 font-display text-4xl text-foreground">Artist not found</h1>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            This profile may have moved or may not be published yet.
          </p>
          <Link to="/artists" className="mt-8 inline-flex items-center gap-2 text-sm text-foreground hover:opacity-70">
            <ArrowLeft size={15} /> Back to all artists
          </Link>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <article dir="ltr" className="container py-16 md:py-24">
          <Link to="/artists" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={15} /> All community artists
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              {artist.image ? (
                <img src={artist.image} alt={artist.name} className={`h-full w-full ${getArtistImageFitClass(artist)}`} />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/50">
                    <Image size={20} />
                  </div>
                  <span className="font-display text-4xl text-foreground/50">{getArtistInitials(artist.name)}</span>
                  <span className="text-xs uppercase tracking-[0.14em]">Image coming soon</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Community artist</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">{artist.name}</h1>
              {artist.hebrewName && <p className="mt-2 font-display text-2xl text-muted-foreground">{artist.hebrewName}</p>}
              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {[getArtistDisplayTitle(artist), artist.location].filter(Boolean).join(" / ")}
              </p>
              <p className="mt-8 max-w-2xl font-body text-lg font-light leading-relaxed text-muted-foreground">{artist.bio}</p>

              {artist.links && artist.links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {artist.links.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground"
                    >
                      {link.label} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-10 border-t border-border pt-6">
                <Link
                  to={`/creator-submission?artist=${artist.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground transition-opacity hover:opacity-70"
                >
                  Update profile <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
};

export default ArtistProfile;
