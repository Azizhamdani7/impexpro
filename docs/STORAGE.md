# Storage

Runtime data is stored in MongoDB Atlas.

Collections:

```txt
blogs
submissions
```

Local JSON storage is removed from the active app workflow. The app no longer writes to:

```txt
data/blogs.json
data/submissions.json
```

The `data/` folder may still exist locally from older versions, and it remains gitignored, but production must not depend on it.

## Required Variables

```env
MONGODB_URI=
MONGODB_DB=impexpro
```

## Indexes

Run once after configuring MongoDB:

```bash
npm run db:indexes
```

This creates indexes for blog slugs/status/published dates and submission status/created dates.
