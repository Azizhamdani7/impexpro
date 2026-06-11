# Forms

The contact form posts to:

```txt
/api/contact
```

Every valid submission is saved to:

```txt
data/submissions.json
```

The app stores the original incoming message and any admin portal replies in a local thread on the submission record.

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

If SMTP is not configured, the public contact form still saves the submission locally, but admin portal replies cannot be sent.

Verify SMTP:

```bash
node scripts/verify-smtp.mjs
```

## Admin Replies

Admins can open `/admin/submissions/[id]`, write a reply, and send it through Gmail SMTP.

The portal stores:

- Original inquiry
- Outgoing admin replies sent from the portal
- Timestamps and delivery status

Customer replies to those emails go to the Gmail inbox. They do not automatically appear in the portal unless IMAP or Gmail API sync is added later.
