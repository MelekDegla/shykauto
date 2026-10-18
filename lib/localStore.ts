import fs from 'fs';
import path from 'path';

export interface StoredProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: 'BEFORE_AFTER' | 'SIMPLE' | 'CAROUSEL';
  description: string;
  client?: string | null;
  images: string[];
  beforeImage?: string | null;
  afterImage?: string | null;
  date?: string | null;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoredProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price?: number | null;
  availability: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_REQUEST';
  images: string[];
  specs?: any;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoredService {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon?: string | null;
  image?: string | null;
  features?: string[];
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LocalStoreData {
  projects: StoredProject[];
  products: StoredProduct[];
  services: StoredService[];
  messages: any[];
  visitStats: any[];
}

const INITIAL_PROJECTS: StoredProject[] = [
  {
    id: 'proj1',
    title: 'Transformation Isotherme & Groupe Frigo - Renault Master',
    slug: 'transformation-isotherme-renault-master',
    category: 'Fourgons transformés',
    type: 'BEFORE_AFTER',
    description: "Transformation d'un fourgon tôle standard Renault Master L2H2 en véhicule isotherme frigorifique classe FRC (-20°C) pour traiteur.",
    client: 'Société Traiteur Prestige',
    images: [],
    beforeImage: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    date: '2026-02',
    featured: true,
    createdAt: '2026-02-15T10:00:00.000Z',
    updatedAt: '2026-02-15T10:00:00.000Z',
  },
  {
    id: 'proj2',
    title: 'Rénovation Complète Système Clim - Autocar Mercedes',
    slug: 'renovation-clim-autocar-mercedes',
    category: 'Installations clim auto',
    type: 'BEFORE_AFTER',
    description: "Remise en état d'un circuit de climatisation plafonnier 28kW endommagé avec compresseur grippé et fuites multiples.",
    client: 'Transport Voyageurs Express',
    images: [],
    beforeImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80',
    date: '2026-04',
    featured: true,
    createdAt: '2026-04-10T14:30:00.000Z',
    updatedAt: '2026-04-10T14:30:00.000Z',
  },
  {
    id: 'proj3',
    title: 'Équipement Flotte Camions Frigorifiques Isuzu 3.5T',
    slug: 'flotte-camions-frigorifiques-isuzu',
    category: 'Camions frigorifiques',
    type: 'CAROUSEL',
    description: "Installation de 5 groupes frigorifiques SHYK Polaris E-500 avec fonction Standby triphasée pour produits de mer.",
    client: 'Pêcheries de la Côte',
    images: [
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    ],
    beforeImage: null,
    afterImage: null,
    date: '2026-05',
    featured: true,
    createdAt: '2026-05-02T09:00:00.000Z',
    updatedAt: '2026-05-02T09:00:00.000Z',
  },
  {
    id: 'proj4',
    title: 'Installation Bi-Température Multi-Zone - Peugeot Boxer',
    slug: 'installation-bi-temperature-peugeot-boxer',
    category: 'Fourgons transformés',
    type: 'SIMPLE',
    description: "Installation d'une cloison amovible avec double évaporateur indépendant permettant le transport de produits frais (+4°C) et surgelés (-18°C).",
    client: 'Distrib-Bio Tunisie',
    images: [
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80'
    ],
    beforeImage: null,
    afterImage: null,
    date: '2026-06',
    featured: false,
    createdAt: '2026-06-12T11:15:00.000Z',
    updatedAt: '2026-06-12T11:15:00.000Z',
  },
];

const INITIAL_PRODUCTS: StoredProduct[] = [
  {
    id: 'p1',
    name: 'Frigo Soft 2000',
    slug: 'frigo-soft-2000',
    category: 'Groupes frigorifiques',
    description: "Unité de réfrigération de transport compacte. Offre une puissance frigorifique allant jusqu'à 1565W (R404A) / 1206W (R134a), un débit d'air de 670 m³/h, adaptée pour des volumes de caisse de 5 à 8 m³, avec une absorption de 14 Amp. Dimensions externes : 575 x 480 x 180 mm (8 kg) ; Dimensions de l'évaporateur interne : 660 x 500 x 157 mm (7,5 kg).",
    price: null,
    availability: 'IN_STOCK',
    images: [
      'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Puissance frigorifique': "Jusqu'à 1565W (R404A) / 1206W (R134a)",
      "Débit d'air": '670 m³/h',
      'Volume de caisse': '5 à 8 m³',
      'Absorption': '14 Amp',
      'Dimensions externes': '575 x 480 x 180 mm (8 kg)',
      "Évaporateur interne": '660 x 500 x 157 mm (7,5 kg)'
    },
    featured: true,
    createdAt: '2026-01-10T08:00:00.000Z',
    updatedAt: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'p2',
    name: 'Frigo Soft 3000',
    slug: 'frigo-soft-3000',
    category: 'Groupes frigorifiques',
    description: "Unité de réfrigération de transport certifiée ATP. Offre une puissance frigorifique allant jusqu'à 2799W (R404A) / 1550W (R404A), un débit d'air de 1040 m³/h, adaptée pour des volumes de caisse jusqu'à 12 m³, avec une absorption de 16 Amp. Dimensions externes : 900 x 500 x 157 mm (10,5 kg) ; Dimensions de l'évaporateur interne : 815 x 600 x 150 mm (12 kg).",
    price: null,
    availability: 'IN_STOCK',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Certification': 'Certifiée ATP',
      'Puissance frigorifique': "Jusqu'à 2799W (R404A) / 1550W (R404A)",
      "Débit d'air": '1040 m³/h',
      'Volume de caisse': "Jusqu'à 12 m³",
      'Absorption': '16 Amp',
      'Dimensions externes': '900 x 500 x 157 mm (10,5 kg)',
      "Évaporateur interne": '815 x 600 x 150 mm (12 kg)'
    },
    featured: true,
    createdAt: '2026-01-12T08:00:00.000Z',
    updatedAt: '2026-01-12T08:00:00.000Z',
  },
  {
    id: 'p3',
    name: 'Frigo Soft 4000',
    slug: 'frigo-soft-4000',
    category: 'Groupes frigorifiques',
    description: "Unité de réfrigération de transport haute capacité certifiée ATP. Offre une puissance frigorifique allant jusqu'à 3660W (R404A) / 2040W (R134a), un débit d'air de 1534 m³/h, adaptée pour des volumes de caisse de 14 à 18 m³, avec une absorption de 16 Amp. Dimensions externes : 1000 x 500 x 157 mm (12,5 kg) ; Dimensions de l'évaporateur interne : 955 x 600 x 150 mm (14 kg).",
    price: null,
    availability: 'IN_STOCK',
    images: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png'
    ],
    specs: {
      'Certification': 'Haute capacité certifiée ATP',
      'Puissance frigorifique': "Jusqu'à 3660W (R404A) / 2040W (R134a)",
      "Débit d'air": '1534 m³/h',
      'Volume de caisse': '14 à 18 m³',
      'Absorption': '16 Amp',
      'Dimensions externes': '1000 x 500 x 157 mm (12,5 kg)',
      "Évaporateur interne": '955 x 600 x 150 mm (14 kg)'
    },
    featured: true,
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: 'p4',
    name: 'Frigo Top FT 20',
    slug: 'frigo-top-ft-20',
    category: 'Groupes frigorifiques',
    description: "Unité de réfrigération de transport compacte montée sur le toit. Offre une puissance frigorifique allant jusqu'à 1650W (R404A) / 1350W (R134a), un débit d'air de 1430 m³/h, adaptée pour des volumes de caisse de 5 à 8 m³, avec une absorption de 14 Amp. Dimensions externes : 800 x 510 x 230 mm (19 kg) ; Dimensions de l'évaporateur interne : 660 x 498 x 149 mm (10,5 kg).",
    price: null,
    availability: 'IN_STOCK',
    images: [
      'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
      'https://d2rqvrnppmk7he.cloudfront.net/article-imagepool/w500/55/6a/71018_1.jpg?20230525101436',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Montage': 'Montée sur le toit',
      'Puissance frigorifique': "Jusqu'à 1650W (R404A) / 1350W (R134a)",
      "Débit d'air": '1430 m³/h',
      'Volume de caisse': '5 à 8 m³',
      'Absorption': '14 Amp',
      'Dimensions externes': '800 x 510 x 230 mm (19 kg)',
      "Évaporateur interne": '660 x 498 x 149 mm (10,5 kg)'
    },
    featured: true,
    createdAt: '2026-01-20T08:00:00.000Z',
    updatedAt: '2026-01-20T08:00:00.000Z',
  },
  {
    id: 'p5',
    name: 'Frigo Top FT 40D',
    slug: 'frigo-top-ft-40d',
    category: 'Groupes frigorifiques',
    description: "Unité de réfrigération de transport intensive montée sur le toit. Offre une puissance frigorifique allant jusqu'à 4044W (Route / R404A) / 2156W (Secteur / R404A), un débit d'air de 2800 à 2860 m³/h, adaptée pour des volumes de caisse de 13 à 24,6 m³, avec une absorption de 21 à 42 Amp. Dimensions externes : 1035 x 551 x 230 mm (27 kg) ; Dimensions de l'évaporateur interne : 1000 x 630 x 152 mm (17 kg).",
    price: null,
    availability: 'IN_STOCK',
    images: [
      'https://d2rqvrnppmk7he.cloudfront.net/article-imagepool/w500/55/6a/71018_1.jpg?20230525101436',
      'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Montage': 'Montée sur le toit (Route & Secteur)',
      'Puissance frigorifique': "Jusqu'à 4044W (Route / R404A) / 2156W (Secteur / R404A)",
      "Débit d'air": '2800 à 2860 m³/h',
      'Volume de caisse': '13 à 24,6 m³',
      'Absorption': '21 à 42 Amp',
      'Dimensions externes': '1035 x 551 x 230 mm (27 kg)',
      "Évaporateur interne": '1000 x 630 x 152 mm (17 kg)'
    },
    featured: false,
    createdAt: '2026-01-25T08:00:00.000Z',
    updatedAt: '2026-01-25T08:00:00.000Z',
  },
  {
    id: 'p6',
    name: 'Frigo Top FT 45RT-D',
    slug: 'frigo-top-ft-45rt-d',
    category: 'Groupes frigorifiques',
    description: "Unité de réfrigération de transport haut de gamme pour toit. Offre une puissance frigorifique allant jusqu'à 4910W (Route / R404A) / 2520W (Secteur / R404A), un débit d'air de 2800 à 2860 m³/h, adaptée pour des volumes de caisse jusqu'à 24,6 m³, avec une absorption de 21 à 42 Amp. Dimensions externes : 1115 x 665 x 180 mm (34 kg) ; Dimensions de l'évaporateur interne : 1135 x 530 x 150 mm (22 kg).",
    price: null,
    availability: 'IN_STOCK',
    images: [
      'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
      'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Montage': 'Haut de gamme pour toit (Route & Secteur)',
      'Puissance frigorifique': "Jusqu'à 4910W (Route / R404A) / 2520W (Secteur / R404A)",
      "Débit d'air": '2800 à 2860 m³/h',
      'Volume de caisse': "Jusqu'à 24,6 m³",
      'Absorption': '21 à 42 Amp',
      'Dimensions externes': '1115 x 665 x 180 mm (34 kg)',
      "Évaporateur interne": '1135 x 530 x 150 mm (22 kg)'
    },
    featured: false,
    createdAt: '2026-02-01T08:00:00.000Z',
    updatedAt: '2026-02-01T08:00:00.000Z',
  },
];

