# Impex Alliance Group Website

Next.js App Router website for Impex-Pro with a MongoDB-backed blog CMS, password-only admin login, Gmail SMTP contact notifications, and admin portal replies.

## Quick Start

```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

Create `.env` in the project root before using the app locally. See `docs/ENVIRONMENT_SETUP.md` and `docs/MONGODB_SETUP.md`.

Then run:

```bash
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

## Important Notes

- There is no `.env.example` file.
- `.env` is not generated automatically.
- MongoDB Atlas is required for blogs, contact submissions, and admin reply threads.
- Local JSON storage is removed from the active app workflow.
- Public site details live in `lib/site-config.ts`.
- Admin login is password-only.

## Admin

Go to `/admin/login` and enter the configured admin password.

Generate a password hash:

```bash
npm run hash-password -- "your-password"
```

Paste the generated hash into `ADMIN_PASSWORD_HASH` in `.env` or production environment variables.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run hash-password -- "new-password"
npm run db:indexes
```

## Docs

- `docs/ENVIRONMENT_SETUP.md`
- `docs/MONGODB_SETUP.md`
- `docs/LOCAL_DEVELOPMENT.md`
- `docs/DEPLOYMENT.md`
- `docs/AUTHENTICATION.md`
- `docs/BLOG_SYSTEM.md`
- `docs/FORMS.md`
- `docs/STORAGE.md`
- `docs/TROUBLESHOOTING.md`
