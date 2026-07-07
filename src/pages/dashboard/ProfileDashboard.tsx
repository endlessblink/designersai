import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { submitArtistDraft, uploadCreatorImage } from "@/lib/cms";
import { useCmsUser } from "@/hooks/use-cms-user";
import { toast } from "sonner";

const ProfileDashboard = () => {
  const { user, loading } = useCmsUser();
  const [formData, setFormData] = useState({ name: "", title: "Community Artist", location: "", bio: "", image: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user?.email && !formData.name) {
      setFormData((prev) => ({ ...prev, name: user.email.split("@")[0] }));
    }
  }, [formData.name, user]);

  if (loading) return <PageLayout><div className="container py-32">Loading...</div></PageLayout>;
  if (!user) return <Navigate to="/login" replace />;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await submitArtistDraft(formData);
      toast.success("Profile draft submitted for admin approval.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Draft submission failed");
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const image = await uploadCreatorImage(file);
      setFormData((prev) => ({ ...prev, image }));
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-2xl">
          <SectionHeading
            label="Creator Dashboard"
            title="Submit Profile Updates"
            description="Changes are sent to admins for review before they appear publicly."
          />

          <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-card/70 p-5 md:p-7">
            {[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "title", label: "Title", type: "text", required: true },
              { name: "location", label: "Location", type: "text", required: false },
              { name: "image", label: "Cloudinary image URL", type: "url", required: false },
            ].map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(event) => setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))}
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
                />
              </div>
            ))}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                Upload portrait or artwork
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
              />
              <p className="mt-2 text-xs text-muted-foreground font-body">
                {uploading ? "Uploading..." : "Requires Cloudinary env vars. You can also paste an image URL above."}
              </p>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">Bio</label>
              <textarea
                rows={5}
                value={formData.bio}
                onChange={(event) => setFormData((prev) => ({ ...prev, bio: event.target.value }))}
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
              />
            </div>
            <button className="w-full bg-foreground py-4 text-sm tracking-wide text-background transition-opacity hover:opacity-90 font-body">
              Submit For Review
            </button>
          </form>
        </section>
      </div>
    </PageLayout>
  );
};

export default ProfileDashboard;
