# Deployment

This is a Node-hosted Next.js app. Do not deploy `out/`.

## Build

```bash
npm install
npm run build
npm run start
```

When `NODE_ENV=production`, setup does not create `.env.local`. Use the cPanel Node.js App Environment Variables panel or your host's environment-variable settings.

## Required Production Env

```env
AUTH_SECRET=your-long-random-production-secret
ADMIN_PASSWORD_HASH=\$2b\$12\$...
```

Optional SMTP email delivery:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

Generate the admin password hash:

```bash
npm run hash-password -- "your-secure-password"
```

For cPanel, set `ADMIN_PASSWORD_HASH` in the Node.js App Environment Variables panel to the raw hash value printed by the script, then restart the app.

## Data

The app writes runtime data here:

```txt
data/blogs.json
data/submissions.json
```

Make sure the Node.js app user can write to the project folder. Back up `data/` before redeploying.

The setup script still creates missing `data/` JSON files in production.

## Public Site Details

Public phone, email, address, WhatsApp, and site URL are configured in:

```txt
lib/site-config.ts
```
