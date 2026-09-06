import React from 'react';
import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'SHYK AUTO | Architects of Cold - Automotive Refrigeration & Climate',
  description: 'Leading automotive climate & refrigeration in Tunisia since 1985. Engineering precise environmental control for specialized transport.',
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
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#faf9fc] text-[#1a1c1e] antialiased selection:bg-[#cbd5e1] selection:text-[#000613]">
        {children}
      </body>
    </html>
  );
}
