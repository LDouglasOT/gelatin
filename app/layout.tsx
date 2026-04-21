import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Genesis Biotech — Gelatin Straight from the Source of the Nile',
  description: 'Premium Halal & Kosher gelatin sourced from pristine, pollution-free environments along the Nile. Serving pharmaceutical, collagen, and food industries globally since 2018.',
  keywords: 'halal gelatin, kosher gelatin, bovine gelatin, fish gelatin, collagen, pharmaceutical gelatin, food grade gelatin, nile perch',
  openGraph: {
    title: 'Genesis Biotech — Premium Halal & Kosher Gelatin',
    description: 'Sourced from pristine Nile basin environments. Pharmaceutical, cosmetic & food grade.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}