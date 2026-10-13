"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setOpen((o) => {
      document.body.style.overflow = !o ? "hidden" : "";
      return !o;
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 transition-all duration-400 border-b ${
        scrolled
          ? "bg-[rgba(5,5,5,0.8)] backdrop-blur-[20px] border-[rgba(255,255,255,0.05)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1140px] mx-auto flex items-center justify-between h-[72px]">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="font-[family-name:var(--font-display)] font-extrabold text-xl tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          MG
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="relative text-sm font-medium text-[var(--text-secondary)] tracking-wide hover:text-[var(--text-primary)] transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-[1.5px] after:bg-[var(--accent)] after:transition-all hover:after:w-full hover:after:left-0"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden flex-col gap-1.5 p-1 z-[1001]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-transform ${
              open ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-transform ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Mobile overlay */}
        {open && (
          <div className="nav-mobile-overlay flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
