import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";

const pressItems = [
  { source: "Design Week", title: "AI Art Goes Global with Designers with AI", date: "March 2025", excerpt: "A deep look at how one community is reshaping the international AI art landscape through exhibitions and weekly practice." },
  { source: "The Art Newspaper", title: "Almost Real: When AI Meets Human Creativity", date: "February 2025", excerpt: "Coverage of the Tel Aviv exhibition that brought together eight international artists working at the frontier of AI creativity." },
  { source: "Creative Review", title: "The Community Redefining AI Art Practice", date: "January 2025", excerpt: "An interview-driven feature exploring the collaborative spirit behind Designers with AI." },
  { source: "Wallpaper*", title: "From Tel Aviv to Bangkok: A Cultural Series Powered by AI", date: "December 2024", excerpt: "How Designers with AI is building a global presence through carefully curated city editions." },
  { source: "It's Nice That", title: "Inside the Weekly Practice of AI-Driven Artists", date: "November 2024", excerpt: "An intimate look at the community's weekly creative sessions and what they reveal about artistic process in the age of AI." },
];

const Press = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-4xl">
          <SectionHeading
            label="Press & Media"
            title="In the Conversation"
            description="Articles, interviews, and publications featuring Designers with AI and our community members."
          />

          <div className="space-y-0">
            {pressItems.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="py-8 border-b border-border first:border-t group cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">{item.source} — {item.date}</p>
                    <h3 className="font-display text-xl text-foreground mt-2 group-hover:text-cinematic-violet transition-colors">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-body font-light leading-relaxed max-w-2xl">{item.excerpt}</p>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Press;
