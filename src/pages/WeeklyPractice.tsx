import { Play } from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const WeeklyPractice = () => {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-4xl">
          <SectionHeading
            label="Weekly Practice"
            title="Inside the Practice"
            description="Designers in AI is not only an exhibition platform — it is a living, weekly creative practice. Every week, our community meets to experiment, share process, and push the boundaries of what AI can do as an artistic medium."
          />

          <AnimatedSection className="mt-8 space-y-12">
            {/* Video embed placeholder */}
            <div className="aspect-video bg-secondary border border-border flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border border-muted-foreground/30 flex items-center justify-center hover:bg-muted transition-colors cursor-pointer">
                  <Play size={24} className="text-muted-foreground ml-1" />
                </div>
                <p className="text-sm text-muted-foreground font-body">YouTube Channel — Coming Soon</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-xl text-foreground mb-3">Weekly Meetings</h3>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                  Every week, community members gather virtually to share their latest AI experiments, critique each other's work, and explore new tools and techniques together.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-3">Creative Exchange</h3>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                  Sessions are structured around themes — from prompt engineering to ethical questions, from style exploration to exhibition preparation. Every voice matters.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-3">Learning Process</h3>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                  We learn from each other. Senior practitioners share insights while newcomers bring fresh perspectives. The practice evolves with each session.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-3">Ongoing Experimentation</h3>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                  AI tools change rapidly. Our weekly practice keeps us at the edge — not just following trends, but shaping creative language with new technologies.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </PageLayout>
  );
};

export default WeeklyPractice;
