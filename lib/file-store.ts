import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true, mode: 0o700 });
}

export function dataPath(fileName: string) {
  const safeName = path.basename(fileName);
  if (safeName !== fileName || !safeName.endsWith(".json")) {
    throw new Error(`Invalid data file name: ${fileName}`);
  }
  return path.join(dataDir, safeName);
}

export async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(dataPath(fileName), "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? error.code : "";
    if (code === "ENOENT") {
      await writeJsonFile(fileName, fallback);
      return fallback;
    }
    console.error(`[file-store:${fileName}]`, error);
    return fallback;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T) {
  await ensureDataDir();
  const target = dataPath(fileName);
  const temp = `${target}.${Date.now()}.tmp`;
  await writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  await rename(temp, target);
}
