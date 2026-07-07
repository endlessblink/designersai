import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { findArtistByName } from "@/data/artists";
import exhibitionTelAviv from "@/assets/exhibition-telav.jpg";
import exhibitionBangkok from "@/assets/exhibition-bangkok.jpg";

const exhibitions = [
  {
    title: "Almost Real",
    city: "Tel Aviv",
    year: "2025",
    image: exhibitionTelAviv,
    video: "/videos/almost-real.mp4",
    slug: "almost-real",
    statement: "An exhibition exploring the tension between authentic human expression and AI-generated imagery. Almost Real asks: in a world of synthetic media, what does it mean for art to be 'real'?",
    website: undefined as string | undefined,
    artists: ["Nataly Shafir", "David Chen", "Marco Rossi", "Aisha Patel", "Yuki Tanaka"],
  },
  {
    title: "Living Ink — Illustrating the Future",
    city: "Bangkok — Nextopia/Paragon",
    year: "2025",
    image: exhibitionBangkok,
    video: "/videos/living-ink.mp4",
    slug: "bangkok",
    statement: "A cross-cultural dialogue between Southeast Asian visual traditions and AI-driven art practices. The Bangkok Edition brings Designers with AI into conversation with local creative communities.",
    website: "https://nex.hsutcc.com/",
    artists: ["Noa Tamir", "Maya Elav Nachshon", "Sharon Mass", "Noam Naumovsky", "Oren Meyuhas", "Gili Comforty", "Karin Besser", "Nataly Shafir"],
  },
];

const Exhibitions = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24">
          <SectionHeading
            label="Exhibitions"
            title="International Exhibitions"
            description="Each exhibition is a unique cultural moment — created in dialogue with a specific city, space, and audience. Our exhibitions build legitimacy, visibility, and creative exchange across borders."
          />

          <div className="space-y-24 mt-8">
            {exhibitions.map((ex, i) => (
              <motion.article
                key={ex.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
              >
                <div className="overflow-hidden aspect-[4/3]">
                  {ex.video ? (
                    <video src={ex.video} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  ) : (
                    <img src={ex.image} alt={`${ex.title} exhibition`} className="w-full h-full object-cover" loading="lazy" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">
                    {ex.city} — {ex.year}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground mt-2">{ex.title}</h3>
                  <p className="mt-4 text-muted-foreground font-body font-light leading-relaxed">
                    {ex.statement}
                  </p>
                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body mb-2">Participating Artists</p>
                    <div className="flex flex-wrap gap-2">
                      {ex.artists.map((a) => {
                        const artist = findArtistByName(a);

                        return (
                          <Link
                            key={a}
                            to={artist ? `/artists#${artist.slug}` : `/creator-submission?artist=${encodeURIComponent(a)}`}
                            className="text-xs font-body text-foreground px-3 py-1 border border-border transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                          >
                            {a}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  {ex.website && (
                    <a
                      href={ex.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-body text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <ExternalLink size={16} />
                      Visit Exhibition Website
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Exhibitions;
