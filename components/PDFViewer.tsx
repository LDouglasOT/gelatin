'use client'

import { useState, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import PageFlip from 'react-pageflip'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageFlipAny = PageFlip as any

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [scale] = useState(1.2)
  const pageFlipRef = useRef<any>(null)

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
  }, [])

  const pdfUrl = 'https://genesisbiotech.net/wp-content/uploads/2024/07/Genesis-biotech-presentation-4.pdf'

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  const goToPrev = () => {
    if (pageFlipRef.current && currentPage > 1) {
      pageFlipRef.current.pageFlip().flipPrev()
    }
  }

  const goToNext = () => {
    if (pageFlipRef.current && currentPage < numPages) {
      pageFlipRef.current.pageFlip().flipNext()
    }
  }

  const handleFlip = (e: any) => {
    setCurrentPage(e.data + 1)
  }

  const pages = Array.from({ length: numPages }, (_, i) => i + 1)

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button className="pdf-btn" onClick={goToPrev} disabled={currentPage <= 1}>
          ← Previous
        </button>
        <span className="pdf-page-info">Page {currentPage} of {numPages}</span>
        <button className="pdf-btn" onClick={goToNext} disabled={currentPage >= numPages}>
          Next →
        </button>
      </div>

      <div className="flipbook-container">
        <PageFlipAny
          width={794}
          height={1123}
          size="fixed"
          minWidth={315}
          maxWidth={2000}
          minHeight={400}
          maxHeight={2830}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="flipbook"
          onFlip={handleFlip}
          zIndex={1000}
          ref={pageFlipRef}
        >
          {pages.map((pageNum) => (
            <div key={`page-${pageNum}`} className="pdf-page" data-density="hard">
              <Document
                file={pdfUrl}
                loading={
                  <div className="pdf-loading">
                    <div className="spinner"></div>
                    Loading...
                  </div>
                }
                error={<div className="pdf-error">Failed to load PDF</div>}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  key={`page_${pageNum}`}
                  pageNumber={pageNum}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-react-page"
                  loading={<div className="pdf-loading"><div className="spinner"></div></div>}
                />
              </Document>
            </div>
          ))}
        </PageFlipAny>
      </div>

      <style jsx>{`
        .pdf-viewer {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem 0;
        }

        .pdf-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(78, 160, 100, 0.18);
          border-radius: 3px;
        }

        .pdf-btn {
          background: var(--green);
          color: #fff;
          border: none;
          padding: 0.7rem 1.5rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .pdf-btn:hover:not(:disabled) {
          background: var(--green-h);
          transform: translateY(-1px);
        }

        .pdf-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pdf-page-info {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.1em;
        }

        .flipbook-container {
          width: 100%;
          display: flex;
          justify-content: center;
          perspective: 2000px;
        }

        .flipbook {
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .flipbook .pdf-page {
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pdf-react-page canvas {
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain;
        }

        .pdf-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          width: 100%;
          height: 100%;
          min-height: 500px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(120, 188, 90, 0.3);
          border-top-color: var(--lime);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .pdf-error {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          min-height: 500px;
          color: #ff6b6b;
          font-size: 1rem;
        }

        @media (max-width: 850px) {
          .flipbook {
            transform: scale(0.85);
            transform-origin: center top;
          }
        }

        @media (max-width: 480px) {
          .flipbook {
            transform: scale(0.6);
          }
          
          .pdf-controls {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .pdf-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
