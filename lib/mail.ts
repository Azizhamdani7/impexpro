import nodemailer from "nodemailer";
import type { ContactSubmission } from "@/lib/submissions";
import { site } from "@/lib/site";

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function escapeHtml(value: string | undefined) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanText(value: string | undefined, fallback = "-") {
  return String(value || "").trim() || fallback;
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function formatSubmittedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(date);
}

function labelValue(label: string, value: string | undefined) {
  return `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:12px;line-height:18px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#0b203d;font-size:15px;line-height:22px;font-weight:700;text-align:right;">${escapeHtml(cleanText(value))}</td>
    </tr>
  `;
}

function detailPill(label: string, value: string | undefined) {
  return `
    <td style="width:50%;padding:0 8px 12px 0;vertical-align:top;">
      <div style="border:1px solid #e8edf4;border-radius:14px;background:#ffffff;padding:14px 16px;">
        <div style="color:#9ca3af;font-size:11px;line-height:16px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">${escapeHtml(label)}</div>
        <div style="color:#0b203d;font-size:15px;line-height:22px;font-weight:700;margin-top:4px;">${escapeHtml(cleanText(value))}</div>
      </div>
    </td>
  `;
}

function sectionTitle(title: string, eyebrow?: string) {
  return `
    <div style="margin:0 0 14px;">
      ${
        eyebrow
          ? `<div style="color:#d4a73f;font-size:11px;line-height:16px;text-transform:uppercase;letter-spacing:2px;font-weight:800;margin-bottom:4px;">${escapeHtml(eyebrow)}</div>`
          : ""
      }
      <h2 style="margin:0;color:#0b203d;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:700;">${escapeHtml(title)}</h2>
    </div>
  `;
}

function createSubject(submission: ContactSubmission) {
  const name = cleanHeader(cleanText(submission.name, ""));
  const service = cleanHeader(cleanText(submission.service, ""));

  if (name && service) return `New Impex-Pro Inquiry from ${name} - ${service}`;
  if (name) return `New Impex-Pro Inquiry from ${name}`;
  return "New Impex-Pro Contact Inquiry";
}

function createPlainTextEmail(submission: ContactSubmission) {
  const lines = [
    "New Impex-Pro Contact Inquiry",
    "",
    "Inquiry Summary",
    `Form type: ${cleanText(submission.type)}`,
    `Submitted: ${formatSubmittedAt(submission.createdAt)}`,
    `Source page: ${cleanText(submission.sourcePage)}`,
    "",
    "Contact Details",
    `Name: ${cleanText(submission.name)}`,
    `Email: ${cleanText(submission.email)}`,
    `Phone: ${cleanText(submission.phone)}`,
    `Company: ${cleanText(submission.company)}`,
    "",
    "Service Details",
    `Service: ${cleanText(submission.service)}`,
    `Trade: ${cleanText(submission.trade)}`,
    "",
    "Message",
    cleanText(submission.message, ""),
    "",
    "Technical Details",
    `Submission ID: ${submission.id}`,
    `User agent: ${cleanText(submission.userAgent)}`,
    "",
    "This notification was generated automatically by the Impex-Pro website."
  ];

  return lines.join("\n");
}

