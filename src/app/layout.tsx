import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://ecotwin-iraovepwe-ritu-mahajan-s-projects.vercel.app'),
  title: {
    default: 'EcoTwin AI',
    template: '%s | EcoTwin AI',
  },
  description:
    'AI-powered carbon footprint tracker with your personal Climate Digital Twin. See how today\'s choices shape tomorrow\'s planet.',
  keywords: 'carbon footprint, climate twin, AI sustainability, eco tracker, green living',
  authors: [{ name: 'EcoTwin AI' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'EcoTwin AI — Meet Your Future Climate Self',
    description: 'AI-powered carbon footprint tracker with your personal Climate Digital Twin.',
    type: 'website',
    url: 'https://ecotwin-iraovepwe-ritu-mahajan-s-projects.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoTwin AI',
    description: 'Meet Your Future Climate Self',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-eco-dark text-eco-text antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0C1410',
                color: '#E2F0E8',
                border: '0.5px solid rgba(74,222,128,0.2)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#4ADE80', secondary: '#0C1410' },
              },
              error: {
                iconTheme: { primary: '#F87171', secondary: '#0C1410' },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
