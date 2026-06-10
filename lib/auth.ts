import { cookies, headers } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth-constants";
import { signSessionPayload, verifySessionPayload } from "@/lib/session-token";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

export async function createSessionToken() {
  return signSessionPayload(SESSION_TTL_SECONDS);
}

export async function verifySessionToken(token?: string) {
  return verifySessionPayload(token);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: await shouldUseSecureCookie(),
    maxAge: SESSION_TTL_SECONDS,
    path: "/"
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: await shouldUseSecureCookie(),
    maxAge: 0,
    path: "/"
  });
}

async function shouldUseSecureCookie() {
  if (process.env.NODE_ENV !== "production") return false;

  const headerStore = await headers();
  const host = headerStore.get("host") || "";

  if (host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]")) {
    return false;
  }

  return true;
}