function createHtmlEmail(submission: ContactSubmission) {
  const submittedAt = formatSubmittedAt(submission.createdAt);
  const preview = `${cleanText(submission.name)} submitted a new ${cleanText(submission.service, "contact")} inquiry.`;

  return `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Impex-Pro Contact Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#eef2f7;color:#0b203d;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;margin:0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:680px;margin:0 auto;">
            <tr>
              <td style="padding:0 0 18px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b203d;border-radius:22px 22px 0 0;border-collapse:separate;overflow:hidden;">
                  <tr>
                    <td style="padding:30px 30px 24px;background:#0b203d;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align:middle;">
                            <div style="color:#d4a73f;font-size:12px;line-height:18px;text-transform:uppercase;letter-spacing:3px;font-weight:800;">Impex-Pro Website</div>
                            <h1 style="margin:8px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:40px;font-weight:700;">Contact Inquiry</h1>
                          </td>
                          <td align="right" style="vertical-align:middle;">
                            <div style="display:inline-block;background:#ffffff;border-radius:999px;padding:12px 14px;color:#0b203d;font-size:17px;line-height:20px;font-weight:800;letter-spacing:1px;">IP</div>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:18px 0 0;color:#c8d2df;font-size:15px;line-height:24px;">A new website inquiry has been received and saved in the Impex-Pro CMS.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:#ffffff;border-radius:18px;padding:24px 26px;border:1px solid #e2e8f0;box-shadow:0 12px 30px rgba(11,32,61,0.08);">
                ${sectionTitle("Inquiry Summary", "New Lead")}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${labelValue("Form type", submission.type)}
                  ${labelValue("Submitted", submittedAt)}
                  ${labelValue("Source page", submission.sourcePage)}
                </table>
              </td>
            </tr>

            <tr><td style="height:16px;line-height:16px;">&nbsp;</td></tr>

            <tr>
              <td style="background:#f8fafc;border-radius:18px;padding:24px 18px 12px 26px;border:1px solid #e2e8f0;">
                ${sectionTitle("Contact Details")}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    ${detailPill("Name", submission.name)}
                    ${detailPill("Email", submission.email)}
                  </tr>
                  <tr>
                    ${detailPill("Phone", submission.phone)}
                    ${detailPill("Company", submission.company)}
                  </tr>
                </table>
              </td>
            </tr>

            <tr><td style="height:16px;line-height:16px;">&nbsp;</td></tr>

            <tr>
              <td style="background:#ffffff;border-radius:18px;padding:24px 18px 12px 26px;border:1px solid #e2e8f0;">
                ${sectionTitle("Service Details")}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    ${detailPill("Service", submission.service)}
                    ${detailPill("Trade", submission.trade)}
                  </tr>
                </table>
              </td>
            </tr>

            <tr><td style="height:16px;line-height:16px;">&nbsp;</td></tr>

            <tr>
              <td style="background:#ffffff;border-radius:18px;padding:24px 26px;border:1px solid #e2e8f0;">
                ${sectionTitle("Message")}
                <div style="background:#f8fafc;border-left:4px solid #d4a73f;border-radius:12px;padding:18px 20px;color:#263449;font-size:16px;line-height:26px;white-space:pre-wrap;">${escapeHtml(
                  cleanText(submission.message, "")
                )}</div>
              </td>
            </tr>

            <tr><td style="height:16px;line-height:16px;">&nbsp;</td></tr>

            <tr>
              <td style="background:#ffffff;border-radius:18px;padding:20px 26px;border:1px solid #e2e8f0;">
                <div style="color:#9ca3af;font-size:11px;line-height:16px;text-transform:uppercase;letter-spacing:2px;font-weight:800;margin-bottom:10px;">Technical Details</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${labelValue("Submission ID", submission.id)}
                  ${labelValue("User agent", submission.userAgent)}
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 18px 8px;color:#6b7280;font-size:13px;line-height:21px;">
                <strong style="color:#0b203d;">${escapeHtml(site.brand)}</strong><br />
                Website inquiry notification<br />
                Generated automatically by the Impex-Pro website.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

export async function sendContactEmail(submission: ContactSubmission) {
  if (!smtpConfigured()) {
    console.warn("[contact-email] SMTP is not configured. Submission saved without email delivery.");
    return { sent: false, reason: "SMTP is not configured." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;
  const subject = createSubject(submission);

  await transporter.sendMail({
    from: `"Impex-Pro Website" <${process.env.SMTP_USER}>`,
    to: receiver,
    replyTo: submission.email,
    subject,
    text: createPlainTextEmail(submission),
    html: createHtmlEmail(submission)
  });

  return { sent: true };
}
