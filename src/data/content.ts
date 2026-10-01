import { Milestone, TechnicalPart, InventoryItem } from '../types';

export const HERITAGE_TEXT = {
  badge: "NOTRE HISTOIRE • DEPUIS 1985",
  title: "Une expertise construite sur plus de 40 ans.",
  yearWatermark: "1985",
  paragraphs: [
    "L'histoire de SHYK AUTO commence avec Doucar, fondée en 1985, à une époque où la climatisation automobile en Tunisie était encore peu développée.",
    "Au fil des années, Doucar développe son savoir-faire dans la climatisation automobile et les équipements thermiques. En 2003, cette expérience donne naissance à SHYK AUTO, spécialisée dans les solutions de réfrigération pour véhicules et cabines isothermes.",
    "Aujourd'hui, SHYK AUTO intervient dans l'installation et l'équipement des véhicules, la climatisation automobile, la réfrigération embarquée ainsi que la fourniture de pièces et équipements adaptés.",
    "Avec une équipe technique formée et des équipements adaptés aux différentes marques de véhicules, nous accompagnons nos clients de l'étude du besoin jusqu'à l'installation et la mise en service."
  ]
};

export const MILESTONES: Milestone[] = [
  {
    year: "1985",
    title: "Fondation de Doucar",
    description: "Création des premiers ateliers spécialisés dans la climatisation automobile et les caisses isothermes à Tunis.",
    tag: "ORIGIN"
  },
  {
    year: "1998",
    title: "Partenariat WEBASTO",
    description: "Agrément officiel et déploiement des unités de climatisation auxiliaires et chauffages autonomes de haute ingénierie.",
    tag: "PARTNERSHIP"
  },
  {
    year: "2008",
    title: "Certification DIAVIA",
    description: "Intégration des circuits thermodynamiques intégrés pour véhicules utilitaires légers et transports médicaux.",
    tag: "EXPANSION"
  },
  {
    year: "2018",
    title: "Transition SHYK-AUTO",
    description: "Modernisation des bancs d'essai numériques, télémétrie de chaîne du froid et automatisation de pointe.",
    tag: "PRECISION"
  },
  {
    year: "2026",
    title: "Systèmes Électriques Zéro Émission",
    description: "Solutions frigorifiques autonomes 48V/380V pour flottes de livraison urbaine décarbonée.",
    tag: "INNOVATION"
  }
];

export const TECHNICAL_PARTS: TechnicalPart[] = [
  {
    id: "condenser",
    name: "CONDENSER COIL",
    code: "CC-842-HD",
    category: "Dissipation Thermique",
    x: 24,
    y: 38,
    description: "Échangeur thermique à micro-canaux en alliage d'aluminium traité anti-corrosion marine.",
    specs: ["Débit d'air: 1,850 m³/h", "Pression max: 32 bar", "Alliage Al-Mn 3003"]
  },
  {
    id: "evaporator",
    name: "EVAPORATOR CORE",
    code: "EC-110-SLIM",
    category: "Absorption Frigorifique",
    x: 80,
    y: 34,
    description: "Évaporateur plafonnier ultra-plat à convection forcée avec détendeur thermostatique calibré.",
    specs: ["Double ventilateur brushless IP68", "Dégivrage gaz chaud automatique", "Plage: -25°C à +15°C"]
  },
  {
    id: "receiver",
    name: "RECEIVER-DRIER",
    code: "RD-09-MOLECULAR",
    category: "Filtration & Déshydratation",
    x: 90,
    y: 44,
    description: "Filtre déshydrateur à tamis moléculaire haute capacité avec voyant de liquide intégré.",
    specs: ["Tamis XH-9 100% zéolithe", "Voyant d'humidité optique", "Raccord O-Ring haute tenue"]
  },
  {
    id: "compressor",
    name: "COMPRESSOR ASSY",
    code: "QP7H15-HEAVY",
    category: "Compression Fluide",
    x: 20,
    y: 72,
    description: "Compresseur frigorifique 7 pistons à cylindrée fixe avec embrayage électromagnétique renforcé.",
    specs: ["Cylindrée: 155 cc/rev", "Vitesse max: 6,000 RPM", "Fluides: R134a, R404A, R452A"]
  },
  {
    id: "mounting",
    name: "MOUNTING BRACKET",
    code: "MB-CNC-V8",
    category: "Support Mécanique Moteur",
    x: 74,
    y: 86,
    description: "Support de fixation usiné CNC en acier forgé haute résistance garantissant l'alignement poulies.",
    specs: ["Tolérance d'alignement: ±0.05 mm", "Traitement zingué bichromaté", "Galet tendeur dynamique"]
  }
];

