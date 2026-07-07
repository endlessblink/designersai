import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { requestLogin, verifyLogin } from "@/lib/cms";
import { toast } from "sonner";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    setLoading(true);
    verifyLogin(token)
      .then(({ user }) => {
        toast.success("You are signed in.");
        navigate(user.role === "admin" ? "/admin/artists" : "/dashboard/profile", { replace: true });
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [navigate, searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setLoginUrl("");

    try {
      const result = await requestLogin(email);
      if (result.emailed) {
        toast.success("Check your email for a login link.");
      } else if (result.loginUrl) {
        setLoginUrl(result.loginUrl);
        toast.success("CMS email is not configured yet. Use the setup login link below.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="pt-24 md:pt-32">
        <section className="container py-16 md:py-24 max-w-xl">
          <SectionHeading
            label="CMS Login"
            title="Sign in to manage your profile"
            description="Creators and admins use a private login link. Public visitors do not need an account."
          />

          <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-card/70 p-5 md:p-7">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none font-body"
              />
            </div>
            <button disabled={loading} className="w-full bg-foreground py-4 text-sm tracking-wide text-background transition-opacity hover:opacity-90 disabled:opacity-50 font-body">
              {loading ? "Sending..." : "Send Login Link"}
            </button>
          </form>

          {loginUrl && (
            <div className="mt-6 border border-cinematic-violet/30 bg-cinematic-violet-soft/20 p-4">
              <p className="text-sm text-muted-foreground font-body">
                Temporary setup link:
              </p>
              <Link to={loginUrl.replace(window.location.origin, "")} className="mt-2 block break-all text-sm text-foreground underline">
                {loginUrl}
              </Link>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default Login;
