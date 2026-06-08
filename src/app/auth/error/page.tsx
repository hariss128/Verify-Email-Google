import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

type AuthErrorPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;

  const isConfigError = error === "Configuration";

  return (
    <main className="page-center">
      <div className="page-card alert-error space-y-4">
        <div className="icon-badge icon-badge-error">
          <AlertCircle size={28} />
        </div>
        <h1 className="text-center text-lg font-semibold">Sign-in failed</h1>

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

        <Link
          href="/"
          className="btn btn-outline mx-auto inline-flex underline-offset-2 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
