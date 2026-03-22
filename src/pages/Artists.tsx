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
    bio: "A designer, creative director, and cultural organizer who founded Designers with AI. Nataly bridges design, education, and curatorial practice to create meaningful cultural moments around AI creativity.",
    isFounder: true,
  },
  { name: "Sivan Darmon Pritsker", title: "Community Artist", bio: "" },
  { name: "Gina Dawidowicz", title: "Community Artist", bio: "" },
  { name: "Maya Elav Nachshon", title: "Community Artist", bio: "" },
  { name: "Gili Comforty", title: "Community Artist", bio: "" },
  { name: "Sharon Mass", title: "Community Artist", bio: "" },
  { name: "Gilad Edelstein", title: "Community Artist", bio: "" },
  { name: "Mira Feder", title: "Community Artist", bio: "" },
  { name: "Elad Baadany Hoogervorst", title: "Community Artist", bio: "" },
  { name: "Noam Naumovsky", title: "Community Artist", bio: "" },
  { name: "Natalie Kaplan", title: "Community Artist", bio: "" },
  { name: "Ifat Kariv Gurion", title: "Community Artist", bio: "" },
  { name: "Maya Pinto-Koren", title: "Community Artist", bio: "" },
  { name: "Noa Tamir", title: "Community Artist", bio: "" },
  { name: "Inbal Weisman", title: "Community Artist", bio: "" },
  { name: "Orit Litmanovitz Shiber", title: "Community Artist", bio: "" },
  { name: "Moshe Eylon", title: "Community Artist", bio: "" },
  { name: "Revital Avidar", title: "Community Artist", bio: "" },
  { name: "Daniel Atzil", title: "Community Artist", bio: "" },
  { name: "Lee Aloni", title: "Community Artist", bio: "" },
  { name: "יואב עינהר", title: "Community Artist", bio: "" },
  { name: "קארין בסר", title: "Community Artist", bio: "" },
  { name: "איתי קורוניו", title: "Community Artist", bio: "" },
  { name: "אריל אלויה ק.", title: "Community Artist", bio: "" },
  { name: "טלי אפל", title: "Community Artist", bio: "" },
];
const Artists = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-4xl">
          <SectionHeading
            label="Community"
            title="Community Artists"
            description="Designers with AI is a living and evolving creative network. The artists below represent the current community — a growing group of practitioners exploring AI as an artistic medium across disciplines, cultures, and geographies."
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
