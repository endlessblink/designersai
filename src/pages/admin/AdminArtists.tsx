import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { fetchArtistDrafts, reviewArtistDraft, ArtistDraft } from "@/lib/cms";
import { useCmsUser } from "@/hooks/use-cms-user";
import { toast } from "sonner";

const AdminArtists = () => {
  const { user, loading } = useCmsUser();
  const [drafts, setDrafts] = useState<ArtistDraft[]>([]);
  const [error, setError] = useState("");

  const loadDrafts = () => {
    fetchArtistDrafts()
      .then((data) => setDrafts(data.drafts))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    if (user?.role === "admin") loadDrafts();
  }, [user]);

  if (loading) return <PageLayout><div className="container py-32">Loading...</div></PageLayout>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard/profile" replace />;

  const review = async (id: string, status: "approved" | "rejected") => {
    try {
      await reviewArtistDraft(id, status);
      toast.success(`Draft ${status}.`);
      loadDrafts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Review failed");
    }
  };

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24">
          <SectionHeading
            label="Admin"
            title="Artist Submissions"
            description="Review creator profile drafts and publish approved content to the public artist directory."
          />

          {error && (
            <div className="mb-6 border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground font-body">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {drafts.length === 0 && (
              <p className="text-sm text-muted-foreground font-body">No drafts yet, or the CMS backend is not configured.</p>
            )}
            {drafts.map((draft) => (
              <article key={draft.id} className="grid gap-6 border border-border bg-card/70 p-5 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl text-foreground">{draft.name}</h3>
                    <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      {draft.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground font-body">
                    {draft.title} / {draft.owner_email}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm font-body font-light leading-relaxed text-muted-foreground">
                    {draft.bio || "No bio supplied."}
                  </p>
                  {draft.image_url && (
                    <a href={draft.image_url} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-foreground underline">
                      View image
                    </a>
                  )}
                </div>
                <div className="flex gap-2 md:flex-col md:justify-center">
                  <button onClick={() => review(draft.id, "approved")} className="bg-foreground px-4 py-2 text-sm text-background font-body">
                    Approve
                  </button>
                  <button onClick={() => review(draft.id, "rejected")} className="border border-border px-4 py-2 text-sm text-foreground font-body">
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AdminArtists;
