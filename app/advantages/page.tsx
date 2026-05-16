'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Advantages() {
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

  const advantages = [
    {
      img: '/assets/Pure-Environment.png',
      title: 'Pure Environment',
      desc: 'Our natural and virginal environment, free from industrial pollution and chemicals, allows us to deliver the best product to boost our body with pure, vital energy.',
    },
    {
      img: '/assets/Best-Nutrition-_-Energy.png',
      title: 'Best Nutrition & Energy',
      desc: 'Boosts your body with pure, natural and vital energy, rich in zinc, iron, vitamin B12, and calcium, with exceptionally high protein values.',
    },
    {
      img: '/assets/We-Are-Green-_-Blue.png',
      title: 'Customization',
      desc: 'The combination of advanced and highly efficient technology alongside our personalized approach creates high customizability opportunities.',
    },
    {
      img: '/assets/Superior-Quality.png',
      title: 'Superior Quality',
      desc: 'Proximity to a source of high-quality raw material and a supervised high-technology factory ensures products of the highest quality.',
    },
    {
      img: '/assets/Best-Sustainability.png',
      title: 'Sustainability',
      desc: 'Our factory and supply chain sustainably source pure water in eco-friendly systems, protecting the pristine environments we depend on.',
    },
    {
      img: '/assets/Superior-Quality.png',
      title: 'International Standards & Certifications',
      desc: 'Compliance with the strictest international standards, and Kosher and Halal supervision across every batch we produce.',
    },
    {
      img: '/assets/Excellent-Relationships.png',
      title: 'Long Lasting Relationships',
      desc: 'Our multinational management capabilities and diverse workforce are dedicated to pursuing and maintaining mutually beneficial, long-lasting relationships.',
    },
  ]

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
          <div className="page-title rv">Our Advantages</div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-content">
            <h2 className="st rv d1" style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px', marginLeft: 'auto', marginRight: 'auto' }}>
              Built on Quality &amp; Trust.
            </h2>
            <br />
            <br />
            <div className='whyusclass'>
              <span className="story-year" style={{ color: 'rgb(40, 119, 167)' }}>Why Us</span>
           </div>
            <p className="rv d2" style={{ fontSize: '19px' }}>
              From pristine sourcing to sustainable practices, international certifications, and lasting partnerships — discover what makes Genesis Biotech the preferred gelatin supplier for discerning global markets.
            </p>
            <p className="rv d3" style={{ fontSize: '19px' }}>
              Every advantage we offer is rooted in our core values: integrity, reliability, and an unceasing commitment to improvement.
            </p>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES GRID ── */}
      <section className="source-section">
        <div className="source-inner">
          <div style={{ color: 'rgb(40, 119, 167)', fontSize: '30px', fontWeight: 'bold', letterSpacing: '0.1px',width:"100%", display:"flex",alignItems:"center", justifyContent:"center",margin:"10px" }}>
            What Sets Us Apart
          </div>

          {/* Pair rows */}
          {[0, 2, 4].map((start) => (
            <div key={start} className="source-grid" style={{ marginBottom: '4rem' }}>
              {advantages.slice(start, start + 2).map((a, i) => (
                <div key={a.title} className={`source-card rv d${i + 1}`} style={{ textAlign: 'center', padding: '2.5rem 2rem', background: 'var(--white, #fff)', borderRadius: '12px', border: '1px solid var(--border, #e8ede6)' }}>
                  <Image src={a.img} alt={a.title} width={120} height={120} style={{ margin: '0 auto 1.5rem', display: 'block' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'black', marginBottom: '1rem' }}>{a.title}</h3>
                  <p style={{ fontSize: '19px', lineHeight: '1.75' }}>{a.desc}</p>
                </div>
              ))}
            </div>
          ))}

          {/* Last card centered */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="rv d1" style={{ textAlign: 'center', padding: '2.5rem 2rem', background: 'var(--white, #fff)', borderRadius: '12px', border: '1px solid var(--border, #e8ede6)', maxWidth: '520px', width: '100%' }}>
              <Image src={advantages[6].img} alt={advantages[6].title} width={120} height={120} style={{ margin: '0 auto 1.5rem', display: 'block' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'black', marginBottom: '1rem' }}>{advantages[6].title}</h3>
              <p style={{ fontSize: '19px', lineHeight: '1.75' }}>{advantages[6].desc}</p>
            </div>
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
          style={{ margin: '2rem auto 0', display: 'block', width: '90%', height: 'auto', marginLeft:"auto", marginRight:"auto" }}
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