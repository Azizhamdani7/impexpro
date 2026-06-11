# Deployment Checklist

- Connect the Git repository to Vercel.
- Set all required Vercel Environment Variables.
- Set `MONGODB_URI`.
- Set `MONGODB_DB=impexpro`.
- Set production `AUTH_SECRET`.
- Set production `ADMIN_PASSWORD_HASH`.
- Set Gmail SMTP variables.
- Required Vercel variables:

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

- Apply variables to Production and Preview if both environments are used.
- Redeploy after adding or changing environment variables.
- Deploy from Vercel.
- Run `npm run db:indexes` from an environment that can access MongoDB Atlas.
- Confirm `/admin/login` works with the production password.
- Confirm contact form submissions save to MongoDB `submissions`.
- Confirm blog creation writes to MongoDB `blogs`.
- Confirm `/blogs` shows only published posts.

Old local JSON storage is deprecated and not used in production.
