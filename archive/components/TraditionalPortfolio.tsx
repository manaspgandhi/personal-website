import Image from "next/image";
import Nav from "@/components/Nav";
import HeroName from "@/components/HeroName";
import HeroOrbs from "@/components/HeroOrbs";
import RevealOnScroll from "@/components/RevealOnScroll";
import TiltCard from "@/components/TiltCard";
import Parallax from "@/components/Parallax";
import SkillsConstellation from "@/components/SkillsConstellation";
import { experiences, projects } from "@/data/portfolio";

export default function TraditionalPortfolio() {
  return (
    <>
      <Nav />

      {/* ==================== HERO ==================== */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-[120px] pb-20">
        <HeroOrbs />

        <div className="relative z-10 text-center">
          <div className="mb-6 md:mb-9">
            <HeroName />
          </div>
          <RevealOnScroll delay={0.8}>
            <div className="flex items-center justify-center gap-4 flex-wrap font-[family-name:var(--font-body)] text-[clamp(0.9rem,1.5vw,1.1rem)] text-[var(--text-secondary)] tracking-wide mb-3">
              <span>Software Engineer</span>
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
              <span>ML Engineer</span>
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
              <span>Builder</span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p className="font-[family-name:var(--font-mono)] text-[clamp(0.75rem,1.2vw,0.875rem)] text-[var(--text-muted)] tracking-wider">
              San Francisco, CA &mdash; MS CS @ UIUC &rsquo;26 &mdash; Building Articulate
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={1.3} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#about" aria-label="Scroll down">
            <div className="scroll-line" />
          </a>
        </RevealOnScroll>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-[clamp(100px,12vw,160px)]">
        <div className="max-w-[1140px] mx-auto px-[clamp(24px,5vw,48px)]">
          <Parallax speed={-0.03}>
            <RevealOnScroll>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-[clamp(48px,6vw,72px)] flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm font-normal text-[var(--accent)]">01</span>
                About
              </h2>
            </RevealOnScroll>
          </Parallax>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">
            <RevealOnScroll>
              <div className="space-y-4">
                <p className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-tight leading-snug text-[var(--text-primary)] mb-6">
                  I build things that push boundaries.
                </p>
                <p className="text-[var(--text-secondary)] text-[0.975rem] leading-relaxed">
                  I&rsquo;m a CS Masters student at the University of Illinois at Urbana-Champaign and founder of <strong className="text-[var(--text-primary)] font-semibold">Articulate</strong>, where we&rsquo;re building automatic construction issue detection software. My work spans the full spectrum — from training ML models and deploying them at scale, to writing hardware drivers in C, to building full-stack platforms with Next.js.
                </p>
                <p className="text-[var(--text-secondary)] text-[0.975rem] leading-relaxed">
                  Previously, I co-founded <strong className="text-[var(--text-primary)] font-semibold">Sarvaj.ai</strong> (real-time deepfake detection through Vercel&rsquo;s AI accelerator), did R&D at <strong className="text-[var(--text-primary)] font-semibold">Sandia National Laboratories</strong> on radiation-hardened processors and quantum-resistant cryptography, and engineered data pipelines at <strong className="text-[var(--text-primary)] font-semibold">Target</strong> saving $150K/year.
                </p>
                <p className="text-[var(--text-secondary)] text-[0.975rem] leading-relaxed">
                  When I&rsquo;m not coding, you&rsquo;ll find me bouldering, DJing, or plotting my next venture.
                </p>
              </div>
            </RevealOnScroll>

            <div className="flex flex-col items-center gap-8">
              <RevealOnScroll delay={0.15}>
                <div className="headshot-wrapper rounded-2xl overflow-hidden">
                  <Image
                    src="/headshot.jpg"
                    alt="Manas Gandhi"
                    width={280}
                    height={350}
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </RevealOnScroll>

              <div className="grid grid-cols-2 gap-3 w-full max-w-[300px]">
                {[
                  { label: "Education", value: "MS CS & BS ECE", detail: "@ UIUC" },
                  { label: "Research", value: "Sandia National Labs", detail: "1 year R&D" },
                  { label: "Current", value: "Articulate", detail: "Founder" },
                  { label: "Languages", value: "4 Spoken", detail: "15+ Programming" },
                ].map((h, i) => (
                  <RevealOnScroll key={h.label} delay={0.2 + i * 0.1}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 hover:border-[var(--border-light)] hover:-translate-y-0.5 transition-all">
                      <span className="block font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--accent)] uppercase tracking-widest mb-2">{h.label}</span>
                      <span className="block font-[family-name:var(--font-display)] font-bold text-[0.95rem] text-[var(--text-primary)] tracking-tight mb-1">{h.value}</span>
                      <span className="block text-[0.8rem] text-[var(--text-muted)]">{h.detail}</span>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section id="experience" className="py-[clamp(100px,12vw,160px)]">
        <div className="max-w-[1140px] mx-auto px-[clamp(24px,5vw,48px)]">
          <Parallax speed={-0.03}>
            <RevealOnScroll>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-[clamp(48px,6vw,72px)] flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm font-normal text-[var(--accent)]">02</span>
                Experience
              </h2>
            </RevealOnScroll>
          </Parallax>

          <div className="flex flex-col gap-6">
            {experiences.map((exp) => (
              <RevealOnScroll key={exp.company}>
                <div className="exp-card bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[14px] p-[clamp(28px,4vw,40px)] hover:border-[var(--border-light)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all">
                  <div className="flex justify-between items-start gap-4 mb-5 flex-wrap max-sm:flex-col max-sm:gap-1">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.15rem,2vw,1.35rem)] tracking-tight text-[var(--text-primary)] mb-1">
                        {exp.company}
                      </h3>
                      <span className="text-[0.9rem] text-[var(--text-secondary)]">{exp.role}</span>
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-[0.78rem] text-[var(--text-muted)] tracking-wide whitespace-nowrap shrink-0 mt-1">
                      {exp.date}
                    </span>
                  </div>
                  <ul className="mb-5 space-y-2.5">
                    {exp.details.map((d, i) => (
                      <li key={i} className="relative pl-5 text-[0.9rem] text-[var(--text-secondary)] leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--accent)] before:opacity-60">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span key={t} className="font-[family-name:var(--font-mono)] text-[0.72rem] px-3 py-1 bg-[rgba(232,93,58,0.08)] text-[var(--accent)] rounded-full border border-[rgba(232,93,58,0.15)] tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="py-[clamp(100px,12vw,160px)]">
        <div className="max-w-[1140px] mx-auto px-[clamp(24px,5vw,48px)]">
          <Parallax speed={-0.03}>
            <RevealOnScroll>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-[clamp(48px,6vw,72px)] flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm font-normal text-[var(--accent)]">03</span>
                Projects
              </h2>
            </RevealOnScroll>
          </Parallax>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <RevealOnScroll key={p.title}>
                <TiltCard className="relative rounded-[14px]">
                  <article
                    className="project-card bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[14px] p-[clamp(28px,3vw,36px)] relative overflow-hidden transition-all group h-full"
                    style={{ "--accent-color": p.color } as React.CSSProperties}
                  >
                    <div className="project-accent-bar" />
                    <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-widest text-[var(--accent)] block mb-3 mt-2">
                      {p.category}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.2rem,2vw,1.5rem)] tracking-tight text-[var(--text-primary)] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-[0.875rem] text-[var(--text-secondary)] leading-relaxed mb-5">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="font-[family-name:var(--font-mono)] text-[0.68rem] px-2.5 py-[3px] bg-[var(--bg-elevated)] text-[var(--text-muted)] rounded-full border border-[var(--border-subtle)] tracking-wide group-hover:text-[var(--text-secondary)] group-hover:border-[var(--border-light)] transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section id="skills" className="py-[clamp(100px,12vw,160px)]">
        <div className="max-w-[1140px] mx-auto px-[clamp(24px,5vw,48px)]">
          <Parallax speed={-0.03}>
            <RevealOnScroll>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-[clamp(48px,6vw,72px)] flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm font-normal text-[var(--accent)]">04</span>
                Skills
              </h2>
            </RevealOnScroll>
          </Parallax>

          <RevealOnScroll>
            <SkillsConstellation />
          </RevealOnScroll>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-[clamp(100px,12vw,160px)] pb-16">
        <div className="max-w-[1140px] mx-auto px-[clamp(24px,5vw,48px)]">
          <RevealOnScroll>
            <div className="contact-glow relative text-center py-[clamp(60px,8vw,100px)] px-[clamp(24px,4vw,60px)] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[20px] overflow-hidden">
              <h2 className="relative font-[family-name:var(--font-display)] font-extrabold text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight text-[var(--text-primary)] mb-4">
                Let&rsquo;s build something together.
              </h2>
              <p className="relative text-base text-[var(--text-secondary)] mb-10">
                I&rsquo;m always open to interesting conversations, collaborations, and new opportunities.
              </p>
              <div className="relative flex items-center justify-center gap-8 flex-wrap max-sm:flex-col max-sm:gap-3">
                {[
                  {
                    href: "mailto:manaspgandhi@gmail.com",
                    label: "manaspgandhi@gmail.com",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    ),
                  },
                  {
                    href: "https://linkedin.com/in/manas-gandhi",
                    label: "LinkedIn",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    ),
                  },
                  {
                    href: "https://github.com/manaspgandhi",
                    label: "GitHub",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    ),
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener"}
                    className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[0.85rem] text-[var(--text-secondary)] px-6 py-3 border border-[var(--border-light)] rounded-full hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[rgba(232,93,58,0.06)] hover:-translate-y-0.5 transition-all max-sm:w-full max-sm:justify-center"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-[1140px] mx-auto px-[clamp(24px,5vw,48px)] text-center">
          <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-muted)] tracking-wide">
            &copy; 2026 Manas Gandhi
          </span>
        </div>
      </footer>
    </>
  );
}
