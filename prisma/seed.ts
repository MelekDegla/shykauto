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
      name: 'Compresseur Frigorifique QP7H15 Heavy Duty',
      slug: 'compresseur-qp7h15-heavy-duty',
      category: 'Pièces de climatisation auto',
      description: 'Compresseur 7 pistons à cylindrée fixe 155cc avec embrayage électromagnétique renforcé pour véhicules utilitaires et camions frigorifiques.',
      price: 1250.0,
      availability: ProductAvailability.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Cylindrée': '155 cc/rev', 'Tension': '12V / 24V', 'Fluides': 'R134a, R452A, R404A', 'Poulie': '8 gorges PV8' },
      featured: true,
    },
    {
      name: 'Condensateur Micro-canaux CC-842-HD',
      slug: 'condensateur-micro-canaux-cc-842-hd',
      category: 'Pièces de climatisation auto',
      description: 'Échangeur thermique ultra-performant à micro-canaux en alliage d\'aluminium traité contre la corrosion saline.',
      price: 480.0,
      availability: ProductAvailability.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Débit d\'air': '1,850 m³/h', 'Pression max': '32 bar', 'Alliage': 'Al-Mn 3003' },
      featured: true,
    },
    {
      name: 'Kit Frigorifique SHYK ARCTIC C-350X',
      slug: 'kit-frigorifique-shyk-arctic-c-350x',
      category: 'Kits frigorifiques',
      description: 'Groupe frigorifique complet de toit à entraînement direct poulie moteur pour fourgons jusqu\'à 18 m³.',
      price: 3850.0,
      availability: ProductAvailability.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Puissance à 0°C': '3,850 W', 'Puissance à -20°C': '2,100 W', 'Volume max': '18 m³', 'Dégivrage': 'Gaz chaud' },
      featured: true,
    },
    {
      name: 'Groupe Mixte SHYK POLARIS E-500 Standby',
      slug: 'groupe-mixte-shyk-polaris-e-500-standby',
      category: 'Kits frigorifiques',
      description: 'Système frigorifique à double motorisation route + prise secteur 380V Triphasé pour maintien à quai prolongé.',
      price: 5900.0,
      availability: ProductAvailability.ON_REQUEST,
      images: ['https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Puissance à 0°C': '4,950 W', 'Secteur': '380V Triphasé / 220V', 'Volume max': '26 m³' },
      featured: true,
    },
    {
      name: 'Panneau Polyuréthane Isotherme 80mm',
      slug: 'panneau-polyurethane-isotherme-80mm',
      category: 'Matériel pour cabines isothermes',
      description: 'Panneau sandwich isolant moulé haute densité avec peau polyester blanche alimentaire et joint d\'étanchéité.',
      price: 180.0,
      availability: ProductAvailability.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Épaisseur': '80 mm', 'Conductivité': 'λ = 0.022 W/m.K', 'Norme': 'HACCP & ATP' },
      featured: false,
    },
    {
      name: 'Bouteille Gaz Frigorifique R452A (10kg)',
      slug: 'bouteille-gaz-frigorifique-r452a-10kg',
      category: 'Pièces de climatisation auto',
      description: 'Fluide frigorigène R452A conforme F-Gas à faible GWP pour équipements frigorifiques de transport.',
      price: 320.0,
      availability: ProductAvailability.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Contenance': '10 kg', 'Pureté': '99.9%', 'GWP': '2140' },
      featured: false,
    },
    {
      name: 'Thermostat Numérique & Data Logger Télémétrique',
      slug: 'thermostat-numerique-data-logger',
      category: 'Accessoires véhicules',
      description: 'Afficheur numérique de cabine avec enregistreur de température et module de transmission GPS/GSM.',
      price: 450.0,
      availability: ProductAvailability.IN_STOCK,
      images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
      specs: { 'Sondes': '2 x NTC IP68', 'Mémoire': '32,000 enregistrements', 'Connectivité': 'Bluetooth / 4G' },
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
