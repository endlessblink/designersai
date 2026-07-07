import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import ArtistCard from "@/components/ArtistCard";
import { Artist, artists as fallbackArtists } from "@/data/artists";
import { fetchPublishedArtists } from "@/lib/cms";
const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>(fallbackArtists);

  useEffect(() => {
    fetchPublishedArtists().then(setArtists);
  }, []);

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24">
          <SectionHeading
            label="Community"
            title="Community Artists"
            description="Designers with AI is a living and evolving creative network. The artists below represent the current community — a growing group of practitioners exploring AI as an artistic medium across disciplines, cultures, and geographies."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mb-10 grid gap-6 border-y border-border py-8 md:grid-cols-[1fr_auto] md:items-center"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">Creator materials</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">Help complete the artist directory</h3>
              <p className="mt-3 max-w-2xl text-sm font-body font-light leading-relaxed text-muted-foreground">
                Creators can submit approved portraits, artwork images, bios, and links. The current cards are ready for images as soon as materials are approved.
              </p>
            </div>
            <Link
              to="/creator-submission"
              className="inline-flex items-center justify-center gap-2 bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-90 font-body"
            >
              Submit materials <ArrowRight size={15} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist, i) => (
              <ArtistCard key={artist.slug} artist={artist} index={i} />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Artists;
