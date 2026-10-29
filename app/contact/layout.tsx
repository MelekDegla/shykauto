import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contactez-nous & Demande de Devis Gratuit',
  description:
    'Contactez SHYK AUTO à Ezzahra (Ben Arous) ou notre filiale à Sousse pour vos projets de climatisation ou réfrigération utilitaire. Téléphone : +216 99 321 543 / 20 555 593.',
  alternates: {
    canonical: '/contact',
    languages: {
      'fr-TN': '/contact',
      'fr': '/contact',
    },
  },
  openGraph: {
    title: 'Contact & Devis Réfrigération Véhicules | SHYK AUTO Tunisie',
    description:
      'Formulaire de contact et coordonnées directes des ateliers SHYK AUTO à Ben Arous et Sousse. Réponse et devis rapides.',
    url: '/contact',
    locale: 'fr_TN',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
