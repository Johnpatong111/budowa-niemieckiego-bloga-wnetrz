import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE } from '@/lib/site'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: '%s | raumgefühl',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'raumgefühl Redaktion', url: `${SITE.url}/ueber-uns` }],
  creator: 'raumgefühl Redaktion',
  publisher: SITE.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: '/',
    siteName: 'raumgefühl',
    title: SITE.title,
    description: SITE.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'raumgefühl – Das Magazin für schönes Wohnen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f1eb',
  width: 'device-width',
  initialScale: 1,
}

const organisationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icon.svg` },
      email: SITE.email,
      description: SITE.description,
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: 'de-DE',
      publisher: { '@id': `${SITE.url}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/artikel?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

