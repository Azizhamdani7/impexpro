export type AdminAuthConfig =
  | {
      ok: true;
      passwordHash: string;
      authSecret: string;
    }
  | {
      ok: false;
      missing: string[];
      invalid: string[];
      message: string;
    };

export function getAdminAuthConfig(): AdminAuthConfig {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const authSecret = process.env.AUTH_SECRET?.trim();
  const required: Array<[string, string | undefined]> = [
    ["ADMIN_PASSWORD_HASH", passwordHash],
    ["AUTH_SECRET", authSecret]
  ];
  const missing = required
    .filter(([, value]) => !value)
    .map(([name]) => name);
  const invalid: string[] = [];

  if (passwordHash && !passwordHash.startsWith("$2")) {
    invalid.push("ADMIN_PASSWORD_HASH must be a valid bcrypt hash and should start with $2.");
  }

  if (authSecret && authSecret.length < 24) {
    invalid.push("AUTH_SECRET must be at least 24 characters long.");
  }

  if (missing.length || invalid.length) {
    const details = [
      missing.length ? `Missing: ${missing.join(", ")}` : "",
      invalid.length ? `Invalid: ${invalid.join(" ")}` : ""
    ]
      .filter(Boolean)
      .join(" ");

    return {
      ok: false,
      missing,
      invalid,
      message: `Admin authentication is not configured correctly. ${details}`.trim()
    };
  }

  return {
    ok: true,
    passwordHash: passwordHash as string,
    authSecret: authSecret as string
  };
}
