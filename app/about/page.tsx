'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
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
          <div className="eyebrow light rv">Our Story</div>
          <h1 className="page-title rv d1">About <em>Us</em></h1>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-img rv">
            <Image src="https://genesisbiotech.net/wp-content/uploads/2023/11/iconAsset_resized-100-X-100-px.webp" alt="Genesis Biotech" width={180} height={180} />
          </div>
          <div className="story-content">
            <h2 className="st rv d1">The Essence of<br /><em>Natural Selection.</em></h2>
            <div className="story-since rv d2">
              <span className="story-year">2018</span>
              <span className="story-label">Established</span>
            </div>
            <p className="rv d2">
              Genesis Biotech embodies the essence of natural selection. Our partners and clients favor products from pristine, pollution-free environments pulsating with pure, vital energy.
            </p>
            <p className="rv d3">
              We nurture lasting relationships with clients, partners, suppliers, employees, and our community. Our founding values are integrity and reliability, while our unceasing commitment to improvement drives our mission.
            </p>
          </div>
        </div>
      </section>

      {/* ── WATER SOURCE ── */}
      <section className="source-section">
        <div className="source-inner">
          <div className="eyebrow rv">Our Water Source</div>
          <div className="source-grid">
            <div className="source-card rv d1">
              <h3>Lake Victoria</h3>
              <p>
                Lake Victoria is the world's 2nd largest tropical lake in addition to its breathtaking beauty. It features other unique properties: its portable warm water (24–29°C) functions as a closed and pure biological ecosystem. 80% of the lake's water comes from pure rainfall, whereas the balance is provided by underground springs and rivers.
              </p>
              <p>
                Unlike seawater, which suffers from industrial pollution, Lake Victoria's water is one of the purest water bodies in the world, as there are very few industries around the huge lake.
              </p>
            </div>
            <div className="source-img rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/11/home.png"
                alt="Lake Victoria — the source"
                width={600}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTORY ── */}
      <section className="factory-section">
        <div className="factory-inner">
          <div className="eyebrow rv">Our Factory</div>
          <h2 className="st rv d1">World-Class<br /><em>Production</em></h2>
          <p className="factory-intro rv d2">
            Making gelatin is an intricate, sensitive process that requires cutting-edge professional and technological skills. Our production process abides by the highest standards: supervised and monitored 24×7. It guarantees the highest, world-leading sterilization and cleanliness of all of our facility's systems and overall high-quality products.
          </p>
          <div className="factory-grid">
            {[
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-5-1024x1024.png',
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-4-1024x1024.png',
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-3-1024x1024.png',
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-2-1024x1024.png',
            ].map((src, i) => (
              <div key={i} className={`fact-img rv d${i + 1}`}>
                <Image src={src} alt={`Genesis Biotech Factory ${i + 1}`} width={400} height={400} />
              </div>
            ))}
          </div>
          <div className="factory-features rv d2">
            <h4>Our factory leverages the optimal combination of:</h4>
            <div className="feat-list">
              {[
                'Proximity to a sustainable source of high-quality raw material',
                'Use of advanced know-how, novel and highly-efficient technology',
                'Ongoing development with up-to-date research',
                'Compliance with strict international standards and Kosher supervision',
                'Multinational management capabilities',
              ].map((f) => (
                <div key={f} className="feat-item"><span className="feat-dot" /><span>{f}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PRODUCTS ── */}
      <section className="products-section">
        <div className="products-inner">
          <div className="eyebrow rv">Our Products</div>
          <h2 className="st rv d1">Premium <em>Gelatin</em></h2>
          <p className="products-intro rv d2">
            Genesis Biotech produces both the Halal &amp; Kosher Bovine Gelatin and the Kosher Fish Gelatin in the highest quality, purity, and bloom values. Extensive knowledge, advanced equipment, and novelty enable us to produce high-level gelatin for various food-grade, pharmaceutical, and collagen applications.
          </p>
          <div className="products-grid">
            <div className="prod-card rv d1">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/11/cow-2Asset-2@300x.webp"
                alt="Halal & Kosher Bovine Gelatin"
                width={500}
                height={400}
              />
              <div className="prod-card-content">
                <div className="pcat">Halal &amp; Kosher Certified</div>
                <h3>Halal &amp; Kosher Bovine Gelatin</h3>
                <p>The fresh cow hides from the local Eastern African region provide a remarkable source of high-quality gelatin. Thanks to the region's unique climate and the cows' organic diet, the gelatin derived from these hides is known for its high protein content.</p>
              </div>
            </div>
            <div className="prod-card rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Nile-Perch.png"
                alt="Kosher Fish Gelatin — Nile Perch"
                width={400}
                height={400}
              />
              <div className="prod-card-content">
                <div className="pcat">Kosher Certified</div>
                <h3>Kosher Fish Gelatin</h3>
                <p>Nile Perch is considered an excellent source for the production of pure, high-quality gelatin. Unlike other fish, the Nile Perch of Lake Victoria benefits from a relatively warm environment; hence, the collagen produced from its thick skin has exceptionally high protein value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS STRIP ── */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '5rem 5vw', textAlign: 'center' }}>
        <div className="eyebrow rv" style={{ justifyContent: 'center' }}>Certified Quality</div>
          <Image
          className="rv d1"
          src="https://genesisbiotech.net/wp-content/uploads/2023/07/logos-2.png"
          alt="Genesis Biotech Certifications"
          width={800}
          height={200}
          style={{ margin: '2rem auto 0', display: 'block', width: '100%', height: 'auto' }}
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