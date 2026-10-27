"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { FintechBubbles } from "@/components/home/FintechBubbles";

export function HeroVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.playsInline = true;
    video.loop = true;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can fail until a gesture; keep trying on events below.
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    window.addEventListener("touchstart", tryPlay, { once: true });
    window.addEventListener("click", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("click", tryPlay);
    };
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-video-fallback absolute inset-0" />
      {!reduce ? (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-100"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/media/hero-bg.mp4?v=2"
        />
      ) : null}
      <div className="absolute inset-0 z-[1] hidden sm:block">
        <FintechBubbles />
      </div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-ink-raised/80 via-ink-raised/45 to-ink-raised/25 sm:from-ink-raised/70 sm:via-ink-raised/30 sm:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-ink-raised/80 to-transparent" />
    </div>
  );
}
