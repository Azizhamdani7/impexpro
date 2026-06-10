# Blog System

Public routes:

```txt
/blogs
/blogs/[slug]
```

Admin routes:

```txt
/admin/blogs
/admin/blogs/new
/admin/blogs/edit/[id]
```

Blog posts are stored in:

```txt
data/blogs.json
```

Draft posts are visible only in admin. Published posts appear on `/blogs` and in `sitemap.xml`.

Images can be local `/public` paths or public URLs.
