import { consumeLoginToken, createSession, setSessionCookie } from "../_lib/auth.js";
import { hasDatabase } from "../_lib/db.js";
import { cmsUnavailable, json, methodNotAllowed, readBody } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  if (!hasDatabase()) return cmsUnavailable(res);

  try {
    const { token } = await readBody(req);
    if (!token) return json(res, 400, { error: "Token is required" });

    const user = await consumeLoginToken(token);
    if (!user) return json(res, 401, { error: "Invalid or expired login link" });

    setSessionCookie(res, createSession(user));
    return json(res, 200, { user });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message || "Verification failed" });
  }
}
