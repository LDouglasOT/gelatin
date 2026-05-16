'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import HeroSlider from '../HeroSlider'

const PdfFlipBook = dynamic(() => import('./presentation/PdfFlipBook'), {
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
  
      {/* ── NAV ── */}
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
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-inner">
          <div className="page-title rv">Our Presentation</div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-content">
            <h2 className="st rv d1" style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px', marginLeft: 'auto', marginRight: 'auto' }}>
              The Natural Selection.
            </h2>
            <br />
            <div className='overviewcomp' style={{ }}>
              <span className="story-year" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Company Overview</span>
              <span className="story-label" style={{ fontSize: '15px' }}>Interactive Presentation</span>
            </div>
            <p className="rv d2" style={{ fontSize: '19px' }}>
              Genesis Biotech embodies the essence of natural selection — premium gelatin and collagen products sourced from pristine, pollution-free environments pulsating with pure, vital energy.
            </p>
            <p className="rv d3" style={{ fontSize: '19px' }}>
              Explore our full company presentation below to learn about our products, certifications, global footprint, and commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="source-section">
        <div className="source-inner">
          <div style={{"color":"#2877A7",display:"flex",alignItems:"center", justifyContent:"center", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>
            At a Glance
          </div>
          <div className="source-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {[
              { value: '2018', label: 'Founded' },
              { value: 'Halal & Kosher', label: 'Certified' },
              { value: 'Global', label: 'Reach' },
              { value: 'Bovine & Fish', label: 'Product Lines' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`source-card rv d${i + 1}`}
                style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                  background: 'var(--white, #fff)',
                  borderRadius: '12px',
                  border: '1px solid var(--border, #e8ede6)',
                }}
              >
                <div style={{ fontSize: '22px', fontWeight: '700', color: 'rgb(40, 119, 167)', marginBottom: '0.5rem' }}>{value}</div>
                <div style={{ fontSize: '13px', color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLIPBOOK ── */}
      <section className="factory-section">
        <div className="factory-inner" style={{ textAlign: 'center' }}>
          <div style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>
            Interactive Viewer
          </div>
          <h2 className="st rv d1">Company Presentation</h2>
          <p className="factory-intro rv d2" style={{ fontSize: '19px' }}>
            Click the book to open the interactive presentation and flip through our full company overview.
          </p>
          <div className="rv d3" style={{ marginTop: '2rem' }}>
            <PdfFlipBook />
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS STRIP ── */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '5rem 5vw', textAlign: 'center' }}>
        <div style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Certified Quality</div>
        <img
          className="rv d1"
          src="/assets/logos-2.png"
          alt="Genesis Biotech Certifications"
          style={{ margin: '2rem auto 0', display: 'block', height: 'auto', width: '90%' }}
        />
      </div>
   <hr />
      {/* ── FOOTER ── */}
       <footer style={{color:"black", backgroundColor:"white"}}>
        <div className="ft">
          <div>
            <Image  style={{color:"black", backgroundColor:"white"}} className="fl-logo" src="/assets/icon-4Asset-4@300x-300x94.webp" alt="Genesis Biotech" width={100} height={32} />
            <p  style={{color:"black", backgroundColor:"white"}} className="fl-desc">Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
          </div>
          <div>
            <div  style={{color:"black", backgroundColor:"white"}} className="fc-head">Navigation</div>
            <ul  style={{color:"black", backgroundColor:"white"}} className="fl">
              <li><Link href="/about"  style={{color:"black", backgroundColor:"white"}}>About</Link></li>
              <li><Link href="/product-applications"  style={{color:"black", backgroundColor:"white"}}>Product Applications</Link></li>
              <li><a href="#advantages"  style={{color:"black", backgroundColor:"white"}}>Advantages</a></li>
              <li><a href="/"  style={{color:"black", backgroundColor:"white"}}>Home</a></li>
              <li><a href="#contact"  style={{color:"black", backgroundColor:"white"}}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <div className="fc-head"  style={{color:"black", backgroundColor:"white"}}>Contact Us</div>
            <div className="fci"  style={{color:"black", backgroundColor:"white"}}><span  style={{color:"black", backgroundColor:"white"}}>Phone</span>+971 55 132 1079</div>
            <div className="fci"  style={{color:"black", backgroundColor:"white"}}><span  style={{color:"black", backgroundColor:"white"}}>General</span>romy@genesisbiotech.net</div>
            <div className="fci"  style={{color:"black", backgroundColor:"white"}}><span  style={{color:"black", backgroundColor:"white"}}>North America</span>northamerica@genesisbiotech.net</div>
          </div>
        </div>
        <div className="fb">
          <div className="fb-copy"  style={{color:"black", backgroundColor:"white"}}>Genesis Biotech © 2025 · All Rights Reserved</div>
          <div className="fb-copy"  style={{color:"black", backgroundColor:"white"}}>Premium Gelatin · Straight from the Source of the Nile</div>
        </div>
      </footer>
    </>
  )
}