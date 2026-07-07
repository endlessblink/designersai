import { Artist, artists as fallbackArtists, featuredArtists as fallbackFeaturedArtists } from "@/data/artists";

export interface CmsUser {
  email: string;
  role: "admin" | "creator";
}

export interface ArtistDraft {
  id: string;
  artist_slug?: string;
  owner_email: string;
  name: string;
  hebrew_name?: string;
  title: string;
  location?: string;
  bio: string;
  image_url?: string;
  links?: { label: string; href: string }[];
  status: "pending" | "approved" | "rejected";
  created_at: string;
  admin_note?: string;
}

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

export const getCurrentUser = async () => {
  const data = await request<{ user: CmsUser | null }>("/api/auth/me");
  return data.user;
};

export const requestLogin = async (email: string) =>
  request<{ ok: boolean; emailed: boolean; loginUrl?: string }>("/api/auth/request-login", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const verifyLogin = async (token: string) =>
  request<{ user: CmsUser }>("/api/auth/verify", {
    method: "POST",
    body: JSON.stringify({ token }),
  });

export const logout = async () =>
  request<{ ok: boolean }>("/api/auth/logout", {
    method: "POST",
  });

export const fetchPublishedArtists = async (): Promise<Artist[]> => {
  try {
    const data = await request<{ artists: Artist[] }>("/api/cms/artists");
    return data.artists.length ? data.artists : fallbackArtists;
  } catch {
    return fallbackArtists;
  }
};

export const fetchFeaturedArtists = async (): Promise<Artist[]> => {
  const artists = await fetchPublishedArtists();
  const featured = artists.filter((artist) => artist.isFeatured);
  return featured.length ? featured : fallbackFeaturedArtists;
};

export const submitArtistDraft = async (draft: Partial<Artist> & { artistSlug?: string }) =>
  request<{ draft: ArtistDraft }>("/api/cms/drafts", {
    method: "POST",
    body: JSON.stringify(draft),
  });

export const fetchArtistDrafts = async () => request<{ drafts: ArtistDraft[] }>("/api/cms/drafts");

export const reviewArtistDraft = async (id: string, status: "approved" | "rejected", adminNote?: string) =>
  request<{ draft: ArtistDraft }>("/api/cms/drafts", {
    method: "PATCH",
    body: JSON.stringify({ id, status, adminNote }),
  });

export const savePublishedArtist = async (artist: Partial<Artist> & { slug: string; name: string }) =>
  request<{ artist: Artist }>("/api/cms/artists", {
    method: "POST",
    body: JSON.stringify(artist),
  });

export const uploadCreatorImage = async (file: File) => {
  const config = await request<{ cloudName: string | null; uploadPreset: string | null }>("/api/cloudinary/config");

  if (!config.cloudName || !config.uploadPreset) {
    throw new Error("Cloudinary upload is not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", config.uploadPreset);
  formData.append("folder", "designersai/creator-submissions");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url as string;
};
