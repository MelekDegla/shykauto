import { Milestone, TechnicalPart, InventoryItem } from '../types';

export const HERITAGE_TEXT = {
  badge: "NOTRE HISTOIRE • DEPUIS 1985 AVEC DOUCAR",
  title: "Une expertise dans la climatisation automobile depuis 1985.",
  yearWatermark: "1985",
  paragraphs: [
    "\u00c0 une \u00e9poque o\u00f9 la climatisation automobile \u00e9tait encore peu d\u00e9velopp\u00e9e dans le Maghreb arabe, DOUCAR s'est impos\u00e9e en Tunisie comme le distributeur et installateur officiel en deuxi\u00e8me monte des syst\u00e8mes de climatisation pour v\u00e9hicules de la marque DIAVIA.",
    "Pionni\u00e8re dans ce domaine depuis 1985, DOUCAR n'a cess\u00e9 de d\u00e9velopper son savoir-faire afin d'am\u00e9liorer la satisfaction de ses clients. Au fil des ann\u00e9es, son exp\u00e9rience et sa croissance ont permis la naissance, en 2003, de SHYK-AUTO, une filiale commerciale sp\u00e9cialis\u00e9e dans la r\u00e9frig\u00e9ration des cabines isothermes pour v\u00e9hicules.",
    "Aujourd'hui, SHYK-AUTO est le repr\u00e9sentant officiel de la marque WEBASTO. Nos techniciens sont form\u00e9s pour intervenir sur diff\u00e9rentes marques de v\u00e9hicules avec un outillage adapt\u00e9. Nous disposons, en stock ou sur commande, des pi\u00e8ces de rechange de qualit\u00e9 \u00e9quivalente \u00e0 l'origine, n\u00e9cessaires \u00e0 l'ensemble de nos interventions.",
    "Nous travaillons avec de grands \u00e9quipementiers tels que DELPHI, DIAVIA et WEBASTO afin de proposer des pi\u00e8ces de qualit\u00e9 \u00e9quivalente \u00e0 l'origine."
  ]
};

export const MILESTONES: Milestone[] = [
  {
    year: "1985",
    title: "Fondation de DOUCAR",
    description: "Cr\u00e9ation de DOUCAR, partenaire officiel de DIAVIA-WEBASTO, premier sp\u00e9cialiste de l'\u00e9quipement automobile en deuxi\u00e8me monte en Tunisie.",
    tag: "ORIGIN"
  },
  {
    year: "1998",
    title: "D\u00e9veloppement du savoir-faire",
    description: "DOUCAR \u00e9tend ses comp\u00e9tences \u00e0 la r\u00e9frig\u00e9ration embarqu\u00e9e et aux cabines isothermes pour v\u00e9hicules utilitaires.",
    tag: "EXPANSION"
  },
  {
    year: "2003",
    title: "Naissance de SHYK-AUTO",
    description: "L'exp\u00e9rience accumul\u00e9e donne naissance \u00e0 SHYK-AUTO, filiale commerciale sp\u00e9cialis\u00e9e dans la r\u00e9frig\u00e9ration des cabines isothermes pour v\u00e9hicules.",
    tag: "FOUNDATION"
  },
  {
    year: "2010",
    title: "Repr\u00e9sentant exclusif WEBASTO",
    description: "SHYK-AUTO devient repr\u00e9sentant exclusif de la marque WEBASTO, distributeur officiel pour la Tunisie.",
    tag: "PARTNERSHIP"
  },
  {
    year: "Aujourd'hui",
    title: "\u00c9quipe technique & gamme compl\u00e8te",
    description: "SHYK-AUTO propose la climatisation, la r\u00e9frig\u00e9ration, le chauffage auxiliaire, les pi\u00e8ces et la maintenance, avec des techniciens form\u00e9s et un stock de pi\u00e8ces adapt\u00e9es.",
    tag: "TODAY"
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
    title: "QUALIT\u00c9",
    description: "Des techniciens sup\u00e9rieurs form\u00e9s en froid automobile et des \u00e9quipements adapt\u00e9s \u00e0 chaque intervention."
  },
  {
    icon: "clock",
    title: "D\u00c9LAIS",
    description: "Une organisation pens\u00e9e pour r\u00e9aliser les interventions dans les d\u00e9lais convenus."
  },
  {
    icon: "handshake",
    title: "SERVICE",
    description: "De l'\u00e9tude de votre besoin \u00e0 l'installation et \u00e0 la mise en service, notre \u00e9quipe vous accompagne \u00e0 chaque \u00e9tape."
  },
  {
    icon: "shield-check",
    title: "ISO 9001",
    description: "Les \u00e9quipements que nous distribuons sont issus de marques reconnues dont les processus de fabrication r\u00e9pondent aux exigences de la norme ISO 9001."
  },
  {
    icon: "shield-check",
    title: "CONFORMIT\u00c9 ATP",
    description: "Les groupes frigorifiques et \u00e9quipements que nous installons sont conformes aux exigences ATP pour le transport de marchandises p\u00e9rissables."
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
    description: "Documentation complète des garanties et suivi rigoureux de l'entretien de vos systèmes."
  }
};

export const CONTACT_DATA = {
  phone: {
    label: "PHONE",
    value: "+216 99 321 543",
    display: "+216 99 321 543 / 20 555 593 / 56 321 570",
    all: "+216 99 321 543 / 20555593 / 56321570",
    numbers: [
      { label: "+216 99 321 543", href: "tel:+21699321543" },
      { label: "+216 20 555 593", href: "tel:+21620555593" },
      { label: "+216 56 321 570", href: "tel:+21656321570" },
    ],
    href: "tel:+21699321543"
  },
  email: {
    label: "EMAIL",
    value: "soniadhoukar@shykauto.tn",
    href: "mailto:soniadhoukar@shykauto.tn"
  },
  location: {
    label: "LOCATION",
    primary: "1 Rue Méditerranée, Ezzahra",
    secondary: "2034 Ben Arous, Tunisie",
    full: "1 Rue Mediterranee Ezzahra 2034 Ben Arous tunisie",
    coordinates: "36.7386° N, 10.2913° E"
  },
  filiale: {
    name: "AUTOCLIMDOUCAR — Pièces et Accessoires Auto",
    role: "Filiale de SHYK AUTO",
    address: "16, Route de Tunis 4011 - H.Sousse",
    phoneFixe: "(+216) 73 361 817",
    phoneFixeHref: "tel:+21673361817",
    fax: "(+216) 73 361 518",
    mobiles: [
      { label: "(+216) 51 230 400", href: "tel:+21651230400" },
      { label: "(+216) 92 311 027", href: "tel:+21692311027" },
    ],
    email: "commercial@autoclimdoucar.com",
    emailHref: "mailto:commercial@autoclimdoucar.com",
    mapsUrl: "https://maps.app.goo.gl/4FMCBNB37aKPTUbu6",
    coordinates: "35.8654° N, 10.5910° E"
  }
};
