'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="ft">
        <div>
          <Image
            className="fl-logo"
            src="/assets/icon-4Asset-4@300x-300x94.webp"
            alt="Genesis Biotech"
            width={100}
            height={32}
          />
          <p className="fl-desc">
            Premium Halal &amp; Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.
          </p>
        </div>
        <div>
          <div className="fc-head">Navigation</div>
          <ul className="fl">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/about/presentation">Presentation</Link></li>
            <li><Link href="/product-applications">Product Applications</Link></li>
            <li><Link href="/advantages">Advantages</Link></li>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <div className="fc-head">Contact Us</div>
          <div className="fci"><span>Phone</span>+971 55 132 1079</div>
          <div className="fci"><span>General Inquiries</span>romy@genesisbiotech.net</div>
          <div className="fci"><span>North America</span>northamerica@genesisbiotech.net</div>
        </div>
      </div>
      <div className="fb">
        <div className="fb-copy">Genesis Biotech © 2025 · All Rights Reserved</div>
        <div className="fb-copy">Premium Gelatin · Straight from the Source of the Nile</div>
      </div>
    </footer>
  )
}