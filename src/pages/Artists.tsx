import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";

interface Artist {
  name: string;
  title: string;
  bio: string;
  isFounder?: boolean;
}

const artists: Artist[] = [
  {
    name: "Nataly Shafir",
    title: "Founder & Artistic Director",
    bio: "A designer, creative director, and cultural organizer who founded Designers in AI. Nataly bridges design, education, and curatorial practice to create meaningful cultural moments around AI creativity.",
    isFounder: true,
  },
  {
    name: "Aisha Patel",
    title: "Generative Visual Artist",
    bio: "Working at the intersection of traditional Indian miniature painting and AI-generated imagery. Aisha's work explores cultural memory through computational lenses.",
  },
  {
    name: "Carlos Mendoza",
    title: "Digital Sculptor & Architect",
    bio: "Trained as an architect in Mexico City, Carlos uses AI to generate impossible structures that question the boundaries between built environment and imagination.",
  },
  {
    name: "David Chen",
    title: "AI Filmmaker & Visual Storyteller",
    bio: "Based in Taipei, David creates short films and visual narratives using AI tools, exploring themes of identity, displacement, and digital consciousness.",
  },
  {
    name: "Amara Osei",
    title: "Mixed Media & AI Artist",
    bio: "Amara combines traditional West African textile patterns with AI-generated forms, creating works that speak to cultural preservation in a technological age.",
  },
  {
    name: "Marco Rossi",
    title: "Photographer & AI Experimentalist",
    bio: "An Italian photographer who uses AI to extend the language of documentary photography, creating images that exist between fact and fiction.",
  },
  {
    name: "Sofia Andersson",
    title: "Interaction Designer & Creative Coder",
    bio: "Based in Stockholm, Sofia creates interactive installations that invite audiences to co-create with AI systems in real-time gallery settings.",
  },
  {
    name: "Yuki Tanaka",
    title: "AI Illustrator & Print Artist",
    bio: "Yuki blends the aesthetic traditions of Japanese woodblock printing with AI-generated imagery, creating prints that feel both ancient and futuristic.",
  },
];

const Artists = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-4xl">
          <SectionHeading
            label="Community"
            title="Community Artists"
            description="Designers in AI is a living and evolving creative network. The artists below represent the current community — a growing group of practitioners exploring AI as an artistic medium across disciplines, cultures, and geographies."
          />

          <div className="space-y-0">
            {artists.map((artist, i) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="py-8 border-b border-border first:border-t flex flex-col md:flex-row gap-6 md:gap-10"
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-secondary flex items-center justify-center">
                  <span className="font-display text-xl text-muted-foreground">
                    {artist.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-display text-xl text-foreground">{artist.name}</h3>
                    {artist.isFounder && (
                      <span className="text-[10px] uppercase tracking-[0.15em] text-cinematic-violet font-body px-2 py-0.5 border border-cinematic-violet/30">
                        Founder
                      </span>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body mt-1">
                    {artist.title}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground font-body font-light leading-relaxed max-w-2xl">
                    {artist.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Artists;
