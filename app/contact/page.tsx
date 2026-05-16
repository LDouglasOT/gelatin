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
          background: 'rgb(40, 119, 167)', padding: '2rem',
          backdropFilter: 'blur(24px)',
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
          <div className="page-title rv">Product Applications</div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-img rv">
            <Image src="/assets/iconAsset_resized-100-X-100-px.webp" alt="Genesis Biotech" width={180} height={180} />
          </div>
          <div className="story-content">
            <h2 className="st rv d1" style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px', marginLeft: 'auto', marginRight: 'auto' }}>
              What Our High Quality Gelatin Can Do.
            </h2>
            <br />
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <span className="story-year" style={{ color: 'rgb(40, 119, 167)' }}>Applications</span>
              <span className="story-label" style={{ fontSize: '15px' }}>Three Major Industries</span>
            </div>
            <p className="rv d2" style={{ fontSize: '19px' }}>
              Genesis Biotech produces premium gelatin serving three major industries — pharmaceutical, cosmetic, and food &amp; confectionary — with consistent quality, compliance, and care.
            </p>
            <p className="rv d3" style={{ fontSize: '19px' }}>
              Extensive knowledge, advanced equipment, and novelty enable us to produce high-level gelatin for various food-grade, pharmaceutical, and collagen applications.
            </p>
          </div>
        </div>
      </section>

      {/* ── PHARMACEUTICALS ── */}
      <section className="source-section">
        <div className="source-inner">
          <div className="eyebrow rv" style={{ color: 'rgb(40, 119, 167)', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px' }}>Medical · Healthcare</div>
          <div className="source-grid">
            <div className="source-card rv d1">
              <h3>Pharmaceuticals</h3>
              <p style={{ fontSize: '19px' }}>
                Benefit from precise drug delivery and safety ensured by our gelatin products, a crucial element in pharmaceutical formulations.
              </p>
              <p style={{ fontSize: '19px' }}>
                Our gelatin meets BP and USP pharmacopeial standards for hard and soft capsules, tablet coatings, plasma expanders, and wound dressings.
              </p>
            </div>
            <div className="source-img rv d2">
              <Image
                src="/assets/spoons-with-pills-scaled.jpg"
                alt="Pharmaceuticals"
                width={600}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLAGEN ── */}
      <section className="factory-section">
        <div className="factory-inner">
          <div className="eyebrow rv" style={{ color: 'rgb(40, 119, 167)', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px' }}>Beauty · Wellness</div>
          <h2 className="st rv d1">Collagen</h2>
          <p className="factory-intro rv d2" style={{ fontSize: '19px' }}>
            Experience the natural benefits of collagen for healthy skin, hair, and joints. Our premium hydrolyzed collagen peptides are ideal for skincare, anti-aging formulations, nutraceuticals, and functional beauty supplements.
          </p>
          <div className="factory-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '520px', margin: '0 auto' }}>
            <div className="fact-img rv d1">
              <Image src="/assets/face-cream.png" alt="Collagen" width={520} height={400} style={{ objectFit: 'contain', background: 'var(--cream)', padding: '2rem', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOD & CONFECTIONARY ── */}
      <section className="source-section">
        <div className="source-inner">
          <div className="eyebrow rv" style={{ color: 'rgb(40, 119, 167)', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px' }}>Food · Confectionary</div>
          <div className="source-grid">
            <div className="source-card rv d1">
              <h3>Food &amp; Confectionary</h3>
              <p style={{ fontSize: '19px' }}>
                Enjoy the enhanced texture and taste of your products, from desserts to gummy candies, thanks to our high-quality gelatin.
              </p>
              <p style={{ fontSize: '19px' }}>
                Perfect for gummies, marshmallows, jellies, dairy stabilizers, and desserts — delivering perfect texture, clarity, and mouthfeel every time.
              </p>
            </div>
            <div className="source-img rv d2">
              <Image
                src="/assets/assortment-multi-colored-marmalades-scaled.jpg"
                alt="Food & Confectionary"
                width={600}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HEALTH BENEFITS ── */}
      <section className="products-section">
        <div className="products-inner">
          <div className="eyebrow rv" style={{ color: 'rgb(40, 119, 167)', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px' }}>Health Benefits</div>
          <h2 className="st rv d1">Benefits of Gelatin</h2>
          <div className="products-grid">
            <div className="prod-card rv d1">
              <Image
                src="/assets/Taking-care-of-your-bones-and-joints-with-gelatin-150x150-1.webp"
                alt="Bones and Joints"
                width={200}
                height={200}
              />
              <div className="prod-card-content">
                <div className="pcat" style={{ color: 'rgb(40, 119, 167)' }}>Structural Health</div>
                <h3>Taking care of your bones and joints</h3>
                <p style={{ fontSize: '19px' }}>Gelatin contains multiple amino acids that are proven to help prevent joint cartilage erosion and weakening.</p>
              </div>
            </div>
            <div className="prod-card rv d2">
              <Image
                src="/assets/Gelatin-for-better-digestion-150x150-1.webp"
                alt="Better Digestion"
                width={200}
                height={200}
              />
              <div className="prod-card-content">
                <div className="pcat" style={{ color: 'rgb(40, 119, 167)' }}>Gut Health</div>
                <h3>Better Digestion</h3>
                <p style={{ fontSize: '19px' }}>Gelatin's natural bond with water eases the food's movement through the digestive system, supporting gut health.</p>
              </div>
            </div>
            <div className="prod-card rv d3">
              <Image
                src="/assets/Stronger-and-prettier-nails-hair-and-skin.png"
                alt="Nails, Hair and Skin"
                width={200}
                height={200}
              />
              <div className="prod-card-content">
                <div className="pcat" style={{ color: 'rgb(40, 119, 167)' }}>Beauty</div>
                <h3>Stronger and prettier nails, hair and skin</h3>
                <p style={{ fontSize: '19px' }}>Gelatin enhances the look of the skin, strengthens the hair roots, reinforces thin brittle nails, and smooths out wrinkles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="factory-section" style={{ textAlign: 'center' }}>
        <div className="factory-inner">
          <h2 className="st rv d1">Ready to Source the World's Finest Gelatin?</h2>
          <p className="factory-intro rv d2" style={{ fontSize: '19px' }}>
            Contact us today to request a sample or quotation for Halal &amp; Kosher certified gelatin.
          </p>
          <div className="rv d3" style={{ marginTop: '2.5rem' }}>
            <Link href="/contact" className="btn-g">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS STRIP ── */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '5rem 5vw', textAlign: 'center' }}>
        <div className="eyebrow rv" style={{ justifyContent: 'center', color: 'rgb(40, 119, 167)', fontSize: '20px', fontWeight: 'bold' }}>Certified Quality</div>
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