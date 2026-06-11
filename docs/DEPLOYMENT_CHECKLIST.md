# Deployment Checklist

- Connect the Git repository to Vercel.
- Set all required Vercel Environment Variables.
- Set `MONGODB_URI`.
- Set `MONGODB_DB=impexpro`.
- Set production `AUTH_SECRET`.
- Set production `ADMIN_PASSWORD_HASH`.
- Set Gmail SMTP variables.
- Deploy from Vercel.
- Run `npm run db:indexes` from an environment that can access MongoDB Atlas.
- Confirm `/admin/login` works with the production password.
- Confirm contact form submissions save to MongoDB `submissions`.
- Confirm blog creation writes to MongoDB `blogs`.
- Confirm `/blogs` shows only published posts.

Old local JSON storage is deprecated and not used in production.
