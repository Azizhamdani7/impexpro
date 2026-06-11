# Troubleshooting

## MongoDB Config Error

If contact forms, blogs, or admin submissions return a server error, confirm these variables exist in `.env` locally and in Vercel Environment Variables:

```env
MONGODB_URI=...
MONGODB_DB=impexpro
```

Then run:

```bash
npm run db:indexes
```

## Admin Login Shows A Config Error

Set:

```env
AUTH_SECRET=...
ADMIN_PASSWORD_HASH=...
```

Generate a hash:

```bash
npm run hash-password -- "new-secure-password"
```

Restart the dev server or redeploy after changing env values.

## Wrong Admin Password

The login page returns `Invalid password`. Generate a new hash, update `ADMIN_PASSWORD_HASH`, and restart the app.

## Contact Form Saves But Email Does Not Arrive

Set SMTP variables in `.env` or Vercel Environment Variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

Then run:

```bash
node scripts/verify-smtp.mjs
```

## Admin Reply Cannot Be Sent

Portal replies require SMTP. If SMTP is missing or invalid, the reply is not saved as sent.

Customer replies to sent emails go to Gmail and are not synced back into the portal.

## Draft Blog Does Not Appear Publicly

This is expected. Only `published` blogs appear on public routes and in the sitemap.

## Old data Folder

The old `data/` JSON storage is deprecated. If a local `data/` folder exists, the app ignores it.
