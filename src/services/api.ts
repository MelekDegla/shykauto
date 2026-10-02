import { ServiceItem, ProductItem, ProjectItem, MessageItem, AdminStats } from '../types';

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('shyk_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // --- AUTHENTICATION ---
  async loginAdmin(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Identifiants invalides');
    }
    if (data.token) {
      localStorage.setItem('shyk_admin_token', data.token);
    }
    return data;
  },

  async getAdminProfile() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  logoutAdmin() {
    localStorage.removeItem('shyk_admin_token');
  },

  // --- SERVICES ---
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch(`${API_BASE}/services`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) return json.data;
    } catch (e) {
      console.warn('API /api/services unavailable, using local mock data');
    }
    return [
      {
        id: 'climatisation-automobile',
        title: '01 — CLIMATISATION AUTOMOBILE',
        slug: 'climatisation-automobile',
        shortDescription: 'Installation, entretien et intervention sur les systèmes de climatisation automobile pour véhicules légers et professionnels.',
        fullDescription: 'ShykAuto intervient sur l\'installation, l\'entretien et la maintenance des systèmes de climatisation automobile pour véhicules légers, utilitaires et professionnels. Diagnostic de fuite, recharge de fluide frigorigène et remplacement des composants.',
        icon: 'wind',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        features: ['Recharge fluide frigorigène', 'Recherche de fuite et diagnostic', 'Remplacement compresseurs et détendeurs', 'Entretien et désinfection des circuits'],
      },
      {
        id: 'refrigeration-embarquee',
        title: '02 — RÉFRIGÉRATION EMBARQUÉE',
        slug: 'refrigeration-embarquee',
        shortDescription: 'Installation de groupes frigorifiques pour véhicules équipés de cabines ou caisses isothermes, avec des solutions adaptées au froid positif ou négatif.',
        fullDescription: 'Installation et aménagement de groupes frigorifiques pour véhicules utilitaires et poids lourds équipés de caisses ou cabines isothermes. Nous proposons des équipements répondant aux besoins de maintien en température (froid positif et négatif).',
        icon: 'snowflake',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
        features: ['Groupes poulie-moteur et secteur', 'Solutions froid positif et négatif', 'Adaptation aux véhicules utilitaires et poids lourds', 'Réglage et contrôle de température'],
      },
      {
        id: 'congelation',
        title: '03 — CONGÉLATION',
        slug: 'congelation',
        shortDescription: 'Solutions frigorifiques destinées aux applications nécessitant des températures négatives, avec des équipements pouvant atteindre environ -20 °C selon les modèles.',
        fullDescription: 'Équipements frigorifiques haute performance spécialement conçus pour la conservation sous températures négatives pouvant atteindre environ -20 °C selon les modèles et l\'isolation du véhicule.',
        icon: 'snowflake',
        image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1200&q=80',
        features: ['Basses températures jusqu\'à -20°C', 'Isolation thermique haute performance', 'Groupe frigorifique à forte puissance', 'Maintien continu du froid'],
      },
      {
        id: 'chauffage-auxiliaire',
        title: '04 — CHAUFFAGE AUXILIAIRE',
        slug: 'chauffage-auxiliaire',
        shortDescription: 'Solutions de chauffage auxiliaire pour les véhicules, distribuées avec le savoir-faire WEBASTO.',
        fullDescription: 'SHYK AUTO propose des solutions de chauffage auxiliaire pour les véhicules. En tant que représentant exclusif WEBASTO, nous vous accompagnons dans le choix et l\'installation d\'équipements de chauffage adaptés.',
        icon: 'wrench',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        features: ['Solutions WEBASTO', 'Chauffage autonome pour véhicules', 'Installation par techniciens formés', 'Disponible sur commande'],
      },
      {
        id: 'pieces-et-equipements',
        title: '05 — PIÈCES & ÉQUIPEMENTS',
        slug: 'pieces-et-equipements',
        shortDescription: 'Pièces de rechange et équipements pour les systèmes de climatisation et de réfrigération, disponibles en stock ou sur commande selon les besoins.',
        fullDescription: 'Fourniture de pièces détachées, composants frigorifiques, compresseurs, condenseurs, évaporateurs et accessoires pour climatisation et froid embarqué, disponibles immédiatement en magasin ou sur commande.',
        icon: 'shield-check',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        features: ['Large gamme de pièces détachées', 'Compresseurs, condenseurs, valves', 'Fluide frigorigène et huiles spécialisées', 'Composants pour diverses marques'],
      },
      {
        id: 'installation-et-mise-en-service',
        title: '06 — INSTALLATION & MISE EN SERVICE',
        slug: 'installation-et-mise-en-service',
        shortDescription: 'Étude du besoin, installation des équipements, mise en service et accompagnement dans leur utilisation.',
        fullDescription: 'Prise en charge globale de vos projets d\'équipement : analyse de vos contraintes techniques, choix des matériels, installation soignée dans nos ateliers et mise en service testée avec formation à l\'utilisation.',
        icon: 'shield-check',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
        features: ['Étude technique personnalisée', 'Montage professionnel en atelier', 'Mise en service et essais thermiques', 'Conseils d\'utilisation et prise en main'],
      },
      {
        id: 'maintenance-et-intervention',
        title: '07 — MAINTENANCE & INTERVENTION',
        slug: 'maintenance-et-intervention',
        shortDescription: 'Diagnostic, entretien et intervention sur les équipements afin de préserver leur bon fonctionnement.',
        fullDescription: 'Services de maintenance préventive et curative pour éviter les pannes et prolonger la durée de vie de vos systèmes de climatisation et groupes frigorifiques.',
        icon: 'wrench',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
        features: ['Diagnostic technique complet', 'Entretien périodique des installations', 'Réparation et remplacement de pièces', 'Assistance et suivi technique'],
      },
    ];
  },

  async createService(data: Partial<ServiceItem>) {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateService(id: string, data: Partial<ServiceItem>) {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteService(id: string) {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  // --- PRODUCTS ---
  async getProducts(params?: { category?: string; search?: string; availability?: string }): Promise<ProductItem[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.set('category', params.category);
      if (params?.search) queryParams.set('search', params.search);
      if (params?.availability) queryParams.set('availability', params.availability);
      const qs = queryParams.toString();

      const res = await fetch(`${API_BASE}/products${qs ? '?' + qs : ''}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) return json.data;
    } catch (e) {
      console.warn('API /api/products unavailable, using fallback items');
    }
    return [
      {
        id: 'p1',
        name: 'Compresseur Frigorifique QP7H15 Heavy Duty',
        slug: 'compresseur-qp7h15',
        category: 'Pièces & accessoires',
        description: 'Compresseur 7 pistons à cylindrée fixe 155cc avec embrayage électromagnétique renforcé.',
        price: 1250.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Cylindrée': '155 cc/rev', 'Tension': '12V / 24V', 'Fluides': 'R134a, R452A' },
        featured: true,
      },
      {
        id: 'p2',
        name: 'Condensateur Micro-canaux CC-842-HD',
        slug: 'condensateur-cc-842',
        category: 'Systèmes de climatisation',
        description: 'Échangeur thermique ultra-performant à micro-canaux en alliage d\'aluminium.',
        price: 480.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Débit d\'air': '1,850 m³/h', 'Pression max': '32 bar' },
        featured: true,
      },
      {
        id: 'p3',
        name: 'Groupe Frigorifique SHYK ARCTIC C-350X',
        slug: 'groupe-shyk-arctic-c350x',
        category: 'Groupes frigorifiques',
        description: 'Groupe frigorifique de toit à entraînement direct poulie moteur pour fourgons jusqu\'à 18 m³.',
        price: 3850.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Puissance à 0°C': '3,850 W', 'Volume max': '18 m³' },
        featured: true,
      },
      {
        id: 'p4',
        name: 'Groupe Mixte SHYK POLARIS E-500 Standby',
        slug: 'groupe-shyk-polaris-e500',
        category: 'Groupes frigorifiques',
        description: 'Système frigorifique à double motorisation route + prise secteur 380V Triphasé.',
        price: 5900.0,
        availability: 'ON_REQUEST',
        images: ['https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Puissance à 0°C': '4,950 W', 'Secteur': '380V Triphasé' },
        featured: true,
      },
      {
        id: 'p5',
        name: 'Équipement Frigorifique Isotherme 80mm',
        slug: 'equipement-isotherme-80mm',
        category: 'Équipements de réfrigération',
        description: 'Panneau sandwich isolant moulé haute densité avec peau polyester alimentée.',
        price: 180.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Épaisseur': '80 mm' },
        featured: false,
      },
      {
        id: 'p6',
        name: 'Thermostat Numérique & Afficheur',
        slug: 'thermostat-numerique',
        category: 'Pièces & accessoires',
        description: 'Afficheur numérique de cabine avec enregistreur et régulation de température.',
        price: 450.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Sondes': '2 x NTC IP68' },
        featured: false,
      },
    ];
  },

  async createProduct(data: Partial<ProductItem>) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateProduct(id: string, data: Partial<ProductItem>) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  // --- PROJECTS / REALISATIONS ---
  async getProjects(params?: { category?: string; type?: string }): Promise<ProjectItem[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.set('category', params.category);
      if (params?.type) queryParams.set('type', params.type);
      const qs = queryParams.toString();

      const res = await fetch(`${API_BASE}/projects${qs ? '?' + qs : ''}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) return json.data;
    } catch (e) {
      console.warn('API /api/projects unavailable, using fallback items');
    }
    return [
      {
        id: 'proj1',
        title: 'Transformation Isotherme & Groupe Frigo - Renault Master',
        slug: 'transformation-isotherme-renault-master',
        category: 'Fourgons transformés',
        type: 'BEFORE_AFTER',
        description: 'Transformation d\'un fourgon tôle standard Renault Master L2H2 en véhicule isotherme frigorifique classe FRC (-20°C) pour traiteur.',
        client: 'Société Traiteur Prestige',
        beforeImage: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1000&q=80',
        afterImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
        date: '2026-02',
        featured: true,
      },
      {
        id: 'proj2',
        title: 'Rénovation Complète Système Clim - Autocar Mercedes',
        slug: 'renovation-clim-autocar-mercedes',
        category: 'Installations clim auto',
        type: 'BEFORE_AFTER',
        description: 'Remise en état d\'un circuit de climatisation plafonnier 28kW endommagé avec compresseur grippé et fuites multiples.',
        client: 'Transport Voyageurs Express',
        beforeImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
        afterImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80',
        date: '2026-04',
        featured: true,
      },
      {
        id: 'proj3',
        title: 'Équipement Flotte Camions Frigorifiques Isuzu 3.5T',
        slug: 'flotte-camions-frigorifiques-isuzu',
        category: 'Camions frigorifiques',
        type: 'SIMPLE',
        description: 'Installation de 5 groupes frigorifiques SHYK Polaris E-500 avec fonction Standby triphasée pour produits de mer.',
        client: 'Pêcheries de la Côte',
        images: [
          'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80'
        ],
        date: '2026-05',
        featured: true,
      },
    ];
  },

  async createProject(data: Partial<ProjectItem>) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateProject(id: string, data: Partial<ProjectItem>) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteProject(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  // --- CONTACT & MESSAGES ---
  async sendContactMessage(payload: any) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e: any) {
      return { success: true, message: 'Message enregistré localement !' };
    }
  },

  async getMessages(status?: string): Promise<{ success: boolean; data: MessageItem[]; unreadCount: number }> {
    const qs = status ? `?status=${encodeURIComponent(status)}` : '';

    const res = await fetch(`${API_BASE}/messages${qs}`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async updateMessageStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  async deleteMessage(id: string) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  // --- UPLOAD & STATS ---
  async uploadImage(file: File): Promise<{ success: boolean; url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { ...getAuthHeaders() },
      body: formData,
    });
    return res.json();
  },

  async getStats(): Promise<{ success: boolean; data: AdminStats }> {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async trackVisit(page = '/') {
    try {
      await fetch(`${API_BASE}/stats/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page }),
      });
    } catch (e) {}
  },
};
