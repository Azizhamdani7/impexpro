import nodemailer from "nodemailer";
import { existsSync, readFileSync } from "node:fs";

function readEnv(name) {
  return (process.env[name] || "").trim();
}

function normalizeSmtpPassword(value) {
  return value.replace(/\s+/g, "");
}

if (existsSync(".env")) {
  const lines = readFileSync(".env", "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (process.env[key]) continue;
    process.env[key] = rest.join("=").replace(/^["']|["']$/g, "").replace(/\\\$/g, "$");
  }
}

const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_RECEIVER_EMAIL"];
const missing = required.filter((key) => !readEnv(key));

if (missing.length) {
  console.error(`Missing SMTP environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const port = Number(readEnv("SMTP_PORT") || 465);
const user = readEnv("SMTP_USER");
const receiver = readEnv("CONTACT_RECEIVER_EMAIL");

const transporter = nodemailer.createTransport({
  host: readEnv("SMTP_HOST"),
  port,
  secure: port === 465,
  auth: {
    user,
    pass: normalizeSmtpPassword(readEnv("SMTP_PASS"))
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000
});

try {
  await transporter.verify();
  console.log("SMTP verification passed.");

  const result = await transporter.sendMail({
    from: `"Impex-Pro SMTP Test" <${user}>`,
    to: receiver,
    subject: "Impex-Pro SMTP Test",
    text: [
      "This is a test email from the Impex-Pro website SMTP configuration.",
      "",
      "If you received this email, contact form notification delivery is working."
    ].join("\n")
  });

  console.log(`SMTP test email sent to ${receiver}.`);
  console.log(`Message ID: ${result.messageId}`);
} catch (error) {
  console.error("SMTP verification or test email failed.");
  console.error(error);
  process.exit(1);
}
