import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { getAdminAuthConfig } from "@/lib/auth-config";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));
  const config = getAdminAuthConfig();

  if (!config.ok) {
    console.error(`[admin-auth-config] ${config.message}`);
    return NextResponse.json(
      {
        code: "ADMIN_AUTH_CONFIG_ERROR",
        error: config.message,
        setup:
          "Run npm install to create .env.local from .env.example, confirm ADMIN_PASSWORD_HASH and AUTH_SECRET are set, then restart npm run dev."
      },
      { status: 500 }
    );
  }

  if (typeof password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  try {
    const passwordMatches = await bcrypt.compare(password, config.passwordHash);

    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await createSessionToken();
    await setSessionCookie(token);
    return NextResponse.json({ user: { role: "admin" } });
  } catch (error) {
    console.error("[admin-login]", error);
    return NextResponse.json({ error: "Login failed. Please check server auth configuration." }, { status: 500 });
  }
}
