import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { artists } from "@/data/artists";
import { toast } from "sonner";

const CreatorSubmission = () => {
  const [searchParams] = useSearchParams();
  const selectedArtist = useMemo(
    () => artists.find((artist) => artist.slug === searchParams.get("artist")),
    [searchParams],
  );
  const [formData, setFormData] = useState({
    name: selectedArtist?.name ?? "",
    email: "",
    bio: "",
    portfolio: "",
    imageFolder: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Portfolio: ${formData.portfolio}`,
      `Image folder: ${formData.imageFolder}`,
      "",
      "Short bio:",
      formData.bio,
      "",
      "Notes:",
      formData.notes,
    ].join("\n");

    window.location.href = `mailto:hello@designersinai.com?subject=${encodeURIComponent(`Creator profile materials: ${formData.name}`)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client with the profile materials.");
  };

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <SectionHeading
              label="Creator Materials"
              title="Submit Profile Images"
              description="Send approved images, profile copy, and links for the community artist directory. For now, upload images to Drive, Dropbox, or another folder and paste the share link here."
            />

            <div className="mt-10 space-y-6 border-t border-border pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">Image checklist</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground font-body font-light leading-relaxed">
                  <li>1 portrait or creator image</li>
                  <li>2-4 artwork or process images</li>
                  <li>Images cleared for website use</li>
                  <li>Optional captions and credit notes</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                This keeps publication curated: creators can send materials quickly, and Nataly can approve what appears on the public site.
              </p>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6 border border-border bg-card/70 p-5 md:p-7"
          >
            {[
              { name: "name", label: "Creator name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "portfolio", label: "Website / Instagram / portfolio", type: "url", required: false },
              { name: "imageFolder", label: "Image folder link", type: "url", required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                  {field.label} {field.required && <span className="text-cinematic-violet">*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
                />
              </div>
            ))}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                Short bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                Notes / credit requirements
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
              />
            </div>

            <button type="submit" className="w-full bg-foreground py-4 text-sm tracking-wide text-background transition-opacity hover:opacity-90 font-body">
              Prepare Email Submission
            </button>
          </motion.form>
        </section>
      </div>
    </PageLayout>
  );
};

export default CreatorSubmission;
