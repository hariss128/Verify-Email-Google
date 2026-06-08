import { auth } from "@/auth";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { isGoogleAuthConfigured } from "@/lib/google-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const googleReady = isGoogleAuthConfigured();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify your email
          </h1>
          <p className="text-sm text-gray-500">
            Sign in with your Google account to verify your email address.
          </p>
        </div>

        {!googleReady && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
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
