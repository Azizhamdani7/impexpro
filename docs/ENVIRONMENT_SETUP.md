# Environment Setup

Step 1:

Create a file named:

```txt
.env
```

in the project root.

Step 2:

Paste:

```env
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

Step 3:

Generate a password hash:

```bash
node scripts/hash-password.mjs "your-password"
```

Step 4:

Paste the generated hash into:

```env
ADMIN_PASSWORD_HASH=
```

Then restart `npm run dev`.

## Notes

- Do not put the plain admin password in `.env`.
- `ADMIN_PASSWORD_HASH` must be a bcrypt hash.
- Gmail requires an App Password for `SMTP_PASS`.
- Data files are created automatically; do not manually create `data/blogs.json` or `data/submissions.json`.
