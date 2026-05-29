'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PdfFlipBook from './presentation/PdfFlipBook'

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

  --font-display: 'Cormorant Garamond', Georgia, serif;
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
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -.01em;
  color: var(--dark);
  margin-top: .75rem;
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

/* ─────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────── */
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: transparent;
  transition: background .6s var(--ease-out-expo), border-color .6s, box-shadow .6s;
}
#nav.solid {
  background: rgba(255,255,255,.96);
  backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 30px rgba(8,15,9,.06);
}

.nav-logo img { height: 34px; width: auto; display: block; }

/* Desktop links */
.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  align-items: center;
}
.nav-links a {
  font-family: var(--font-body);
  font-size: .7rem;
  font-weight: 400;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(255,255,255,.85);
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
#nav.solid .nav-links a:not(.nav-cta) { color: var(--text); }
#nav.solid .nav-links a:not(.nav-cta):hover { color: var(--accent); }

.nav-cta {
  background: var(--accent) !important;
  color: #fff !important;
  padding: .55rem 1.3rem !important;
  border-radius: 2px !important;
  letter-spacing: .12em !important;
  transition: background .3s, transform .3s !important;
}
.nav-cta:hover        { background: var(--green-h) !important; transform: translateY(-1px) !important; }
.nav-cta::after       { display: none !important; }

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
  background: none;
  border: none;
  z-index: 1000;
}
.burger span {
  display: block;
  width: 22px; height: 1.5px;
  background: #fff;
  transition: transform .4s var(--ease-spring), opacity .3s, background .3s;
}
#nav.solid .burger span  { background: var(--dark); }
.burger.open span:nth-child(1)    { transform: translateY(6.5px) rotate(45deg); }
.burger.open span:nth-child(2)    { opacity: 0; transform: scaleX(0); }
.burger.open span:nth-child(3)    { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile drawer */
.nav-mobile-menu {
  position: fixed;
  top: 72px; left: 0; right: 0;
  background: rgba(255,255,255,.99);
  backdrop-filter: blur(24px);
  padding: 1.5rem 5vw 2rem;
  border-bottom: 1px solid var(--border);
  z-index: 899;
  transform: translateY(-12px);
  opacity: 0;
  visibility: hidden;
  transition: transform .4s var(--ease-out-expo), opacity .4s, visibility .4s;
  box-shadow: 0 8px 40px rgba(8,15,9,.08);
}
.nav-mobile-menu.open { transform: translateY(0); opacity: 1; visibility: visible; }
.nav-mobile-menu ul   { list-style: none; display: flex; flex-direction: column; }
.nav-mobile-menu li a {
  display: block;
  padding: .9rem 0;
  font-family: var(--font-body);
  font-size: .8rem;
  font-weight: 400;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color .25s, padding-left .25s;
}
.nav-mobile-menu li:last-child a { border-bottom: none; }
.nav-mobile-menu li a:hover      { color: var(--accent); padding-left: .5rem; }
.nav-mobile-menu .mobile-cta {
  display: block;
  margin-top: 1.2rem;
  padding: .85rem 1.5rem;
  background: var(--accent);
  color: #fff !important;
  text-align: center;
  border-radius: 2px;
  font-size: .75rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  border-bottom: none !important;
}

/* ─────────────────────────────────────────────────────────
   PAGE HERO
───────────────────────────────────────────────────────── */
.page-hero {
  position: relative;
  height: 55vh;
  min-height: 360px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 4rem;
  overflow: hidden;
}
.page-hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(8,15,9,.92) 0%, rgba(8,15,9,.55) 50%, rgba(8,15,9,.35) 100%),
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
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.02em;
  color: #fff;
}
.page-title em { font-style: italic; font-weight: 400; color: var(--lime); }

/* ─────────────────────────────────────────────────────────
   OUR STORY
───────────────────────────────────────────────────────── */
.story-section {
  padding: 5rem 5vw;
  background: var(--white);
}
.story-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 5rem;
  align-items: center;
}
.story-img           { width: 200px; height: 200px; flex-shrink: 0; }
.story-img img       { width: 100%; height: 100%; object-fit: contain; }
.story-content       { display: flex; flex-direction: column; gap: .5rem; }
.story-since         { display: flex; align-items: baseline; gap: 1rem; margin: 1rem 0 1.5rem; }
.story-year          { font-family: var(--font-display); font-size: 2.8rem; font-weight: 600; color: var(--accent); }
.story-label         { font-family: var(--font-body); font-size: .7rem; letter-spacing: .22em; text-transform: uppercase; color: var(--text-3); }
.story-content p     { font-family: var(--font-body); font-size: .94rem; line-height: 1.9; color: var(--text-2); margin-bottom: .6rem; }

