'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const slides = [
  { bg: 'https://genesisbiotech.net/wp-content/uploads/2023/11/new-scaled.webp', alt: 'Genesis Biotech Hero 1' },
  { bg: 'https://genesisbiotech.net/wp-content/uploads/2023/11/woman-bathrobe-applying-cream-face-scaled.jpg', alt: 'Genesis Biotech Hero 2' },
  { bg: '/assets/assortment-multi-colored-marmalades-scaled.jpg', alt: 'Genesis Biotech Hero 3' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000) // Match the original 7 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.bg})` }}
        />
      ))}
      <div className="hero-slider-content">
        <Image
          className="hero-icon"
          src="/assets/iconAsset_resized-100-X-100-px.webp"
          alt="Genesis Biotech"
          width={68}
          height={68}
        />
        <div className="eyebrow light">Premium Gelatin · Est. 2018</div>
        <h1 className="hero-title">
          Gelatin
          <em>Straight from<br />the Source of the Nile.</em>
        </h1>
        <Image
          className="hero-phrase"
          src="/assets/phrase-1Asset-2@300x-1024x66.webp"
          alt=""
          width={520}
          height={66}
        />
        <p className="hero-sub">
          Embodies the essence of natural selection. Our partners and clients favor products from pristine, pollution-free environments pulsating with pure, vital energy.
        </p>
        <div className="hero-actions">
          <a href="/product-applications" className="btn-g">Explore Products</a>
          <a href="#contact" className="btn-o on-dark">Request a Sample</a>
        </div>
      </div>
      <div className="scroll-hint">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
        Scroll
      </div>
      <div className="scroll-hint">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
        Scroll
      </div>
    </div>
  )
}