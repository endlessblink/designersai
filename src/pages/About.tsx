import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const About = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="container py-16 md:py-24 max-w-3xl">
          <SectionHeading
            label="About"
            title="A Creative Community Born from Curiosity"
            description="Designers with AI is an international creative network exploring artificial intelligence as an artistic medium — through exhibitions, weekly practice, and ongoing dialogue."
          />
        </section>

        {/* What is it */}
        <AnimatedSection className="container py-12 max-w-3xl">
          <h3 className="font-display text-2xl text-foreground mb-4">What is Designers with AI?</h3>
          <p className="text-muted-foreground font-body font-light leading-relaxed">
            Designers with AI is a curated community of artists, designers, and creative practitioners from around the world who are using AI tools — not as shortcuts, but as a new artistic medium. The platform brings together exhibition-making, weekly creative sessions, and public discourse to explore what it means to create with machines.
          </p>
        </AnimatedSection>

        {/* Why it was created */}
        <AnimatedSection className="container py-12 max-w-3xl">
          <h3 className="font-display text-2xl text-foreground mb-4">Why It Was Created</h3>
          <p className="text-muted-foreground font-body font-light leading-relaxed">
            As AI tools became more accessible, a gap emerged between the technology and the creative communities exploring it seriously. Designers with AI was founded to bridge that gap — to create a space where artists can share process, develop ideas, exhibit together, and be seen by cultural institutions as legitimate practitioners of a new form.
          </p>
        </AnimatedSection>

        {/* Community */}
        <AnimatedSection className="container py-12 max-w-3xl">
          <h3 className="font-display text-2xl text-foreground mb-4">What Kind of Community</h3>
          <p className="text-muted-foreground font-body font-light leading-relaxed">
            This is not a course. It is not a marketplace. It is a living network — a place of creative exchange, mutual respect, and shared experimentation. Members come from different disciplines — graphic design, fine art, architecture, fashion, animation, photography — and what unites them is a commitment to understanding AI as a creative language.
          </p>
        </AnimatedSection>

        {/* Founder */}
        <AnimatedSection className="container py-12 max-w-3xl border-t border-border mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">Founder & Artistic Director</span>
          <h3 className="font-display text-2xl text-foreground mt-3 mb-4">Nataly Shafir</h3>
          <p className="text-muted-foreground font-body font-light leading-relaxed">
            Nataly Shafir is a designer, creative director, and cultural organizer who founded Designers with AI to give form to a growing movement. With a background spanning design, education, and curatorial work, she brings together artists and institutions to create meaningful cultural moments around AI creativity.
          </p>
        </AnimatedSection>

        {/* Vision */}
        <AnimatedSection className="container py-12 pb-24 md:pb-32 max-w-3xl">
          <h3 className="font-display text-2xl text-foreground mb-4">Vision</h3>
          <p className="text-muted-foreground font-body font-light leading-relaxed">
            We envision a world where AI art is recognized as a legitimate and vital creative field — exhibited in museums, discussed in cultural discourse, and practiced by communities everywhere. Through city editions, partnerships, and an ever-growing network, Designers with AI is building toward that future.
          </p>
        </AnimatedSection>
      </div>
    </PageLayout>
  );
};

export default About;
