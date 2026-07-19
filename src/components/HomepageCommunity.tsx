import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Image } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Artist,
  artists as fallbackArtists,
  communityLeadSlugs,
  founderSlug,
  getArtistDisplayTitle,
  getArtistImageFitClass,
  getArtistInitials,
  getArtistProfilePath,
} from "@/data/artists";

interface HomepageCommunityProps {
  artists: Artist[];
  locale?: "en" | "he";
}

const tagStyles = [
  "text-base md:text-lg",
  "text-lg md:text-2xl",
  "text-sm md:text-base",
  "text-base md:text-xl",
];

const HomepageCommunity = ({ artists, locale = "en" }: HomepageCommunityProps) => {
  const isHebrew = locale === "he";
  const resolvedArtists = new Map(artists.map((artist) => [artist.slug, artist]));

  fallbackArtists.forEach((artist) => {
    if (!resolvedArtists.has(artist.slug)) {
      resolvedArtists.set(artist.slug, artist);
    }
  });

  const founder = resolvedArtists.get(founderSlug)!;
  const communityLeads = communityLeadSlugs.flatMap((slug) => {
    const artist = resolvedArtists.get(slug);
    return artist ? [artist] : [];
  });
  const roster = [...resolvedArtists.values()].filter((artist) => artist.slug !== founderSlug);
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;

  return (
    <>
      <AnimatedSection id="founder" className="scroll-mt-20 bg-deep-charcoal py-24 text-warm-cream md:py-32">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Link
                to={getArtistProfilePath(founder.slug)}
                aria-label={founder.name}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-cream/80 focus-visible:ring-offset-4 focus-visible:ring-offset-deep-charcoal"
              >
                <div className="aspect-[4/5] overflow-hidden bg-warm-cream/5">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <span className="text-xs uppercase tracking-[0.25em] text-warm-cream/50">
                {isHebrew ? "מייסדת" : "Founder"}
              </span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                {isHebrew ? "מייסדת ומנהלת אמנותית" : "Founder & Artistic Director"}
              </h2>
              <Link
                to={getArtistProfilePath(founder.slug)}
                className="mt-8 inline-block font-display text-2xl text-warm-cream transition-opacity hover:opacity-70"
              >
                {isHebrew && founder.hebrewName ? founder.hebrewName : founder.name}
              </Link>
              <p className="mt-5 max-w-xl font-body text-base font-light leading-relaxed text-warm-cream/65 md:text-lg">
                {founder.bio}
              </p>
              <Link
                to={getArtistProfilePath(founder.slug)}
                className="mt-8 inline-flex items-center gap-2 border-b border-warm-cream/30 pb-1 text-sm text-warm-cream transition-colors hover:border-warm-cream"
              >
                {isHebrew ? "לפרופיל המלא" : "View full profile"} <Arrow size={15} />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="community-leads" className="scroll-mt-20 bg-secondary/45 py-24 md:py-32">
        <div className="container">
          <SectionHeading
            label={isHebrew ? "קהילה" : "Community"}
            title={isHebrew ? "צוות הובלת הקהילה" : "Community Leads"}
            description={
              isHebrew
                ? "האנשים שמחזיקים את המרחב, מחברים בין היוצרים ומניעים את העשייה המשותפת."
                : "The people holding the space, connecting creators, and moving the shared practice forward."
            }
          />

          <ol className="grid grid-cols-2 border-y border-border sm:grid-cols-3 lg:grid-cols-5" dir={isHebrew ? "rtl" : "ltr"}>
            {communityLeads.map((artist, index) => (
              <li key={artist.slug} className="border-border odd:border-r even:border-r sm:border-r lg:first:border-l">
                <Link
                  to={getArtistProfilePath(artist.slug)}
                  aria-label={artist.name}
                  className="group block h-full px-3 py-5 transition-colors hover:bg-background/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:px-4"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-background/45">
                    {artist.image ? (
                      <img
                        src={artist.image}
                        alt=""
                        className={`h-full w-full ${getArtistImageFitClass(artist)} transition-transform duration-700 group-hover:scale-[1.025]`}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
                        <Image size={18} />
                        <span className="font-display text-4xl text-foreground/60">{getArtistInitials(artist.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-start gap-3">
                    <span aria-hidden="true" className="pt-1 text-[10px] tracking-[0.16em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-tight text-foreground">
                        <bdi dir="auto">{artist.name}</bdi>
                      </h3>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {getArtistDisplayTitle(artist, locale)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      <AnimatedSection id="artists" className="scroll-mt-20 py-24 md:py-32">
        <div className="container">
          <SectionHeading
            label={isHebrew ? "הקהילה המלאה" : "The full community"}
            title={isHebrew ? "כל האמנים" : "All Artists"}
            description={
              isHebrew
                ? "רשת בינלאומית של אמנים, מעצבים ואנשי תרבות החוקרים בינה מלאכותית כמדיום יצירתי."
                : "An international roster of artists, designers, and cultural practitioners exploring AI as a creative medium."
            }
          />

          <ol
            aria-label={isHebrew ? "כל האמנים" : "All artists"}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-4 border-y border-border py-8 md:gap-x-4 md:gap-y-5 md:py-10"
            dir={isHebrew ? "rtl" : "ltr"}
          >
            {roster.map((artist, index) => (
              <motion.li
                key={artist.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.3) }}
                className={index % 5 === 1 ? "md:translate-y-2" : index % 7 === 3 ? "md:-translate-y-1" : ""}
              >
                <Link
                  to={getArtistProfilePath(artist.slug)}
                  aria-label={artist.name}
                  className={`group inline-flex items-start gap-2 border border-border px-4 py-3 font-display text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${tagStyles[index % tagStyles.length]}`}
                >
                  <span aria-hidden="true" className="font-body text-[9px] tracking-[0.12em] opacity-45 group-hover:opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <bdi dir="auto">{artist.name}</bdi>
                </Link>
              </motion.li>
            ))}
          </ol>

          <Link
            to="/artists"
            className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {isHebrew ? "צפו בספריית האמנים המלאה" : "View the full artist directory"} <Arrow size={14} />
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
};

export default HomepageCommunity;
