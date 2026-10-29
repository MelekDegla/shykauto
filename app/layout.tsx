import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../src/index.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shykauto.tn';

export const viewport: Viewport = {
  themeColor: '#000613',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SHYK AUTO | Climatisation Automobile & Réfrigération Embarquée en Tunisie',
    template: '%s | SHYK AUTO Tunisie',
  },
  description:
    'Leader de la climatisation automobile et du froid embarqué en Tunisie depuis 1985 (DOUCAR). Groupes frigorifiques pour fourgons utilitaires, cabines isothermes, climatisation d\'autocars et chauffage auxiliaire WEBASTO. Devis et intervention rapide.',
  keywords: [
    'climatisation automobile tunisie',
    'groupe frigorifique tunisie',
    'cabine isotherme tunisie',
    'froid embarqué utilitaire',
    'fourgon frigorifique',
    'webasto tunisie',
    'diavia',
    'sanden',
    'delphi',
    'spal',
    'elke',
    'chauffage auxiliaire vehicule',
    'recharge clim auto tunisie',
    'compresseur frigorifique',
    'shyk auto',
    'doucar',
    'ben arous',
    'ezzahra',
    'sousse',
  ],
  authors: [{ name: 'SHYK AUTO', url: SITE_URL }],
  creator: 'SHYK AUTO',
  publisher: 'SHYK AUTO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-TN': '/',
      'fr': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    alternateLocale: ['fr_FR'],
    url: SITE_URL,
    siteName: 'SHYK AUTO Tunisie',
    title: 'SHYK AUTO | Climatisation Automobile & Réfrigération Embarquée en Tunisie',
    description:
      'Pionnier de la climatisation et du froid embarqué en Tunisie depuis 1985 (DOUCAR). Groupes frigorifiques, cabines isothermes, climatisation véhicules et bus, représentant WEBASTO.',
    images: [
      {
        url: '/images/shyk-auto-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'SHYK AUTO - Climatisation Automobile et Réfrigération en Tunisie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHYK AUTO | Climatisation Automobile & Froid Embarqué Tunisie',
    description:
      'Installation et maintenance de groupes frigorifiques, cabines isothermes et climatisation automobile en Tunisie depuis 1985.',
    images: ['/images/shyk-auto-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Climatisation Automobile & Réfrigération Industrielle',
};

// JSON-LD Structured Data Schema for Local Business & Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  inLanguage: 'fr-TN',
  name: 'SHYK AUTO',
  alternateName: ['DOUCAR', 'SHYK-AUTO Climatisation & Réfrigération Embarquée'],
  description:
    'Distributeur et installateur officiel en deuxième monte des systèmes de climatisation et réfrigération embarquée pour véhicules en Tunisie. Représentant officiel WEBASTO, DIAVIA, SANDEN, DELPHI, SPAL, ELKE.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/shyk-auto-hero.jpg`,
  image: `${SITE_URL}/images/shyk-auto-hero.jpg`,
  telephone: '+216 99 321 543',
  email: 'soniadhoukar@shykauto.tn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Rue Méditerranée, Ezzahra',
    addressLocality: 'Ben Arous',
    postalCode: '2034',
    addressCountry: 'TN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.7386,
    longitude: 10.2913,
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '13:00',
    },
  ],
  department: [
    {
      '@type': 'AutoRepair',
      name: 'SHYK AUTO Filiale Sousse',
      telephone: '+216 73 361 817',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '16, Route de Tunis',
        addressLocality: 'H.Sousse',
        postalCode: '4011',
        addressCountry: 'TN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 35.8654,
        longitude: 10.591,
      },
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Tunisie',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#faf9fc] text-[#1a1c1e] antialiased selection:bg-[#cbd5e1] selection:text-[#000613]">
        {children}
      </body>
    </html>
  );
}
