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

Blog posts are stored in:

```txt
data/blogs.json
```

## Statuses

- `draft`: visible only in admin
- `published`: visible publicly, included in sitemap

Drafts do not appear on `/blogs`, `/blogs/[slug]`, or `sitemap.xml`.

## Draft And Publish Rules

Drafts can be saved before all content and SEO fields are complete.

Before publishing, these fields are required:

- Title
- Slug
- Excerpt
- Content
- Meta title
- Meta description

The admin blog list supports edit, preview, publish, unpublish, and delete actions.

Images can be local `/public` paths or public URLs.
