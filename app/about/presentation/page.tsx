'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const PdfFlipBook = dynamic(() => import('./PdfFlipBook'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <p style={{ fontFamily: 'inherit', color: '#888' }}>Loading presentation…</p>
    </div>
  ),
})

export default function PresentationPage() {
  const navRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) navRef.current.classList.toggle('solid', window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const navMenuStyle: React.CSSProperties = menuOpen
    ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: 78, left: 0, right: 0, background: 'rgba(255,255,255,.98)', backdropFilter: 'blur(18px)', padding: '2rem', gap: '1.5rem', borderBottom: '1px solid rgba(45,107,68,.14)', zIndex: 899 }
    : {}

  return (
    <>
      {/* ── NAV (identical to About / Home) ── */}
      <nav id="nav" ref={navRef} className="solid">
        <Link href="/" className="nav-logo">
          <Image
            src="/assets/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={102}
            height={32}
            style={{ height: 34, width: 'auto' }}
          />
        </Link>
        <ul className="nav-links" style={navMenuStyle}>
          <li className="has-sub">
            <Link href="/about">About</Link>
            <ul className="sub-nav">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/about/presentation">Presentation</Link></li>
            </ul>
          </li>
          <li><Link href="/product-applications">Product Applications</Link></li>
          <li><Link href="/advantages">Advantages</Link></li>
          <li><Link href="/datasheets">Datasheets</Link></li>
          <li><Link href="/contact" className="nav-cta">Contact Us</Link></li>
        </ul>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* ── PAGE HERO (same pattern as About) ── */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-inner">
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 20,
              letterSpacing: '0.03em',
            }}
          >
            <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/about" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>About</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Presentation</span>
          </nav>
          <div className="eyebrow light rv">Company Overview</div>
          <h1 className="page-title rv d1">Our <em>Presentation</em></h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: '5rem 5vw', maxWidth: 1200, margin: '0 auto' }}>
        <div className="eyebrow rv">About Us</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          {/* Text */}
          <div>
            <h2 className="st rv d1">The Natural<br /><em>Selection.</em></h2>
            <p className="rv d2" style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: '1.2rem' }}>
              Genesis Biotech embodies the essence of natural selection — premium gelatin and collagen products sourced from pristine, pollution-free environments pulsating with pure, vital energy.
            </p>
            <p className="rv d3" style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: '1rem' }}>
              Explore our full company presentation below to learn about our products, certifications, global footprint, and commitment to quality.
            </p>
          </div>

          {/* Stats grid */}
          <div
            className="rv d2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            {[
              { value: '2018', label: 'Founded' },
              { value: 'Halal & Kosher', label: 'Certified' },
              { value: 'Global', label: 'Reach' },
              { value: 'Bovine & Fish', label: 'Product Lines' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: 'var(--bg-alt, #f8f9f6)',
                  border: '1px solid var(--border, #e8ede6)',
                  borderRadius: 10,
                  padding: '1.4rem 1rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green-deep, #1b4332)', marginBottom: 4 }}>
                  {value}
                </div>
                <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLIPBOOK ── */}
      <section
        style={{
          background: 'var(--bg-alt, #f8f9f6)',
          borderTop: '1px solid var(--border, #eee)',
          borderBottom: '1px solid var(--border, #eee)',
          padding: '5rem 5vw',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow rv" style={{ justifyContent: 'center' }}>Interactive Viewer</div>
          <h2 className="st rv d1" style={{ marginTop: '0.5rem' }}>Company <em>Presentation</em></h2>
          <p
            className="rv d2"
            style={{ color: 'var(--muted)', maxWidth: 480, margin: '1rem auto 3rem', lineHeight: 1.7, fontSize: 15 }}
          >
            Click the book to open the interactive presentation and flip through our full company overview.
          </p>
          <div className="rv d3">
            <PdfFlipBook />
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS (same strip as Home / About) ── */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '5rem 5vw', textAlign: 'center' }}>
        <div className="eyebrow rv" style={{ justifyContent: 'center' }}>Certified Quality</div>
        <Image
          className="rv d1"
          src="/assets/logos-2.png"
          alt="Genesis Biotech Certifications"
          width={800}
          height={200}
          style={{ margin: '2rem auto 0', display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* ── FOOTER (identical to About / Home) ── */}
      <footer>
        <div className="ft">
          <div>
            <Image
              className="fl-logo"
              src="/assets/icon-4Asset-4@300x-300x94.webp"
              alt="Genesis Biotech"
              width={90}
              height={28}
            />
            <p className="fl-desc">
              Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.
            </p>
          </div>
          <div>
            <div className="fc-head">Navigation</div>
            <ul className="fl">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/product-applications">Product Applications</Link></li>
              <li><Link href="/advantages">Advantages</Link></li>
              <li><Link href="/datasheets">Datasheets</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="fc-head">Contact Us</div>
            <div className="fci"><span>Phone</span>+971 55 132 1079</div>
            <div className="fci"><span>General</span>romy@genesisbiotech.net</div>
            <div className="fci"><span>North America</span>northamerica@genesisbiotech.net</div>
          </div>
        </div>
        <div className="fb">
          <div className="fb-copy">Genesis Biotech © 2025 · All Rights Reserved</div>
          <div className="fb-copy">Premium Gelatin · Straight from the Source of the Nile</div>
        </div>
      </footer>
    </>
  )
}
