'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ─────────────────────────────────────────────────────────
   All styles are scoped to this page via the <style> tag
   below. Class names are identical to globals.css so both
   can coexist — the page styles simply override/extend
   where needed, and nothing leaks to other pages.
───────────────────────────────────────────────────────── */

const aboutStyles = `
/* ── IMPORTS ──────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap');

/* ── DESIGN TOKENS ────────────────────────────────────── */
:root {
  --white:        #ffffff;
  --cream:        #f7f4ee;
  --cream-2:      #f0ead9;
  --cream-3:      #e8dfc8;
  --off-white:    #eaf2ec;
  --dark:         #080f09;
  --dark-2:       #0c1a10;
  --dark-3:       #111f16;
  --mid:          #1a3622;
  --green:        #265c3a;
  --green-h:      #30734a;
  --green-lt:     #e4f0e9;
  --green-2:      #1e4a2f;
  --lime:         #6db551;
  --lime-dim:     rgba(109,181,81,.4);
  --lime-bright:  #82d462;
  --gold:         #b8963a;
  --gold-lt:      #f5e9c8;
  --muted:        rgba(8,15,9,.45);
  --border:       rgba(38,92,58,.12);
  --border-h:     rgba(38,92,58,.28);
  --text:         #080f09;
  --text-2:       rgba(8,15,9,.58);
  --text-3:       rgba(8,15,9,.35);
  --accent:       #1db47b;

  --font-display: Roboto, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'DM Mono', monospace;

  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1);

  --shadow-sm:    0 1px 3px rgba(8,15,9,.06), 0 1px 2px rgba(8,15,9,.04);
  --shadow-md:    0 4px 16px rgba(8,15,9,.08), 0 2px 6px rgba(8,15,9,.05);
  --shadow-lg:    0 20px 60px rgba(8,15,9,.12), 0 8px 24px rgba(8,15,9,.08);
  --shadow-xl:    0 40px 100px rgba(8,15,9,.18), 0 16px 40px rgba(8,15,9,.1);
  --shadow-green: 0 20px 60px rgba(38,92,58,.2), 0 4px 16px rgba(38,92,58,.15);
}

/* ── RESET ────────────────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--white);
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 300;
  overflow-x: hidden;
  line-height: 1.2;
}

::selection { background: rgba(38,92,58,.15); color: #1db47b; }

::-webkit-scrollbar       { width: 3px; }
::-webkit-scrollbar-track  { background: var(--cream); }
::-webkit-scrollbar-thumb  { background: #1db47b; border-radius: 2px; }

/* ── UTILITY: EYEBROW ─────────────────────────────────── */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: .75rem;
  font-family: var(--font-body);
  font-size: .65rem;
  font-weight: 500;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--accent);
}
.eyebrow.light { color: rgba(255,255,255,.7); }

/* ── UTILITY: SECTION HEADINGS ────────────────────────── */
h2.st {
  font-family: Gotham, var(--font-display);
  font-size: 18px;
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -.02em;
  color: var(--dark);
}
h2.st em      { font-style: italic; font-weight: 400; color: var(--accent); }
h2.st.on-dark { color: var(--white); }
h2.st.on-dark em { color: var(--lime); }

/* ── UTILITY: REVEAL ANIMATIONS ──────────────────────── */
.rv {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s var(--ease-out-expo), transform .9s var(--ease-out-expo);
}
.rv.in    { opacity: 1; transform: translateY(0); }
.d1       { transition-delay: .08s; }
.d2       { transition-delay: .18s; }
.d3       { transition-delay: .28s; }
.d4       { transition-delay: .38s; }
.d5       { transition-delay: .48s; }

/* ── NAV ──────────────────────────────────────────────── */
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: transparent;
  transition: background .6s var(--ease-out-expo), border-color .6s, box-shadow .6s;
}
#nav.solid {
  background: rgba(207,207,207,.92);
  backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 30px rgba(8,15,9,.06);
}

/* Nav logo */
.nav-logo img { height: 36px; display: block; }

/* Nav links */
.nav-links {
  display: flex;
  gap: 3rem;
  list-style: none;
  align-items: center;
}
.nav-links a {
  font-family: var(--font-body);
  font-size: .72rem;
  font-weight: 400;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  position: relative;
  transition: color .3s;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 100%;
  height: 1px;
  background: var(--accent);
  transition: right .4s var(--ease-out-expo);
}
.nav-links a:hover,
.nav-links .active a            { color: var(--accent); }
.nav-links a:hover::after,
.nav-links .active a::after     { right: 0; }

/* CTA link in nav */
.nav-cta {
  background: var(--accent) !important;
  color: #fff !important;
  padding: .6rem 1.5rem !important;
  border-radius: 1px !important;
  letter-spacing: .14em !important;
  transition: background .3s, transform .3s !important;
}
.nav-cta:hover        { background: var(--green-h) !important; transform: translateY(-1px) !important; }
.nav-cta::after       { display: none !important; }

/* Hero state — white links */
#nav:not(.solid) .nav-links a:not(.nav-cta)       { color: rgba(255,255,255,.78); }
#nav:not(.solid) .nav-links a:not(.nav-cta):hover  { color: #fff; }
#nav:not(.solid) .nav-links a::after               { background: var(--lime); }

/* Dropdown */
.has-sub { position: relative; }
.sub-nav {
  position: absolute;
  top: calc(100% + 12px);
  left: -1.5rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: .7rem 0;
  min-width: 180px;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all .35s var(--ease-out-expo);
  box-shadow: var(--shadow-lg);
}
.has-sub:hover .sub-nav { opacity: 1; visibility: visible; transform: translateY(0); }
.sub-nav a {
  display: block;
  padding: .65rem 1.5rem;
  font-size: .7rem !important;
  font-weight: 400 !important;
  letter-spacing: .14em !important;
  color: var(--text-2) !important;
  transition: color .25s, background .25s, padding-left .25s !important;
}
.sub-nav a:hover { color: var(--accent) !important; background: var(--green-lt) !important; padding-left: 1.8rem !important; }

/* Burger */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 6px;
}
.burger span {
  display: block;
  width: 22px; height: 1.5px;
  background: var(--dark);
  transition: transform .4s var(--ease-spring), opacity .3s, background .3s;
}
#nav:not(.solid) .burger span     { background: #fff; }
.burger.open span:nth-child(1)    { transform: translateY(6.5px) rotate(45deg); }
.burger.open span:nth-child(2)    { opacity: 0; transform: scaleX(0); }
.burger.open span:nth-child(3)    { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile menu overlay */
.nav-mobile-menu {
  position: fixed;
  top: 82px; left: 0; right: 0;
  background: rgba(255,255,255,.98);
  backdrop-filter: blur(24px);
  padding: 2rem;
  border-bottom: 1px solid var(--border);
  z-index: 899;
  transform: translateY(-8px);
  opacity: 0;
  visibility: hidden;
  transition: transform .4s var(--ease-out-expo), opacity .4s, visibility .4s;
}
.nav-mobile-menu.open { transform: translateY(0); opacity: 1; visibility: visible; }
.nav-mobile-menu ul   { list-style: none; display: flex; flex-direction: column; gap: 0; }
.nav-mobile-menu li a {
  display: block;
  padding: 1rem 0;
  font-family: var(--font-body);
  font-size: .8rem;
  font-weight: 400;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color .25s, padding-left .25s;
}
.nav-mobile-menu li:last-child a { border-bottom: none; }
.nav-mobile-menu li a:hover      { padding-left: .5rem; }
.nav-mobile-menu .nav-cta        { background: var(--accent) !important; color: #fff !important; border-radius: 1px; margin-top: 1rem; text-align: center; }

/* ── PAGE HERO ────────────────────────────────────────── */
.page-hero {
  position: relative;
  height: 58vh;
  min-height: 400px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 5rem;
  overflow: hidden;
}
.page-hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(110deg, rgba(8,15,9,.94) 0%, rgba(8,15,9,.62) 10%, rgba(8,15,9,.28) 10%),
    url('/assets/smile-scaled.webp') center / cover no-repeat;
}
.page-hero-inner {
  position: relative;
  z-index: 2;
  padding: 0 5vw;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
.page-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5.8rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.02em;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-title em { font-style: italic; font-weight: 400; color: var(--lime); }

/* ── OUR STORY ────────────────────────────────────────── */
.story-section { padding: 1rem 5vw; background: var(--white); }
.story-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6rem;
  align-items: center;
}
.story-img           { width: 200px; height: 200px; flex-shrink: 0; }
.story-img img       { width: 100%; height: 100%; object-fit: contain; }
.story-content       { display: flex; flex-direction: column; }
.story-since         { display: flex; align-items: baseline; gap: 1rem; margin: 1.2rem 0 1.8rem; }
.story-year          { font-family: var(--font-display); font-size: 2.5rem; font-weight: bold; }
.story-label         { font-family: var(--font-body); font-size: .72rem; letter-spacing: .2em; text-transform: uppercase; color: var(--text-3); }
.story-content p     { font-family: var(--font-body); font-size: .96rem; line-height: 1.88; color: var(--text-2); }

/* ── WATER SOURCE ─────────────────────────────────────── */
.source-section { padding: 8rem 5vw; background: var(--white); }
.source-inner   { max-width: 1400px; margin: 0 auto; }
.source-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
.source-card          { background: var(--white); padding: 2.8rem; }
.source-card h3       { font-family: var(--font-display); font-size: 2rem; font-weight: 400; color: var(--dark); margin-bottom: 1.6rem; }
.source-card p        { font-family: var(--font-body); font-size: .92rem; line-height: 1.85; color: var(--text-2); margin-bottom: 1rem; }
.source-img img       { width: 100%; height: auto; border-radius: 2px; }

/* ── OUR FACTORY ──────────────────────────────────────── */
.factory-section  { padding: 9rem 5vw; background: var(--white); }
.factory-inner    { max-width: 1400px; margin: 0 auto; }
.factory-intro    { font-family: var(--font-body); font-size: .96rem; line-height: 1.88; color: var(--text-2); max-width: 740px; margin: 1.8rem 0 5rem; }

.factory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}
.fact-img             { aspect-ratio: 1; overflow: hidden; border-radius: 2px; }
.fact-img img         { width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease-out-expo); }
.fact-img:hover img   { transform: scale(1.06); }

.factory-features     { background: var(--cream); border: 1px solid var(--border); padding: 2.8rem; border-radius: 2px; }
.factory-features h4  { font-family: var(--font-body); font-size: .82rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--text-2); margin-bottom: 2rem; }
.feat-list            { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem 3.5rem; }
.feat-item            { display: flex; align-items: flex-start; gap: .9rem; font-family: var(--font-body); font-size: .86rem; line-height: 1.65; color: var(--text-2); }
.feat-dot             { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: .55rem; }

/* ── OUR PRODUCTS ─────────────────────────────────────── */
.products-section { padding: 9rem 5vw; background: var(--cream); border-top: 1px solid var(--border); }
.products-inner   { max-width: 1400px; margin: 0 auto; }
.products-intro   { font-family: var(--font-body); font-size: .96rem; line-height: 1.88; color: var(--text-2); max-width: 740px; margin: 1.8rem 0 5rem; }

.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
.prod-card            { background: var(--white); border-radius: 2px; overflow: hidden; border: 1px solid var(--border); transition: box-shadow .4s, transform .4s var(--ease-out-expo); }
.prod-card:hover      { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.prod-card img        { width: 100%; aspect-ratio: 5/4; object-fit: cover; display: block; transition: transform .6s var(--ease-out-expo); }
.prod-card:hover img  { transform: scale(1.04); }
.prod-card-content    { padding: 2.2rem; }
.pcat                 { font-family: var(--font-body); font-size: .63rem; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); margin-bottom: .9rem; }
.prod-card h3         { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400; color: var(--dark); margin-bottom: 1.1rem; }
.prod-card p          { font-family: var(--font-body); font-size: .86rem; line-height: 1.78; color: var(--text-2); }

/* ── CERTIFICATIONS STRIP ─────────────────────────────── */
.cert-strip {
  background: var(--white);
  border-top: 1px solid var(--border);
  padding: 5rem 5vw;
  text-align: center;
}

/* ── FOOTER ───────────────────────────────────────────── */
footer {
  background: var(--dark);
  border-top: 1px solid rgba(255,255,255,.05);
  padding: 5rem 5vw 3rem;
}
.ft {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 5rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(255,255,255,.06);
  max-width: 1400px;
  margin: 0 auto;
}
.fl-logo  { height: 30px; display: block; margin-bottom: 1.5rem; }
.fl-desc  { font-family: var(--font-body); font-size: .86rem; line-height: 1.82; color: rgba(255,255,255,.28); }
.fc-head  { font-family: var(--font-body); font-size: .64rem; font-weight: 500; letter-spacing: .24em; text-transform: uppercase; color: var(--lime); margin-bottom: 1.6rem; }
.fl       { list-style: none; display: flex; flex-direction: column; gap: .9rem; }
.fl a     { font-family: var(--font-body); font-size: .84rem; color: rgba(255,255,255,.32); text-decoration: none; transition: color .3s, padding-left .3s; }
.fl a:hover { color: rgba(255,255,255,.78); padding-left: .4rem; }
.fci      { font-family: var(--font-body); font-size: .84rem; color: rgba(255,255,255,.32); line-height: 1.5; margin-bottom: .9rem; }
.fci span { display: block; font-size: .6rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: .22rem; }
.fb       { max-width: 1400px; margin: 2.5rem auto 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.fb-copy  { font-family: var(--font-body); font-size: .72rem; color: rgba(255,255,255,.18); letter-spacing: .08em; }

/* ── RESPONSIVE ───────────────────────────────────────── */
@media (max-width: 1100px) {
  #nav           { padding: 0 2rem; }
  .nav-links     { display: none; }
  .burger        { display: flex; }

  .story-inner   { grid-template-columns: 1fr; gap: 4rem; text-align: center; }
  .story-img     { width: 140px; height: 140px; margin: 0 auto; }
  .source-grid   { grid-template-columns: 1fr; }
  .factory-grid  { grid-template-columns: 1fr 1fr; }
  .products-grid { grid-template-columns: 1fr; }
  .ft            { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 700px) {
  .factory-grid  { grid-template-columns: 1fr; }
  .feat-list     { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: 1fr; }
  .fb            { flex-direction: column; text-align: center; }
  .page-title    { font-size: clamp(2rem, 10vw, 3.5rem); }
}
`

