import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");

export interface EssayMeta {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
}

// Minimal frontmatter parser: `---\nkey: value\n---\nbody`
function parse(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

function readMeta(file: string): EssayMeta {
  const slug = file.replace(/\.md$/, "");
  const { data } = parse(fs.readFileSync(path.join(ESSAYS_DIR, file), "utf8"));
  return { slug, title: data.title ?? slug, date: data.date ?? "" };
}

export function getEssays(): EssayMeta[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEssay(slug: string): (EssayMeta & { html: string }) | null {
  const file = path.join(ESSAYS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parse(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    html: marked.parse(body, { async: false }) as string,
  };
}

export function formatDate(date: string): string {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
