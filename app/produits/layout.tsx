import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue Produits & Pièces de Climatisation Automobile',
  description:
    'Consultez notre catalogue d\'équipements et pièces de climatisation : groupes frigorifiques Frigo Soft, Frigo Top, compresseurs haute performance, évaporateurs et pièces de rechange certifiées en Tunisie.',
  alternates: {
    canonical: '/produits',
    languages: {
      'fr-TN': '/produits',
      'fr': '/produits',
    },
  },
  openGraph: {
    title: 'Catalogue Produits & Pièces Climatisation | SHYK AUTO Tunisie',
    description:
      'Groupes frigorifiques pour utilitaires et pièces détachées de climatisation automobile en Tunisie. Équipements de référence WEBASTO, DIAVIA, SANDEN.',
    url: '/produits',
    locale: 'fr_TN',
  },
};

export default function ProduitsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
