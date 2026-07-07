import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { toast } from "sonner";

const Join = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    email: "",
    portfolio: "",
    aiPractice: "",
    whyJoin: "",
    socialLinks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Full name: ${formData.fullName}`,
      `Country: ${formData.country}`,
      `Email: ${formData.email}`,
      `Portfolio: ${formData.portfolio}`,
      `Social links: ${formData.socialLinks}`,
      "",
      "AI practice:",
      formData.aiPractice,
      "",
      "Why join:",
      formData.whyJoin,
    ].join("\n");

    window.location.href = `mailto:hello@designersinai.com?subject=${encodeURIComponent(`Community application: ${formData.fullName}`)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client with the application.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-2xl">
          <SectionHeading
            label="Join"
            title="Apply to Join Designers with AI"
            description="Designers with AI is an evolving creative network. Membership is curated in order to maintain quality, engagement, and collaborative spirit. We welcome artists and creators who are seriously exploring AI as a creative medium."
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { name: "fullName", label: "Full Name", type: "text", required: true },
              { name: "country", label: "Country", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "portfolio", label: "Portfolio / Website Link", type: "url", required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">
                  {field.label} {field.required && <span className="text-cinematic-violet">*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">
                How do you use AI in your creative practice? <span className="text-cinematic-violet">*</span>
              </label>
              <textarea
                name="aiPractice"
                value={formData.aiPractice}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">
                Why do you want to join? <span className="text-cinematic-violet">*</span>
              </label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">
                Social Links (optional)
              </label>
              <input
                type="text"
                name="socialLinks"
                value={formData.socialLinks}
                onChange={handleChange}
                placeholder="Instagram, LinkedIn, etc."
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-foreground text-background font-body text-sm tracking-wide hover:opacity-90 transition-opacity mt-8"
            >
              Prepare Email Application
            </button>
          </motion.form>
        </section>
      </div>
    </PageLayout>
  );
};

export default Join;
