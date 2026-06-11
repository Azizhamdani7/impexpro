# Forms

The contact form posts to:

```txt
/api/contact
```

Every valid submission is saved to MongoDB Atlas:

```txt
Collection: submissions
```

Each submission stores the original incoming message and any admin portal replies in its `thread` array.

## Gmail SMTP

Set these variables to send notification and reply emails:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=receiver@example.com
```

Gmail requires an App Password for `SMTP_PASS`.

If SMTP fails after MongoDB save, the submission remains stored. The API response includes `emailSent: false` and `emailWarning`, and the server logs a safe SMTP error summary.

For Vercel, set these values in Project Settings -> Environment Variables, then redeploy. Do not rely on a local `.env` file in production.

Gmail App Passwords are often displayed with spaces. The app removes spaces automatically before sending, so either format works:

```env
SMTP_PASS=abcd efgh ijkl mnop
SMTP_PASS=abcdefghijklmnop
```

Verify SMTP:

```bash
node scripts/verify-smtp.mjs
```

The verification script signs in and sends a real test email to `CONTACT_RECEIVER_EMAIL`.

## Admin Replies

Admins can open `/admin/submissions/[id]`, write a reply, and send it through Gmail SMTP.

The portal stores:

- Original inquiry
- Outgoing admin replies sent from the portal
- Timestamps and delivery status

Customer replies to those emails go to the Gmail inbox. They do not automatically appear in the portal unless IMAP or Gmail API sync is added later.
