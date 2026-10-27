"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "platforms", label: "Platforms" },
  { id: "buyers", label: "Buyers" },
  { id: "proof", label: "Proof" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

export function ChapterNav() {
  const [active, setActive] = useState<ChapterId>("platforms");

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];
      const current = nodes.find((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      const id = current?.dataset.chapter;
      if (id === "platforms" || id === "buyers" || id === "proof") setActive(id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = chapters.find((chapter) => chapter.id === active) ?? chapters[0];

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed inset-x-0 top-[5.4rem] z-40 hidden justify-center md:flex"
    >
      <ol className="pointer-events-auto flex items-center gap-1 rounded-full border border-navy/10 bg-white/90 p-1 shadow-sm backdrop-blur">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={chapter.id === active ? "true" : undefined}
              className={`block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition duration-150 ${
                chapter.id === active ? "bg-navy text-white" : "text-mist hover:text-navy"
              }`}
            >
              {chapter.label}
            </a>
          </li>
        ))}
      </ol>
      <span className="sr-only">Current chapter: {current.label}</span>
    </nav>
  );
}
