function normalize(value: string | undefined) {
  return value?.trim() ?? "";
}

const PLACEHOLDER_PATTERNS = [
  /^PASTE_YOUR_CLIENT_SECRET_HERE$/i,
  /^REPLACE_WITH_REAL_SECRET_FROM_GOOGLE_CONSOLE$/i,
  /^your-google-client-secret$/i,
  /^GOCSPX-your-secret-here$/i,
  /your-secret/i,
  /paste.*secret/i,
  /replace_with/i,
  /xxxx/i,
];

export function getGoogleAuthEnv() {
  return {
    clientId: normalize(process.env.AUTH_GOOGLE_ID),
    clientSecret: normalize(process.env.AUTH_GOOGLE_SECRET),
  };
}

export function isGoogleAuthConfigured() {
  const { clientId, clientSecret } = getGoogleAuthEnv();

  if (!clientId || !clientSecret) {
    return false;
  }

  if (!clientId.includes(".apps.googleusercontent.com")) {
    return false;
  }

  if (!clientSecret.startsWith("GOCSPX-")) {
    return false;
  }

  return !PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(clientSecret));
}
