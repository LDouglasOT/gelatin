import dynamic from 'next/dynamic'

// ssr: false is the critical fix — prevents pdfjs from running in Node.js
const PdfFlipBook = dynamic(() => import('./PdfFlipBook'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[80vh]">
      <p className="font-sans text-gray-500">Loading presentation...</p>
    </div>
  ),
})

export default function GenesisBook() {
  return <PdfFlipBook />
}