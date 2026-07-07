import { clearSessionCookie } from "../_lib/auth.js";
import { json, methodNotAllowed } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  clearSessionCookie(res);
  return json(res, 200, { ok: true });
}
