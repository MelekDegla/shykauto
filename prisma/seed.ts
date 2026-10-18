import { PrismaClient, ProjectType, ProductAvailability, MessageStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ShykAuto Database Seeding...');

  // 1. Clean existing records
  await prisma.visitStat.deleteMany();
  await prisma.message.deleteMany();
  await prisma.project.deleteMany();
  await prisma.product.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admin User
  const hashedPassword = await bcrypt.hash('Admin@123456', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@shykauto.com',
      password: hashedPassword,
      name: 'Admin ShykAuto',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // 3. Create Services
  const servicesData = [
    {
      title: 'Climatisation Automobile',
      slug: 'climatisation-automobile',
      shortDescription: 'Réparation, installation complète et recharge gaz frigorifique R134a / R1234yf.',
      fullDescription: `ShykAuto propose des prestations complètes pour la climatisation de votre véhicule. De la recherche de fuite par azote/hydrogène au remplacement du compresseur ou détendeur, nos techniciens certifiés garantissent une fraîcheur et une efficacité énergétique optimales pour tous types de véhicules (citadines, SUV, utilitaires, bus).`,
      icon: 'wind',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      features: ['Recharge gaz R134a et R1234yf', 'Détection de fuite sous pression azote', 'Remplacement compresseurs & condensateurs', 'Nettoyage et désinfection du circuit'],
      order: 1,
    },
    {
      title: 'Installation Frigorifique pour Véhicules Utilitaires',
      slug: 'installation-frigorifique-utilitaires',
      shortDescription: 'Groupes frigorifiques poulie-moteur et électriques (positif +4°C & négatif -20°C).',
      fullDescription: `Conception et montage de groupes de froid sur-mesure pour camionnettes et camions de livraison. Nos installations respectent les normes de transport sous chaîne du froid (ATP) pour les produits alimentaires et pharmaceutiques.`,
      icon: 'snowflake',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      features: ['Entraînement direct poulie moteur', 'Mode Standby secteur 220V/380V', 'Régulation électronique de température PID', 'Homologation et certificat sanitaire'],
      order: 2,
    },
    {
      title: 'Transformation & Cabines Isothermes',
      slug: 'transformation-cabines-isothermes',
      shortDescription: 'Isolation thermique renforcée et aménagement sur-mesure de fourgons utilitaires.',
      fullDescription: `Transformez votre véhicule utilitaire standard en caisse ou cabine isotherme haute performance. Nous installons des panneaux sandwich en mousse polyuréthane expansée haute densité avec revêtement polyester lavable agréé contact alimentaire.`,
      icon: 'shield-check',
      image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1200&q=80',
      features: ['Isolation polyuréthane moulée haute densité', 'Revêtement intérieur étanche et lavable', 'Écoulement d\'eau et plancher antidérapant', 'Conformité aux exigences HACCP'],
      order: 3,
    },
    {
      title: 'Maintenance & Dépannage Rapide',
      slug: 'maintenance-et-depannage',
      shortDescription: 'Service d\'entretien préventif et dépannage d\'urgence 24/7 pour flottes professionnels.',
      fullDescription: `Pour éviter la rupture de la chaîne du froid et l'immobilisation de vos véhicules commerciaux, ShykAuto met à disposition un atelier mobile de dépannage d'urgence et des contrats d'entretien préventif pour flottes.`,
      icon: 'wrench',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      features: ['Intervention rapide sur site ou atelier', 'Contrats d\'entretien périodique flottes', 'Banc d\'essai thermique & télémétrie', 'Stock permanent de pièces de rechange'],
      order: 4,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.create({ data: s });
  }
  console.log('✅ Services created');

  // 4. Create Products
  const productsData = [
    {
      name: 'Frigo Soft 2000',
      slug: 'frigo-soft-2000',
      category: 'Groupes frigorifiques',
      description: "Unité de réfrigération de transport compacte. Offre une puissance frigorifique allant jusqu'à 1565W (R404A) / 1206W (R134a), un débit d'air de 670 m³/h, adaptée pour des volumes de caisse de 5 à 8 m³, avec une absorption de 14 Amp. Dimensions externes : 575 x 480 x 180 mm (8 kg) ; Dimensions de l'évaporateur interne : 660 x 500 x 157 mm (7,5 kg).",
      availability: ProductAvailability.IN_STOCK,
      images: [
        'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        'Puissance frigorifique': "Jusqu'à 1565W (R404A) / 1206W (R134a)",
        "Débit d'air": '670 m³/h',
        'Volume de caisse': '5 à 8 m³',
        'Absorption': '14 Amp',
        'Dimensions externes': '575 x 480 x 180 mm (8 kg)',
        "Évaporateur interne": '660 x 500 x 157 mm (7,5 kg)',
      },
      featured: true,
    },
    {
      name: 'Frigo Soft 3000',
      slug: 'frigo-soft-3000',
      category: 'Groupes frigorifiques',
      description: "Unité de réfrigération de transport certifiée ATP. Offre une puissance frigorifique allant jusqu'à 2799W (R404A) / 1550W (R404A), un débit d'air de 1040 m³/h, adaptée pour des volumes de caisse jusqu'à 12 m³, avec une absorption de 16 Amp. Dimensions externes : 900 x 500 x 157 mm (10,5 kg) ; Dimensions de l'évaporateur interne : 815 x 600 x 150 mm (12 kg).",
      availability: ProductAvailability.IN_STOCK,
      images: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        'Certification': 'Certifiée ATP',
        'Puissance frigorifique': "Jusqu'à 2799W (R404A) / 1550W (R404A)",
        "Débit d'air": '1040 m³/h',
        'Volume de caisse': "Jusqu'à 12 m³",
        'Absorption': '16 Amp',
        'Dimensions externes': '900 x 500 x 157 mm (10,5 kg)',
        "Évaporateur interne": '815 x 600 x 150 mm (12 kg)',
      },
      featured: true,
    },
    {
      name: 'Frigo Soft 4000',
      slug: 'frigo-soft-4000',
      category: 'Groupes frigorifiques',
      description: "Unité de réfrigération de transport haute capacité certifiée ATP. Offre une puissance frigorifique allant jusqu'à 3660W (R404A) / 2040W (R134a), un débit d'air de 1534 m³/h, adaptée pour des volumes de caisse de 14 à 18 m³, avec une absorption de 16 Amp. Dimensions externes : 1000 x 500 x 157 mm (12,5 kg) ; Dimensions de l'évaporateur interne : 955 x 600 x 150 mm (14 kg).",
      availability: ProductAvailability.IN_STOCK,
      images: [
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
      ],
      specs: {
        'Certification': 'Haute capacité certifiée ATP',
        'Puissance frigorifique': "Jusqu'à 3660W (R404A) / 2040W (R134a)",
        "Débit d'air": '1534 m³/h',
        'Volume de caisse': '14 à 18 m³',
        'Absorption': '16 Amp',
        'Dimensions externes': '1000 x 500 x 157 mm (12,5 kg)',
        "Évaporateur interne": '955 x 600 x 150 mm (14 kg)',
      },
      featured: true,
    },
    {
      name: 'Frigo Top FT 20',
      slug: 'frigo-top-ft-20',
      category: 'Groupes frigorifiques',
      description: "Unité de réfrigération de transport compacte montée sur le toit. Offre une puissance frigorifique allant jusqu'à 1650W (R404A) / 1350W (R134a), un débit d'air de 1430 m³/h, adaptée pour des volumes de caisse de 5 à 8 m³, avec une absorption de 14 Amp. Dimensions externes : 800 x 510 x 230 mm (19 kg) ; Dimensions de l'évaporateur interne : 660 x 498 x 149 mm (10,5 kg).",
      availability: ProductAvailability.IN_STOCK,
      images: [
        'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
        'https://d2rqvrnppmk7he.cloudfront.net/article-imagepool/w500/55/6a/71018_1.jpg?20230525101436',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        'Montage': 'Montée sur le toit',
        'Puissance frigorifique': "Jusqu'à 1650W (R404A) / 1350W (R134a)",
        "Débit d'air": '1430 m³/h',
        'Volume de caisse': '5 à 8 m³',
        'Absorption': '14 Amp',
        'Dimensions externes': '800 x 510 x 230 mm (19 kg)',
        "Évaporateur interne": '660 x 498 x 149 mm (10,5 kg)',
      },
      featured: true,
    },
    {
      name: 'Frigo Top FT 40D',
      slug: 'frigo-top-ft-40d',
      category: 'Groupes frigorifiques',
      description: "Unité de réfrigération de transport intensive montée sur le toit. Offre une puissance frigorifique allant jusqu'à 4044W (Route / R404A) / 2156W (Secteur / R404A), un débit d'air de 2800 à 2860 m³/h, adaptée pour des volumes de caisse de 13 à 24,6 m³, avec une absorption de 21 à 42 Amp. Dimensions externes : 1035 x 551 x 230 mm (27 kg) ; Dimensions de l'évaporateur interne : 1000 x 630 x 152 mm (17 kg).",
      availability: ProductAvailability.IN_STOCK,
      images: [
        'https://d2rqvrnppmk7he.cloudfront.net/article-imagepool/w500/55/6a/71018_1.jpg?20230525101436',
        'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        'Montage': 'Montée sur le toit (Route & Secteur)',
        'Puissance frigorifique': "Jusqu'à 4044W (Route / R404A) / 2156W (Secteur / R404A)",
        "Débit d'air": '2800 à 2860 m³/h',
        'Volume de caisse': '13 à 24,6 m³',
        'Absorption': '21 à 42 Amp',
        'Dimensions externes': '1035 x 551 x 230 mm (27 kg)',
        "Évaporateur interne": '1000 x 630 x 152 mm (17 kg)',
      },
      featured: false,
    },
    {
      name: 'Frigo Top FT 45RT-D',
      slug: 'frigo-top-ft-45rt-d',
      category: 'Groupes frigorifiques',
      description: "Unité de réfrigération de transport haut de gamme pour toit. Offre une puissance frigorifique allant jusqu'à 4910W (Route / R404A) / 2520W (Secteur / R404A), un débit d'air de 2800 à 2860 m³/h, adaptée pour des volumes de caisse jusqu'à 24,6 m³, avec une absorption de 21 à 42 Amp. Dimensions externes : 1115 x 665 x 180 mm (34 kg) ; Dimensions de l'évaporateur interne : 1135 x 530 x 150 mm (22 kg).",
      availability: ProductAvailability.IN_STOCK,
      images: [
        'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
        'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        'Montage': 'Haut de gamme pour toit (Route & Secteur)',
        'Puissance frigorifique': "Jusqu'à 4910W (Route / R404A) / 2520W (Secteur / R404A)",
        "Débit d'air": '2800 à 2860 m³/h',
        'Volume de caisse': "Jusqu'à 24,6 m³",
        'Absorption': '21 à 42 Amp',
        'Dimensions externes': '1115 x 665 x 180 mm (34 kg)',
        "Évaporateur interne": '1135 x 530 x 150 mm (22 kg)',
      },
      featured: false,
    },
  ];

  for (const p of productsData) {
    await prisma.product.create({ data: p });
  }
  console.log('✅ Products created');

  // 5. Create Projects (Both SIMPLE and BEFORE_AFTER types)
  const projectsData = [
    {
      title: 'Transformation Isotherme & Groupe Frigo - Renault Master',
      slug: 'transformation-isotherme-renault-master',
      category: 'Fourgons transformés',
      type: ProjectType.BEFORE_AFTER,
      description: 'Transformation d\'un fourgon tôle standard Renault Master L2H2 en véhicule isotherme frigorifique classe FRC (-20°C à +12°C) pour un traiteur événementiel.',
      client: 'Société Traiteur Prestige',
      beforeImage: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
      date: '2026-02',
      featured: true,
    },
    {
      title: 'Rénovation Complète Système Clim - Autocar Mercedes Tourismo',
      slug: 'renovation-clim-autocar-mercedes',
      category: 'Installations clim auto',
      type: ProjectType.BEFORE_AFTER,
      description: 'Remise en état d\'un circuit de climatisation plafonnier 28kW endommagé avec compresseur grippé et fuites multiples.',
      client: 'Transport Voyageurs Express',
      beforeImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80',
      date: '2026-04',
      featured: true,
    },
    {
      title: 'Équipement Flotte Camions Frigorifiques Isuzu 3.5T',
      slug: 'flotte-camions-frigorifiques-isuzu',
      category: 'Camions frigorifiques',
      type: ProjectType.SIMPLE,
      description: 'Installation de 5 groupes frigorifiques SHYK Polaris E-500 avec fonction Standby triphasée pour la livraison de produits de mer.',
      client: 'Pêcheries de la Côte',
      images: [
        'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80'
      ],
      date: '2026-05',
      featured: true,
    },
    {
      title: 'Installation Bi-Température Multi-Zone - Peugeot Boxer',
      slug: 'installation-bi-temperature-peugeot-boxer',
      category: 'Fourgons transformés',
      type: ProjectType.SIMPLE,
      description: 'Installation d\'une cloison amovible avec double évaporateur indépendant permettant le transport simultané de produits frais (+4°C) et surgelés (-18°C).',
      client: 'Distrib-Bio Tunisie',
      images: [
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80'
      ],
      date: '2026-06',
      featured: false,
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }
  console.log('✅ Projects created (BEFORE_AFTER and SIMPLE types)');

  // 6. Create Contact Messages
  const messagesData = [
    {
      fullName: 'Sami Ben Ali',
      email: 'sami.benali@company.tn',
      phone: '+216 98 123 456',
      companyName: 'Express Logistics',
      vehicleType: 'Renault Master L3H2',
      serviceType: 'Installation Frigorifique',
      message: 'Bonjour, j\'aimerais obtenir un devis pour l\'installation d\'un groupe frigorifique négatif (-20°C) sur deux camionnettes.',
      status: MessageStatus.NEW,
    },
    {
      fullName: 'Karim Mansouri',
      email: 'k.mansouri@pharmatransport.com',
      phone: '+216 22 987 654',
      companyName: 'Pharma Transport',
      vehicleType: 'Peugeot Partner',
      serviceType: 'Transformation Isotherme',
      message: 'Demande de tarif et délais pour isolation cabine conforme transport de médicaments (+15°C à +25°C).',
      status: MessageStatus.READ,
    },
  ];

  for (const msg of messagesData) {
    await prisma.message.create({ data: msg });
  }
  console.log('✅ Contact messages created');

  // 7. Create Visit Stats
  const visits = [
    { page: '/', ipHash: 'hash1' },
    { page: '/services', ipHash: 'hash2' },
    { page: '/produits', ipHash: 'hash3' },
    { page: '/realisations', ipHash: 'hash4' },
    { page: '/contact', ipHash: 'hash5' },
  ];

  for (const v of visits) {
    await prisma.visitStat.create({ data: v });
  }
  console.log('✅ Visit stats created');

  console.log('🎉 Database seeding complete successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
