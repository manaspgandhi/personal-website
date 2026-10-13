import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manas Gandhi",
  description: "Manas Gandhi — founder of Articulate.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-xl px-6 py-12 sm:py-20">
          <nav className="mb-12 flex gap-5 text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--text)]">
              Home
            </Link>
            <Link href="/essays" className="hover:text-[var(--text)]">
              Essays
            </Link>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
