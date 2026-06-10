# Authentication

Admin login is password-only.

Routes:

```txt
/admin/login
/api/auth/login
/api/auth/logout
/api/auth/me
```

Sessions use signed HTTP-only cookies. No `localStorage` is used.

## Local Password

```txt
admin123
```

## Required Env

```env
AUTH_SECRET=long-random-secret
ADMIN_PASSWORD_HASH=\$2b\$12\$...
```

`.env.local` is created automatically from `.env.example` during `npm install`.

## Change Admin Password

```bash
npm run hash-password -- "new-secure-password"
```

For local development, copy the generated `ADMIN_PASSWORD_HASH=...` line into `.env.local`.

For cPanel production, set `ADMIN_PASSWORD_HASH` in Node.js App Environment Variables to the raw hash value printed by the script, then restart the app.

For production, always change both `AUTH_SECRET` and `ADMIN_PASSWORD_HASH`.
