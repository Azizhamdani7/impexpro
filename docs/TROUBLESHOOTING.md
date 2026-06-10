# Troubleshooting

## Admin Login Fails

Local password:

```txt
admin123
```

If login shows a config error, run:

```bash
npm run setup
```

Then confirm `.env.local` has:

```env
AUTH_SECRET=...
ADMIN_PASSWORD_HASH=...
```

Restart the dev server after changing env values.

## Change Admin Password

```bash
npm run hash-password -- "new-secure-password"
```

Copy the generated `ADMIN_PASSWORD_HASH=...` line into `.env.local` for local development.

For cPanel production, set `ADMIN_PASSWORD_HASH` in Node.js App Environment Variables to the raw hash value printed by the script, then restart the app.

## Contact Form Saves But Email Does Not Arrive

Set SMTP variables in `.env.local` or production env, then run:

```bash
node scripts/verify-smtp.mjs
```

## Missing Data Files

Run:

```bash
npm run setup
```

This recreates missing `data/blogs.json` and `data/submissions.json` without overwriting existing files.

## Production Env Confusion

On cPanel/production, use the Node.js App Environment Variables panel. The setup script skips `.env.local` creation when `NODE_ENV=production`.
