'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HeroSlider from './HeroSlider'
import QualitySection from './components/QualitySection'
import PrimeProductSection from './components/Offers'
import Datasheet from './components/Datasheets'

export default function Home() {
  const navRef = useRef<HTMLDivElement>(null)
  const [formSent, setFormSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [loadPct, setLoadPct] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Page loader
  useEffect(() => {
    let pct = 0
    const iv = setInterval(() => {
      pct += Math.random() * 22 + 8
      if (pct >= 100) {
        pct = 100
        clearInterval(iv)
        setTimeout(() => setLoaded(true), 300)
      }
      setLoadPct(Math.min(Math.round(pct), 100))
    }, 110)
    return () => clearInterval(iv)
  }, [])

  // Custom cursor
  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }

    let af: number
    const animate = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      af = requestAnimationFrame(animate)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isLink = t.closest('a, button, [data-cursor]')
      dot.classList.toggle('active', !!isLink)
      ring.classList.toggle('active', !!isLink)
    }

    af = requestAnimationFrame(animate)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(af)
    }
  }, [])

  // Nav scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('solid', window.scrollY > 60)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reveal on scroll
  useEffect(() => {
    if (!loaded) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-scale').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loaded])

  // Counter animation
  useEffect(() => {
    if (!loaded) return
    const counters = document.querySelectorAll('[data-count]')
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-count') || '0', 10)
      let start = 0
      const step = target / 60
      const iv = setInterval(() => {
        start = Math.min(start + step, target)
        el.textContent = Math.round(start).toString()
        if (start >= target) clearInterval(iv)
      }, 24)
    })
  }, [loaded])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => setFormSent(false), 6000)
  }

  const advantages = [
    { icon: '🌿', title: 'Pure Source Environments', body: 'Sourced exclusively from pollution-free regions along the Nile basin — pristine habitats with zero industrial contamination and abundant natural vitality.' },
    { icon: '🏅', title: 'Halal & Kosher Certified', body: 'All products carry internationally recognized Halal and Kosher certifications, meeting the most stringent dietary and compliance requirements worldwide.' },
    { icon: '🔬', title: 'Pharmaceutical Grade', body: 'Fully compliant with BP and USP pharmacopeial grades — meeting the most exacting quality requirements for medical and nutraceutical applications.' },
    { icon: '🤝', title: 'Lasting Partnerships', body: 'We nurture long-term relationships built on transparency, trust, and shared commitment to quality with every client, partner, supplier, and community we serve.' },
  ]

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      {/* Page loader */}
      <div className={`loader ${loaded ? 'hidden' : ''}`}>
        <Image
          className="loader-logo"
          src="/assets/icon-4Asset-4@300x-300x94.webp"
          alt="Genesis Biotech"
          width={90}
          height={28}
        />
        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
        <div className="loader-num">{loadPct}%</div>
      </div>

      {/* NAV */}
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
          backdropFilter: 'blur(24px)',
          padding: '2rem', gap: '1.5rem',
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

      {/* HERO */}
      <section id="s">
        <HeroSlider />
      </section>

      {/* MARQUEE */}
      <div className="marquee" style={{backgroundColor:"rgb(40, 119, 167)"}}>
        <div className="mtrack">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3rem' }}>
              {['Halal Certified','Kosher Certified','Pharmaceutical Grade','Bovine Gelatin','Collagen','Food & Confectionary','Global Distribution','Source of the Nile','Pollution-Free Environments'].map(t => (
                <div key={t} className="mi" style={{color:"white"}}><div className="mdot" style={{color:"white"}} />{t}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

    <section id="about" style={{ background: '#fff', padding: 0 }}>
      <style>{`
        /* ── LAYOUT ────────────────────────────────────────── */
        .about-layout {
          display: grid;
          grid-template-columns: 90px 1fr 1fr;
          gap: 0;
          width: 100%;
          align-items: stretch;
          height: 900px;
        }

        /* ── LEFT COL: rotated year ────────────────────────── */
        .about-year-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 0;
          background: #fff;
          border-right: 1px solid rgba(8,15,9,.06);
        }

        .about-year-text {
          font-family: 'Gotham', 'DM Sans', sans-serif;
          font-size: 96px;
          font-weight: 900;
          color: #2877A7;
          line-height: 1;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: -0.03em;
          user-select: none;
        }

        /* ── CENTRE COL: text ──────────────────────────────── */
        .about-text-col {
          padding: clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.6rem;
          background: #fff;
        }

        .about-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #1db47b;
          margin: 0;
        }

        .about-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.25rem, 2.4vw, 1.65rem);
          font-weight: 700;
          color: #080f09;
          line-height: 1.4;
          margin: 0;
        }

        .about-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.08rem);
          font-weight: 300;
          color: rgba(8,15,9,.62);
          line-height: 1.9;
          margin: 0;
        }

        /* hidden body text shown only when expanded */
        .about-body-extra {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.08rem);
          font-weight: 300;
          color: rgba(8,15,9,.62);
          line-height: 1.9;
          margin: 0;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
        }

        .about-body-extra.visible {
          max-height: 300px;
          opacity: 1;
        }

        .about-read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #080f09;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: color 0.25s, gap 0.25s;
          margin-top: 0.25rem;
          text-decoration: none;
        }

        .about-read-more:hover {
          color: #1db47b;
        }

        .about-read-more .arrow {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .about-read-more.open .arrow {
          transform: rotate(90deg);
        }

        /* ── RIGHT COL: stacked images ─────────────────────── */
        .about-images-col {
          display: grid;
          grid-template-rows: 1fr 1fr;
          overflow: hidden;
        }

        .about-img-wrap {
          overflow: hidden;
          position: relative;
        }

        .about-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }

        .about-img-wrap:hover img {
          transform: scale(1.05);
        }

        /* subtle dark overlay on images */
        .about-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,15,9,.08) 0%,
            rgba(8,15,9,.28) 100%
          );
          pointer-events: none;
        }

        /* ── TABLET ────────────────────────────────────────── */
        @media (max-width: 960px) {
          .about-layout {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            height: auto;
          }

          /* hide year col on tablet/mobile */
          .about-year-col {
            display: none;
          }

          .about-text-col {
            padding: 3rem 2rem;
            gap: 1.4rem;
          }

          /* images side-by-side on tablet */
          .about-images-col {
            grid-template-rows: none;
            grid-template-columns: 1fr 1fr;
            height: 320px;
          }
        }

        /* ── MOBILE ────────────────────────────────────────── */
        @media (max-width: 600px) {
          .about-text-col {
            padding: 2.5rem 1.5rem;
            gap: 1.2rem;
          }

          .about-heading {
            font-size: 1.3rem;
          }

          .about-body {
            font-size: 1rem;
          }

          /* stack images vertically on mobile, square-ish */
          .about-images-col {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
            height: 480px;
          }
        }
      `}</style>

      <div className="about-layout">

        {/* ── Col 1: Year (desktop only) ── */}
        <div className="about-year-col">
          <span className="about-year-text">2018</span>
        </div>

        {/* ── Col 2: Text ── */}
        <div className="about-text-col">
          <p className="about-eyebrow">Since 2018</p>

          <p className="about-heading rv d1">
            Bringing the world's finest gelatin — sourced from pristine Nile basin environments — to
            discerning global markets.
          </p>

          {/* always visible body */}
          <p className="about-body rv d2">
            Genesis Biotech embodies the essence of natural selection. Our partners and clients
            favor products from pristine, pollution-free environments pulsating with pure, vital
            energy.
          </p>

          {/* hidden until expanded */}
          <p className={`about-body-extra rv d3${expanded ? ' visible' : ''}`}>
            We nurture lasting relationships with clients, partners, suppliers, employees, and our
            community — building trust at every link in the supply chain. Our founding values are
            integrity and reliability, while our unceasing commitment to improvement drives our
            mission forward.
          </p>

          <p className={`about-body-extra rv d4${expanded ? ' visible' : ''}`}>
            Our factory operates to the highest international standards, supervised and monitored
            24×7. We produce both Halal &amp; Kosher Bovine Gelatin and Kosher Fish Gelatin, each
            in the highest purity and bloom values — serving pharmaceutical, collagen, and food
            industries worldwide.
          </p>

          <button
            className={`about-read-more rv d5${expanded ? ' open' : ''}`}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Read more'}
            <span className="arrow">→</span>
          </button>
        </div>

        {/* ── Col 3: Stacked images ── */}
        <div className="about-images-col rv-scale d2">
          <div className="about-img-wrap">
            <Image
              src="/assets/arrangement-various-turkish-delight-flavors-wooden-board-marble-table.jpg"
              alt="Turkish delight assortment"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="about-img-wrap">
            <Image
              src="/assets/medications-blue.jpg"
              alt="Pharmaceutical gelatin capsules"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

      </div>
    </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="prod-hdr">
          <div style={{"color":"#2877A7", display: 'flex',flexDirection: 'column', justifyContent:"center", "alignItems":"center", "gap": '0.5ch', flexWrap: 'wrap', width: '100%'}}>
          <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"start", gap:"0.5ch"}}>
            <div className="" style={{fontSize:"18px", color:"black" ,marginLeft:"auto", marginRight:"auto",padding:"0px",marginTop:"-10px"}}>Product Application</div>
            </div>
          </div>
        </div>
        <div className="prod-grid rv-scale">
          {[
            { num: '01', cat: 'Medical · Healthcare', name: 'Pharmaceuticals', img: '/assets/etactics-inc-tNjUkPNL-00-unsplash.jpg', desc: 'Hard and soft capsules, tablet coatings, plasma expanders, and wound dressings — manufactured to BP and USP pharmacopeial standards.' },
            { num: '02', cat: 'Beauty · Wellness', name: 'Collagen', img: '/assets/alexandra-tran-bgGpNDqVEyo-unsplash.jpg', desc: 'Premium hydrolyzed collagen peptides for skincare, anti-aging formulations, nutraceuticals, and functional beauty supplements.', contain: true },
            { num: '03', cat: 'Food · Confectionary', name: 'Food &\nConfectionary', img: '/assets/richard-multimedia-SE-vq-Qp6Uo-unsplash.jpg', desc: 'Gummies, marshmallows, jellies, dairy stabilizers, and desserts — our gelatin delivers perfect texture, clarity, and mouthfeel every time.' },
          ].map(p => (
            <div key={p.num} className="pc">
              
              <Image className={`pc-img${p.contain ? ' contain' : ''}`} src={p.img} alt={p.name} width={400} height={533} />
              <div className="pc-ov">
                <div className="pc-n">{p.num}</div>
                <div className="pc-cat">{p.cat}</div>
                <div className="pc-name">{p.name.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</div>
                <div className="pc-desc">
                  <a href="contact" className="btn-primary">Request Sample</a>
                </div>
                
              </div>
            </div>
          ))}
        </div>
     
      </section>
<PrimeProductSection/>
 {/* FOOTPRINT */}
      <section id="footprint" style={{}}>
        <div className='footwrapper' style={{}}>
        <div className='ladyb'>
           <div style={{ "color":"#2877A7",fontSize:"32px",letterSpacing:"0.01em",fontWeight:"bold" }} >Our Footprint</div>
        </div>
        <br />
        <br />
        <p className="" style={{"color":"black",}}>From the heart of Africa to markets across the globe — supplying premium gelatin wherever quality is demanded.</p> 
        </div>
      <br />
       <br />
        <br />
       <div>
         <div className="map-wrap rv-scale">
          <img src="/assets/without-wordingsAsset-4world-map-768x391.webp" alt="Genesis Biotech Global Footprint" />
        </div>
         <br />
       <br />
        <br />
        <div className="regions rv d2" style={{"color":"#2877A7",}}>
          {['Africa','Middle East','Europe','North America','Asia Pacific'].map(r => (
            <div key={r} className="region" style={{"color":"#2877A7",}}><div className="rdot" style={{"color":"#2877A7",}}/>{r}</div>
          ))}
        </div>

       </div>
       
      </section>
      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { num: '6', suffix: '+', label: 'Years of Excellence' },
            { num: '5', suffix: '', label: 'continents' },
            { num: '100', suffix: '%', label: 'Halal & Kosher Verified' },
            { num: '280', suffix: 'g', label: 'Max Bloom Strength' },
          ].map((s, i) => (
            <div key={i} className="stat-item rv" style={{ transitionDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center', gap: '0.4rem' }}>
              <span className="stat-num">
                <span data-count={s.num}>0</span><span style={{fontSize:"20px", marginBottom:"100px",padding:"0px"}}>{s.suffix}</span> 
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ADVANTAGES */}
      <section id="advantages">
        <div  style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",}}>
          <div style={{display:"flex",alignItems:"start",justifyContent:"start", flexDirection:"column"}}>
          <div className="" style={{fontSize:"18px", color:"#black" ,marginLeft:"auto", marginRight:"auto",padding:"0px",marginTop:"0px",marginBottom:"0px"}}>Benefits</div>
          </div>
           <div className="adv-grid">
            {advantages.map((a, i) => (
              <div key={i} className={`ac rv d${i + 1}`}>
                <div className="ac-title">{a.title}</div>
                <div className="ac-body">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
          <Datasheet />

      {/* DATASHEETS */}
      {/* <section id="datasheets">
        <div className="ds-wrap">

          <div style={{display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
             <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",}}>
                <div className="techdoc" >Technical Documentation</div>
                <div className="" style={{fontSize:"18px", color:"#black" ,marginLeft:"auto", marginRight:"auto",padding:"0px",marginTop:"0px",marginBottom:"0px"}}>Datasheets</div>
             </div>
 
          </div>

          <div className="ds-grid">
            <div className="dsc rv">
              <div className="dsc-thumb">
                <a href="/assets/bollatine-specsAsset-2world-map.webp" target="_blank" rel="noopener">
                  <Image src="/assets/bollatine-specsAsset-2world-map-1024x932.webp" alt="Bovine Gelatin Datasheet" width={156} height={190} />
                </a>
              </div>
              <div className="dsc-info">
                <div>
                  <div className="dsc-badge" style={{background:"#2877A7",color:"white", }}>Bovine · Halal &amp; Kosher</div>
                  <div className="dsc-title" >Halal &amp; Kosher<br />Bovine Gelatin</div>
                  <div className="dsc-specs" style={{color:"black", }}>Bloom: 100–280 g · Viscosity: 2.0–7.5 mPa·s<br />pH: 5.0–7.0 · Available in mesh grades</div>
                </div>
                <a href="/assets/bollatine-specsAsset-2world-map.webp" target="_blank" rel="noopener" className="dsc-dl" style={{color:"black", }}>View Datasheet ↗</a>
              </div>
            </div>
            <div className="dsc rv d2">
              <div className="dsc-thumb">
                <Image src="/assets/fish-specsAsset-3world-map-1024x932.webp" alt="Fish Gelatin Datasheet" width={156} height={190} />
              </div>
              <div className="dsc-info">
                <div>
                  <div className="dsc-badge" style={{background:"#2877A7",color:"white", }}>Marine · Kosher</div>
                  <div className="dsc-title">Kosher<br />Fish Gelatin</div>
                  <div className="dsc-specs" style={{color:"black", }}>Bloom: 100–250 g · Viscosity: 2.0–6.5 mPa·s<br />pH: 5.0–6.5 · Cold-soluble grades available</div>
                </div>
                <a href="/assets/fish-specsAsset-3world-map-1024x932.webp" target="_blank" rel="noopener" className="dsc-dl" style={{color:"black", }}>View Datasheet ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CERTIFICATIONS */}
      {/* <section id="" >
        <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column", gap:"2rem", marginLeft:"auto", marginRight:"auto" , marginTop:"4rem", marginBottom:"4rem"}}>
          <div  style={{"display":"flex",alignItems:"center", justifyContent:"center", flexDirection:'column'}}>
            <div>Quality &amp; Compliance</div>
            <h2 >Quality You Can <em>Trust.</em></h2>
            <p >Every batch of Genesis Biotech gelatin is produced under internationally recognized standards. Our certifications reflect our unwavering commitment to purity, safety, and compliance across global markets.</p>
            <p >We partner with independent certifying bodies to ensure full traceability from source to delivery — so you never have to guess about what's in your product.</p>
            <div>
              {['Halal Certified','Kosher Certified','ISO Compliant','GMP Verified'].map(c => (
                <div key={c} className="chip"><span className="chipdot" />{c}</div>
              ))}
            </div>
          </div>
          <div>
            <img src="/assets/logos-2.png" alt="Genesis Biotech Certifications"  />
          </div>
        </div>
      </section> */}
      <QualitySection />
         <hr />

      {/* FOOTER */}
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