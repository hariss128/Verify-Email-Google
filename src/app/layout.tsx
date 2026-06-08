import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google Email Verification",
  description: "Verify your email with Google one-click sign in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
