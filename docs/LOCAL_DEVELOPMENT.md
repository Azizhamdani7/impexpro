# Local Development

## Start

```bash
npm install
```

Create `.env` using `docs/ENVIRONMENT_SETUP.md`, then run:

```bash
npm run dev
```

## Admin Login

Admin login is password-only. Use the password that matches `ADMIN_PASSWORD_HASH`.

To change it:

```bash
npm run hash-password -- "new-secure-password"
```

Paste the generated hash into `.env`, then restart the dev server.

## Data Files

The app creates these automatically when needed:

```txt
data/blogs.json
data/submissions.json
```

No manual JSON file creation is required.

## Public Contact Details

Edit `lib/site-config.ts` for the site URL, phone number, WhatsApp link, public email, and address.
