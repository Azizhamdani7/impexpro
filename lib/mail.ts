import nodemailer from "nodemailer";
import type { ContactSubmission } from "@/lib/submissions";
import { site } from "@/lib/site";

type SmtpConfig =
  | {
      ok: true;
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
      receiver: string;
    }
  | {
      ok: false;
      reason: string;
    };

function readEnv(name: string) {
  return (process.env[name] || "").trim();
}

function normalizeSmtpPassword(value: string) {
  return value.replace(/\s+/g, "");
}

function getSmtpConfig(): SmtpConfig {
  const host = readEnv("SMTP_HOST") || "smtp.gmail.com";
  const port = Number(readEnv("SMTP_PORT") || 465);
  const user = readEnv("SMTP_USER");
  const pass = normalizeSmtpPassword(readEnv("SMTP_PASS"));
  const receiver = readEnv("CONTACT_RECEIVER_EMAIL") || user;
  const missing = [
    ["SMTP_USER", user],
    ["SMTP_PASS", pass],
    ["CONTACT_RECEIVER_EMAIL", receiver]
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    return {
      ok: false,
      reason: `Missing SMTP environment variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}.`
    };
  }

  if (!Number.isFinite(port)) {
    return { ok: false, reason: "SMTP_PORT must be a valid number." };
  }

  return {
    ok: true,
    host,
    port,
    secure: port === 465,
    user,
    pass,
    receiver
  };
}

function formatMailError(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: "Unknown SMTP delivery error." };
  }

  const details = error as Error & {
    code?: string;
    command?: string;
    responseCode?: number;
    response?: string;
  };

  return {
    name: details.name,
    message: details.message,
    code: details.code,
    command: details.command,
    responseCode: details.responseCode,
    response: details.response
  };
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

function createSmtpTransporter(config: Extract<SmtpConfig, { ok: true }>) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000
  });
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
    `Form type: ${cleanText(submission.formType)}`,
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
                  ${labelValue("Form type", submission.formType)}
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
  const config = getSmtpConfig();

  if (!config.ok) {
    console.warn(`[contact-email] ${config.reason} Submission saved without email delivery.`);
    return { sent: false, reason: config.reason };
  }

  const transporter = createSmtpTransporter(config);
  const subject = createSubject(submission);

  try {
    const result = await transporter.sendMail({
      from: `"Impex-Pro Website" <${config.user}>`,
      to: config.receiver,
      replyTo: submission.email,
      subject,
      text: createPlainTextEmail(submission),
      html: createHtmlEmail(submission)
    });

    return { sent: true, messageId: result.messageId };
  } catch (error) {
    console.error("[contact-email] SMTP delivery failed.", formatMailError(error));
    return {
      sent: false,
      reason: "SMTP delivery failed. Check Vercel SMTP environment variables and Gmail App Password."
    };
  }
}

function createReplyPlainTextEmail(
  submission: ContactSubmission,
  reply: { subject: string; body: string }
) {
  return [
    cleanText(reply.body, ""),
    "",
    "--",
    "Impex-Pro Business Consultant",
    site.url,
    "",
    "Original inquiry summary",
    `Name: ${cleanText(submission.name)}`,
    `Email: ${cleanText(submission.email)}`,
    `Service: ${cleanText(submission.service)}`,
    `Submitted: ${formatSubmittedAt(submission.createdAt)}`,
    "",
    cleanText(submission.message, "")
  ].join("\n");
}

function createReplyHtmlEmail(
  submission: ContactSubmission,
  reply: { subject: string; body: string }
) {
  const preview = `Impex-Pro replied to your inquiry: ${cleanText(reply.subject)}`;

  return `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(cleanText(reply.subject, "Impex-Pro Reply"))}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef2f7;color:#0b203d;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;margin:0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:680px;margin:0 auto;">
            <tr>
              <td style="background:#0b203d;border-radius:22px 22px 0 0;padding:30px;">
                <div style="color:#d4a73f;font-size:12px;line-height:18px;text-transform:uppercase;letter-spacing:3px;font-weight:800;">Impex-Pro Business Consultant</div>
                <h1 style="margin:8px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:40px;font-weight:700;">Inquiry Response</h1>
                <p style="margin:16px 0 0;color:#c8d2df;font-size:15px;line-height:24px;">Thank you for contacting Impex-Pro. Our team has replied to your website inquiry.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border-radius:0 0 18px 18px;padding:28px 30px;border:1px solid #e2e8f0;border-top:0;box-shadow:0 12px 30px rgba(11,32,61,0.08);">
                <h2 style="margin:0 0 16px;color:#0b203d;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:32px;">${escapeHtml(cleanText(reply.subject, "Impex-Pro Reply"))}</h2>
                <div style="background:#f8fafc;border-left:4px solid #d4a73f;border-radius:12px;padding:18px 20px;color:#263449;font-size:16px;line-height:27px;white-space:pre-wrap;">${escapeHtml(cleanText(reply.body, ""))}</div>
              </td>
            </tr>
            <tr><td style="height:16px;line-height:16px;">&nbsp;</td></tr>
            <tr>
              <td style="background:#ffffff;border-radius:18px;padding:22px 26px;border:1px solid #e2e8f0;">
                <div style="color:#d4a73f;font-size:11px;line-height:16px;text-transform:uppercase;letter-spacing:2px;font-weight:800;margin-bottom:10px;">Original Inquiry</div>
                <p style="margin:0 0 12px;color:#0b203d;font-size:15px;line-height:24px;"><strong>${escapeHtml(cleanText(submission.name))}</strong> asked about <strong>${escapeHtml(cleanText(submission.service, "general services"))}</strong>.</p>
                <div style="background:#f8fafc;border-radius:12px;padding:16px 18px;color:#4b5563;font-size:14px;line-height:23px;white-space:pre-wrap;">${escapeHtml(cleanText(submission.message, ""))}</div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 18px 8px;color:#6b7280;font-size:13px;line-height:21px;">
                <strong style="color:#0b203d;">${escapeHtml(site.brand)}</strong><br />
                You can reply directly to this email to continue the conversation.
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

export async function sendSubmissionReply(
  submission: ContactSubmission,
  reply: { subject: string; body: string }
) {
  const config = getSmtpConfig();

  if (!config.ok) {
    console.warn(`[submission-reply] ${config.reason} Reply was not sent.`);
    return { sent: false, reason: config.reason };
  }

  const transporter = createSmtpTransporter(config);
  const subject = cleanHeader(cleanText(reply.subject, "Re: Your Impex-Pro Inquiry"));

  try {
    const result = await transporter.sendMail({
      from: `"Impex-Pro" <${config.user}>`,
      to: submission.email,
      replyTo: config.user,
      subject,
      text: createReplyPlainTextEmail(submission, { ...reply, subject }),
      html: createReplyHtmlEmail(submission, { ...reply, subject })
    });

    return { sent: true, messageId: result.messageId };
  } catch (error) {
    console.error("[submission-reply] SMTP delivery failed.", formatMailError(error));
    return {
      sent: false,
      reason: "SMTP delivery failed. Check SMTP environment variables and Gmail App Password."
    };
  }
}
