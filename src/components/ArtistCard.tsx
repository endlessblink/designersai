import { ArrowUpRight, Image } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Artist, getArtistInitials } from "@/data/artists";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
  compact?: boolean;
}

const ArtistCard = ({ artist, index = 0, compact = false }: ArtistCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: Math.min(index * 0.04, 0.24), duration: 0.45 }}
      className="group border border-border bg-card/70 transition-colors hover:border-foreground/30"
    >
      <div className={compact ? "p-4" : "p-5"}>
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          {artist.image ? (
            <img src={artist.image} alt={artist.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/50">
                <Image size={18} />
              </div>
              <span className="font-display text-2xl text-foreground/50">{getArtistInitials(artist.name)}</span>
            </div>
          )}
        </div>

        <div className={compact ? "mt-4" : "mt-5"}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl leading-tight text-foreground">{artist.name}</h3>
              {artist.hebrewName && <p className="mt-1 text-sm text-muted-foreground font-body">{artist.hebrewName}</p>}
            </div>
            {artist.isFounder && (
              <span className="shrink-0 border border-cinematic-violet/30 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-cinematic-violet">
                Founder
              </span>
            )}
          </div>

          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground font-body">
            {[artist.title, artist.location].filter(Boolean).join(" / ")}
          </p>

          {!compact && (
            <p className="mt-4 min-h-[4.5rem] text-sm font-body font-light leading-relaxed text-muted-foreground">
              {artist.bio}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground font-body">
              {artist.image ? "Profile image approved" : "Images pending"}
            </span>
            <Link
              to={`/creator-submission?artist=${artist.slug}`}
              className="inline-flex items-center gap-1 text-xs font-body text-foreground transition-opacity hover:opacity-70"
            >
              Update profile <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ArtistCard;
