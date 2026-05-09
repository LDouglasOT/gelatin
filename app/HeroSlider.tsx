'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

const slides = [
  {
    bg: 'https://genesisbiotech.net/wp-content/uploads/2023/11/woman-bathrobe-applying-cream-face-scaled.jpg',
    word: 'Collagen',
    tagline: 'Premium Halal & Kosher Certified',
    sub: 'World-class hydrolyzed collagen for beauty, wellness, and nutraceutical industries globally.',
  },
  {
    bg: 'https://genesisbiotech.net/wp-content/uploads/2023/11/new-scaled.webp',
    word: 'Gelatin',
    tagline: 'Straight from the Source of the Nile',
    sub: 'Pure, natural gelatin sourced from pristine pollution-free environments — where quality is born.',
  },
  {
    bg: '/assets/assortment-multi-colored-marmalades-scaled.jpg',
    word: 'Nature',
    tagline: 'The Essence of Natural Selection',
    sub: "Embodies pristine, pollution-free vitality — from Africa's most biodiverse lake to global markets.",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [contentKey, setContentKey] = useState(0)

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return
      setTransitioning(true)
      setCurrent(idx)
      setContentKey((k) => k + 1)
      setTimeout(() => setTransitioning(false), 1800)
    },
    [current, transitioning]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [current, goTo])

  const slide = slides[current]

  return (
    <div className="hero-slider">
      <style>{`
        .hero-slider {
        display: flex;
        justify-content: center;
align-items: center;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: blue;
          font-family: 'Georgia', serif;
        }

        /* Background slides */
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.6s ease;
          z-index: 0;
        }
        .hero-slide::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(30, 55, 40, 0.82) 0%,
            rgba(20, 40, 28, 0.65) 50%,
            rgba(0,0,0,0.30) 100%
          );
        }
        .hero-slide.active {
          opacity: 1;
        }

        /* Center content panel */
        .hero-slider-content {
       
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          color: #fff;
        }

        /* Giant display word */
        .hero-display-word {
          font-family: Gotham;
          font-size: clamp(5rem, 14vw, 11rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.05em;
          color: #fff;
          margin: 0 0 0.1em;
          animation: wordIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Italic tagline */
        .hero-tagline {
          font-family: 'Georgia', serif;
          font-style: italic;
          font-size: clamp(1.1rem, 2.8vw, 2rem);
          font-weight: 400;
          color: rgba(255,255,255,0.92);
          margin: 0 0 1rem;
          animation: fadeUp 0.8s 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Sub-body text */
        .hero-sub {
          font-family: Roboto;
          font-size: clamp(0.85rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: rgba(255,255,255,0.75);
     
          max-width: 310px;
          
          line-height: 1.6;
          margin: 0 0 2.2rem;
          animation: fadeUp 0.8s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* CTA buttons */
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.8s 0.44s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .btn-primary {
          background: #1db47b;
          color: #fff;
          border: none;
          padding: 0.75rem 2rem;
          font-size: 0.72rem;
          font-family: sans-serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #16391f; }

        .btn-outline {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.65);
          padding: 0.75rem 2rem;
          font-size: 0.72rem;
          font-family: sans-serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.08);
        }

        /* Slide dots */
        .slide-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.55rem;
          z-index: 20;
        }
        .slide-dot {
          width: 10px;
          height: 10px;
          border-radius: 40%;
          background: rgba(255,255,255,0.35);
          transition: background 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .slide-dot.active {
          background: #fff;
        }

        /* Scroll hint */
        .scroll-hint {

          bottom: 2.5rem;
          right: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
      
          opacity: 0;
        }
        .scroll-hint-line {
          width: 1px;
          height: 40px;
          background: #fff;
          animation: scrollPulse 2s ease-in-out infinite;
        }
        .scroll-hint span {
          font-family: sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          writing-mode: vertical-rl;
        }

        /* Keyframes */
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(50px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>

      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Center content */}
      <div className="hero-slider-content" key={contentKey}>
        <h1 className="hero-display-word">{slide.word}</h1>
        <p className="hero-tagline">{slide.tagline}</p>
        <p className="hero-sub">{slide.sub}</p>
        <div className="hero-actions">
          <a href="/product-applications" className="btn-primary">Explore Product</a>
          <a href="#contact" className="btn-outline">Request a Sample</a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-hint-line" />
        <span>Scroll</span>
      </div>

      {/* Dots */}
      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slide-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{ border: 'none', padding: 0 }}
          />
        ))}
      </div>
    </div>
  )
}