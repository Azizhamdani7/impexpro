import nodemailer from "nodemailer";
import { existsSync, readFileSync } from "node:fs";

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
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing SMTP environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

try {
  await transporter.verify();
  console.log("SMTP verification passed.");
} catch (error) {
  console.error("SMTP verification failed.");
  console.error(error);
  process.exit(1);
}
