'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Advantages() {
  const navRef = useRef<HTMLDivElement>(null)
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

  return (
    <>
      <nav id="nav" ref={navRef}>
        <a href="/" className="nav-logo">
          <Image
            src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={102}
            height={32}
            style={{ height: 34 }}
          />
        </a>
        <ul className="nav-links" style={menuOpen ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: 78, left: 0, right: 0, background: 'rgba(11,29,18,.97)', backdropFilter: 'blur(18px)', padding: '2rem', gap: '1.5rem', borderBottom: '1px solid rgba(78,160,100,.2)', zIndex: 899 } : undefined}>
          <li><Link href="/about">About</Link></li>
          <li><a href="#products">Product Applications</a></li>
          <li><a href="#advantages">Advantages</a></li>
          <li><a href="#datasheets">Datasheets</a></li>
          <li><a href="#contact" className="nav-cta">Contact Us</a></li>
        </ul>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      <section id="hero-advantages" className="advantages-hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <div className="eyebrow rv">Why Choose Genesis Biotech</div>
          <h1 className="hero-title">
            Our <em>Advantages</em>
          </h1>
          <p className="hero-sub rv d1">
            Discover what sets us apart — from pristine sourcing to sustainable practices, international certifications, and lasting partnerships.
          </p>
        </div>
      </section>

      <section id="advantages-content">
        <div className="adv-container">
          {/* Row 1 */}
          <div className="adv-row">
            <div className="adv-card rv d1">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Pure-Environment.png"
                alt="Better Digestion"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">Better Digestion</h3>
              <p className="adv-desc">Our natural and virginal environment, free from industrial pollution and chemicals, allows us to deliver the best product to boost our body with pure, vital energy.</p>
            </div>
            <div className="adv-card rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Best-Nutrition-_-Energy.png"
                alt="Best Nutrition & Energy"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">Best Nutrition & Energy</h3>
              <p className="adv-desc">Boosts your body with pure, natural and vital energy, rich in zinc, iron, vitamin B12, and calcium, with exceptionally high protein values.</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="adv-row">
            <div className="adv-card rv d3">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/We-Are-Green-_-Blue.png"
                alt="Customization"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">Customization</h3>
              <p className="adv-desc">The combination of advanced and highly efficient technology alongside our personalized approach creates high customizability opportunities.</p>
            </div>
            <div className="adv-card rv d4">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Superior-Quality.png"
                alt="Quality"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">Quality</h3>
              <p className="adv-desc">Proximity to a source of high-quality raw material and a supervised high-technology factory ensures products of the highest quality.</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="adv-row">
            <div className="adv-card rv d1">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Best-Sustainability.png"
                alt="Sustainability"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">Sustainability</h3>
              <p className="adv-desc">Our factory and supply chain sustainably source pure water in eco-friendly systems.</p>
            </div>
            <div className="adv-card rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Superior-Quality.png"
                alt="International Standards and Certifications"
                width={231}
                height={231}
                className="adv-img"
              />
              <h3 className="adv-title">International Standards and Certifications</h3>
              <p className="adv-desc">Compliance with the strictest international standards, and Kosher and Halal supervision.</p>
            </div>
          </div>

          {/* Row 4 - Centered */}
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

      <footer>
        <div className="ft">
          <div>
            <Image
              className="fl-logo"
              src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-4Asset-4@300x-300x94.webp"
              alt="Genesis Biotech"
              width={90}
              height={28}
            />
            <p className="fl-desc">Premium Halal & Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.</p>
          </div>
          <div>
            <div className="fc-head">Navigation</div>
            <ul className="fl">
              <li><Link href="/about">About</Link></li>
              <li><a href="#products">Product Applications</a></li>
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
