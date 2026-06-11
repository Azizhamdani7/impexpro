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
/admin/blogs/preview/[id]
```

Blog posts are stored in MongoDB Atlas:

```txt
Collection: blogs
```

## Statuses

- `draft`: visible only in admin
- `published`: visible publicly, included in sitemap
- `archived`: hidden publicly and retained in admin

Only published posts appear on `/blogs`, `/blogs/[slug]`, and `sitemap.xml`.

## Draft And Publish Rules

Drafts can be saved before all content and SEO fields are complete.

Before publishing, these fields are required:

- Title
- Slug
- Excerpt
- Content
- Meta title
- Meta description

The admin blog list supports edit, preview, publish, unpublish, archive, restore, and delete actions.

Images can be local `/public` paths or public URLs.
