# Forms

The contact form posts to:

```txt
/api/contact
```

Every valid submission is saved to:

```txt
data/submissions.json
```

Email delivery is optional. To enable Gmail SMTP:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

If SMTP is not configured, the form still succeeds and saves the submission locally.

Verify SMTP:

```bash
node scripts/verify-smtp.mjs
```
