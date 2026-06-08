import { auth } from "@/auth";
import { SignOutButton } from "@/components/SignOutButton";
import { CircleCheckBig, LayoutDashboard, Mail, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { name, email, image } = session.user;

  return (
    <main className="page-center">
      <div className="page-card space-y-6">
        <div className="icon-badge icon-badge-success">
          <CircleCheckBig size={28} />
        </div>

        <div className="space-y-1">
          <h1 className="flex items-center justify-center gap-2 text-xl font-semibold">
            <LayoutDashboard size={22} />
            Welcome to your dashboard
          </h1>
          <p className="text-sm text-[var(--muted)]">
            You are signed in with your Google account.
          </p>
        </div>

        <div className="user-card">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name ?? "User"}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
              <User size={20} />
            </div>
          )}
          <div className="user-card-text">
            <p className="flex items-center gap-1 font-medium">
              <User size={14} />
              {name}
            </p>
            <p className="flex items-center gap-1 text-[var(--muted)]">
              <Mail size={14} />
              {email}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
