import { neon } from "@neondatabase/serverless";

let sqlClient;

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

export const sql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }

  return sqlClient;
};

export const ensureSchema = async () => {
  const db = sql();

  await db`
    create table if not exists cms_users (
      id uuid primary key default gen_random_uuid(),
      email text unique not null,
      role text not null default 'creator' check (role in ('admin', 'creator')),
      display_name text,
      created_at timestamptz not null default now()
    )
  `;

  await db`
    create table if not exists cms_login_tokens (
      token text primary key,
      email text not null,
      expires_at timestamptz not null,
      used_at timestamptz,
      created_at timestamptz not null default now()
    )
  `;

  await db`
    create table if not exists cms_artist_profiles (
      id uuid primary key default gen_random_uuid(),
      slug text unique not null,
      owner_email text references cms_users(email),
      name text not null,
      hebrew_name text,
      title text not null default 'Community Artist',
      location text,
      bio text not null default '',
      image_url text,
      links jsonb not null default '[]'::jsonb,
      is_founder boolean not null default false,
      is_featured boolean not null default false,
      status text not null default 'published' check (status in ('published', 'hidden')),
      updated_at timestamptz not null default now()
    )
  `;

  await db`
    create table if not exists cms_artist_drafts (
      id uuid primary key default gen_random_uuid(),
      artist_slug text,
      owner_email text not null references cms_users(email),
      name text not null,
      hebrew_name text,
      title text not null default 'Community Artist',
      location text,
      bio text not null default '',
      image_url text,
      links jsonb not null default '[]'::jsonb,
      status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
      admin_note text,
      created_at timestamptz not null default now(),
      reviewed_at timestamptz
    )
  `;
};
