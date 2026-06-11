# Deployment

Vercel is the primary production target for this app.

## Vercel Setup

1. Connect the Git repository to Vercel.
2. Set Framework Preset to `Next.js`.
3. Set required Environment Variables.
4. Deploy.

Vercel runs:

```txt
npm install
npm run build
```

The app uses MongoDB Atlas for all runtime data, so no local filesystem storage is required.

## Required Production Environment Variables

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=impexpro
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

## MongoDB Indexes

After configuring `MONGODB_URI` and `MONGODB_DB`, run:

```bash
npm run db:indexes
```

Run this locally with production MongoDB variables, or from any environment that can connect to Atlas.

## Storage

Runtime data is stored in MongoDB Atlas collections:

```txt
blogs
submissions
```

The old local JSON files are removed from active production use.

## Optional cPanel Note

If deploying to cPanel Node.js App instead of Vercel:

```txt
Node version: 20.x
Application startup file: server.js
Run NPM Install
Run JS Script -> build
Restart App
```

The root `server.js` file remains compatible with cPanel, but Vercel does not use it.
