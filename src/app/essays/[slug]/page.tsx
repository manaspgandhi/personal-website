import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getEssay, getEssays } from "@/lib/essays";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  return { title: essay ? `${essay.title} — Manas Gandhi` : "Essay" };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <article>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">{essay.title}</h1>
      <p className="mb-10 text-sm text-[var(--muted)]">{formatDate(essay.date)}</p>
      <div
        className="prose-essay"
        dangerouslySetInnerHTML={{ __html: essay.html }}
      />
    </article>
  );
}
