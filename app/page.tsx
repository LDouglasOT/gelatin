'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HeroSlider from './HeroSlider'
import QualitySection from './components/QualitySection'

export default function Home() {
  const navRef = useRef<HTMLDivElement>(null)
  const [formSent, setFormSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [loadPct, setLoadPct] = useState(0)
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
      <section id="hero">
        <HeroSlider />
      </section>

      {/* MARQUEE */}
      <div className="marquee" style={{backgroundColor:"rgb(40, 119, 167)"}}>
        <div className="mtrack">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3rem' }}>
              {['Halal Certified','Kosher Certified','Pharmaceutical Grade','Bovine Gelatin','Fish Gelatin','Collagen','Food & Confectionary','Global Distribution','Source of the Nile','Pollution-Free Environments'].map(t => (
                <div key={t} className="mi" style={{color:"white"}}><div className="mdot" style={{color:"white"}} />{t}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{"backgroundImage":"url('./assets/pattern-gelatin03.webp')"}}>
       
        <div className="about-txt">
            <div className="eyebrow" style={{"color":"white", fontWeight:"bold", fontSize:"28px",lineHeight:"1.0", letterSpacing:"0.1em",padding:"0px", margin:"0px"}}>Our Story</div>
        <div style={{display: 'flex', justifyContent:"start", "alignItems":"start", "gap": '0.5ch', flexWrap: 'wrap', width: '100%'}} className="rv d1">
          <h2 className="st" style={{"color":"white", fontWeight:"medium", fontFamily:"Roboto medium"}}>The Essence of Natural Selection.</h2>
        </div>
       

          <div className="since-row rv d2" style={{"backgroundColor":"#2877a7;","color":"white"}}>
            <div className="since-num" style={{"color":"white", fontFamily:"gotham", fontWeight:"bold"}}>2018</div>
            <div className="since-copy" style={{"color":"white", fontFamily:"Roboto regular", fontSize:"16px"}}>Established to bring the world's finest Halal &amp; Kosher gelatin — sourced directly from pristine Nile basin environments — to discerning global markets.</div>
          </div>
          <p className="rv d2" style={{"color":"white","fontSize":"19px",padding:"0px", margin:"0px", lineHeight:"1.3"}}>Embodies the essence of natural selection. Our partners and clients favor products from pristine, pollution-free environments pulsating with pure, vital energy.</p>
          <p className="rv d3" style={{"color":"white","fontSize":"19px"}}>We nurture lasting relationships with clients, partners, suppliers, employees, and our community — building trust at every link in the supply chain.</p>
          <a href="/about"  style={{ display: 'inline-flex', color:"white", fontWeight:"bold",}}><span>Read More...</span></a>
        </div>

         <div className="about-vis rv-scale">
          <Image className="about-main" src="/assets/assortment-multi-colored-marmalades-scaled.jpg" alt="Genesis Biotech Products" width={500} height={600} />
          <Image className="about-accent" src="/assets/spoons-with-pills-scaled.jpg" alt="Pharmaceutical gelatin" width={300} height={300} />
          <div className="since-badge" style={{backgroundColor:"#1db47b", fontFamily:"Roboto regular"}}>
            <span className="sb-label" >Since</span>
            <span className="sb-year" style={{backgroundColor:"#1db47b", fontFamily:"Roboto regular", fontWeight:"bold"}}>2018</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="prod-hdr">
          <div style={{"color":"#2877A7", display: 'flex',flexDirection: 'column', justifyContent:"center", "alignItems":"center", "gap": '0.5ch', flexWrap: 'wrap', width: '100%'}}>
          <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"start", gap:"0.5ch"}}>
             <div className="" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>What We Offer</div>
             <div className="" style={{fontSize:"18px", color:"black" ,marginLeft:"auto", marginRight:"auto",padding:"0px",marginTop:"-10px"}}>Product Applications</div>
            </div>
          </div>
        </div>
        <div className="prod-grid rv-scale">
          {[
            { num: '01', cat: 'Medical · Healthcare', name: 'Pharmaceuticals', img: '/assets/spoons-with-pills-scaled.jpg', desc: 'Hard and soft capsules, tablet coatings, plasma expanders, and wound dressings — manufactured to BP and USP pharmacopeial standards.' },
            { num: '02', cat: 'Beauty · Wellness', name: 'Collagen', img: '/assets/face-cream.png', desc: 'Premium hydrolyzed collagen peptides for skincare, anti-aging formulations, nutraceuticals, and functional beauty supplements.', contain: true },
            { num: '03', cat: 'Food · Confectionary', name: 'Food &\nConfectionary', img: '/assets/assortment-multi-colored-marmalades-scaled.jpg', desc: 'Gummies, marshmallows, jellies, dairy stabilizers, and desserts — our gelatin delivers perfect texture, clarity, and mouthfeel every time.' },
          ].map(p => (
            <div key={p.num} className="pc">
              
              <Image className={`pc-img${p.contain ? ' contain' : ''}`} src={p.img} alt={p.name} width={400} height={533} />
              <div className="pc-ov">
                <div className="pc-n">{p.num}</div>
                <div className="pc-cat">{p.cat}</div>
                <div className="pc-name">{p.name.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</div>
                <div className="pc-desc">{p.desc}</div>
                
              </div>
            </div>
          ))}
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

      {/* SPEARHEAD */}
      <div className="spearhead">
        <div className="spearhead-inner rv" style={{fontFamily:"Georgia, serif",color:"#f9f7f4"}}>
          We offer our customers a prime product<br />
          <em style={{color:"#f9f7f4"}}>that represents the spearhead of the industry.</em>
        </div>
      </div>

      {/* ADVANTAGES */}
      <section id="advantages">
        <div  style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",}}>
          <div style={{display:"flex",alignItems:"start",justifyContent:"start", flexDirection:"column"}}>
          <div className="eyebrow rv" style={{"color":"#2877A7",fontSize:"28px",letterSpacing:"0.1em",margin:"0px!",padding:"0px"}}>Why Choose Us</div>
          <div className="" style={{fontSize:"18px", color:"#black" ,marginLeft:"auto", marginRight:"auto",padding:"0px",marginTop:"0px",marginBottom:"0px"}}>Our Advantages</div>
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

      {/* FOOTPRINT */}
      <section id="footprint" style={{}}>
        <div className='footwrapper' style={{}}>
        <div className='ladyb'>
           <div className="eyebrow" style={{ "color":"#2877A7",fontSize:"28px",letterSpacing:"0.01em",fontWeight:"bold" }}>Global Reach</div>
           <div className="footword" >Our Footprint</div>
        </div>
        <br />
        <p className="" style={{"color":"black",}}>From the heart of Africa to markets across the globe — supplying premium gelatin wherever quality is demanded.</p> 
        </div>
      
       <div>
         <div className="map-wrap rv-scale">
          <Image src="/assets/without-wordingsAsset-4world-map-768x391.webp" alt="Genesis Biotech Global Footprint" width={568} height={391} />
        </div>
        <div className="regions rv d2" style={{"color":"#2877A7",}}>
          {['Africa','Middle East','Europe','North America','Asia Pacific'].map(r => (
            <div key={r} className="region" style={{"color":"#2877A7",}}><div className="rdot" style={{"color":"#2877A7",}}/>{r}</div>
          ))}
        </div>

       </div>
       
      </section>

      {/* DATASHEETS */}
      <section id="datasheets">
        <div className="ds-wrap">

          <div style={{display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
             <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"start",}}>
                <div className="" style={{fontSize:"28px",color:"#2877A7",margin:"0px",fontWeight:"bold"}}>Technical Documentation</div>
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
      </section>

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
      

      {/* FOOTER */}
      <footer style={{color:"white"}}>
        <div className="ft">
          <div>
            <Image  style={{color:"white"}} className="fl-logo" src="/assets/icon-4Asset-4@300x-300x94.webp" alt="Genesis Biotech" width={100} height={32} />
            <p  style={{color:"white"}} className="fl-desc">Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
          </div>
          <div>
            <div  style={{color:"white"}} className="fc-head">Navigation</div>
            <ul  style={{color:"white"}} className="fl">
              <li><Link href="/about"  style={{color:"white"}}>About</Link></li>
              <li><Link href="/product-applications"  style={{color:"white"}}>Product Applications</Link></li>
              <li><a href="#advantages"  style={{color:"white"}}>Advantages</a></li>
              <li><a href="/"  style={{color:"white"}}>Home</a></li>
              <li><a href="#contact"  style={{color:"white"}}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <div className="fc-head"  style={{color:"white"}}>Contact Us</div>
            <div className="fci"  style={{color:"white"}}><span  style={{color:"white"}}>Phone</span>+971 55 132 1079</div>
            <div className="fci"  style={{color:"white"}}><span  style={{color:"white"}}>General</span>romy@genesisbiotech.net</div>
            <div className="fci"  style={{color:"white"}}><span  style={{color:"white"}}>North America</span>northamerica@genesisbiotech.net</div>
          </div>
        </div>
        <div className="fb">
          <div className="fb-copy"  style={{color:"white"}}>Genesis Biotech © 2025 · All Rights Reserved</div>
          <div className="fb-copy"  style={{color:"white"}}>Premium Gelatin · Straight from the Source of the Nile</div>
        </div>
      </footer>
    </>
  )
}