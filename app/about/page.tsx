'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
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
        <Link href="/" className="nav-logo">
          <Image
            src="https://genesisbiotech.net/wp-content/uploads/2023/07/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={102}
            height={32}
            style={{ height: 34 }}
          />
        </Link>
        <ul className="nav-links" style={menuOpen ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: 78, left: 0, right: 0, background: 'rgba(11,29,18,.97)', backdropFilter: 'blur(18px)', padding: '2rem', gap: '1.5rem', borderBottom: '1px solid rgba(78,160,100,.2)', zIndex: 899 } : undefined}>
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#products">Product Applications</Link></li>
          <li><Link href="/#advantages">Advantages</Link></li>
          <li><Link href="/#datasheets">Datasheets</Link></li>
          <li><Link href="/#contact" className="nav-cta">Contact Us</Link></li>
        </ul>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-inner">
          <div className="eyebrow rv">Our Story</div>
          <h1 className="page-title rv d1">About <em>Us</em></h1>
        </div>
      </section>

      <section className="story-section">
        <div className="story-inner">
          <div className="story-img rv">
            <Image
              src="https://genesisbiotech.net/wp-content/uploads/2023/11/iconAsset_resized-100-X-100-px.webp"
              alt="Genesis Biotech"
              width={120}
              height={120}
            />
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

      <section className="source-section">
        <div className="source-inner">
          <div className="source-grid">
            <div className="source-card rv">
              <h3>Our Water Source</h3>
              <p>
                Lake Victoria is the world's 2nd largest tropical lake in addition to its breathtaking beauty. It features other unique properties: its portable warm water (24-29°C) functions as a closed and pure biological ecosystem. 80% of the lake's water comes from pure rainfall, whereas the balance is provided by underground springs and rivers.
              </p>
              <p>
                Unlike seawater, which suffers from industrial pollution, Lake Victoria's water is one of the purest water bodies in the world, as there are very few industries around the huge lake.
              </p>
            </div>
            <div className="source-img rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/11/home.png"
                alt="Lake Victoria"
                width={600}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="factory-section">
        <div className="factory-inner">
          <h2 className="st rv">Our Factory</h2>
          <p className="factory-intro rv d1">
            Making gelatin is an intricate, sensitive process that requires cutting-edge professional and technological skills. Our production process abides by the highest standards: supervised and monitored 24X7. It guarantees the highest, world-leading sterilization and cleanliness of all of our facility's systems and overall high-quality products.
          </p>
          <div className="factory-grid">
            <div className="fact-img rv d1">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-5-1024x1024.png"
                alt="Genesis Biotech Factory"
                width={400}
                height={400}
              />
            </div>
            <div className="fact-img rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-4-1024x1024.png"
                alt="Genesis Biotech Factory"
                width={400}
                height={400}
              />
            </div>
            <div className="fact-img rv d3">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-3-1024x1024.png"
                alt="Genesis Biotech Factory"
                width={400}
                height={400}
              />
            </div>
            <div className="fact-img rv d4">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-2-1024x1024.png"
                alt="Genesis Biotech Factory"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="factory-features rv d2">
            <h4>Our factory is leveraging the optimal combination of:</h4>
            <div className="feat-list">
              <div className="feat-item">
                <span className="feat-dot"></span>
                <span>Proximity to a sustainable source of high-quality raw material</span>
              </div>
              <div className="feat-item">
                <span className="feat-dot"></span>
                <span>Use of advanced know how, novel and highly-efficient technology</span>
              </div>
              <div className="feat-item">
                <span className="feat-dot"></span>
                <span>Ongoing development with up-to-date research</span>
              </div>
              <div className="feat-item">
                <span className="feat-dot"></span>
                <span>Compliance with strict international standards and strict kosher supervision</span>
              </div>
              <div className="feat-item">
                <span className="feat-dot"></span>
                <span>Multinational management capabilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="products-inner">
          <h2 className="st rv">Our Products</h2>
          <p className="products-intro rv d1">
            Genesis Biotech produces both the Halal & Kosher Bovine Gelatin and the Kosher fish Gelatin in the highest quality, purity, and bloom values. Extensive knowledge, advanced equipment, and novelty enable us to produce high-level gelatin for various food-grade, pharmaceutical, and collagen applications.
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
                <div className="pcat">Halal & Kosher Certified</div>
                <h3>Halal & Kosher Bovine Gelatin</h3>
                <p>The fresh cow hides from the local Eastern African region provide a remarkable source of high-quality gelatin. Thanks to the region's unique climate and the cows' organic diet, the gelatin derived from these hides is known for its high protein content.</p>
              </div>
            </div>
            <div className="prod-card rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Nile-Perch.png"
                alt="Kosher Fish Gelatin"
                width={400}
                height={400}
              />
              <div className="prod-card-content">
                <div className="pcat">Kosher Certified</div>
                <h3>Kosher Fish Gelatin</h3>
                <p>Nile Perch is considered an excellent source for the production of pure, high-quality gelatin. Unlike other fish, the Nile Perch of Lake Victoria benefits from a relatively warm environment, hence, the collagen produced from its thick skin has exceptionally high protein value.</p>
              </div>
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
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#products">Product Applications</Link></li>
              <li><Link href="/#advantages">Advantages</Link></li>
              <li><Link href="/#datasheets">Datasheets</Link></li>
              <li><Link href="/">Contact Us</Link></li>
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