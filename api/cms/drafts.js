import { ensureSchema, hasDatabase, sql } from "../_lib/db.js";
import { requireAdmin, requireUser } from "../_lib/auth.js";
import { cmsUnavailable, json, methodNotAllowed, readBody } from "../_lib/http.js";

export default async function handler(req, res) {
  if (!hasDatabase()) return cmsUnavailable(res);

  try {
    await ensureSchema();
    const db = sql();

    if (req.method === "GET") {
      const user = requireUser(req);
      const rows =
        user.role === "admin"
          ? await db`select * from cms_artist_drafts order by created_at desc`
          : await db`select * from cms_artist_drafts where owner_email = ${user.email} order by created_at desc`;

      return json(res, 200, { drafts: rows });
    }

    if (req.method === "POST") {
      const user = requireUser(req);
      const draft = await readBody(req);
      const [row] = await db`
        insert into cms_artist_drafts (
          artist_slug, owner_email, name, hebrew_name, title, location, bio, image_url, links
        )
        values (
          ${draft.artistSlug || null}, ${user.email}, ${draft.name}, ${draft.hebrewName || null},
          ${draft.title || "Community Artist"}, ${draft.location || null}, ${draft.bio || ""},
          ${draft.image || null}, ${JSON.stringify(draft.links || [])}::jsonb
        )
        returning *
      `;

      return json(res, 200, { draft: row });
    }

    if (req.method === "PATCH") {
      requireAdmin(req);
      const { id, status, adminNote } = await readBody(req);
      if (!id || !["approved", "rejected"].includes(status)) return json(res, 400, { error: "Valid id and status are required" });

      const [draft] = await db`
        update cms_artist_drafts
        set status = ${status}, admin_note = ${adminNote || null}, reviewed_at = now()
        where id = ${id}
        returning *
      `;

      if (!draft) return json(res, 404, { error: "Draft not found" });

      if (status === "approved") {
        await db`
          insert into cms_artist_profiles (
            slug, owner_email, name, hebrew_name, title, location, bio, image_url, links, status
          )
          values (
            coalesce(${draft.artist_slug}, lower(regexp_replace(${draft.name}, '[^a-zA-Z0-9]+', '-', 'g'))),
            ${draft.owner_email}, ${draft.name}, ${draft.hebrew_name}, ${draft.title}, ${draft.location},
            ${draft.bio}, ${draft.image_url}, ${JSON.stringify(draft.links || [])}::jsonb, 'published'
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
            updated_at = now()
        `;
      }

      return json(res, 200, { draft });
    }

    return methodNotAllowed(res);
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message || "Drafts API failed" });
  }
}
