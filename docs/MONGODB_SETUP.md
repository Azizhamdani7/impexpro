# MongoDB Atlas Setup

MongoDB Atlas is required for production on Vercel. Vercel serverless filesystem storage is not persistent, so blogs and contact submissions must use MongoDB.

## 1. Create Atlas Database

In MongoDB Atlas:

1. Create a project and cluster.
2. Create a database user with read/write permissions.
3. Allow network access for Vercel. For a simple Vercel setup, use `0.0.0.0/0`.
4. Copy the connection string.

## 2. Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=impexpro
AUTH_SECRET=your-long-random-secret
ADMIN_PASSWORD_HASH=your-bcrypt-hash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

Use the same values in local `.env` for development.

## 3. Create Indexes

After setting `MONGODB_URI` and `MONGODB_DB`, run:

```bash
npm run db:indexes
```

The script creates:

- `blogs.slug` unique index
- `blogs.status`
- `blogs.publishedAt`
- `submissions.status`
- `submissions.createdAt`

## 4. Collections

The app uses these collections:

```txt
blogs
submissions
```

They are created automatically by MongoDB when the first document is inserted.
