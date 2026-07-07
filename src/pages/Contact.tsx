import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    window.location.href = `mailto:hello@designersinai.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client with the message.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-2xl">
          <SectionHeading
            label="Contact"
            title="Get in Touch"
            description="For general inquiries, collaboration proposals, or press requests."
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">Email</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">Subject</label>
              <input
                type="text" name="subject" value={formData.subject} onChange={handleChange} required
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body block mb-2">Message</label>
              <textarea
                name="message" value={formData.message} onChange={handleChange} required rows={5}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-foreground text-background font-body text-sm tracking-wide hover:opacity-90 transition-opacity">
              Prepare Email
            </button>
          </motion.form>

          <div className="mt-16 pt-10 border-t border-border space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body mb-1">Email</p>
              <p className="text-sm font-body text-foreground">hello@designersinai.com</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body mb-1">Social</p>
              <div className="flex gap-4">
                <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
                <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Contact;