export default function About() {
  const navRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  /* ── scroll: solidify nav ── */
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current)
        navRef.current.classList.toggle('solid', window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── intersection observer: reveal animations ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── mobile menu style ── */
  const navMenuStyle: React.CSSProperties = menuOpen
    ? {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 78,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,.98)',
        backdropFilter: 'blur(18px)',
        padding: '2rem',
        gap: '1.5rem',
        borderBottom: '1px solid rgba(45,107,68,.14)',
        zIndex: 899,
      }
    : {}

  return (
    <>
      {/* ── SCOPED STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: aboutStyles }} />

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
      <section className="page-hero">
        <div className="about-page-hero-bg" />
        <div className="page-hero-inner">
          <h1 className="page-title rv d1">About Us</h1>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="story-section">
        <div className="story-inner">
          <div className="story-img rv">
            <Image
              src="/assets/icon-3Asset-3@300x-300x94.webp"
              alt="Genesis Biotech icon"
              width={180}
              height={180}
            />
          </div>
          <div className="story-content">
            <h2 className="st rv d1">
              The Essence of<br /><em>Natural Selection.</em>
            </h2>
            <div className="story-since rv d2">
              <span className="story-year">2018</span>
              <span className="story-label">Established</span>
            </div>
            <p className="rv d2">
              Genesis Biotech embodies the essence of natural selection. Our partners and clients
              favor products from pristine, pollution-free environments pulsating with pure, vital
              energy.
            </p>
            <p className="rv d3">
              We nurture lasting relationships with clients, partners, suppliers, employees, and our
              community. Our founding values are integrity and reliability, while our unceasing
              commitment to improvement drives our mission.
            </p>
          </div>
        </div>
      </section>

      {/* ── WATER SOURCE ── */}
      <section className="source-section">
        <div className="source-inner">
          <div className="eyebrow rv">Our Water Source</div>
          <div className="source-grid">
            <div className="source-card rv d1">
              <h3>Lake Victoria</h3>
              <p>
                Lake Victoria is the world's 2nd largest tropical lake in addition to its
                breathtaking beauty. It features other unique properties: its portable warm water
                (24–29°C) functions as a closed and pure biological ecosystem. 80% of the lake's
                water comes from pure rainfall, whereas the balance is provided by underground
                springs and rivers.
              </p>
              <p>
                Unlike seawater, which suffers from industrial pollution, Lake Victoria's water is
                one of the purest water bodies in the world, as there are very few industries
                around the huge lake.
              </p>
            </div>
            <div className="source-img rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/11/home.png"
                alt="Lake Victoria — the source"
                width={600}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR FACTORY ── */}
      <section className="factory-section">
        <div className="factory-inner">
          <div className="eyebrow rv">Our Factory</div>
          <h2 className="st rv d1">
            World-Class<br /><em>Production</em>
          </h2>
          <p className="factory-intro rv d2">
            Making gelatin is an intricate, sensitive process that requires cutting-edge professional
            and technological skills. Our production process abides by the highest standards:
            supervised and monitored 24×7. It guarantees the highest, world-leading sterilization
            and cleanliness of all of our facility's systems and overall high-quality products.
          </p>

          <div className="factory-grid">
            {[
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-5-1024x1024.png',
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-4-1024x1024.png',
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-3-1024x1024.png',
              'https://genesisbiotech.net/wp-content/uploads/2023/07/GENESIS-BIOTECH-FACTORY-PHOTO-2-1024x1024.png',
            ].map((src, i) => (
              <div key={i} className={`fact-img rv d${i + 1}`}>
                <Image
                  src={src}
                  alt={`Genesis Biotech Factory ${i + 1}`}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>

          <div className="factory-features rv d2">
            <h4>Our factory leverages the optimal combination of:</h4>
            <div className="feat-list">
              {[
                'Proximity to a sustainable source of high-quality raw material',
                'Use of advanced know-how, novel and highly-efficient technology',
                'Ongoing development with up-to-date research',
                'Compliance with strict international standards and Kosher supervision',
                'Multinational management capabilities',
              ].map((f) => (
                <div key={f} className="feat-item">
                  <span className="feat-dot" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PRODUCTS ── */}
      <section className="products-section">
        <div className="products-inner">
          <div className="eyebrow rv">Our Products</div>
          <h2 className="st rv d1">Premium <em>Gelatin</em></h2>
          <p className="products-intro rv d2">
            Genesis Biotech produces both the Halal &amp; Kosher Bovine Gelatin and the Kosher Fish
            Gelatin in the highest quality, purity, and bloom values. Extensive knowledge, advanced
            equipment, and novelty enable us to produce high-level gelatin for various food-grade,
            pharmaceutical, and collagen applications.
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
                <div className="pcat">Halal &amp; Kosher Certified</div>
                <h3>Halal &amp; Kosher Bovine Gelatin</h3>
                <p>
                  The fresh cow hides from the local Eastern African region provide a remarkable
                  source of high-quality gelatin. Thanks to the region's unique climate and the
                  cows' organic diet, the gelatin derived from these hides is known for its high
                  protein content.
                </p>
              </div>
            </div>
            <div className="prod-card rv d2">
              <Image
                src="https://genesisbiotech.net/wp-content/uploads/2023/07/Nile-Perch.png"
                alt="Kosher Fish Gelatin — Nile Perch"
                width={400}
                height={400}
              />
              <div className="prod-card-content">
                <div className="pcat">Kosher Certified</div>
                <h3>Kosher Fish Gelatin</h3>
                <p>
                  Nile Perch is considered an excellent source for the production of pure,
                  high-quality gelatin. Unlike other fish, the Nile Perch of Lake Victoria benefits
                  from a relatively warm environment; hence, the collagen produced from its thick
                  skin has exceptionally high protein value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS STRIP ── */}
      <div className="cert-strip">
        <div className="eyebrow rv" style={{ justifyContent: 'center' }}>
          Certified Quality
        </div>
        <Image
          className="rv d1"
          src="https://genesisbiotech.net/wp-content/uploads/2023/07/logos-2.png"
          alt="Genesis Biotech Certifications"
          width={800}
          height={200}
          style={{ margin: '2rem auto 0', display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* ── FOOTER ── */}
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
            <p className="fl-desc">
              Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments
              along the Nile. Serving pharmaceutical, collagen, and food industries globally since
              2018.
            </p>
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