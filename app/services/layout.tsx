import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services & Solutions de Réfrigération Embarquée',
  description:
    'Découvrez les services spécialisés SHYK AUTO en Tunisie : climatisation automobile, installation de groupes frigorifiques, cabines isothermes FRC (-20°C / +4°C) et chauffage autonome WEBASTO.',
  alternates: {
    canonical: '/services',
    languages: {
      'fr-TN': '/services',
      'fr': '/services',
    },
  },
  openGraph: {
    title: 'Services Climatisation & Réfrigération | SHYK AUTO Tunisie',
    description:
      'Installation, entretien et dépannage de systèmes frigorifiques et climatisation automobile en Tunisie depuis 1985.',
    url: '/services',
    locale: 'fr_TN',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
