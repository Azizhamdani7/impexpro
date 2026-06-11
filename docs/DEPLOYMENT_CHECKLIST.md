# Deployment Checklist

- Use Node.js 20+.
- Set Application startup file to `server.js`.
- Set production variables in `.env` or in the cPanel Node.js App panel.
- Set production `AUTH_SECRET`.
- Set production `ADMIN_PASSWORD_HASH`.
- Optional: set Gmail SMTP variables.
- Run NPM Install.
- Run JS Script -> `build`.
- Restart App.
- If cPanel previously failed with a TypeScript/WebAssembly out-of-memory error, pull the latest Git changes and run NPM Install again before building.
- Confirm `/admin/login` works with the production password.
- Confirm contact form submissions save to `data/submissions.json`.
- Confirm blog creation writes to `data/blogs.json`.
- Back up `data/` before future deployments.

Do not deploy `out/`; this app needs the Next.js server.