const INITIAL_SERVICES: StoredService[] = [
  {
    id: 'climatisation-automobile',
    title: 'Climatisation Automobile',
    slug: 'climatisation-automobile',
    shortDescription: 'Réparation, installation complète et recharge gaz frigorifique R134a / R1234yf.',
    fullDescription: 'ShykAuto propose des prestations complètes pour la climatisation de votre véhicule. De la recherche de fuite par azote/hydrogène au remplacement du compresseur ou détendeur, nos techniciens certifiés garantissent une fraîcheur et une efficacité énergétique optimales.',
    icon: 'wind',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    features: ['Recharge gaz R134a et R1234yf', 'Détection de fuite sous pression azote', 'Remplacement compresseurs & condensateurs', 'Nettoyage et désinfection du circuit'],
    order: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'installation-frigorifique-utilitaires',
    title: 'Installation Frigorifique pour Utilitaires',
    slug: 'installation-frigorifique-utilitaires',
    shortDescription: 'Groupes frigorifiques poulie-moteur et électriques (positif +4°C & négatif -20°C).',
    fullDescription: 'Conception et montage de groupes de froid sur-mesure pour camionnettes et camions de livraison. Nos installations respectent les normes de transport sous chaîne du froid (ATP) pour les produits alimentaires et pharmaceutiques.',
    icon: 'snowflake',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    features: ['Entraînement direct poulie moteur', 'Mode Standby secteur 220V/380V', 'Régulation électronique de température PID', 'Homologation et certificat sanitaire'],
    order: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'transformation-cabines-isothermes',
    title: 'Transformation Cabines Isothermes',
    slug: 'transformation-cabines-isothermes',
    shortDescription: 'Isolation thermique renforcée et aménagement sur-mesure de fourgons utilitaires.',
    fullDescription: 'Transformez votre véhicule utilitaire standard en caisse ou cabine isotherme haute performance. Nous installons des panneaux sandwich en mousse polyuréthane expansée haute densité avec revêtement polyester lavable.',
    icon: 'shield-check',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1200&q=80',
    features: ['Isolation polyuréthane moulée haute densité', 'Revêtement intérieur étanche et lavable', "Écoulement d'eau et plancher antidérapant", 'Conformité aux exigences HACCP'],
    order: 2,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'maintenance-et-depannage',
    title: 'Maintenance & Dépannage Rapide',
    slug: 'maintenance-et-depannage',
    shortDescription: "Service d'entretien préventif et dépannage d'urgence 24/7 pour flottes professionnels.",
    fullDescription: "Pour éviter la rupture de la chaîne du froid et l'immobilisation de vos véhicules commerciaux, ShykAuto met à disposition un atelier mobile de dépannage d'urgence et des contrats d'entretien préventif.",
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    features: ['Intervention rapide sur site ou atelier', "Contrats d'entretien périodique flottes", 'Banc d\'essai thermique & télémétrie', 'Stock permanent de pièces de rechange'],
    order: 3,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

// In-memory cache singleton
let memoryStore: LocalStoreData | null = null;

function getStoreFilePath(): string {
  const dir = path.join(process.cwd(), 'data');
  return path.join(dir, 'local_store.json');
}

export function loadStore(): LocalStoreData {
  if (memoryStore) return memoryStore;

  const filePath = getStoreFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed) {
        memoryStore = {
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : INITIAL_PROJECTS,
          products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : INITIAL_PRODUCTS,
          services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : INITIAL_SERVICES,
          messages: Array.isArray(parsed.messages) ? parsed.messages : [],
          visitStats: Array.isArray(parsed.visitStats) ? parsed.visitStats : [],
        };
        saveStore(memoryStore);
        return memoryStore;
      }
    }
  } catch (err) {
    console.warn('Could not read local_store.json file, initializing with defaults');
  }

  memoryStore = {
    projects: INITIAL_PROJECTS,
    products: INITIAL_PRODUCTS,
    services: INITIAL_SERVICES,
    messages: [],
    visitStats: [],
  };

  saveStore(memoryStore);
  return memoryStore;
}

