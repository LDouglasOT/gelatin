'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

const slides = [
   {
    bg: 'https://genesisbiotech.net/wp-content/uploads/2023/11/woman-bathrobe-applying-cream-face-scaled.jpg',
    eyebrow: 'Premium Halal & Kosher Certified',
    title: 'Collagen for a\nMore Vital World.',
    sub: 'World-class hydrolyzed collagen for beauty, wellness, and nutraceutical industries globally.',
  },
  {
    bg: 'https://genesisbiotech.net/wp-content/uploads/2023/11/new-scaled.webp',
    eyebrow: 'Source of the Nile · Est. 2018',
    title: 'Gelatin Straight from\nthe Source of the Nile.',
    sub: 'Pure, natural gelatin sourced from pristine pollution-free environments — where quality is born.',
  },
 
  {
    bg: '/assets/assortment-multi-colored-marmalades-scaled.jpg',
    eyebrow: 'Food · Pharmaceutical · Collagen',
    title: 'The Essence of\nNatural Selection.',
    sub: 'Embodies pristine, pollution-free vitality — from Africa\'s most biodiverse lake to global markets.',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [contentKey, setContentKey] = useState(0)

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return
    setTransitioning(true)
    setCurrent(idx)
    setContentKey(k => k + 1)
    setTimeout(() => setTransitioning(false), 1800)
  }, [current, transitioning])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [current, goTo])

  const slide = slides[current]
  const titleLines = slide.title.split('\n')

  return (
    <div className="hero-slider">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Content */}
      <div className="hero-slider-content" key={contentKey} style={{ animation: 'heroContentIn .9s var(--ease-out-expo) both' }}>
        <style>{`
          @keyframes heroContentIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroLineIn {
            from { opacity: 0; transform: translateY(40px) skewY(2deg); }
            to { opacity: 1; transform: translateY(0) skewY(0deg); }
          }
          .hero-line { display: block; overflow: hidden; }
          .hero-line-inner {
            display: block;
            animation: heroLineIn 1s var(--ease-out-expo) both;
          }
          .hero-line:nth-child(2) .hero-line-inner { animation-delay: .12s; }
          .hero-line-em .hero-line-inner { animation-delay: .22s; }
        `}</style>

        <Image
          className="hero-icon"
          src="/assets/iconAsset_resized-100-X-100-px.webp"
          alt="Genesis Biotech"
          width={64}
          height={64}
          priority
        />
        <div className="eyebrow light" style={{ animationDelay: '.1s', opacity: 0, animation: 'heroContentIn .7s .1s var(--ease-out-expo) forwards' }}>
          {slide.eyebrow}
        </div>

        <h1 className="hero-title" style={{ marginTop: '.8rem', overflow: 'hidden' }}>
          {titleLines.map((line, li) =>
            li === titleLines.length - 1 ? (
              <span key={li} className="hero-line hero-line-em">
                <em className="hero-line-inner">{line}</em>
              </span>
            ) : (
              <span key={li} className="hero-line">
                <span className="hero-line-inner" style={{ animationDelay: `${li * 0.12}s` }}>{line}</span>
              </span>
            )
          )}
        </h1>

        <Image
          className="hero-phrase"
          src="/assets/phrase-1Asset-2@300x-1024x66.webp"
          alt=""
          width={520}
          height={66}
          style={{ opacity: 0, animation: 'heroContentIn .8s .4s var(--ease-out-expo) forwards' }}
        />

        <p className="hero-sub" style={{ opacity: 0, animation: 'heroContentIn .8s .48s var(--ease-out-expo) forwards' }}>
          {slide.sub}
        </p>

        <div className="hero-actions" style={{ opacity: 0, animation: 'heroContentIn .8s .56s var(--ease-out-expo) forwards' }}>
          <a href="/product-applications" className="btn-g"><span>Explore Products</span></a>
          <a href="#contact" className="btn-o on-dark">Request a Sample</a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-hint-line" />
        <span>Scroll</span>
      </div>

      {/* Slide dots */}
      <div className="slide-counter">
        <div className="slide-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slide-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ border: 'none', cursor: 'pointer', background: 'none', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}