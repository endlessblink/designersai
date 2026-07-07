# Custom CMS Setup

This project now includes a custom CMS foundation built on Vercel functions, Neon Postgres, and Cloudinary.

## Required Services

1. Create a Neon project and copy the pooled `DATABASE_URL`.
2. Create a Cloudinary upload preset for creator image uploads.
3. Add the environment variables from `.env.example` to Vercel.

## Environment Variables

- `DATABASE_URL`: Neon Postgres connection string.
- `AUTH_SECRET`: random long string used to sign login sessions.
- `CMS_SETUP_TOKEN`: private bearer token for schema bootstrap.
- `FIRST_ADMIN_EMAIL`: email address that should become the first admin.
- `RESEND_API_KEY`: optional; sends real login emails through Resend.
- `AUTH_FROM_EMAIL`: optional; required with `RESEND_API_KEY`.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name.
- `CLOUDINARY_UPLOAD_PRESET`: unsigned upload preset for creator image submissions.

## Bootstrap

After deploying with env vars, initialize the database schema:

```sh
curl -X POST https://designersai.vercel.app/api/cms/bootstrap \
  -H "Authorization: Bearer $CMS_SETUP_TOKEN"
```

Then visit `/login` and enter the `FIRST_ADMIN_EMAIL`. If Resend is not configured yet, the login API returns a temporary setup link in the browser.

## Current CMS Scope

- Creators can log in and submit profile drafts.
- Creators can upload images when Cloudinary is configured.
- Admins can approve or reject artist profile drafts.
- Published CMS artists replace static artist data on public pages.
- Static artist data remains as a safe fallback when the CMS is not configured.
