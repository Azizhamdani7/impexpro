# Local Development

## Start

```bash
npm install
npm run dev
```

That is all.

The setup script runs during `npm install` and creates missing local files:

```txt
.env.local
data/blogs.json
data/submissions.json
```

This `.env.local` auto-creation is for local development only.

## Admin Login

Open `/admin/login`.

```txt
Password: admin123
```

Change the local admin password:

```bash
npm run hash-password -- "new-secure-password"
```

Copy the generated `ADMIN_PASSWORD_HASH=...` line into `.env.local`, then restart `npm run dev`.

## Change Public Contact Details

Edit:

```txt
lib/site-config.ts
```

This is where the site URL, phone number, WhatsApp link, public email, and address live.

## Useful Commands

```bash
npm run setup
npm run lint
npm run build
npm run hash-password -- "new-password"
```
