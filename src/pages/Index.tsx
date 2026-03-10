import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import heroBg from "@/assets/hero-bg.jpg";
import exhibitionTelAviv from "@/assets/exhibition-telav.jpg";
import exhibitionBangkok from "@/assets/exhibition-bangkok.jpg";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="AI art installation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-deep-charcoal/60" />
        </div>
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-cream font-medium tracking-tight">
              Designers in AI
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xs md:text-sm uppercase tracking-[0.3em] text-warm-cream/60 font-body"
          >
            Global Cultural Series
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 text-base md:text-lg text-warm-cream/80 font-body font-light max-w-xl mx-auto leading-relaxed"
          >
            A living creative network exploring artificial intelligence as an artistic medium.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/exhibitions"
              className="inline-flex items-center gap-2 px-8 py-3 bg-warm-cream text-deep-charcoal font-body text-sm tracking-wide hover:bg-warm-cream/90 transition-colors"
            >
              Explore Exhibitions <ArrowRight size={16} />
            </Link>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-8 py-3 border border-warm-cream/30 text-warm-cream font-body text-sm tracking-wide hover:bg-warm-cream/10 transition-colors"
            >
              Join the Community
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-warm-cream/30 mx-auto" />
        </motion.div>
      </section>

      {/* Intro */}
      <AnimatedSection className="py-24 md:py-32">
        <div className="container max-w-3xl text-center">
          <p className="font-display text-2xl md:text-3xl text-foreground leading-relaxed font-light italic">
            "We believe AI is not replacing the artist — it is expanding what art can become."
          </p>
          <p className="mt-6 text-sm text-muted-foreground font-body">
            Founded by Nataly Shafir, Designers in AI brings together an international community of artists, designers, and thinkers exploring AI as a creative medium.
          </p>
        </div>
      </AnimatedSection>

      {/* Featured Exhibitions */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <SectionHeading
            label="Exhibitions"
            title="International Presence"
            description="Our exhibitions bring AI art into conversation with local culture, audience, and space."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Almost Real",
                city: 'Tel Aviv "Beit Hanocho" — 2026',
                image: exhibitionTelAviv,
                video: "/videos/almost-real.mp4",
                slug: "/exhibitions/almost-real",
              },
              {
                title: "Bangkok Edition",
                city: "Bangkok",
                year: "2025",
                image: exhibitionBangkok,
                slug: "/exhibitions/bangkok",
              },
            ].map((ex, i) => (
              <motion.div
                key={ex.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link to={ex.slug} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={ex.image}
                      alt={`${ex.title} exhibition`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-deep-charcoal/20 group-hover:bg-deep-charcoal/10 transition-colors" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-2xl text-foreground">{ex.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {ex.city} — {ex.year}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <AnimatedSection className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            label="Community"
            title="A Growing Network of Creators"
            description="Artists, designers, and cultural practitioners from around the world — united by curiosity and creative practice with AI."
          />
          <div className="flex flex-wrap gap-4 mt-8">
            {["Nataly Shafir", "David Chen", "Aisha Patel", "Marco Rossi", "Yuki Tanaka", "Sofia Andersson", "Carlos Mendoza", "Amara Osei"].map(
              (name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="px-5 py-3 border border-border bg-card font-body text-sm text-foreground"
                >
                  {name}
                </motion.div>
              )
            )}
          </div>
          <Link
            to="/artists"
            className="mt-10 inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            View all community artists <ArrowRight size={14} />
          </Link>
        </div>
      </AnimatedSection>

      {/* Weekly Practice */}
      <section className="py-24 md:py-32 bg-deep-charcoal">
        <div className="container">
          <SectionHeading
            light
            label="Weekly Practice"
            title="Inside the Practice"
            description="Every week, our community meets to experiment, share, and push the boundaries of AI-driven creativity. Follow our journey on YouTube."
          />
          <div className="mt-8 aspect-video max-w-3xl bg-deep-charcoal border border-warm-cream/10 flex items-center justify-center">
            <Link to="/weekly-practice" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full border border-warm-cream/30 flex items-center justify-center group-hover:bg-warm-cream/10 transition-colors">
                <Play size={24} className="text-warm-cream ml-1" />
              </div>
              <span className="text-sm text-warm-cream/60 font-body">Explore our weekly sessions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Press Highlight */}
      <AnimatedSection className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            label="Press & Media"
            title="In the Conversation"
            description="Featured in publications and cultural events worldwide."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { source: "Design Week", title: "AI Art Goes Global with Designers in AI", date: "2025" },
              { source: "The Art Newspaper", title: "Almost Real: When AI Meets Human Creativity", date: "2025" },
              { source: "Creative Review", title: "The Community Redefining AI Art Practice", date: "2024" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-t border-border pt-6"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">{item.source}</p>
                <h4 className="mt-2 font-display text-lg text-foreground">{item.title}</h4>
                <p className="mt-2 text-xs text-muted-foreground font-body">{item.date}</p>
              </motion.div>
            ))}
          </div>
          <Link
            to="/press"
            className="mt-10 inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            View all press coverage <ArrowRight size={14} />
          </Link>
        </div>
      </AnimatedSection>

      {/* Join CTA */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container text-center max-w-2xl">
          <AnimatedSection>
            <SectionHeading
              align="center"
              title="Become Part of the Network"
              description="Designers in AI is an evolving community. We welcome artists and creators who are shaping the future of AI-driven art."
            />
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Apply to Join <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
