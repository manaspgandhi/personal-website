import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getEssays } from "@/lib/essays";

export const metadata: Metadata = { title: "Essays — Manas Gandhi" };

export default function EssaysPage() {
  const essays = getEssays();

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Essays</h1>
      {essays.length === 0 ? (
        <p className="text-[var(--muted)]">Nothing here yet.</p>
      ) : (
        <ul className="space-y-4">
          {essays.map((e) => (
            <li key={e.slug} className="flex items-baseline justify-between gap-4">
              <Link href={`/essays/${e.slug}`} className="hover:underline">
                {e.title}
              </Link>
              <span className="shrink-0 text-sm text-[var(--muted)]">
                {formatDate(e.date)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
