# Deployment

This is a Node-hosted Next.js app. Do not deploy `out/`.

## Build

```bash
npm install
npm run build
npm run start
```

## Production Environment Variables

Set these in cPanel Node.js App Environment Variables or your host's environment panel:

```env
AUTH_SECRET=your-long-random-production-secret
ADMIN_PASSWORD_HASH=bcrypt-hash
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

Restart the app after changing environment variables.

## Data

Runtime data is stored in:

```txt
data/blogs.json
data/submissions.json
```

The app creates missing data files automatically. Make sure the Node.js app user can write to the project folder and back up `data/` before redeploying.

## Public Site Details

Public phone, email, address, WhatsApp, and site URL are configured in `lib/site-config.ts`.
