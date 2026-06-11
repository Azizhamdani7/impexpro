# Deployment

This is a Node-hosted Next.js app. Do not deploy `out/`.

## Local Production Check

```bash
npm install
npm run build
npm run start
```

`npm run start` runs the root startup file:

```txt
server.js
```

## cPanel Node.js App Settings

Use these settings in HosterPK/cPanel Node.js App Manager:

```txt
Node version: 20.x
Application startup file: server.js
```

The server reads `process.env.PORT` from cPanel and listens on `0.0.0.0`, which is compatible with cPanel reverse proxy routing.

## cPanel Deployment Sequence

After pulling the latest Git changes in cPanel Git Version Control:

```txt
Run NPM Install
Run JS Script -> build
Restart App
```

Do not set the startup file to `node_modules/...`. cPanel requires the real root file `server.js`.

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
