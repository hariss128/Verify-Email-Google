import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="btn btn-outline">
        <LogOut size={16} />
        Sign out
      </button>
    </form>
  );
}
