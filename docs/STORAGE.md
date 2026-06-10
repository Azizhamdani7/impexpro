# Storage

Runtime data is stored in JSON files:

```txt
data/blogs.json
data/submissions.json
```

The files are created automatically by `npm install` or when the app first needs them.

The `data/` folder is not inside `public/`, so visitors cannot download it directly.

Back up `data/` before deployments.

This storage is intended for low-volume CMS and contact form usage. If the site grows heavily, move to a database.