/* ─────────────────────────────────────────────────────────
   WATER SOURCE
───────────────────────────────────────────────────────── */
.source-section { padding: 6rem 5vw; background: var(--cream); }
.source-inner   { max-width: 1400px; margin: 0 auto; }
.source-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 2rem;
}
.source-card          { }
.source-card h3       { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 400; color: var(--dark); margin-bottom: 1.4rem; }
.source-card p        { font-family: var(--font-body); font-size: .92rem; line-height: 1.88; color: var(--text-2); margin-bottom: 1rem; }
.source-img           { border-radius: 2px; overflow: hidden; }
.source-img img       { width: 100%; height: auto; display: block; border-radius: 2px; }

/* ─────────────────────────────────────────────────────────
   FACTORY
───────────────────────────────────────────────────────── */
.factory-section  { padding: 7rem 5vw; background: var(--white); }
.factory-inner    { max-width: 1400px; margin: 0 auto; }
.factory-intro    { font-family: var(--font-body); font-size: .94rem; line-height: 1.9; color: var(--text-2); max-width: 740px; margin: 1.2rem 0 3.5rem; }

.factory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}
.fact-img             { aspect-ratio: 1; overflow: hidden; border-radius: 2px; }
.fact-img img         { width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease-out-expo); }
.fact-img:hover img   { transform: scale(1.06); }

.factory-features     { background: var(--cream); border: 1px solid var(--border); padding: 2.4rem; border-radius: 2px; }
.factory-features h4  { font-family: var(--font-body); font-size: .75rem; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; color: var(--text-2); margin-bottom: 1.8rem; }
.feat-list            { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 3rem; }
.feat-item            { display: flex; align-items: flex-start; gap: .85rem; font-family: var(--font-body); font-size: .86rem; line-height: 1.65; color: var(--text-2); }
.feat-dot             { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: .58rem; }

/* ─────────────────────────────────────────────────────────
   PRODUCTS
───────────────────────────────────────────────────────── */
.products-section { padding: 7rem 5vw; background: var(--cream); border-top: 1px solid var(--border); }
.products-inner   { max-width: 1400px; margin: 0 auto; }
.products-intro   { font-family: var(--font-body); font-size: .94rem; line-height: 1.9; color: var(--text-2); max-width: 740px; margin: 1.2rem 0 3.5rem; }

.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}
.prod-card            { background: var(--white); border-radius: 2px; overflow: hidden; border: 1px solid var(--border); transition: box-shadow .4s, transform .4s var(--ease-out-expo); }
.prod-card:hover      { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.prod-card-img-wrap   { overflow: hidden; }
.prod-card-img-wrap img { width: 100%; aspect-ratio: 5/4; object-fit: cover; display: block; transition: transform .6s var(--ease-out-expo); }
.prod-card:hover .prod-card-img-wrap img { transform: scale(1.04); }
.prod-card-content    { padding: 1.8rem; }
.pcat                 { font-family: var(--font-body); font-size: .62rem; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); margin-bottom: .8rem; }
.prod-card h3         { font-family: var(--font-display); font-size: clamp(1.2rem, 2vw, 1.6rem); font-weight: 400; color: var(--dark); margin-bottom: 1rem; }
.prod-card p          { font-family: var(--font-body); font-size: .86rem; line-height: 1.78; color: var(--text-2); }

