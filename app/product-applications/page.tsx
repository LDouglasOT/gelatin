'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProductApplications() {
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
      <nav id="nav" ref={navRef} className="solid">
        <Link href="/" className="nav-logo">
          <Image src="/assets/icon-3Asset-3@300x-300x94.webp" alt="Genesis Biotech" width={102} height={32} style={{ height: 34, width: 'auto' }} />
        </Link>
        <ul className="nav-links" style={navMenuStyle}>
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
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></div>
      </nav>

      {/* ── PAGE HERO ── */}
      <section id="hero-products">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="eyebrow light rv">What We Offer</div>
          <h1 className="hero-title rv d1">Product <em>Applications</em></h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="products-intro">
        <div className="pi-container">
          <div className="eyebrow rv" style={{ justifyContent: 'center' }}>High Quality Gelatin</div>
          <h2 className="rv">What Our High Quality Gelatin Can Do</h2>
          <p className="rv d1">Genesis Biotech produces premium gelatin serving three major industries — pharmaceutical, cosmetic, and food &amp; confectionary — with consistent quality, compliance, and care.</p>
        </div>
      </section>

      {/* ── PRODUCTS MAIN ── */}
      <section id="products-main">
        {/* Pharmaceuticals */}
        <div className="pm-row rv">
          <div className="pm-image">
            <Image src="/assets/spoons-with-pills-scaled.jpg" alt="Pharmaceuticals" width={600} height={600} className="pm-img" />
          </div>
          <div className="pm-content">
            <div className="pm-cat">Medical · Healthcare</div>
            <h2 className="pm-title">Pharmaceuticals</h2>
            <p className="pm-desc">Benefit from precise drug delivery and safety ensured by our gelatin products, a crucial element in pharmaceutical formulations. Our gelatin meets BP and USP pharmacopeial standards for hard and soft capsules, tablet coatings, plasma expanders, and wound dressings.</p>
          </div>
        </div>

        {/* Collagen */}
        <div className="pm-row pm-row-reverse rv">
          <div className="pm-image">
            <Image src="/assets/face-cream.png" alt="Collagen" width={600} height={420} className="pm-img" style={{ objectFit: 'contain', background: 'var(--cream)', padding: '2rem' }} />
          </div>
          <div className="pm-content">
            <div className="pm-cat">Beauty · Wellness</div>
            <h2 className="pm-title">Collagen</h2>
            <p className="pm-desc">Experience the natural benefits of collagen for healthy skin, hair, and joints. Our premium hydrolyzed collagen peptides are ideal for skincare, anti-aging formulations, nutraceuticals, and functional beauty supplements.</p>
          </div>
        </div>

        {/* Food & Confectionary */}
        <div className="pm-row rv">
          <div className="pm-image">
            <Image src="/assets/assortment-multi-colored-marmalades-scaled.jpg" alt="Food & Confectionary" width={600} height={400} className="pm-img" />
          </div>
          <div className="pm-content">
            <div className="pm-cat">Food · Confectionary</div>
            <h2 className="pm-title">Food &amp; Confectionary</h2>
            <p className="pm-desc">Enjoy the enhanced texture and taste of your products, from desserts to gummy candies, thanks to our high-quality gelatin. Perfect for gummies, marshmallows, jellies, dairy stabilizers, and desserts — delivering perfect texture, clarity, and mouthfeel every time.</p>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="products-benefits">
        <div className="pb-container">
          <div className="eyebrow rv" style={{ justifyContent: 'center' }}>Health Benefits</div>
          <h2 className="pb-head rv">Benefits of Gelatin</h2>
          <div className="pb-grid">
            <div className="pb-card rv d1">
              <Image
                src="/assets/Taking-care-of-your-bones-and-joints-with-gelatin-150x150-1.webp"
                alt="Taking care of your bones and joints"
                width={100}
                height={100}
                className="pb-img"
              />
              <h3 className="pb-title">Taking care of your bones and joints</h3>
              <p className="pb-desc">Gelatin contains multiple amino acids that are proven to help prevent joint cartilage erosion and weakening.</p>
            </div>
            <div className="pb-card rv d2">
              <Image
                src="/assets/Gelatin-for-better-digestion-150x150-1.webp"
                alt="Better Digestion"
                width={100}
                height={100}
                className="pb-img"
              />
              <h3 className="pb-title">Better Digestion</h3>
              <p className="pb-desc">Gelatin's natural bond with water eases the food's movement through the digestive system, supporting gut health.</p>
            </div>
            <div className="pb-card rv d3">
              <Image
                src="/assets/Stronger-and-prettier-nails-hair-and-skin.png"
                alt="Stronger nails, hair and skin"
                width={100}
                height={100}
                className="pb-img"
              />
              <h3 className="pb-title">Stronger and prettier nails, hair and skin</h3>
              <p className="pb-desc">Gelatin enhances the look of the skin, strengthens the hair roots, reinforces thin brittle nails, and smooths out wrinkles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <div className="spearhead">
        <div className="spearhead-inner">
          Ready to source the world's finest Halal &amp; Kosher gelatin?<br />
          <em>Contact us today to request a sample or quotation.</em>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem', position: 'relative', zIndex: 1 }}>
          <Link href="/contact" className="btn-g">Get in Touch</Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="ft">
          <div>
            <Image className="fl-logo" src="/assets/icon-4Asset-4@300x-300x94.webp" alt="Genesis Biotech" width={90} height={28} />
            <p className="fl-desc">Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
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
