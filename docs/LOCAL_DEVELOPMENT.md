# Local Development

## Start

```bash
npm install
cp .env.example .env
```

Fill `.env` using `docs/ENVIRONMENT_SETUP.md`, then run:

```bash
npm run dev
```

Local development uses MongoDB Atlas too. There is no local JSON storage fallback.

## Admin Login

Admin login is password-only. Use the password that matches `ADMIN_PASSWORD_HASH`.

To change it:

```bash
npm run hash-password -- "new-secure-password"
```

Paste the generated hash into `.env`, then restart the dev server.

## Required Local Variables

```env
MONGODB_URI=
MONGODB_DB=impexpro
AUTH_SECRET=
ADMIN_PASSWORD_HASH=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=
```

## MongoDB

Set:

```env
MONGODB_URI=
MONGODB_DB=impexpro
```

Then run:

```bash
npm run db:indexes
```

## Public Contact Details

Edit `lib/site-config.ts` for the site URL, phone number, WhatsApp link, public email, and address.
