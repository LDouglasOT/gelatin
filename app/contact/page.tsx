'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Contact() {
  const navRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
          <div className="eyebrow light rv">Get in Touch</div>
          <h1 className="page-title rv d1">Contact <em>Us</em></h1>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="contact-section">
        <div className="contact-inner">
          <p className="contact-intro rv">We would love to hear from you.</p>
          <div className="contact-grid">
            <div className="contact-info rv">
              <div className="ci-item">
                <div className="ci-icon">📞</div>
                <div className="ci-label">Phone</div>
                <div className="ci-value">+971 55 132 1079</div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">✉️</div>
                <div className="ci-label">General Inquiries</div>
                <div className="ci-value">
                  <span>romy@genesisbiotech.net</span>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">🌎</div>
                <div className="ci-label">North America</div>
                <div className="ci-value">
                  <span>northamerica@genesisbiotech.net</span>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper rv d1">
              {submitted ? (
                <div className="form-success">
                  <h3>Thank you!</h3>
                  <p>We have received your message and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="cf-title">Send Us a Message</div>
                  <div className="form-row">
                    <div className="fg">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                    </div>
                    <div className="fg">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="fg">
                      <label htmlFor="phone">Phone</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                    </div>
                    <div className="fg">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject" />
                    </div>
                  </div>
                  <div className="fg">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your requirements…" rows={5} />
                  </div>
                  <button type="submit" className="f-btn">Send Message →</button>
                </form>
              )}
            </div>
          </div>
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
