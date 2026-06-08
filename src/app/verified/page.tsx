import { redirect } from "next/navigation";

export default function VerifiedRedirectPage() {
  redirect("/dashboard");
}
