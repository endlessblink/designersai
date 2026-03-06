import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const Partners = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-3xl">
          <SectionHeading
            label="Collaborate"
            title="For Cultural Partners"
            description="Designers in AI is an international creative platform that brings together exhibitions, community practice, and public discourse around AI as an artistic medium."
          />

          <AnimatedSection className="space-y-10 mt-4">
            <div>
              <h3 className="font-display text-xl text-foreground mb-3">What We Offer</h3>
              <p className="text-muted-foreground font-body font-light leading-relaxed">
                We work with museums, galleries, festivals, cultural foundations, and city programs to bring AI art exhibitions and creative events to new audiences. Each city edition is developed in dialogue with local partners, ensuring cultural relevance and meaningful exchange.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-foreground mb-3">Our Approach</h3>
              <ul className="space-y-3">
                {[
                  "Curated exhibitions featuring international AI artists",
                  "Community engagement through workshops and talks",
                  "Public discourse on creativity, technology, and culture",
                  "Weekly practice documentation and media content",
                  "Cross-cultural exchange between local and international artists",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-cinematic-violet mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground font-body font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl text-foreground mb-3">Let's Connect</h3>
              <p className="text-muted-foreground font-body font-light leading-relaxed">
                We are open to meaningful collaborations with cultural institutions, festivals, and city programs around the world. If you share our commitment to exploring AI as a creative medium, we would love to hear from you.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-foreground text-background font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </PageLayout>
  );
};

export default Partners;
