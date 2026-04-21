'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const navRef = useRef<HTMLDivElement>(null)
  const [formSent, setFormSent] = useState(false)
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => setFormSent(false), 5000)
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav id="nav" ref={navRef}>
        <a href="#" className="nav-logo">
          <Image
            src="/assets/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={102}
            height={32}
            style={{ height: 34, width: 'auto' }}
          />
        </a>
        <ul
          className="nav-links"
          style={
            menuOpen
              ? {
                  display: 'flex', flexDirection: 'column', position: 'fixed',
                  top: 78, left: 0, right: 0,
                  background: 'rgba(255,255,255,.98)',
                  backdropFilter: 'blur(18px)',
                  padding: '2rem', gap: '1.5rem',
                  borderBottom: '1px solid rgba(45,107,68,.14)', zIndex: 899,
                }
              : undefined
          }
        >
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
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <Image
            className="hero-icon"
            src="/assets/iconAsset_resized-100-X-100-px.webp"
            alt="Genesis Biotech"
            width={68}
            height={68}
          />
          <div className="eyebrow light">Premium Gelatin · Est. 2018</div>
          <h1 className="hero-title">
            Gelatin
            <em>Straight from<br />the Source of the Nile.</em>
          </h1>
          <Image
            className="hero-phrase"
            src="/assets/phrase-1Asset-2@300x-1024x66.webp"
            alt=""
            width={520}
            height={66}
          />
          <p className="hero-sub">
            Embodies the essence of natural selection. Our partners and clients favor products from pristine, pollution-free environments pulsating with pure, vital energy.
          </p>
          <div className="hero-actions">
            <a href="/product-applications" className="btn-g">Explore Products</a>
            <a href="#contact" className="btn-o on-dark">Request a Sample</a>
          </div>
        </div>
        <div className="scroll-hint">
          <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
          Scroll
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee">
        <div className="mtrack">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3rem' }}>
              {['Halal Certified','Kosher Certified','Pharmaceutical Grade','Bovine Gelatin','Fish Gelatin','Collagen','Food & Confectionary','Global Distribution','Source of the Nile','Pollution-Free Environments'].map((t) => (
                <div key={t} className="mi"><div className="mdot" />{t}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-vis rv">
          <Image
            className="about-main"
            src="/assets/assortment-multi-colored-marmalades-scaled.jpg"
            alt="Genesis Biotech Products"
            width={500}
            height={600}
          />
          <Image
            className="about-accent"
            src="/assets/spoons-with-pills-scaled.jpg"
            alt="Pharmaceutical gelatin products"
            width={300}
            height={300}
          />
          <div className="since-badge">
            <span className="sb-label">Since</span>
            <span className="sb-year">2018</span>
          </div>
        </div>
        <div className="about-txt">
          <Image
            className="about-icon rv"
            src="/assets/iconAsset_resized-100-X-100-px.webp"
            alt="Genesis Biotech Icon"
            width={80}
            height={80}
          />
          <div className="eyebrow rv d1">Our Story</div>
          <h2 className="st rv d1">The Essence of<br /><em>Natural Selection.</em></h2>
          <div className="since-row rv d2">
            <div className="since-num">2018</div>
            <div className="since-copy">Established to bring the world's finest Halal &amp; Kosher gelatin — sourced directly from pristine Nile basin environments — to discerning global markets.</div>
          </div>
          <p className="rv d2">
            Embodies the essence of natural selection. Our partners and clients favor products from pristine, pollution-free environments pulsating with pure, vital energy.
          </p>
          <p className="rv d3">
            We nurture lasting relationships with clients, partners, suppliers, employees, and our community — building trust at every link in the supply chain.
          </p>
          <a href="/about" className="btn-g rv d3" style={{ display: 'inline-flex', marginTop: '1.8rem' }}>Read More</a>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products">
        <div className="prod-hdr">
          <div>
            <div className="eyebrow rv">What We Offer</div>
            <h2 className="st rv d1">Product<br /><em>Applications</em></h2>
          </div>
          <p className="prod-hdr-r rv d2">We offer our customers a prime product that represents the spearhead of the industry.</p>
        </div>
        <div className="prod-grid rv">
          <div className="pc">
            <Image className="pc-img" src="/assets/spoons-with-pills-scaled.jpg" alt="Pharmaceuticals" width={400} height={533} />
            <div className="pc-ov">
              <div className="pc-n">01</div>
              <div className="pc-cat">Medical · Healthcare</div>
              <div className="pc-name">Pharmaceuticals</div>
              <div className="pc-desc">Hard and soft capsules, tablet coatings, plasma expanders, and wound dressings — manufactured to BP and USP pharmacopeial standards.</div>
              <div className="pc-more">Learn More →</div>
            </div>
          </div>
          <div className="pc">
            <Image className="pc-img contain" src="/assets/face-cream.png" alt="Collagen" width={400} height={533} />
            <div className="pc-ov">
              <div className="pc-n">02</div>
              <div className="pc-cat">Beauty · Wellness</div>
              <div className="pc-name">Collagen</div>
              <div className="pc-desc">Premium hydrolyzed collagen peptides for skincare, anti-aging formulations, nutraceuticals, and functional beauty supplements.</div>
              <div className="pc-more">Learn More →</div>
            </div>
          </div>
          <div className="pc">
            <Image className="pc-img" src="/assets/assortment-multi-colored-marmalades-scaled.jpg" alt="Food and Confectionary" width={400} height={533} />
            <div className="pc-ov">
              <div className="pc-n">03</div>
              <div className="pc-cat">Food · Confectionary</div>
              <div className="pc-name">Food &amp;<br />Confectionary</div>
              <div className="pc-desc">Gummies, marshmallows, jellies, dairy stabilizers, and desserts — our gelatin delivers perfect texture, clarity, and mouthfeel every time.</div>
              <div className="pc-more">Learn More →</div>
            </div>
          </div>
        </div>
        <div className="prod-cta rv">
          <a href="#contact" className="btn-o" style={{ marginTop: '.5rem' }}>Request Product Information</a>
        </div>
      </section>

      {/* ── SPEARHEAD ── */}
      <div className="spearhead">
        <div className="spearhead-inner">
          We offer our customers a prime product<br />
          <em>that represents the spearhead of the industry.</em>
        </div>
      </div>

      {/* ── ADVANTAGES ── */}
      <section id="advantages">
        <div className="adv-wrap">
          <div className="eyebrow rv">Why Choose Us</div>
          <h2 className="st rv d1" style={{ maxWidth: '420px' }}>Our <em>Advantages</em></h2>
          <div className="adv-grid">
            {[
              { icon: '🌿', title: 'Pure Source Environments', body: 'Sourced exclusively from pollution-free regions along the Nile basin — pristine habitats with zero industrial contamination and abundant natural vitality.' },
              { icon: '🏅', title: 'Halal & Kosher Certified', body: 'All products carry internationally recognized Halal and Kosher certifications, meeting the most stringent dietary and compliance requirements worldwide.' },
              { icon: '🔬', title: 'Pharmaceutical Grade', body: 'Fully compliant with BP and USP pharmacopeial grades — meeting the most exacting quality requirements for medical and nutraceutical applications.' },
              { icon: '🤝', title: 'Lasting Partnerships', body: 'We nurture long-term relationships built on transparency, trust, and shared commitment to quality with every client, partner, supplier, and community we serve.' },
            ].map((a, i) => (
              <div key={i} className={`ac rv d${i + 1}`}>
                <div className="ac-icon">{a.icon}</div>
                <div className="ac-title">{a.title}</div>
                <div className="ac-body">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTPRINT ── */}
      <section id="footprint">
        <div className="eyebrow rv" style={{ justifyContent: 'center' }}>Global Reach</div>
        <h2 className="st rv d1">Our <em>Footprint</em></h2>
        <p className="sub rv d2">From the heart of Africa to markets across the globe — supplying premium gelatin wherever quality is demanded.</p>
        <div className="map-wrap rv">
          <Image
            src="/assets/without-wordingsAsset-4world-map-768x391.webp"
            alt="Genesis Biotech Global Footprint Map"
            width={768}
            height={391}
          />
        </div>
        <div className="regions rv d2">
          {['Africa','Middle East','Europe','North America','Asia Pacific'].map((r) => (
            <div key={r} className="region"><div className="rdot" />{r}</div>
          ))}
        </div>
      </section>

      {/* ── DATASHEETS ── */}
      <section id="datasheets">
        <div className="ds-wrap">
          <div className="eyebrow rv">Technical Documentation</div>
          <h2 className="st rv d1">Our <em>Datasheets</em></h2>
          <div className="ds-grid">
            <div className="dsc rv">
              <div className="dsc-thumb">
                <a href="/assets/bollatine-specsAsset-2world-map.webp" target="_blank" rel="noopener">
                  <Image
                    src="/assets/bollatine-specsAsset-2world-map-1024x932.webp"
                    alt="Bovine Gelatin Datasheet Preview"
                    width={148}
                    height={180}
                  />
                </a>
              </div>
              <div className="dsc-info">
                <div>
                  <div className="dsc-badge">Bovine · Halal &amp; Kosher</div>
                  <div className="dsc-title">Halal &amp; Kosher<br />Bovine Gelatin</div>
                  <div className="dsc-specs">Bloom: 100–280 g · Viscosity: 2.0–7.5 mPa·s<br />pH: 5.0–7.0 · Available in mesh grades</div>
                </div>
                <a href="/assets/bollatine-specsAsset-2world-map.webp" target="_blank" rel="noopener" className="dsc-dl">View Datasheet ↗</a>
              </div>
            </div>
            <div className="dsc rv d2">
              <div className="dsc-thumb">
                <Image
                  src="/assets/fish-specsAsset-3world-map-1024x932.webp"
                  alt="Fish Gelatin Datasheet Preview"
                  width={148}
                  height={180}
                />
              </div>
              <div className="dsc-info">
                <div>
                  <div className="dsc-badge">Marine · Kosher</div>
                  <div className="dsc-title">Kosher<br />Fish Gelatin</div>
                  <div className="dsc-specs">Bloom: 100–250 g · Viscosity: 2.0–6.5 mPa·s<br />pH: 5.0–6.5 · Cold-soluble grades available</div>
                </div>
                <a href="/assets/fish-specsAsset-3world-map-1024x932.webp" target="_blank" rel="noopener" className="dsc-dl">View Datasheet ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications">
        <div className="cert-inner">
          <div className="cert-left">
            <div className="eyebrow rv">Quality &amp; Compliance</div>
            <h2 className="st rv d1">Quality You<br />Can <em>Trust.</em></h2>
            <p className="rv d2">Every batch of Genesis Biotech gelatin is produced under internationally recognized standards. Our certifications reflect our unwavering commitment to purity, safety, and compliance across global markets.</p>
            <p className="rv d3">We partner with independent certifying bodies to ensure full traceability from source to delivery — so you never have to guess about what's in your product.</p>
            <div className="cert-chips rv d3">
              {['Halal Certified','Kosher Certified','ISO Compliant','GMP Verified'].map((c) => (
                <div key={c} className="chip"><span className="chipdot" />{c}</div>
              ))}
            </div>
          </div>
          <div className="cert-right rv d2">
            <Image
              src="/assets/logos-2.png"
              alt="Genesis Biotech Certifications"
              width={460}
              height={200}
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="ct-inner">
          <div className="ct-left">
            <div className="eyebrow rv">Get in Touch</div>
            <h2 className="st rv d1">Let's Work<br /><em>Together.</em></h2>
            <p className="rv d2">Whether you're exploring a new product line, scaling production, or seeking a reliable gelatin supplier — we'd love to hear from you.</p>
            <div className="ct-deets rv d3">
              {[
                { icon: '📞', lbl: 'Phone', val: '+971 55 132 1079' },
                { icon: '✉', lbl: 'General Inquiries', val: 'romy@genesisbiotech.net' },
                { icon: '🌎', lbl: 'North America', val: 'northamerica@genesisbiotech.net' },
              ].map((item) => (
                <div key={item.lbl} className="ct-item">
                  <div className="ct-icon">{item.icon}</div>
                  <div>
                    <div className="ct-lbl">{item.lbl}</div>
                    <div className="ct-val">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="cf rv d2" onSubmit={handleFormSubmit}>
            <div className="cf-title">Request a Quote or Sample</div>
            <div className="frow">
              <div className="fg"><label>First Name</label><input type="text" placeholder="John" /></div>
              <div className="fg"><label>Last Name</label><input type="text" placeholder="Smith" /></div>
            </div>
            <div className="fg"><label>Company</label><input type="text" placeholder="Your Company Ltd." /></div>
            <div className="fg"><label>Email Address</label><input type="email" placeholder="john@company.com" /></div>
            <div className="fg">
              <label>Product Interest</label>
              <select defaultValue="">
                <option value="" disabled>Select a product</option>
                <option>Halal &amp; Kosher Bovine Gelatin</option>
                <option>Kosher Fish Gelatin</option>
                <option>Collagen</option>
                <option>Multiple Products</option>
                <option>Custom Specification</option>
              </select>
            </div>
            <div className="fg"><label>Message</label><textarea placeholder="Tell us about your requirements — quantity, specifications, intended use…" /></div>
            <button type="submit" className={`f-btn${formSent ? ' sent' : ''}`}>
              {formSent ? "Message Sent — We'll be in touch soon." : 'Send Inquiry →'}
            </button>
          </form>
        </div>
      </section>

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
              <li><a href="#advantages">Advantages</a></li>
              <li><a href="#datasheets">Datasheets</a></li>
              <li><a href="#contact">Contact Us</a></li>
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
