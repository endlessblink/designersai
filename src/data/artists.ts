export interface Artist {
  slug: string;
  name: string;
  hebrewName?: string;
  title: string;
  location?: string;
  bio: string;
  image?: string;
  imageFit?: "contain" | "cover";
  links?: {
    label: string;
    href: string;
  }[];
  isFounder?: boolean;
  isFeatured?: boolean;
}

export const artists: Artist[] = [
  {
    slug: "nataly-shafir",
    name: "Nataly Shafir",
    hebrewName: "נטלי שפיר",
    title: "Founder & Artistic Director",
    location: "Israel",
    bio: "Designer, creative director, and cultural organizer building an international platform for AI-driven creative practice.",
    image: "/images/artists/nataly-shafir.png",
    isFounder: true,
    isFeatured: true,
  },
  {
    slug: "sivan-darmon-pritsker",
    name: "Sivan Darmon Pritsker",
    title: "Community Artist",
    bio: "Community artist exploring AI as part of a contemporary visual practice.",
    isFeatured: true,
  },
  {
    slug: "gina-dawidowicz",
    name: "Gina Dawidowicz",
    title: "Community Artist",
    bio: "Community artist working across image-making, experimentation, and AI-assisted creative process.",
    isFeatured: true,
  },
  {
    slug: "maya-elav-nachshon",
    name: "Maya Elav Nachshon",
    title: "Community Artist",
    bio: "Community artist contributing to the network's ongoing exploration of AI as an artistic medium.",
    image: "/images/artists/maya-elav-nachshon.png",
    isFeatured: true,
  },
  {
    slug: "gili-comforty",
    name: "Gili Comforty",
    title: "Community Artist",
    bio: "Community artist developing creative experiments within the Designers with AI practice.",
    isFeatured: true,
  },
  {
    slug: "sharon-mass",
    name: "Sharon Mass",
    title: "Community Artist",
    bio: "Community artist participating in the network's weekly exchange and exhibition culture.",
    isFeatured: true,
  },
  { slug: "gilad-edelstein", name: "Gilad Edelstein", title: "Community Artist", bio: "Community artist exploring emerging AI tools through creative practice." },
  { slug: "mira-feder", name: "Mira Feder", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "elad-baadany-hoogervorst", name: "Elad Baadany Hoogervorst", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "noam-naumovsky", name: "Noam Naumovsky", title: "Community Artist", bio: "Community artist in the Designers with AI network.", image: "/images/artists/noam-naumovsky.jpg", imageFit: "cover", isFeatured: true },
  { slug: "natalie-kaplan", name: "Natalie Kaplan", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "ifat-kariv-gurion", name: "Ifat Kariv Gurion", title: "Community Artist", bio: "Community artist in the Designers with AI network.", image: "/images/artists/ifat-kariv-gurion.png", isFeatured: true },
  { slug: "maya-pinto-koren", name: "Maya Pinto-Koren", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "noa-tamir", name: "Noa Tamir", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "inbal-weisman", name: "Inbal Weisman", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "orit-litmanovitz-shiber", name: "Orit Litmanovitz Shiber", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "moshe-eylon", name: "Moshe Eylon", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "revital-avidar", name: "Revital Avidar", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "daniel-atzil", name: "Daniel Atzil", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "lee-aloni", name: "Lee Aloni", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "yoav-einhar", name: "יואב עינהר", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "karin-besser", name: "Karin Besser", hebrewName: "קארין בסר", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "itai-koronyo", name: "איתי קורוניו", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "ariel-eloya-k", name: "אריל אלויה ק.", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "tali-apel", name: "טלי אפל", title: "Community Artist", bio: "Community artist in the Designers with AI network." },
  { slug: "adi-erlich", name: "Adi Erlich", title: "Community Artist", bio: "Community artist in the Designers with AI network.", image: "/images/artists/adi-erlich.png", isFeatured: true },
  { slug: "miri-pinko", name: "Miri Pinko", title: "Community Lead", bio: "Community lead supporting the Designers with AI network.", image: "/images/artists/miri-pinko.jpg", isFeatured: true },
];

export const orderArtistsWithImagesFirst = (artistList: Artist[]) =>
  [...artistList].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));

export const featuredArtists = orderArtistsWithImagesFirst(artists.filter((artist) => artist.isFeatured));

export const getArtistProfilePath = (slug: string) => `/artists/${slug}`;

export const getArtistImageFitClass = (artist: Artist) => artist.imageFit === "cover" ? "object-cover" : "object-contain";

export const founderSlug = "nataly-shafir";

export const communityLeadSlugs = [
  "maya-elav-nachshon",
  "noam-naumovsky",
  "ifat-kariv-gurion",
  "adi-erlich",
  "miri-pinko",
] as const;

export const isCommunityLead = (slug: string) => communityLeadSlugs.some((leadSlug) => leadSlug === slug);

export const getArtistDisplayTitle = (artist: Artist, locale: "en" | "he" = "en") => {
  if (artist.slug === founderSlug) return locale === "he" ? "מייסדת ומנהלת אמנותית" : "Founder & Artistic Director";
  if (isCommunityLead(artist.slug)) return locale === "he" ? "הובלת הקהילה" : "Community Lead";
  return locale === "he" ? "אמנית בקהילה" : artist.title;
};

const artistAliases: Record<string, string> = {
  "maya elhav nachson": "maya-elav-nachshon",
  "sharom mass": "sharon-mass",
  "noam neomovski": "noam-naumovsky",
  "carin besser": "karin-besser",
};

export const findArtistByName = (name: string) => {
  const normalizedName = name.toLowerCase();
  const aliasSlug = artistAliases[normalizedName];

  return artists.find((artist) => artist.slug === aliasSlug || artist.name.toLowerCase() === normalizedName);
};

export const getArtistInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
