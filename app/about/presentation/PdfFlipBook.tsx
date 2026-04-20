'use client'

import { useState, useEffect, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'

const PDFJS_VERSION = '3.11.174'
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`
const WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

function waitForGlobal(name: string, timeout = 5000): Promise<any> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const interval = setInterval(() => {
      const val = (window as any)[name]
      if (val && Object.keys(val).length > 0) {
        clearInterval(interval)
        resolve(val)
      } else if (Date.now() - start > timeout) {
        clearInterval(interval)
        reject(new Error(`Timed out waiting for window.${name}`))
      }
    }, 50)
  })
}

export default function PdfFlipBook() {
  const [pages, setPages] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [renderedCount, setRenderedCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [bookRef, setBookRef] = useState<any>(null)
  const pdfUrl = '/genesis-biotech-presentation.pdf'

  const startRendering = useCallback(async () => {
    if (pages.length > 0) return // already rendered
    setLoading(true)
    let cancelled = false

    try {
      await loadScript(PDFJS_CDN)
      const pdfjsLib = await waitForGlobal('pdfjsLib')
      pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC

      const pdf = await pdfjsLib.getDocument({ url: pdfUrl, withCredentials: false }).promise
      setTotalPages(pdf.numPages)

      const allImages: string[] = new Array(pdf.numPages)
      const batchSize = 3

      for (let batch = 0; batch < pdf.numPages; batch += batchSize) {
        if (cancelled) return
        const batchPromises = []

        for (let i = batch; i < Math.min(batch + batchSize, pdf.numPages); i++) {
          batchPromises.push(
            pdf.getPage(i + 1).then(async (page: any) => {
              const viewport = page.getViewport({ scale: 1.5 })
              const canvas = document.createElement('canvas')
              canvas.width = viewport.width
              canvas.height = viewport.height
              await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise
              return { index: i, dataUrl: canvas.toDataURL('image/jpeg', 0.88) }
            })
          )
        }

        const results = await Promise.all(batchPromises)
        if (cancelled) return

        results.forEach(({ index, dataUrl }) => {
          allImages[index] = dataUrl
          // Set cover from first page
          if (index === 0) setCoverImage(dataUrl)
        })

        setPages([...allImages.filter(Boolean)])
        setRenderedCount(prev => prev + results.length)
      }
      setLoading(false)
    } catch (err) {
      if (!cancelled) {
        console.error(err)
        setError('Failed to load PDF.')
        setLoading(false)
      }
    }

    return () => { cancelled = true }
  }, [pages.length])

  // Start rendering on mount so cover is ready fast
  useEffect(() => {
    startRendering()
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') bookRef?.pageFlip()?.flipNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') bookRef?.pageFlip()?.flipPrev()
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, bookRef])

  const progress = totalPages > 0 ? Math.round((renderedCount / totalPages) * 100) : 0
  const isFullyLoaded = renderedCount === totalPages && totalPages > 0

  return (
    <>
      {/* Book Cover Thumbnail */}
      <div className="cover-section">
        <div
          className={`book-cover-wrapper ${coverImage ? 'ready' : 'loading'}`}
          onClick={() => coverImage && setIsOpen(true)}
          role="button"
          aria-label="Open presentation"
        >
          <div className="book-spine" />
          {coverImage ? (
            <img src={coverImage} alt="Presentation cover" className="cover-img" />
          ) : (
            <div className="cover-placeholder">
              <div className="cover-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="4" width="32" height="40" rx="3" fill="#e0e0e0" />
                  <rect x="13" y="13" width="22" height="3" rx="1.5" fill="#bbb" />
                  <rect x="13" y="20" width="16" height="3" rx="1.5" fill="#bbb" />
                  <rect x="13" y="27" width="19" height="3" rx="1.5" fill="#bbb" />
                </svg>
              </div>
              {loading && (
                <div className="cover-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="progress-text">{progress}%</span>
                </div>
              )}
              {error && <p className="cover-error">{error}</p>}
            </div>
          )}
          {coverImage && (
            <div className="cover-overlay">
              <span className="open-label">Open Book</span>
            </div>
          )}
          {coverImage && !isFullyLoaded && (
            <div className="loading-badge">{progress}%</div>
          )}
        </div>
      </div>

      {/* Fullscreen Flipbook Modal */}
      {isOpen && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <span className="modal-title">Genesis Biotech — Presentation</span>
              <div className="modal-controls">
                <span className="page-indicator">
                  {currentPage + 1} / {totalPages}
                </span>
                {!isFullyLoaded && (
                  <span className="loading-indicator">Loading {progress}%</span>
                )}
                <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close">
                  ✕
                </button>
              </div>
            </div>

            {/* Flipbook */}
            <div className="flipbook-area">
              {pages.length > 0 ? (
                /* @ts-ignore */
                <HTMLFlipBook
                  ref={(ref: any) => setBookRef(ref)}
                  width={420}
                  height={594}
                  size="stretch"
                  minWidth={280}
                  maxWidth={600}
                  minHeight={396}
                  maxHeight={850}
                  drawShadow={true}
                  flippingTime={800}
                  className="the-flipbook"
                  style={{}}
                  startPage={0}
                  showCover={true}
                  mobileScrollSupport={false}
                  onFlip={(e: any) => setCurrentPage(e.data)}
                  usePortrait={false}
                >
                  {pages.map((src, index) => (
                    <div key={index} className="flip-page">
                      <img
                        src={src}
                        alt={`Page ${index + 1}`}
                        draggable={false}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              ) : (
                <div className="modal-loading">
                  <div className="spinner" />
                  <p>Preparing pages...</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="nav-bar">
              <button
                className="nav-btn"
                onClick={() => bookRef?.pageFlip()?.flipPrev()}
                disabled={currentPage === 0}
              >
                ← Previous
              </button>
              <div className="nav-progress">
                <div
                  className="nav-progress-fill"
                  style={{ width: `${((currentPage + 1) / Math.max(totalPages, 1)) * 100}%` }}
                />
              </div>
              <button
                className="nav-btn"
                onClick={() => bookRef?.pageFlip()?.flipNext()}
                disabled={currentPage >= totalPages - 1}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Cover section */
        .cover-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
        }

        .book-cover-wrapper {
          position: relative;
          width: 210px;
          height: 297px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-radius: 2px 6px 6px 2px;
          box-shadow: -4px 0 8px rgba(0,0,0,0.15), 4px 4px 20px rgba(0,0,0,0.25);
          overflow: hidden;
        }

        .book-cover-wrapper.ready:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: -4px 0 10px rgba(0,0,0,0.2), 6px 8px 30px rgba(0,0,0,0.35);
        }

        .book-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 12px;
          background: linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0.05));
          z-index: 2;
          pointer-events: none;
        }

        .cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cover-placeholder {
          width: 100%;
          height: 100%;
          background: #f5f5f5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .cover-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: 120px;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #2d6a4f;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 12px;
          color: #888;
        }

        .cover-error {
          font-size: 12px;
          color: #c00;
          text-align: center;
          padding: 0 12px;
        }

        .cover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 16px;
          transition: background 0.2s ease;
        }

        .book-cover-wrapper:hover .cover-overlay {
          background: rgba(0,0,0,0.35);
        }

        .open-label {
          color: white;
          font-size: 14px;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.2s ease;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .book-cover-wrapper:hover .open-label {
          opacity: 1;
        }

        .loading-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.55);
          color: white;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 10px;
          z-index: 3;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #1a1a1a;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .modal-title {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          font-family: sans-serif;
        }

        .modal-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-indicator {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-family: sans-serif;
          font-variant-numeric: tabular-nums;
        }

        .loading-indicator {
          font-size: 12px;
          color: #6dbf9a;
          font-family: sans-serif;
        }

        .close-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .flipbook-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
        }

        .the-flipbook {
          box-shadow: 0 0 60px rgba(0,0,0,0.6) !important;
        }

        .flip-page {
          background: white;
          overflow: hidden;
        }

        .flip-page img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          user-select: none;
        }

        .modal-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: rgba(255,255,255,0.6);
          font-family: sans-serif;
          font-size: 14px;
        }

        .spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Nav bar */
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 24px;
          background: #111;
          border-top: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .nav-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.75);
          padding: 8px 18px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-family: sans-serif;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .nav-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .nav-progress {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .nav-progress-fill {
          height: 100%;
          background: #6dbf9a;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      `}</style>
    </>
  )
}