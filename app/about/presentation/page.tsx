'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

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
      <nav id="nav" ref={navRef}>
        <a href="#" className="nav-logo">
          <Image
            src="/assets/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={120}
            height={38}
            style={{ height: 36, width: 'auto' }}
            priority
          />
        </a>
        <ul className="nav-links" style={menuOpen ? {
          display: 'flex', flexDirection: 'column', position: 'fixed',
          top: 82, left: 0, right: 0,
          background: 'rgb(40, 119, 167)',
          backdropFilter: 'blur(24px)', padding: '2rem',
           gap: '1.5rem',
          borderBottom: '1px solid rgba(38,92,58,.12)', zIndex: 899,
        } : undefined}>
          <li className={`has-sub ${pathname.startsWith('/about') ? 'active' : ''}`}>
            <Link href="/about">About</Link>
            <ul className="sub-nav">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/about/presentation">Presentation</Link></li>
            </ul>
          </li>
          <li className={pathname === '/product-applications' ? 'active' : ''}><Link href="/product-applications">Product Applications</Link></li>
          <li className={pathname === '/advantages' ? 'active' : ''}><Link href="/advantages">Advantages</Link></li>
          <li className={pathname === '/' ? 'active' : ''}><Link href="/">Home</Link></li>
          <li><Link href="/contact" className="nav-cta">Contact Us</Link></li>
        </ul>
        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── PAGE HERO (same pattern as About) ── */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-inner">
          {/* Breadcrumb */}
          <div className="page-title rv d1">Company Overview</div>
          {/* style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}} */}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: '5rem 5vw', maxWidth: 1200, margin: '0 auto' }}>
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
            <h2 style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>The Natural Selection.</h2>
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
          <h2 style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Company <em>Presentation</em></h2>
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
        <div style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Certified Quality</div>
        <img
          className="rv d1"
          src="/assets/logos-2.png"
          alt="Genesis Biotech Certifications"
          style={{ margin: '2rem auto 0', display: 'block', width: '60%', height: 'auto', marginLeft:"auto", marginRight:"auto" }}
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
              <li><Link href="/">Home</Link></li>
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
