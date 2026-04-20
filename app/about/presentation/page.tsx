'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PDFViewer from '@/components/PDFViewer'

export default function Presentation() {
  const navRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('solid', window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav id="nav" ref={navRef}>
        <Link href="/" className="nav-logo">
          <Image
            src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={102}
            height={32}
            style={{ height: 34 }}
          />
        </Link>
        <ul className="nav-links" style={menuOpen ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: 78, left: 0, right: 0, background: 'rgba(11,29,18,.97)', backdropFilter: 'blur(18px)', padding: '2rem', gap: '1.5rem', borderBottom: '1px solid rgba(78,160,100,.2)', zIndex: 899 } : undefined}>
          <li className="has-sub">
            <Link href="/about">About</Link>
            <ul className="sub-nav">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/about/presentation">Presentation</Link></li>
            </ul>
          </li>
          <li><Link href="/#products">Product Applications</Link></li>
          <li><Link href="/#advantages">Advantages</Link></li>
          <li><Link href="/#datasheets">Datasheets</Link></li>
          <li><Link href="/#contact" className="nav-cta">Contact Us</Link></li>
        </ul>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-inner">
          <div className="eyebrow rv">About</div>
          <h1 className="page-title rv d1">Presentation</h1>
        </div>
      </section>

      <section className="presentation-section">
        <div className="pres-inner">
          <div className="pres-card rv">
            <PDFViewer />
          </div>
          <div className="pres-actions rv d1">
            <a
              href="https://genesisbiotech.net/wp-content/uploads/2024/07/Genesis-biotech-presentation-4.pdf"
              download
              className="btn-g"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="ft">
          <div>
            <Image
              className="fl-logo"
              src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-4Asset-4@300x-300x94.webp"
              alt="Genesis Biotech"
              width={90}
              height={28}
            />
            <p className="fl-desc">Premium Halal & Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
          </div>
          <div>
            <div className="fc-head">Navigation</div>
            <ul className="fl">
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#products">Product Applications</Link></li>
              <li><Link href="/#advantages">Advantages</Link></li>
              <li><Link href="/#datasheets">Datasheets</Link></li>
              <li><Link href="/">Contact Us</Link></li>
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