export const INVENTORY_CATALOG: InventoryItem[] = [
  {
    id: "shyk-c350",
    name: "SHYK ARCTIC C-350X",
    category: "direct-drive",
    modelCode: "SA-DD-350X",
    coolingCapacity0C: "3,850 W",
    coolingCapacityMinus20C: "2,100 W",
    boxVolume: "Jusqu'à 18 m³",
    refrigerant: "R452A / R134a",
    technology: "Entraînement direct moteur avec compresseur QP16",
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
    description: "Système de réfrigération de toit haute puissance pour fourgons utilitaires et camions de distribution urbaine."
  },
  {
    id: "shyk-e500",
    name: "SHYK POLARIS E-500 STANDBY",
    category: "electric-standby",
    modelCode: "SA-ES-500S",
    coolingCapacity0C: "4,950 W",
    coolingCapacityMinus20C: "2,750 W",
    boxVolume: "Jusqu'à 26 m³",
    refrigerant: "R452A",
    technology: "Double motorisation: Route (poulie) + Secteur 380V Triphasé",
    tag: "HEAVY DUTY",
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=900&q=80",
    description: "Unité mixte route et secteur pour le maintien de température à quai lors des chargements prolongés."
  },
  {
    id: "shyk-bi-temp",
    name: "SHYK DUAL-ZONE MULTI-TEMP",
    category: "multi-temp",
    modelCode: "SA-MT-720D",
    coolingCapacity0C: "5,400 W",
    coolingCapacityMinus20C: "3,100 W",
    boxVolume: "Jusqu'à 32 m³",
    refrigerant: "R452A",
    technology: "Double évaporateur indépendant avec régulation électronique PID",
    tag: "PHARMA & FOOD",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
    description: "Compartimentation frais (+4°C) et surgelé (-20°C) avec traçabilité thermique continue conforme ATP."
  },
  {
    id: "webasto-diavia-ac",
    name: "WEBASTO / DIAVIA INTEGRATED HVAC",
    category: "ac-systems",
    modelCode: "WD-HVAC-9000",
    coolingCapacity0C: "8,500 W",
    coolingCapacityMinus20C: "N/A (Climatisation)",
    boxVolume: "Habitacle & Minibus",
    refrigerant: "R134a / R1234yf",
    technology: "Système de climatisation renforcée pour transport de personnes et cabines lourdes",
    tag: "CERTIFIED OEM",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80",
    description: "Intégration première monte homologuée constructeur pour bus, ambulances et véhicules blindés."
  }
];

export const ENGAGEMENTS_DATA = [
  {
    icon: "shield-check",
    title: "QUALITÉ",
    description: "Des techniciens formés et des équipements adaptés aux différentes marques de véhicules."
  },
  {
    icon: "clock",
    title: "DÉLAIS",
    description: "Une organisation pensée pour réaliser les interventions dans les délais convenus."
  },
  {
    icon: "handshake",
    title: "SERVICE",
    description: "De l'étude de votre besoin à l'installation et à la mise en service, notre équipe vous accompagne à chaque étape."
  },
  {
    icon: "eye",
    title: "TRANSPARENCE",
    description: "Des devis clairs, une information transparente sur les interventions et un suivi de vos travaux."
  }
];

export const TRANSPARENCE_DATA = {
  title: "Transparence Totale",
  tarification: {
    label: "TARIFICATION",
    description: "Devis clairs, détaillés et sans coûts cachés avant toute intervention technique."
  },
  suivi: {
    label: "SUIVI",
    description: "Documentation complète des réparations et suivi rigoureux de l'entretien de vos systèmes."
  }
};

export const CONTACT_DATA = {
  phone: {
    label: "PHONE",
    value: "+216 71 000 000",
    href: "tel:+21671000000"
  },
  email: {
    label: "EMAIL",
    value: "contact@shykauto.com",
    href: "mailto:contact@shykauto.com"
  },
  location: {
    label: "LOCATION",
    primary: "Zone Industrielle, Tunis",
    secondary: "Tunisia",
    coordinates: "36.8065° N, 10.1815° E"
  }
};
