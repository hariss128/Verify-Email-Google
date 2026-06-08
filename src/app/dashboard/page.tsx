import { auth } from "@/auth";
import { SignOutButton } from "@/components/SignOutButton";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { name, email, image } = session.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          ✓
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Welcome to your dashboard</h1>
          <p className="text-sm text-gray-500">
            You are signed in with your Google account.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-lg bg-gray-50 p-4">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name ?? "User"}
              className="h-10 w-10 rounded-full"
            />
          )}
          <div className="text-left text-sm">
            <p className="font-medium">{name}</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        <SignOutButton />
      </div>
    </main>
  );
}
