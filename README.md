# Impex Alliance Group Website

Next.js App Router website with a small file-based Blog CMS, password-only admin login, and a Gmail SMTP contact form.

## Quick Start

```bash
git clone <repo-url>
cd impexpro_services_updated
npm install
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

`npm install` runs first-time setup automatically. In local development it creates `.env.local`, `data/blogs.json`, and `data/submissions.json` if they are missing.

## Local Admin

Go to `/admin/login`.

```txt
Password: admin123
```

The login is password-only. There is no admin email.

## Important Files

- Public site/contact details: `lib/site-config.ts`
- Runtime env template: `.env.example`
- Blog data: `data/blogs.json`
- Contact submissions: `data/submissions.json`
- First-run setup: `scripts/setup.mjs`

## Repository Structure

After cloning or downloading the ZIP, the folder you open should contain the project files directly:

```txt
project-folder/
├── app/
├── components/
├── lib/
├── public/
├── scripts/
├── docs/
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

There should not be another nested project folder inside the repo root.

## Environment

Local development works without editing env files.

For production, set at least:

```env
AUTH_SECRET=your-long-random-production-secret
ADMIN_PASSWORD_HASH=\$2b\$12\$...
```

Generate a new admin password hash:

```bash
npm run hash-password -- "your-secure-password"
```

For local development, copy the generated `ADMIN_PASSWORD_HASH=...` line into `.env.local`.

For cPanel production, create/update the `ADMIN_PASSWORD_HASH` variable in the Node.js App panel using the raw hash value printed by the script, then restart the app.

To enable contact email delivery, also set:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

Contact submissions are still saved locally if SMTP is not configured.

On production/cPanel, set environment variables in the Node.js App panel. The setup script detects production and does not create `.env.local`.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run setup
npm run hash-password -- "new-password"
```

## More Docs

- `docs/LOCAL_DEVELOPMENT.md`
- `docs/DEPLOYMENT.md`
- `docs/AUTHENTICATION.md`
- `docs/BLOG_SYSTEM.md`
- `docs/FORMS.md`
- `docs/STORAGE.md`
- `docs/TROUBLESHOOTING.md`
