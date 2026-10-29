import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notre Histoire & Expertise depuis 1985 (DOUCAR)',
  description:
    'L\'histoire de DOUCAR et SHYK AUTO : pionniers de la climatisation automobile en Tunisie depuis 1985. Représentant officiel de WEBASTO et partenaire historique DIAVIA, SANDEN, DELPHI, SPAL.',
  alternates: {
    canonical: '/about',
    languages: {
      'fr-TN': '/about',
      'fr': '/about',
    },
  },
  openGraph: {
    title: 'Histoire & Savoir-faire depuis 1985 | SHYK AUTO Tunisie',
    description:
      'Quatre décennies d\'excellence technique dans la climatisation automobile et la réfrigération de transport en Tunisie.',
    url: '/about',
    locale: 'fr_TN',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
