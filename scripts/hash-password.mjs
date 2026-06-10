import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const escapedHash = hash.replaceAll("$", "\\$");

console.log("Generated admin password hash.");
console.log("");
console.log("Copy this full line into .env.local for local development:");
console.log(`ADMIN_PASSWORD_HASH=${escapedHash}`);
console.log("");
console.log("For cPanel production, set variable ADMIN_PASSWORD_HASH to this raw value:");
console.log(hash);
console.log("");
console.log("Then restart the app.");
console.log("In .env files, $ must be escaped as \\$.");
