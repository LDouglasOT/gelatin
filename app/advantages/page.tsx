'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Advantages() {
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

  const advantages = [
    {
      img: 'https://genesisbiotech.net/wp-content/uploads/2023/07/Pure-Environment.png',
      title: 'Pure Environment',
      desc: 'Our natural and virginal environment, free from industrial pollution and chemicals, allows us to deliver the best product to boost our body with pure, vital energy.',
    },
    {
      img: 'https://genesisbiotech.net/wp-content/uploads/2023/07/Best-Nutrition-_-Energy.png',
      title: 'Best Nutrition & Energy',
      desc: 'Boosts your body with pure, natural and vital energy, rich in zinc, iron, vitamin B12, and calcium, with exceptionally high protein values.',
    },
    {
      img: 'https://genesisbiotech.net/wp-content/uploads/2023/07/We-Are-Green-_-Blue.png',
      title: 'Customization',
      desc: 'The combination of advanced and highly efficient technology alongside our personalized approach creates high customizability opportunities.',
    },
    {
      img: 'https://genesisbiotech.net/wp-content/uploads/2023/07/Superior-Quality.png',
      title: 'Superior Quality',
      desc: 'Proximity to a source of high-quality raw material and a supervised high-technology factory ensures products of the highest quality.',
    },
    {
      img: 'https://genesisbiotech.net/wp-content/uploads/2023/07/Best-Sustainability.png',
      title: 'Sustainability',
      desc: 'Our factory and supply chain sustainably source pure water in eco-friendly systems, protecting the pristine environments we depend on.',
    },
    {
      img: 'https://genesisbiotech.net/wp-content/uploads/2023/07/Superior-Quality.png',
      title: 'International Standards & Certifications',
      desc: 'Compliance with the strictest international standards, and Kosher and Halal supervision across every batch we produce.',
    },
  ]

  return (
    <>
      <nav id="nav" ref={navRef} className="solid">
        <Link href="/" className="nav-logo">
          <Image src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-3Asset-3@300x-300x94.webp" alt="Genesis Biotech" width={102} height={32} style={{ height: 34, width: 'auto' }} />
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
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></div>
      </nav>

      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-inner">
          <div className="eyebrow light rv">Why Choose Genesis Biotech</div>
          <h1 className="page-title rv d1">Our <em>Advantages</em></h1>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" style={{ paddingTop: '9rem', paddingBottom: '2rem' }}>
        <div className="adv-wrap">
          <div className="eyebrow rv">What Sets Us Apart</div>
          <h2 className="st rv d1" style={{ maxWidth: '520px' }}>Built on <em>Quality &amp; Trust</em></h2>
          <p className="rv d2" style={{ fontSize: '.97rem', lineHeight: '1.82', color: 'var(--text-2)', maxWidth: '620px', marginTop: '1.2rem' }}>
            From pristine sourcing to sustainable practices, international certifications, and lasting partnerships — discover what makes Genesis Biotech the preferred gelatin supplier for discerning global markets.
          </p>
        </div>
      </section>

      <section id="advantages-content">
        <div className="adv-container">
          {/* Rows of 2 */}
          {[0, 2, 4].map((start) => (
            <div key={start} className="adv-row">
              {advantages.slice(start, start + 2).map((a, i) => (
                <div key={a.title} className={`adv-card rv d${i + 1}`}>
                  <Image src={a.img} alt={a.title} width={231} height={231} className="adv-img" />
                  <h3 className="adv-title">{a.title}</h3>
                  <p className="adv-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          ))}

          {/* Centered last card */}
          <div className="adv-row adv-row-centered">
            <div className="adv-card adv-card-wide rv d3">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Excellent-Relationships.png"
                alt="Long Lasting Relationships"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">Long Lasting Relationships</h3>
              <p className="adv-desc">Our multinational management capabilities and diverse workforce are dedicated to pursuing and maintaining mutually beneficial, long-lasting relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERT STRIP ── */}
      <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5rem 5vw', textAlign: 'center' }}>
        <div className="eyebrow rv" style={{ justifyContent: 'center' }}>Our Certifications</div>
        <Image
          className="rv d1"
          src="https://genesisbiotech.net/wp-content/uploads/2023/07/logos-2.png"
          alt="Certifications"
          width={460}
          height={120}
          style={{ margin: '2rem auto 0', display: 'block', maxWidth: '100%' }}
        />
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="ft">
          <div>
            <Image className="fl-logo" src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-4Asset-4@300x-300x94.webp" alt="Genesis Biotech" width={90} height={28} />
            <p className="fl-desc">Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
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