export function saveStore(data: LocalStoreData): void {
  memoryStore = data;
  const filePath = getStoreFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist to local_store.json on disk (in-memory store kept)');
  }
}

// ==========================================
// --- PROJECT METHODS ---
// ==========================================

export function getLocalProjects(params?: { category?: string; type?: string; featured?: boolean }): StoredProject[] {
  const store = loadStore();
  let list = [...store.projects];

  if (params?.category) {
    list = list.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params?.type) {
    list = list.filter((p) => p.type === params.type);
  }
  if (params?.featured !== undefined) {
    list = list.filter((p) => Boolean(p.featured) === params.featured);
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getLocalProjectById(idOrSlug: string): StoredProject | null {
  const store = loadStore();
  return store.projects.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export function createLocalProject(data: Partial<StoredProject>): StoredProject {
  const store = loadStore();
  const now = new Date().toISOString();
  const id = data.id || `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const title = data.title || 'Nouvelle Réalisation';
  const slug =
    data.slug ||
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const newProject: StoredProject = {
    id,
    title,
    slug,
    category: data.category || 'Fourgons transformés',
    type: data.type || 'SIMPLE',
    description: data.description || '',
    client: data.client || null,
    images: Array.isArray(data.images) ? data.images : data.images ? [data.images as any] : [],
    beforeImage: data.beforeImage || null,
    afterImage: data.afterImage || null,
    date: data.date || null,
    featured: Boolean(data.featured),
    createdAt: now,
    updatedAt: now,
  };

  store.projects.unshift(newProject);
  saveStore(store);
  return newProject;
}

export function updateLocalProject(id: string, data: Partial<StoredProject>): StoredProject | null {
  const store = loadStore();
  const index = store.projects.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;

  const existing = store.projects[index];
  const updated: StoredProject = {
    ...existing,
    ...data,
    id: existing.id,
    images: data.images !== undefined ? (Array.isArray(data.images) ? data.images : [data.images as any]) : existing.images,
    updatedAt: new Date().toISOString(),
  };

  store.projects[index] = updated;
  saveStore(store);
  return updated;
}

export function deleteLocalProject(id: string): boolean {
  const store = loadStore();
  const initialLen = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id && p.slug !== id);
  if (store.projects.length !== initialLen) {
    saveStore(store);
    return true;
  }
  return false;
}

// ==========================================
// --- PRODUCT METHODS ---
// ==========================================

export function getLocalProducts(params?: { category?: string; search?: string; availability?: string; featured?: boolean }): StoredProduct[] {
  const store = loadStore();
  let list = [...store.products];

  if (params?.category) {
    list = list.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params?.availability) {
    list = list.filter((p) => p.availability === params.availability);
  }
  if (params?.featured !== undefined) {
    list = list.filter((p) => Boolean(p.featured) === params.featured);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getLocalProductById(idOrSlug: string): StoredProduct | null {
  const store = loadStore();
  return store.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export function createLocalProduct(data: Partial<StoredProduct>): StoredProduct {
  const store = loadStore();
  const now = new Date().toISOString();
  const id = data.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const name = data.name || 'Nouveau Produit';
  const slug =
    data.slug ||
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const newProduct: StoredProduct = {
    id,
    name,
    slug,
    category: data.category || 'Pièces de climatisation auto',
    description: data.description || '',
    price: data.price !== undefined && data.price !== null ? Number(data.price) : null,
    availability: (data.availability as any) || 'IN_STOCK',
    images: Array.isArray(data.images) ? data.images : data.images ? [data.images as any] : [],
    specs: data.specs || null,
    featured: Boolean(data.featured),
    createdAt: now,
    updatedAt: now,
  };

  store.products.unshift(newProduct);
  saveStore(store);
  return newProduct;
}

export function updateLocalProduct(id: string, data: Partial<StoredProduct>): StoredProduct | null {
  const store = loadStore();
  const index = store.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;

  const existing = store.products[index];
  const updated: StoredProduct = {
    ...existing,
    ...data,
    id: existing.id,
    price: data.price !== undefined ? (data.price !== null ? Number(data.price) : null) : existing.price,
    images: data.images !== undefined ? (Array.isArray(data.images) ? data.images : [data.images as any]) : existing.images,
    updatedAt: new Date().toISOString(),
  };

  store.products[index] = updated;
  saveStore(store);
  return updated;
}

export function deleteLocalProduct(id: string): boolean {
  const store = loadStore();
  const initialLen = store.products.length;
  store.products = store.products.filter((p) => p.id !== id && p.slug !== id);
  if (store.products.length !== initialLen) {
    saveStore(store);
    return true;
  }
  return false;
}

// ==========================================
// --- SERVICE METHODS ---
// ==========================================

export function getLocalServices(): StoredService[] {
  const store = loadStore();
  return [...store.services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getLocalServiceById(idOrSlug: string): StoredService | null {
  const store = loadStore();
  return store.services.find((s) => s.id === idOrSlug || s.slug === idOrSlug) || null;
}

export function createLocalService(data: Partial<StoredService>): StoredService {
  const store = loadStore();
  const now = new Date().toISOString();
  const id = data.id || `serv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const title = data.title || 'Nouveau Service';
  const slug =
    data.slug ||
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const newService: StoredService = {
    id,
    title,
    slug,
    shortDescription: data.shortDescription || '',
    fullDescription: data.fullDescription || '',
    icon: data.icon || 'wrench',
    image: data.image || null,
    features: Array.isArray(data.features) ? data.features : [],
    order: data.order !== undefined ? Number(data.order) : store.services.length,
    createdAt: now,
    updatedAt: now,
  };

  store.services.push(newService);
  saveStore(store);
  return newService;
}

export function updateLocalService(id: string, data: Partial<StoredService>): StoredService | null {
  const store = loadStore();
  const index = store.services.findIndex((s) => s.id === id || s.slug === id);
  if (index === -1) return null;

  const existing = store.services[index];
  const updated: StoredService = {
    ...existing,
    ...data,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };

  store.services[index] = updated;
  saveStore(store);
  return updated;
}

export function deleteLocalService(id: string): boolean {
  const store = loadStore();
  const initialLen = store.services.length;
  store.services = store.services.filter((s) => s.id !== id && s.slug !== id);
  if (store.services.length !== initialLen) {
    saveStore(store);
    return true;
  }
  return false;
}

// ==========================================
// --- STATS ---
// ==========================================

export function getLocalStats() {
  const store = loadStore();
  const totalProjects = store.projects.length;
  const beforeAfter = store.projects.filter((p) => p.type === 'BEFORE_AFTER').length;
  const carousel = store.projects.filter(
    (p) => p.type === 'CAROUSEL' || (Array.isArray(p.images) && p.images.length > 1)
  ).length;
  const simple = totalProjects - beforeAfter - (store.projects.filter((p) => p.type === 'CAROUSEL').length);

  return {
    products: { total: store.products.length || 6 },
    services: { total: store.services.length || 4 },
    projects: { total: totalProjects, beforeAfter, simple: Math.max(0, simple), carousel },
    messages: { total: store.messages.length, unread: store.messages.filter((m) => m.status === 'NEW').length },
    visits: { total: store.visitStats.length || 120 },
    recentMessages: store.messages.slice(0, 5),
  };
}
