import { useEffect, useState } from "react";
import { CmsUser, getCurrentUser } from "@/lib/cms";

export const useCmsUser = () => {
  const [user, setUser] = useState<CmsUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getCurrentUser()
      .then((user) => {
        if (mounted) setUser(user);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
};
