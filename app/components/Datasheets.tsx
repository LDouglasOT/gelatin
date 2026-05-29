'use client'

import { useState } from 'react'
import Image from 'next/image'

/* ─── Data extracted from the PDF spec sheets ─── */

const BOVINE = {
  name: 'Bovine Skin Gelatin',
  grade: '220 Bloom',
  badge: 'Halal & Kosher Certified',
  badgeColor: '#2877A7',
  source: 'Eastern African cow hides',
  color: 'Light Yellow',
  pdfPath: '/assets/FZCO_bovine_gelatin_specification.pdf',
  thumbSrc: '/assets/bollatine-specsAsset-2world-map-1024x932.webp',
  physical: [
    { label: 'Gel Strength (6.67%, 10°C)', value: '210–230', unit: 'Bloom g' },
    { label: 'Viscosity (6.67%, 60°C)',    value: '2.5–3.5',  unit: 'mPa·s'  },
    { label: 'pH',                          value: '4.5–7.0',  unit: '—'      },
    { label: 'Moisture Content',            value: '≤14.0',    unit: '%'      },
    { label: 'Ash Content',                 value: '≤2.0',     unit: '%'      },
    { label: 'Transparency',                value: '≥300',     unit: 'mm'     },
    { label: 'Insoluble Particles',         value: '≤0.2',     unit: '%'      },
    { label: 'Particle Size',               value: 'Per contract', unit: 'mesh' },
  ],
  chemical: [
    { label: 'Reducing Substances (SO₂)',   value: '≤30',  unit: 'mg/kg' },
    { label: 'Residual H₂O₂',              value: '≤10',  unit: 'mg/kg' },
    { label: 'Heavy Metals',               value: '≤40',  unit: 'mg/kg' },
    { label: 'Arsenic (As)',               value: '≤0.8', unit: 'mg/kg' },
    { label: 'Chromium (Cr)',              value: '≤2.0', unit: 'mg/kg' },
    { label: 'Lead (Pb)',                  value: '≤1.5', unit: 'mg/kg' },
  ],
  micro: [
    { label: 'Standard Plate Count', value: '≤1000',    unit: 'cfu/g' },
    { label: 'Coliform',             value: '≤10',      unit: 'cfu/g' },
    { label: 'E. coli',              value: 'Negative', unit: '/10 g' },
    { label: 'Salmonella',           value: 'Negative', unit: '/25 g' },
  ],
  packaging: '25 kg bags / 500 kg bags palletized',
  shelf: '36 months',
  storage: 'Dry, cool, odorless — away from moisture and sunlight, tightly sealed',
  certs: ['FSSC 22000', 'ISO 22000', 'GMP', 'Halal', 'COA', 'Veterinary Health', 'Country of Origin'],
}

const FISH = {
  name: 'Fish Skin Gelatin',
  grade: '200 Bloom',
  badge: 'Kosher Certified',
  badgeColor: '#1db47b',
  source: 'Nile Perch, Lake Victoria',
  color: 'Light Yellow',
  pdfPath: '/assets/Fish_gelatin_specifications.pdf',
  thumbSrc: '/assets/fish-specsAsset-3world-map-1024x932.webp',
  physical: [
    { label: 'Gel Strength (6.67%, 10°C)', value: '190–210', unit: 'Bloom g' },
    { label: 'Viscosity (6.67%, 60°C)',    value: '3.2–6.0',  unit: 'mPa·s'  },
    { label: 'pH',                          value: '4.5–7.5',  unit: '—'      },
    { label: 'Moisture Content',            value: '≤14.0',    unit: '%'      },
    { label: 'Ash Content',                 value: '≤2.0',     unit: '%'      },
    { label: 'Transparency',                value: '≥300',     unit: 'mm'     },
    { label: 'Insoluble Particles',         value: '≤0.2',     unit: '%'      },
    { label: 'Particle Size',               value: 'Per contract', unit: 'mesh' },
  ],
  chemical: [
    { label: 'Reducing Substances (SO₂)',  value: '≤30',  unit: 'mg/kg' },
    { label: 'Residual H₂O₂',             value: '≤10',  unit: 'mg/kg' },
    { label: 'Heavy Metals',              value: '≤40',  unit: 'mg/kg' },
    { label: 'Arsenic (As)',              value: '≤0.8', unit: 'mg/kg' },
    { label: 'Chromium (Cr)',             value: '≤2.0', unit: 'mg/kg' },
    { label: 'Lead (Pb)',                 value: '≤1.5', unit: 'mg/kg' },
  ],
  micro: [
    { label: 'Standard Plate Count', value: '≤1000',    unit: 'cfu/g' },
    { label: 'Coliform',             value: '≤10',      unit: 'cfu/g' },
    { label: 'E. coli',              value: 'Negative', unit: '/10 g' },
    { label: 'Salmonella',           value: 'Negative', unit: '/25 g' },
  ],
  packaging: '25 kg bags / 500 kg bags palletized',
  shelf: '36 months',
  storage: 'Dry, cool, odorless — away from moisture and sunlight, tightly sealed',
  certs: ['FSSC 22000', 'ISO 22000', 'GMP', 'Kosher', 'COA', 'Veterinary Health', 'Country of Origin'],
}

