'use client'

import { useState, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import HTMLFlipBook from 'react-pageflip'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0)
  const pdfUrl = "https://genesisbiotech.net/wp-content/uploads/2024/07/Genesis-biotech-presentation-4.pdf"

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <div className="book-container">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="p-10">Opening Book...</div>}
      >
        {numPages > 0 && (
          /* @ts-ignore - types for react-pageflip can be finicky with React 18+ */
          <HTMLFlipBook 
            width={400} 
            height={550} 
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            drawShadow={true}
            flippingTime={1000}
            className="genesis-presentation-book"
            style={{ margin: '0 auto' }}
            startPage={0}
            showCover={true}
            mobileScrollSupport={true}
          >
            {/* Map PDF pages into book pages */}
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="page-content bg-white shadow-inner">
                <Page 
                  pageNumber={index + 1} 
                  width={400} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false} 
                />
                <div className="page-footer text-xs text-gray-400 p-2 text-center">
                  {index + 1}
                </div>
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      <style jsx global>{`
        .book-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          background: radial-gradient(circle, #f0f0f0 0%, #dcdcdc 100%);
          min-height: 600px;
          overflow: hidden;
        }
        .page-content {
          overflow: hidden;
          border-left: 1px solid rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
}