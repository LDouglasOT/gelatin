'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const navRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('solid', window.scrollY > 60)
      }
    }
    if (!transparent) {
      navRef.current?.classList.add('solid')
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparent])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { href: '/about', label: 'About', sub: [{ href: '/about', label: 'Our Story' }, { href: '/about/presentation', label: 'Presentation' }] },
    { href: '/product-applications', label: 'Product Applications' },
    { href: '/advantages', label: 'Advantages' },
    { href: '/', label: 'Home' },
  ]

  return (
    <>
      <nav id="nav" ref={navRef}>
        <Link href="/" className="nav-logo">
          <Image
            src="/assets/icon-3Asset-3@300x-300x94.webp"
            alt="Genesis Biotech"
            width={120}
            height={38}
            style={{ height: 36, width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(link => (
            <li
              key={link.href}
              className={[
                link.sub ? 'has-sub' : '',
                pathname === link.href || (link.sub && pathname.startsWith(link.href)) ? 'active' : ''
              ].filter(Boolean).join(' ')}
            >
              <Link href={link.href}>{link.label}</Link>
              {link.sub && (
                <ul className="sub-nav">
                  {link.sub.map(s => (
                    <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link href="/contact" className="nav-cta">Contact Us</Link>
          </li>
        </ul>

        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={pathname === link.href ? { color: 'var(--green)' } : undefined}
              >
                {link.label}
              </Link>
              {link.sub && (
                <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                  {link.sub.map(s => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        style={{
                          display: 'block',
                          padding: '.7rem 0',
                          fontSize: '.74rem',
                          letterSpacing: '.14em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--text-3)',
                          textDecoration: 'none',
                          borderBottom: '1px solid var(--border)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link href="/contact" className="nav-cta" style={{ display: 'block', textAlign: 'center', padding: '1rem', background: 'var(--green)', color: '#fff', borderRadius: '1px', marginTop: '1rem', fontSize: '.72rem', letterSpacing: '.16em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}