type Product = typeof BOVINE
type Tab = 'physical' | 'chemical' | 'micro'

/* ─── Sub-component: spec table ─── */
function SpecTable({ rows }: { rows: { label: string; value: string; unit: string }[] }) {
  return (
    <table className="ds-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Specification</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td>{r.label}</td>
            <td className="ds-value">{r.value}</td>
            <td className="ds-unit">{r.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


function ProductPanel({ p, accent }: { p: Product; accent: string }) {
  const [tab, setTab] = useState<Tab>('physical')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'physical',  label: 'Physical'       },
    { id: 'chemical',  label: 'Chemical'       },
    { id: 'micro',     label: 'Microbiological' },
  ]

  const rows = tab === 'physical' ? p.physical : tab === 'chemical' ? p.chemical : p.micro

  return (
    <div className="ds-panel">
      {/* Header */}
      <div className="ds-panel-header" style={{ borderTop: `3px solid ${accent}` }}>
        <div className="ds-panel-meta">
          <span className="ds-badge" style={{ background: accent }}>
            {p.badge}
          </span>
          <h3 className="ds-panel-title">{p.name}</h3>
          <p className="ds-panel-grade">{p.grade} · {p.source}</p>
        </div>
        <div className="ds-panel-actions">
          <a
            href={p.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-btn-solid"
            style={{ background: accent }}
          >
            View PDF ↗
          </a>
        </div>
      </div>

      {/* Tabs */}
      {/* <div className="ds-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`ds-tab${tab === t.id ? ' active' : ''}`}
            style={tab === t.id ? { borderBottomColor: accent, color: accent } : {}}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div> */}

      {/* Table */}
      {/* <div className="ds-table-wrap">
        <SpecTable rows={rows} />
      </div> */}

      {/* Footer info */}
      {/* <div className="ds-panel-footer">
        <div className="ds-footer-row">
          <div className="ds-footer-item">
            <span className="ds-footer-label">Packaging</span>
            <span className="ds-footer-value">{p.packaging}</span>
          </div>
          <div className="ds-footer-item">
            <span className="ds-footer-label">Shelf Life</span>
            <span className="ds-footer-value">{p.shelf}</span>
          </div>
          <div className="ds-footer-item">
            <span className="ds-footer-label">Storage</span>
            <span className="ds-footer-value">{p.storage}</span>
          </div>
        </div>
        <div className="ds-certs">
          {p.certs.map((c) => (
            <span key={c} className="ds-cert-chip">{c}</span>
          ))}
        </div>
      </div> */}
    </div>
  )
}

/* ─── Main section ─── */
export default function DatasheetsSection() {
  const [active, setActive] = useState<'bovine' | 'fish'>('bovine')
  const product = active === 'bovine' ? BOVINE : FISH
  const accent  = active === 'bovine' ? '#2877A7' : '#1db47b'

  return (
    <section id="datasheets">
      <style>{`
        /* ── SECTION WRAPPER ───────────────────────────────── */
        #datasheets {
          background: var(--white, #fff);
          border-top: 1px solid rgba(38,92,58,.12);
          padding: 6rem 5vw;
        }
        .ds-wrap { max-width: 1100px; margin: 0 auto; }

        /* ── SECTION HEADER ────────────────────────────────── */
        .ds-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 3.5rem;
          gap: 0.5rem;
        }
        .ds-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #1db47b;
        }
        .ds-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #080f09;
          margin: 0;
          line-height: 1.15;
        }
        .ds-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.96rem;
          font-weight: 300;
          color: rgba(8,15,9,.55);
          max-width: 500px;
          line-height: 1.75;
          margin: 0.4rem 0 0;
        }

        /* ── PRODUCT SELECTOR CARDS ────────────────────────── */
        .ds-selectors {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }
        .ds-selector {
          border: 1.5px solid rgba(38,92,58,.14);
          border-radius: 6px;
          padding: 1.4rem 1.6rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          cursor: pointer;
          background: #fff;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          text-align: left;
        }
        .ds-selector:hover {
          border-color: rgba(38,92,58,.3);
          box-shadow: 0 6px 24px rgba(8,15,9,.07);
          transform: translateY(-2px);
        }
        .ds-selector.active-bovine {
          border-color: #2877A7;
          box-shadow: 0 0 0 3px rgba(40,119,167,.12), 0 6px 24px rgba(8,15,9,.07);
        }
        .ds-selector.active-fish {
          border-color: #1db47b;
          box-shadow: 0 0 0 3px rgba(29,180,123,.12), 0 6px 24px rgba(8,15,9,.07);
        }
        .ds-selector-thumb {
          width: 64px;
          height: 64px;
          border-radius: 4px;
          overflow: hidden;
          flex-shrink: 0;
          background: #f7f4ee;
        }
        .ds-selector-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ds-selector-info { flex: 1; }
        .ds-selector-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #080f09;
          margin: 0 0 0.2rem;
          line-height: 1.3;
        }
        .ds-selector-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: rgba(8,15,9,.45);
          margin: 0;
        }
        .ds-selector-arrow {
          font-size: 1.1rem;
          color: rgba(8,15,9,.25);
          transition: color 0.25s, transform 0.3s;
        }
        .ds-selector.active-bovine .ds-selector-arrow,
        .ds-selector.active-fish   .ds-selector-arrow { transform: rotate(90deg); }
        .ds-selector.active-bovine .ds-selector-arrow { color: #2877A7; }
        .ds-selector.active-fish   .ds-selector-arrow { color: #1db47b; }

        /* ── EXPANDED PANEL ────────────────────────────────── */
        .ds-panel {
          border: 1px solid rgba(38,92,58,.12);
          border-radius: 6px;
          overflow: hidden;
          background: #fff;
        }
        .ds-panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 2rem 2rem 1.5rem;
          background: #f7f4ee;
          flex-wrap: wrap;
        }
        .ds-badge {
          display: inline-block;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 3px;
          margin-bottom: 0.7rem;
        }
        .ds-panel-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #080f09;
          margin: 0 0 0.35rem;
          line-height: 1.2;
        }
        .ds-panel-grade {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          color: rgba(8,15,9,.45);
          margin: 0;
        }
        .ds-panel-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-shrink: 0;
        }
        .ds-btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #080f09;
          text-decoration: none;
          border: 1.5px solid rgba(8,15,9,.22);
          padding: 0.6rem 1.2rem;
          border-radius: 3px;
          transition: border-color 0.25s, color 0.25s;
          white-space: nowrap;
        }
        .ds-btn-outline:hover { border-color: #080f09; }
        .ds-btn-solid {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #fff;
          text-decoration: none;
          padding: 0.6rem 1.2rem;
          border-radius: 3px;
          transition: opacity 0.25s, transform 0.25s;
          white-space: nowrap;
        }
        .ds-btn-solid:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── TABS ──────────────────────────────────────────── */
        .ds-tabs {
          display: flex;
          border-bottom: 1px solid rgba(38,92,58,.12);
          padding: 0 2rem;
          background: #fff;
        }
        .ds-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(8,15,9,.4);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0.9rem 1.2rem 0.8rem;
          cursor: pointer;
          transition: color 0.25s, border-color 0.25s;
          margin-bottom: -1px;
        }
        .ds-tab:hover { color: rgba(8,15,9,.7); }
        .ds-tab.active { font-weight: 700; }

        /* ── SPEC TABLE ────────────────────────────────────── */
        .ds-table-wrap {
          padding: 0;
          overflow-x: auto;
        }
        .ds-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.86rem;
        }
        .ds-table thead tr {
          background: #f7f4ee;
        }
        .ds-table th {
          text-align: left;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(8,15,9,.4);
          padding: 0.75rem 2rem;
          border-bottom: 1px solid rgba(38,92,58,.1);
        }
        .ds-table td {
          padding: 0.75rem 2rem;
          border-bottom: 1px solid rgba(38,92,58,.07);
          color: rgba(8,15,9,.7);
          font-weight: 300;
          line-height: 1.5;
        }
        .ds-table tbody tr:last-child td { border-bottom: none; }
        .ds-table tbody tr:hover td { background: #f7f4ee55; }
        .ds-value {
          font-weight: 600 !important;
          color: #080f09 !important;
          font-variant-numeric: tabular-nums;
        }
        .ds-unit {
          color: rgba(8,15,9,.35) !important;
          font-size: 0.78rem !important;
        }

        /* ── FOOTER ────────────────────────────────────────── */
        .ds-panel-footer {
          padding: 1.5rem 2rem;
          background: #f7f4ee;
          border-top: 1px solid rgba(38,92,58,.1);
        }
        .ds-footer-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.2rem;
        }
        .ds-footer-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .ds-footer-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(8,15,9,.35);
        }
        .ds-footer-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 400;
          color: rgba(8,15,9,.7);
          line-height: 1.5;
        }
        .ds-certs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ds-cert-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #1db47b;
          border: 1px solid rgba(29,180,123,.3);
          background: rgba(29,180,123,.06);
          padding: 0.25rem 0.65rem;
          border-radius: 3px;
        }

        /* ── RESPONSIVE ────────────────────────────────────── */
        @media (max-width: 700px) {
          #datasheets { padding: 1.5rem 1.5rem; }

          .ds-selectors { grid-template-columns: 1fr; }

          .ds-selector { padding: 1.1rem 1.2rem; }
          .ds-selector-thumb { width: 52px; height: 52px; }

          .ds-panel-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }
          .ds-panel-actions { width: 100%; }
          .ds-btn-outline,
          .ds-btn-solid { flex: 1; text-align: center; padding: 0.75rem; }

          .ds-tabs { padding: 0 1rem; overflow-x: auto; gap: 0; }
          .ds-tab  { padding: 0.85rem 0.8rem; font-size: 0.72rem; white-space: nowrap; }

          .ds-table th,
          .ds-table td  { padding: 0.65rem 1rem; font-size: 0.82rem; }
          .ds-table th  { font-size: 0.58rem; }

          .ds-footer-row { grid-template-columns: 1fr; gap: 1rem; }
          .ds-panel-footer { padding: 1.2rem 1rem; }
        }
      `}</style>

      <div className="ds-wrap">

        {/* Section header */}
        <div className="ds-header">
     
          <h2 className="ds-title">Product Specifications</h2>
          <p className="ds-subtitle">
            Full specification sheets for our gelatin product range — tested to GB6783-2013 standards.
          </p>
        </div>

        {/* Product selector cards */}
        <div className="ds-selectors">
          <button
            className={`ds-selector${active === 'bovine' ? ' active-bovine' : ''}`}
            onClick={() => setActive('bovine')}
          >
            <div className="ds-selector-thumb">
              <Image
                src={BOVINE.thumbSrc}
                alt="Bovine Gelatin"
                width={64}
                height={64}
              />
            </div>
            <div className="ds-selector-info">
              <p className="ds-selector-name">Halal &amp; Kosher Bovine Gelatin</p>
              <p className="ds-selector-sub">220 Bloom · Eastern African cow hides</p>
            </div>
            <span className="ds-selector-arrow">›</span>
          </button>

          <button
            className={`ds-selector${active === 'fish' ? ' active-fish' : ''}`}
            onClick={() => setActive('fish')}
          >
            <div className="ds-selector-thumb">
              <Image
                src={FISH.thumbSrc}
                alt="Fish Gelatin"
                width={64}
                height={64}
              />
            </div>
            <div className="ds-selector-info">
              <p className="ds-selector-name">Kosher Fish Gelatin</p>
              <p className="ds-selector-sub">200 Bloom · Nile Perch, Lake Victoria</p>
            </div>
            <span className="ds-selector-arrow">›</span>
          </button>
        </div>

        {/* Expanded product panel */}
        <ProductPanel key={active} p={product} accent={accent} />

      </div>
    </section>
  )
}