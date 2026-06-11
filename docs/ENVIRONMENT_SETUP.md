# Environment Setup

Create a file named `.env` in the project root for local development.

Start from the template:

```bash
cp .env.example .env
```

Then fill these values:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=impexpro

AUTH_SECRET=replace-with-a-long-random-secret

# Generate a new hash with:
# npm run hash-password -- "your-secure-password"
ADMIN_PASSWORD_HASH=

# Gmail SMTP contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

Generate a password hash:

```bash
npm run hash-password -- "your-password"
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
- Gmail requires an App Password for `SMTP_PASS`, not your normal Gmail password.
- Spaces in Gmail App Passwords are accepted by the app.
- Local JSON data files are not used anymore.
- Vercel production must have the same required environment variables configured in Project Settings.
