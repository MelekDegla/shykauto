import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Réalisations & Transformations de Véhicules',
  description:
    'Découvrez les réalisations de SHYK AUTO en Tunisie : transformations isothermes de fourgons, rénovations complètes de climatisation d\'autocars et équipement de camions frigorifiques.',
  alternates: {
    canonical: '/realisations',
  },
  openGraph: {
    title: 'Réalisations & Projets Avant/Après | SHYK AUTO Tunisie',
    description:
      'Galerie de nos projets de froid embarqué et climatisation utilitaire en Tunisie : Renault Master, Peugeot Boxer, autocars et camions.',
    url: '/realisations',
  },
};

export default function RealisationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
