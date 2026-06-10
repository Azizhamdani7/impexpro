import { getAdminAuthConfig } from "@/lib/auth-config";

type SessionPayload = {
  role: "admin";
  exp: number;
};

function base64UrlEncode(input: string | Uint8Array) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}

async function signingKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function getSecret() {
  const config = getAdminAuthConfig();
  if (!config.ok) {
    throw new Error(config.message);
  }
  return config.authSecret;
}

export async function signSessionPayload(ttlSeconds: number) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + ttlSeconds
    } satisfies SessionPayload)
  );
  const data = `${header}.${payload}`;
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", await signingKey(getSecret()), new TextEncoder().encode(data))
  );
  return `${data}.${base64UrlEncode(signature)}`;
}

export async function verifySessionPayload(token?: string) {
  if (!token) return null;

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

  const data = `${header}.${payload}`;

  try {
    const signatureBytes = new Uint8Array(
      atob(signature.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(signature.length / 4) * 4, "="))
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(getSecret()),
      signatureBytes,
      new TextEncoder().encode(data)
    );
    if (!valid) return null;

    const parsed = JSON.parse(base64UrlDecode(payload)) as Partial<SessionPayload>;
    if (parsed.role !== "admin" || typeof parsed.exp !== "number") {
      return null;
    }
    if (parsed.exp <= Math.floor(Date.now() / 1000)) return null;

    return { role: "admin" as const };
  } catch {
    return null;
  }
}
