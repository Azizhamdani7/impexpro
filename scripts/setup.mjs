import { access, chmod, copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const envExamplePath = path.join(root, ".env.example");
const envLocalPath = path.join(root, ".env.local");
const dataDir = path.join(root, "data");
const dataFiles = ["blogs.json", "submissions.json"];
const productionEnvKeys = [
  "CPANEL",
  "PASSENGER_APP_ENV",
  "VERCEL",
  "RENDER",
  "RAILWAY_ENVIRONMENT",
  "NETLIFY",
  "DYNO"
];

function isProductionEnvironment() {
  return process.env.NODE_ENV === "production" || productionEnvKeys.some((key) => Boolean(process.env[key]));
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureEnvLocal() {
  if (isProductionEnvironment()) {
    console.log("Production environment detected. Skipping .env.local creation.");
    return;
  }

  if (await exists(envLocalPath)) {
    console.log("Skipped .env.local creation because it already exists");
    return;
  }

  if (!(await exists(envExamplePath))) {
    console.warn("Skipped .env.local creation because .env.example was not found");
    return;
  }

  await copyFile(envExamplePath, envLocalPath);
  await chmod(envLocalPath, 0o600).catch(() => undefined);
  console.log("Created .env.local from .env.example");
}

async function ensureDataStore() {
  await mkdir(dataDir, { recursive: true, mode: 0o700 });
  await chmod(dataDir, 0o700).catch(() => undefined);

  for (const fileName of dataFiles) {
    const filePath = path.join(dataDir, fileName);
    if (await exists(filePath)) continue;

    await writeFile(filePath, "[]\n", { encoding: "utf8", mode: 0o600 });
    await chmod(filePath, 0o600).catch(() => undefined);
    console.log(`Created data/${fileName}`);
  }
}

await ensureEnvLocal();
await ensureDataStore();
