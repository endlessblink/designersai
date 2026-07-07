import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";

interface AdminPlaceholderProps {
  title: string;
}

const AdminPlaceholder = ({ title }: AdminPlaceholderProps) => (
  <PageLayout>
    <div className="pt-24 md:pt-32">
      <section className="container py-16 md:py-24 max-w-2xl">
        <SectionHeading
          label="Admin"
          title={title}
          description="This CMS section is reserved for the next implementation slice. Artist submissions and approval are the first working admin workflow."
        />
        <Link to="/admin/artists" className="inline-flex bg-foreground px-6 py-3 text-sm text-background font-body">
          Review artist submissions
        </Link>
      </section>
    </div>
  </PageLayout>
);

export default AdminPlaceholder;
