# Deployment Checklist

- Use Node.js 20+.
- Set production variables in the cPanel Node.js App panel, not `.env.local`.
- Run `npm install`.
- Set production `AUTH_SECRET`.
- Set production `ADMIN_PASSWORD_HASH`.
- Optional: set Gmail SMTP variables.
- Run `npm run build`.
- Start with `npm run start` or the cPanel Node.js startup command.
- Confirm `/admin/login` works with the production password.
- Confirm contact form submissions save to `data/submissions.json`.
- Confirm blog creation writes to `data/blogs.json`.
- Back up `data/` before future deployments.

Do not deploy `out/`; this app needs the Next.js server.
