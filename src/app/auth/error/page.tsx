import Link from "next/link";

type AuthErrorPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;

  const isConfigError = error === "Configuration";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4 rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
        <h1 className="text-lg font-semibold">Sign-in failed</h1>

        {isConfigError ? (
          <>
            <p>
              Google rejected the OAuth credentials. This almost always means{" "}
              <strong>the Client secret in `.env.local` is wrong</strong>.
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Open{" "}
                <a
                  className="underline"
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Cloud Console → Credentials
                </a>
              </li>
              <li>Click your OAuth client (same Client ID as in `.env.local`)</li>
              <li>
                Copy the real <strong>Client secret</strong> — it looks like{" "}
                <code className="rounded bg-red-100 px-1">GOCSPX-AbCdEf...</code>
              </li>
              <li>
                Paste it in `.env.local` (do not use example text like{" "}
                <code className="rounded bg-red-100 px-1">
                  GOCSPX-your-secret-here
                </code>
                )
              </li>
              <li>Restart: Ctrl+C, then npm run dev</li>
            </ol>
          </>
        ) : (
          <p>
            Error code: <code className="rounded bg-red-100 px-1">{error ?? "Unknown"}</code>
          </p>
        )}

        <Link href="/" className="inline-block underline">
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