/* ─────────────────────────────────────────────────────────
   CERTIFICATIONS
───────────────────────────────────────────────────────── */
.cert-strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 5vw;
  background: var(--white);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.cert-strip img {
  margin-top: 2rem;
  display: block;
  width: min(70%, 600px);
  height: auto;
}

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
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
.fl-logo  { height: 30px; width: auto; display: block; margin-bottom: 1.5rem; }
.fl-desc  { font-family: var(--font-body); font-size: .86rem; line-height: 1.82; color: rgba(255,255,255,.3); }
.fc-head  { font-family: var(--font-body); font-size: .64rem; font-weight: 500; letter-spacing: .24em; text-transform: uppercase; color: var(--lime); margin-bottom: 1.4rem; }
.fl       { list-style: none; display: flex; flex-direction: column; gap: .85rem; }
.fl a     { font-family: var(--font-body); font-size: .84rem; color: rgba(255,255,255,.32); text-decoration: none; transition: color .3s, padding-left .3s; }
.fl a:hover { color: rgba(255,255,255,.78); padding-left: .4rem; }
.fci      { font-family: var(--font-body); font-size: .84rem; color: rgba(255,255,255,.32); line-height: 1.5; margin-bottom: .9rem; }
.fci span { display: block; font-size: .6rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: .22rem; }
.fb       { max-width: 1400px; margin: 2.5rem auto 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.fb-copy  { font-family: var(--font-body); font-size: .72rem; color: rgba(255,255,255,.18); letter-spacing: .08em; }

/* ─────────────────────────────────────────────────────────
   RESPONSIVE — TABLET  (≤ 1024px)
───────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .nav-links     { display: none; }
  .burger        { display: flex; }

  .story-inner   { grid-template-columns: 1fr; gap: 2.5rem; }
  .story-img     { width: 140px; height: 140px; margin: 0 auto; }
  .story-content { text-align: center; align-items: center; }
  .story-since   { justify-content: center; }

  .source-grid   { grid-template-columns: 1fr; gap: 2.5rem; }

  .factory-grid  { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .feat-list     { grid-template-columns: 1fr; gap: .9rem; }

  .products-grid { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; }

  .ft            { grid-template-columns: 1fr 1fr; gap: 3rem; }
}

/* ─────────────────────────────────────────────────────────
   RESPONSIVE — MOBILE  (≤ 640px)
───────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  /* Nav */
  #nav { height: 64px; padding: 0 1.25rem; }
  .nav-mobile-menu { top: 64px; }
  .nav-logo img { height: 28px; }

  /* Hero */
  .page-hero { height: 52vh; min-height: 280px; padding-bottom: 2.5rem; }
  .page-title { font-size: clamp(2rem, 11vw, 2.8rem); }

  /* Story */
  .story-section { padding: 3.5rem 1.25rem; }
  .story-inner   { gap: 2rem; }
  .story-img     { width: 110px; height: 110px; }
  .story-year    { font-size: 2rem; }
  .story-content p { font-size: .88rem; }

  /* Source */
  .source-section { padding: 3.5rem 1.25rem; }
  .source-card h3 { font-size: 1.5rem; }
  .source-card p  { font-size: .88rem; }

  /* Factory */
  .factory-section { padding: 3.5rem 1.25rem; }
  .factory-intro   { font-size: .88rem; margin-bottom: 2.5rem; }
  .factory-grid    { grid-template-columns: 1fr 1fr; gap: .6rem; }
  .factory-features { padding: 1.6rem; }
  .factory-features h4 { font-size: .7rem; }
  .feat-item { font-size: .82rem; }

  /* Products */
  .products-section { padding: 3.5rem 1.25rem; }
  .products-intro   { font-size: .88rem; margin-bottom: 2.5rem; }
  .products-grid    { max-width: 100%; gap: 1.5rem; }
  .prod-card-content { padding: 1.4rem; }
  .prod-card p      { font-size: .84rem; }

  /* Certifications */
  .cert-strip { padding: 3rem 1.25rem; }
  .cert-strip img { width: 90%; }

  /* Footer */
  footer { padding: 3.5rem 1.25rem 2rem; }
  .ft {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-bottom: 2.5rem;
  }
  .fb { flex-direction: column; text-align: center; gap: .6rem; }
  .fb-copy { font-size: .68rem; }
}

/* ─────────────────────────────────────────────────────────
   RESPONSIVE — SMALL MOBILE  (≤ 380px)
───────────────────────────────────────────────────────── */
@media (max-width: 380px) {
  .page-title { font-size: 1.9rem; }
  .factory-grid { grid-template-columns: 1fr; }
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
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  /* Prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── SCOPED STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: aboutStyles }} />

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
        <div className="page-hero-bg" />
        <div className="page-hero-inner">
          <h1 className="page-title rv d1">
            Our <em>Story</em>
          </h1>
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
                style={{ width: '100%', height: 'auto' }}
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
            World-Class <em>Production</em>
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              <div className="prod-card-img-wrap">
                <Image
                  src="https://genesisbiotech.net/wp-content/uploads/2023/11/cow-2Asset-2@300x.webp"
                  alt="Halal & Kosher Bovine Gelatin"
                  width={500}
                  height={400}
                  style={{ width: '100%', height: 'auto', aspectRatio: '5/4', objectFit: 'cover' }}
                />
              </div>
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
              <div className="prod-card-img-wrap">
                <Image
                  src="https://genesisbiotech.net/wp-content/uploads/2023/07/Nile-Perch.png"
                  alt="Kosher Fish Gelatin — Nile Perch"
                  width={400}
                  height={400}
                  style={{ width: '100%', height: 'auto', aspectRatio: '5/4', objectFit: 'cover' }}
                />
              </div>
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
  <section
        style={{
          background: 'var(--bg-alt, #f8f9f6)',
          borderTop: '1px solid var(--border, #eee)',
          borderBottom: '1px solid var(--border, #eee)',
          padding: '5rem 5vw',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{"color":"#2877A7", fontSize:"28px",fontWeight:"bold", letterSpacing:"0.01em",fontFamily:"Roboto",margin:"0px"}}>Company <em>Presentation</em></h2>
          <p
            className="rv d2"
            style={{ color: 'var(--muted)', maxWidth: 480, margin: '1rem auto 3rem', lineHeight: 1.7, fontSize: 15 }}
          >
            Click the book to open the interactive presentation and flip through our full company overview.
          </p>
          <div className="rv d3">
            <PdfFlipBook />
          </div>
        </div>
      </section>
      
      {/* ── CERTIFICATIONS ── */}
      <div className="cert-strip rv">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          Certified Quality
        </div>
        <img
          src="/assets/Icons.webp"
          alt="Genesis Biotech Certifications"
        />
      </div>

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
              <li><Link href="/product-applications"  style={{color:"black", backgroundColor:"white"}}>Product Application</Link></li>
              <li><a href="#advantages"  style={{color:"black", backgroundColor:"white"}}>Benefits</a></li>
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