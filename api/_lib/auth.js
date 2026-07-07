import crypto from "node:crypto";
import { sql, ensureSchema } from "./db.js";

const SESSION_COOKIE = "designersai_session";
const DAY = 60 * 60 * 24;

const getSecret = () => process.env.AUTH_SECRET || process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "local-dev-secret";

const base64url = (value) => Buffer.from(value).toString("base64url");

const sign = (payload) => crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");

export const createSession = (user) => {
  const payload = base64url(JSON.stringify({ email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + DAY * 14 }));
  return `${payload}.${sign(payload)}`;
};

export const setSessionCookie = (res, token) => {
  const secure = process.env.VERCEL ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=${DAY * 14}`,
  );
};

export const clearSessionCookie = (res) => {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);
};

export const getSession = (req) => {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  if (!match) return null;

  const [payload, signature] = match[1].split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
};

export const requireUser = (req) => {
  const session = getSession(req);
  if (!session?.email) {
    const error = new Error("Authentication required");
    error.statusCode = 401;
    throw error;
  }

  return session;
};

export const requireAdmin = (req) => {
  const session = requireUser(req);
  if (session.role !== "admin") {
    const error = new Error("Admin access required");
    error.statusCode = 403;
    throw error;
  }

  return session;
};

export const upsertUserForEmail = async (email) => {
  await ensureSchema();
  const db = sql();
  const firstAdminEmail = process.env.FIRST_ADMIN_EMAIL?.toLowerCase();
  const normalizedEmail = email.toLowerCase();
  const role = firstAdminEmail && normalizedEmail === firstAdminEmail ? "admin" : "creator";

  const [user] = await db`
    insert into cms_users (email, role)
    values (${normalizedEmail}, ${role})
    on conflict (email) do update set email = excluded.email
    returning id, email, role, display_name
  `;

  return user;
};

export const createLoginToken = async (email) => {
  await ensureSchema();
  const db = sql();
  const token = crypto.randomBytes(32).toString("base64url");

  await db`
    insert into cms_login_tokens (token, email, expires_at)
    values (${token}, ${email.toLowerCase()}, now() + interval '15 minutes')
  `;

  return token;
};

export const consumeLoginToken = async (token) => {
  await ensureSchema();
  const db = sql();
  const [row] = await db`
    update cms_login_tokens
    set used_at = now()
    where token = ${token}
      and used_at is null
      and expires_at > now()
    returning email
  `;

  if (!row) return null;
  return upsertUserForEmail(row.email);
};
