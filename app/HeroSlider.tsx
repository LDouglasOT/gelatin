"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Slide data ────────────────────────────────────────────────────────────────
const slides = [
  {
    bg: "https://genesisbiotech.net/wp-content/uploads/2023/11/woman-bathrobe-applying-cream-face-scaled.jpg",
    word: "Collagen",
    tagline: "Premium Halal & Kosher Certified",
  },
  {
    bg: "https://genesisbiotech.net/wp-content/uploads/2023/11/new-scaled.webp",
    word: "Gelatin",
    tagline: "Straight from the Source of the Nile",
  },
  {
    bg: "/assets/assortment-multi-colored-marmalades-scaled.jpg",
    word: "Nature",
    tagline: "The Essence of Natural Selection",
  },
];

const DURATION = 5000;   // ms per slide
const TRANSITION = 800;  // ms crossfade

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setTextVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setTextVisible(true);
      }, TRANSITION);
    },
    [current]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(next, DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  const slide = slides[current];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        minHeight: 440,
        overflow: "hidden",
        background: "#0a1a0f",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
      aria-label="Hero slideshow"
    >
      <style>{`
        .btn-primary {
          background: #1db47b;
          color: #fff;
          border: none;
          padding: 0.75rem 1.8rem;
          font-size: 0.7rem;
          font-family: sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #16a068; }

        .btn-outline {
          background: transparent;
          color: #fff;
          border: 1.5px solid #fff;
          padding: 0.72rem 1.8rem;
          font-size: 0.7rem;
          font-family: sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* ── Background images ── */}
      {slides.map((s, i) => (
        <div
          key={s.bg}
          aria-hidden={i !== current}
          style={{
            position: "absolute",
            inset: 0,
            transition: `opacity ${TRANSITION}ms ease`,
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image
            src={s.bg}
            alt={s.word}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Teal-green overlay matching the screenshot */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 110, 86, 0.25)",
            }}
          />
        </div>
      ))}

      {/* ── Text content — centered ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          {/* Hero word */}
          <h1
            style={{
              margin: "0 0 0.4rem",
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              transform: textVisible ? "translateY(0)" : "translateY(-30px)",
              opacity: textVisible ? 1 : 0,
              transition: `transform ${TRANSITION}ms ease ${
                textVisible ? "60ms" : "0ms"
              }, opacity ${TRANSITION}ms ease ${textVisible ? "60ms" : "0ms"}`,
              willChange: "transform, opacity",
            }}
          >
            {slide.word}
          </h1>

          {/* Tagline */}
          <p
            style={{
              margin: "0 0 2rem",
              fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.92)",
              transform: textVisible ? "translateY(0)" : "translateY(20px)",
              opacity: textVisible ? 1 : 0,
              transition: `transform ${TRANSITION * 1.1}ms ease ${
                textVisible ? "120ms" : "0ms"
              }, opacity ${TRANSITION * 1.1}ms ease ${
                textVisible ? "120ms" : "0ms"
              }`,
              willChange: "transform, opacity",
            }}
          >
            {slide.tagline}
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: textVisible ? 1 : 0,
              transition: `opacity ${TRANSITION}ms ease ${
                textVisible ? "180ms" : "0ms"
              }`,
            }}
          >
            <a href="/product-applications" className="btn-primary">
              Explore Product
            </a>
            <a href="/contact" className="btn-outline">
              Request Sample
            </a>
          </div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <ProgressBar key={current} duration={DURATION} />

      {/* ── Dot / pill navigation ── */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          gap: "0.55rem",
          alignItems: "center",
        }}
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((s, i) => (
          <button
            key={s.bg}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${s.word}`}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 30 : 10,
              height: 10,
              borderRadius: 5,
              border: "none",
              background:
                i === current ? "#fff" : "rgba(255, 255, 255, 0.45)",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.35s ease, background 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* ── Arrow navigation ── */}
      <ArrowBtn
        direction="prev"
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
      />
      <ArrowBtn
        direction="next"
        onClick={() => goTo((current + 1) % slides.length)}
      />
    </section>
  );
}

// ─── Thin progress bar ────────────────────────────────────────────────────────
function ProgressBar({ duration }: { duration: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 30,
        background: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "#fff",
          animation: `slideProgress ${duration}ms linear forwards`,
        }}
      />
    </div>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────
function ArrowBtn({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        [isPrev ? "left" : "right"]: "1.25rem",
        transform: "translateY(-50%)",
        zIndex: 20,
        background: "rgba(255, 255, 255, 0.20)",
        border: "1.5px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "50%",
        width: 44,
        height: 44,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.background = "rgba(255,255,255,0.35)";
        btn.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.background = "rgba(255,255,255,0.20)";
        btn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isPrev ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}