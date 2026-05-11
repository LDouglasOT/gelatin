const certifications = ['Halal Certified', 'Kosher Certified', 'ISO Compliant', 'GMP Verified']

export default function QualitySection() {
  return (
    <section id="quality" className="quality-section">
      <style>{`
        .quality-section {
          padding: 6rem 1.5rem;
          background: #f9f7f4;
          font-family: 'Georgia', serif;
        }

        .quality-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* Left: text column */
        .quality-text {}

        .quality-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1e4d2b;
          margin-bottom: 1.2rem;
        }

        .quality-eyebrow::before {
          content: '';
          display: inline-block;
          width: 22px;
          height: 1.5px;
          background: #1e4d2b;
          flex-shrink: 0;
        }

        .quality-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #161a14;
          line-height: 1.15;
          margin: 0 0 1.5rem;
          letter-spacing: -0.02em;
        }

        .quality-heading em {
          font-style: italic;
          color: #1e4d2b;
        }

        .quality-body {
          font-size: 1rem;
          line-height: 1.75;
          color: #4a5145;
          margin: 0 0 1rem;
        }

        .quality-body:last-of-type {
          margin-bottom: 2rem;
        }

        /* Chips */
        .quality-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.9rem;
          border: 1px solid #c8d8c0;
          border-radius: 999px;
          background: #fff;
          font-family: sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: #1e4d2b;
          letter-spacing: 0.01em;
          transition: background 0.18s, border-color 0.18s;
        }

        .chip:hover {
          background: #eaf3e0;
          border-color: #1e4d2b;
        }

        .chipdot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1e4d2b;
          flex-shrink: 0;
        }

        /* Right: image column */
        .quality-image-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Decorative background block */
        .quality-image-wrap::before {
          content: '';
          position: absolute;
          inset: -1.5rem -1rem;
          background: #e8f0e2;
          border-radius: 4px;
          z-index: 0;
        }

        .quality-image-wrap::after {
          content: '';
          position: absolute;
          bottom: -2rem;
          right: -1.5rem;
          width: 60%;
          height: 60%;
          border: 1.5px solid #c8d8c0;
          border-radius: 4px;
          z-index: 0;
        }

        .quality-image-wrap img {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          height: auto;
          display: block;
          border-radius: 3px;
          filter: drop-shadow(0 8px 24px rgba(30,77,43,0.10));
        }

        /* Divider line */
        .quality-divider {
          width: 40px;
          height: 2px;
          background: #1e4d2b;
          margin: 1.5rem 0;
        }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .quality-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .quality-image-wrap {
            order: -1;
          }

          .quality-image-wrap::after {
            display: none;
          }

          .quality-image-wrap::before {
            inset: -1rem;
          }
        }

        @media (max-width: 480px) {
          .quality-section {
            padding: 4rem 1.25rem;
          }

          .quality-heading {
            font-size: 1.75rem;
          }

          .chip {
            font-size: 0.72rem;
            padding: 0.4rem 0.75rem;
          }
        }
      `}</style>

      <div className="quality-inner">
        {/* Text */}
        <div className="quality-text">
          <div className="quality-eyebrow">Quality &amp; Compliance</div>
          <h2 className="quality-heading">
            Quality You Can <em>Trust.</em>
          </h2>
          <div className="quality-divider" />
          <p className="quality-body">
            Every batch of Genesis Biotech gelatin is produced under internationally recognized
            standards. Our certifications reflect our unwavering commitment to purity, safety,
            and compliance across global markets.
          </p>
          <p className="quality-body">
            We partner with independent certifying bodies to ensure full traceability from source
            to delivery — so you never have to guess about what's in your product.
          </p>
          <div className="quality-chips">
            {certifications.map((c) => (
              <div key={c} className="chip">
                <span className="chipdot" />
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="quality-image-wrap">
          <img src="/assets/logos-2.png" alt="Genesis Biotech Certifications" />
        </div>
      </div>
    </section>
  )
}
