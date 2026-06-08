import { auth } from "@/auth";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { isGoogleAuthConfigured } from "@/lib/google-auth";
import { Mail, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const googleReady = isGoogleAuthConfigured();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="page-center">
      <div className="page-card space-y-6">
        <div className="icon-badge">
          <ShieldCheck size={28} />
        </div>

        <div className="space-y-2">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight">
            <Mail size={22} />
            Verify your email
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Sign in with your Google account to verify your email address.
          </p>
        </div>

        {!googleReady && (
          <div className="alert-warning">
            <p className="font-medium">Google OAuth is not configured yet</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
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
              <li>Click your OAuth client and copy the Client secret</li>
              <li>
                In <code className="rounded bg-amber-100 px-1">.env.local</code>,
                paste the real secret from Google (not example text):
                <pre className="mt-2 overflow-x-auto rounded bg-amber-100 p-2 text-xs">
                  AUTH_GOOGLE_SECRET=GOCSPX-AbCdEf1234567890
                </pre>
              </li>
              <li>Restart the dev server (Ctrl+C, then npm run dev)</li>
            </ol>
          </div>
        )}

        <GoogleSignInButton disabled={!googleReady} />
      </div>
    </main>
  );
}
