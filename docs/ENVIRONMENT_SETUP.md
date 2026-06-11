# Environment Setup

Create a file named `.env` in the project root for local development.

Paste and fill:

```env
MONGODB_URI=
MONGODB_DB=impexpro

AUTH_SECRET=replace-with-a-long-random-secret-for-impexpro-cms

# Generate a new hash with:
# node scripts/hash-password.mjs "your-secure-password"
ADMIN_PASSWORD_HASH=

# Gmail SMTP contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=
```

Generate a password hash:

```bash
node scripts/hash-password.mjs "your-password"
```

Paste the generated hash into:

```env
ADMIN_PASSWORD_HASH=
```

Create MongoDB indexes after setting `MONGODB_URI` and `MONGODB_DB`:

```bash
npm run db:indexes
```

Then restart `npm run dev`.

## Notes

- Do not put the plain admin password in `.env`.
- `ADMIN_PASSWORD_HASH` must be a bcrypt hash.
- Gmail requires an App Password for `SMTP_PASS`.
- Local JSON data files are not used anymore.
- Vercel production must have the same required environment variables configured in Project Settings.
