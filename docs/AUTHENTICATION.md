# Authentication

Admin login is password-only.

Routes:

```txt
/admin/login
/api/auth/login
/api/auth/logout
/api/auth/me
```

Sessions use signed HTTP-only cookies. The app does not use `localStorage` for admin auth.

## Required Variables

```env
AUTH_SECRET=long-random-secret
ADMIN_PASSWORD_HASH=bcrypt-hash
```

Create these in `.env` for local development or in your hosting environment variables for production.

## Generate Password Hash

```bash
npm run hash-password -- "new-secure-password"
```

Copy the generated bcrypt hash into `ADMIN_PASSWORD_HASH`.

Production passwords must be changed before deployment.
