import { env } from "@/env.mjs";

/**
 * verificacions de credenciales
 * */
export function getCredential() {
  return {
    google: Google(),
    github: Github(),
  };
}

export function Google() {
  const credentials = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  };

  if (env.NODE_ENV === ("development" || "test")) {
    if (credentials.clientId || credentials.clientId.length === 0) {
      throw new Error("Missing GOOGLE_CLIENT_ID");
    }

    if (credentials.clientSecret || credentials.clientSecret.length === 0) {
      throw new Error("Missing GOOGLE_CLIENT_SECRET");
    }
  }

  return credentials;
}

export function Github() {
  const credentials = {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  };

  if (env.NODE_ENV === ("development" || "test")) {
    if (credentials.clientId || credentials.clientId.length === 0) {
      throw new Error("Missing GITHUB_CLIENT_ID");
    }

    if (credentials.clientSecret || credentials.clientSecret.length === 0) {
      throw new Error("Missing GITHUB_CLIENT_SECRET");
    }
  }

  return credentials;
}
