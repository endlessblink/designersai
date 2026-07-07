import { ensureSchema, hasDatabase, sql } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { cmsUnavailable, json, methodNotAllowed, readBody } from "../_lib/http.js";

const toArtist = (row) => ({
  slug: row.slug,
  name: row.name,
  hebrewName: row.hebrew_name,
  title: row.title,
  location: row.location,
  bio: row.bio,
  image: row.image_url,
  links: row.links || [],
  isFounder: row.is_founder,
  isFeatured: row.is_featured,
});

export default async function handler(req, res) {
  if (!hasDatabase()) return cmsUnavailable(res);

  try {
    await ensureSchema();
    const db = sql();

    if (req.method === "GET") {
      const rows = await db`
        select *
        from cms_artist_profiles
        where status = 'published'
        order by is_featured desc, name asc
      `;

      return json(res, 200, { artists: rows.map(toArtist) });
    }

    if (req.method === "POST") {
      requireAdmin(req);
      const artist = await readBody(req);
      const [row] = await db`
        insert into cms_artist_profiles (
          slug, owner_email, name, hebrew_name, title, location, bio, image_url, links, is_founder, is_featured, status
        )
        values (
          ${artist.slug}, ${artist.ownerEmail || null}, ${artist.name}, ${artist.hebrewName || null},
          ${artist.title || "Community Artist"}, ${artist.location || null}, ${artist.bio || ""},
          ${artist.image || null}, ${JSON.stringify(artist.links || [])}::jsonb, ${Boolean(artist.isFounder)},
          ${Boolean(artist.isFeatured)}, 'published'
        )
        on conflict (slug) do update set
          owner_email = excluded.owner_email,
          name = excluded.name,
          hebrew_name = excluded.hebrew_name,
          title = excluded.title,
          location = excluded.location,
          bio = excluded.bio,
          image_url = excluded.image_url,
          links = excluded.links,
          is_founder = excluded.is_founder,
          is_featured = excluded.is_featured,
          updated_at = now()
        returning *
      `;

      return json(res, 200, { artist: toArtist(row) });
    }

    return methodNotAllowed(res);
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message || "Artists API failed" });
  }
}
