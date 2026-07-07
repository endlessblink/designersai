import { ensureSchema, hasDatabase } from "../_lib/db.js";
import { cmsUnavailable, json, methodNotAllowed } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  if (!hasDatabase()) return cmsUnavailable(res);
  if (!process.env.CMS_SETUP_TOKEN || req.headers.authorization !== `Bearer ${process.env.CMS_SETUP_TOKEN}`) {
    return json(res, 403, { error: "CMS setup token required" });
  }

  await ensureSchema();
  return json(res, 200, { ok: true });
}
