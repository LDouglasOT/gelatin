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

      {/* ── PAGE HERO ── */}
      <section id="products-apps">
        <div className="hero-bg" />
        <div className="" style={{width:"100%", display:"flex",alignItems:"center", justifyContent:"center"}}>
          <div className="page-title rv" style={{width:"100%", marginLeft:"auto",marginRight:"auto"}}>Product Application</div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="products-intro">
        <div className="pi-container">
          <h2 className="rv" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>What Our High Quality Gelatin Can Do</h2>
       </div>
      </section>

      {/* ── PRODUCTS MAIN ── */}
      <section id="products-main">
        {/* Pharmaceuticals */}
        <div className="pm-row rv">
          <div className="pm-image">
            <Image src="/assets/etactics-inc-tNjUkPNL-00-unsplash.jpg" alt="Pharmaceuticals" width={600} height={600} className="pm-img" />
          </div>
          <div className="pm-content">
            <div className="pm-cat">Medical · Healthcare</div>
            <h2 className="pm-title" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Pharmaceuticals</h2>
            <p className="pm-desc">Benefit from precise drug delivery and safety ensured by our gelatin products, a crucial element in pharmaceutical formulations. Our gelatin meets BP and USP pharmacopeial standards for hard and soft capsules, tablet coatings, plasma expanders, and wound dressings.</p>
          </div>
        </div>

        {/* Collagen */}
        <div className="pm-row pm-row-reverse rv">
          <div className="pm-image">
            <Image src="/assets/alexandra-tran-bgGpNDqVEyo-unsplash.jpg" alt="Collagen" width={600} height={420} className="pm-img" style={{ objectFit: 'contain', background: 'var(--cream)', padding: '2rem' }} />
          </div>
          <div className="pm-content">
            <div className="pm-cat">Beauty · Wellness</div>
            <h2 className="pm-title" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Collagen</h2>
            <p className="pm-desc">Experience the natural benefits of collagen for healthy skin, hair, and joints. Our premium hydrolyzed collagen peptides are ideal for skincare, anti-aging formulations, nutraceuticals, and functional beauty supplements.</p>
          </div>
        </div>

        {/* Food & Confectionary */}
        <div className="pm-row rv">
          <div className="pm-image">
            <Image src="/assets/richard-multimedia-SE-vq-Qp6Uo-unsplash.jpg" alt="Food & Confectionary" width={600} height={400} className="pm-img" />
          </div>
          <div className="pm-content">
            <div className="pm-cat">Food · Confectionary</div>
            <h2 className="pm-title" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Food &amp; Confectionary</h2>
            <p className="pm-desc">Enjoy the enhanced texture and taste of your products, from desserts to gummy candies, thanks to our high-quality gelatin. Perfect for gummies, marshmallows, jellies, dairy stabilizers, and desserts — delivering perfect texture, clarity, and mouthfeel every time.</p>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="products-benefits">
        <div className="pb-container">
         <h2 className="pb-head rv" style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Benefits</h2>
         <br />
         <br />
          <div className="pb-grid">
            <div className="pb-card rv d1">
              <Image
                src="/assets/Taking-care-of-your-bones-and-joints-with-gelatin-150x150-1.webp"
                alt="Taking care of your bones and joints"
                width={200}
                height={200}
                className="pb-im"
              />
              <h3 className="pb-title">Taking care of your bones and joints</h3>
              <p className="pb-desc">Gelatin contains multiple amino acids that are proven to help prevent joint cartilage erosion and weakening.</p>
            </div>
            <div className="pb-card rv d2">
              <Image
                src="/assets/Gelatin-for-better-digestion-150x150-1.webp"
                alt="Better Digestion"
                width={200}
                height={200}
                className="pb-im"
              />
              <h3 className="pb-title">Better Digestion</h3>
              <p className="pb-desc">Gelatin's natural bond with water eases the food's movement through the digestive system, supporting gut health.</p>
            </div>
            <div className="pb-card rv d3">
              <Image
                src="/assets/Stronger-and-prettier-nails-hair-and-skin.png"
                alt="Stronger nails, hair and skin"
                width={200}
                height={200}
                className="pb-im"
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
          Ready to source the world's finest gelatin?<br />
          <em>Contact us today to request a sample or quotation.</em>
        </div>
        <div style={{ textAlign: 'center',  marginTop: '2.5rem', position: 'relative', zIndex: 1 }}>
          <Link href="/contact" style={{borderWidth:"2px",borderColor:"white",borderStyle:"solid",borderRadius:"3px"}} className="btn-g">Get in Touch</Link>
        </div>
      </div>
          <hr />
      {/* ── FOOTER ── */}
       <footer style={{color:"white", backgroundColor:"#2877A7"}}>
        <div className="ft">
          <div>
            <Image  style={{color:"white", backgroundColor:"#2877A7"}} className="fl-logo" src="/assets/icon-4Asset-4@300x-300x94.webp" alt="Genesis Biotech" width={100} height={32} />
            <p  style={{color:"white", backgroundColor:"#2877A7"}} className="fl-desc">Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
          </div>
          <div>
            <div  style={{color:"white", backgroundColor:"#2877A7"}} className="fc-head">Navigation</div>
            <ul  style={{color:"white", backgroundColor:"#2877A7"}} className="fl">
              <li><Link href="/about"  style={{color:"white", backgroundColor:"#2877A7"}}>About</Link></li>
              <li><Link href="/product-applications"  style={{color:"white", backgroundColor:"#2877A7"}}>Product Application</Link></li>
              <li><a href="#advantages"  style={{color:"white", backgroundColor:"#2877A7"}}>Benefits</a></li>
              <li><a href="/"  style={{color:"white", backgroundColor:"#2877A7"}}>Home</a></li>
              <li><a href="#contact"  style={{color:"white", backgroundColor:"#2877A7"}}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <div className="fc-head"  style={{color:"white", backgroundColor:"#2877A7"}}>Contact Us</div>
            <div className="fci"  style={{color:"white", backgroundColor:"#2877A7"}}><span  style={{color:"white", backgroundColor:"#2877A7"}}>Phone</span>+971 55 132 1079</div>
            <div className="fci"  style={{color:"white", backgroundColor:"#2877A7"}}><span  style={{color:"white", backgroundColor:"#2877A7"}}>General</span>romy@genesisbiotech.net</div>
            <div className="fci"  style={{color:"white", backgroundColor:"#2877A7"}}><span  style={{color:"white", backgroundColor:"#2877A7"}}>North America</span>northamerica@genesisbiotech.net</div>
          </div>
        </div>
        <div className="fb">
          <div className="fb-copy"  style={{color:"white", backgroundColor:"#2877A7"}}>Genesis Biotech © 2025 · All Rights Reserved</div>
          <div className="fb-copy"  style={{color:"white", backgroundColor:"#2877A7"}}>Premium Gelatin · Straight from the Source of the Nile</div>
        </div>
      </footer>
    </>
  )
}
