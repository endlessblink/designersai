import { hasDatabase } from "../_lib/db.js";
import { createLoginToken, upsertUserForEmail } from "../_lib/auth.js";
import { cmsUnavailable, json, methodNotAllowed, readBody } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);
  if (!hasDatabase()) return cmsUnavailable(res);

  try {
    const { email } = await readBody(req);
    if (!email || !email.includes("@")) return json(res, 400, { error: "Valid email is required" });

    await upsertUserForEmail(email);
    const token = await createLoginToken(email);
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const loginUrl = `${origin}/login?token=${encodeURIComponent(token)}`;

    if (process.env.RESEND_API_KEY && process.env.AUTH_FROM_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.AUTH_FROM_EMAIL,
          to: email,
          subject: "Your Designers with AI login link",
          html: `<p>Sign in to Designers with AI:</p><p><a href="${loginUrl}">${loginUrl}</a></p>`,
        }),
      });

      return json(res, 200, { ok: true, emailed: true });
    }

    return json(res, 200, { ok: true, emailed: false, loginUrl });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message || "Login request failed" });
  }
}
