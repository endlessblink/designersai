import { ArrowLeft, ArrowRight, Image } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import {
  Artist,
  artists as fallbackArtists,
  communityLeadSlugs,
  founderSlug,
  getArtistDisplayTitle,
  getArtistInitials,
  getArtistProfilePath,
  isCommunityLead,
} from "@/data/artists";

interface HomepageCommunityProps {
  artists: Artist[];
  locale?: "en" | "he";
}

const splitIntoColumns = (artists: Artist[], columnCount: number) =>
  Array.from({ length: Math.min(columnCount, artists.length) }, (_, columnIndex) =>
    artists.filter((_, artistIndex) => artistIndex % columnCount === columnIndex),
  );

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
  const communityArtistsWithImages = roster.filter((artist) => artist.image && !isCommunityLead(artist.slug));
  const temporaryShowcaseArtists = communityLeads.filter((artist) => artist.image);
  const showcaseArtists = communityArtistsWithImages.length > 0 ? communityArtistsWithImages : temporaryShowcaseArtists;
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;

  const renderShowcaseColumns = (columnCount: number, className: string) => (
    <div
      className={`${className} max-h-[740px] gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] motion-reduce:max-h-none motion-reduce:overflow-visible motion-reduce:[mask-image:none]`}
    >
      {splitIntoColumns(showcaseArtists, columnCount).map((columnArtists, index) => (
        <TestimonialsColumn
          key={`${columnCount}-${index}`}
          artists={columnArtists}
          duration={[17, 21, 19][index]}
          locale={locale}
        />
      ))}
    </div>
  );

  return (
    <>
      <AnimatedSection id="founder" className="scroll-mt-20 bg-deep-charcoal py-16 text-warm-cream md:py-20">
        <div className="container">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-10 lg:gap-14">
            <div className="mx-auto w-full max-w-sm md:mx-0">
              <Link
                to={getArtistProfilePath(founder.slug)}
                aria-label={founder.name}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-cream/80 focus-visible:ring-offset-4 focus-visible:ring-offset-deep-charcoal"
              >
                <div className="aspect-[4/3] max-w-sm overflow-hidden bg-warm-cream/5">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </div>

            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-warm-cream/50">
                {isHebrew ? "מייסדת" : "Founder"}
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight md:text-4xl">
                {isHebrew ? "מייסדת ומנהלת אמנותית" : "Founder & Artistic Director"}
              </h2>
              <Link
                to={getArtistProfilePath(founder.slug)}
                className="mt-5 inline-block font-display text-xl text-warm-cream transition-opacity hover:opacity-70 md:text-2xl"
              >
                {isHebrew && founder.hebrewName ? founder.hebrewName : founder.name}
              </Link>
              <p className="mt-3 max-w-xl font-body text-sm font-light leading-relaxed text-warm-cream/65 md:text-base">
                {founder.bio}
              </p>
              <Link
                to={getArtistProfilePath(founder.slug)}
                className="mt-5 inline-flex items-center gap-2 border-b border-warm-cream/30 pb-1 text-sm text-warm-cream transition-colors hover:border-warm-cream"
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
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
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

      {showcaseArtists.length > 0 && (
        <AnimatedSection id="artists" className="scroll-mt-20 py-16 md:py-32">
          <div className="container">
            <SectionHeading
              label={isHebrew ? "אמני הקהילה" : "Artist showcase"}
              title={isHebrew ? "יוצרים בקהילה" : "Community Artists"}
              description={
                isHebrew
                  ? "רשת בינלאומית של אמנים, מעצבים ואנשי תרבות החוקרים בינה מלאכותית כמדיום יצירתי."
                  : "An international roster of artists, designers, and cultural practitioners exploring AI as a creative medium."
              }
            />

            <div aria-label={isHebrew ? "אמני הקהילה" : "Community artists"} dir={isHebrew ? "rtl" : "ltr"}>
              <TestimonialsColumn
                artists={showcaseArtists}
                locale={locale}
                orientation="horizontal"
                autoPlay={false}
                className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
              />
              {renderShowcaseColumns(2, "hidden grid-cols-2 md:grid lg:hidden")}
              {renderShowcaseColumns(3, "hidden grid-cols-3 lg:grid")}
            </div>

            <Link
              to="/artists"
              className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {isHebrew ? "צפו בספריית האמנים המלאה" : "View the full artist directory"} <Arrow size={14} />
            </Link>
          </div>
        </AnimatedSection>
      )}
    </>
  );
};

export default HomepageCommunity;
