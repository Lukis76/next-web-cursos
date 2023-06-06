import { env } from "@/env.mjs";

/**
 * verificacions de credenciales
 * */
export function getGoogleCredentials() {
  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;

  if (env.NODE_ENV === ("development" || "test")) {
    if (clientId || clientId.length === 0) {
      throw new Error("Missing GOOGLE_CLIENT_ID");
    }

    if (clientSecret || clientSecret.length === 0) {
      throw new Error("Missing GOOGLE_CLIENT_SECRET");
    }
  }

  return {
    clientId,
    clientSecret,
  };
}
