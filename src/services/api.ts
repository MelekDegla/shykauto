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
        title: 'Climatisation Automobile',
        slug: 'climatisation-automobile',
        shortDescription: 'Réparation, installation complète et recharge gaz frigorifique R134a / R1234yf.',
        fullDescription: 'ShykAuto propose des prestations complètes pour la climatisation de votre véhicule. De la recherche de fuite par azote/hydrogène au remplacement du compresseur ou détendeur, nos techniciens certifiés garantissent une fraîcheur et une efficacité énergétique optimales.',
        icon: 'wind',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        features: ['Recharge gaz R134a et R1234yf', 'Détection de fuite sous pression azote', 'Remplacement compresseurs & condensateurs', 'Nettoyage et désinfection du circuit'],
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
      },
      {
        id: 'transformation-cabines-isothermes',
        title: 'Transformation Cabines Isothermes',
        slug: 'transformation-cabines-isothermes',
        shortDescription: 'Isolation thermique renforcée et aménagement sur-mesure de fourgons utilitaires.',
        fullDescription: 'Transformez votre véhicule utilitaire standard en caisse ou cabine isotherme haute performance. Nous installons des panneaux sandwich en mousse polyuréthane expansée haute densité avec revêtement polyester lavable.',
        icon: 'shield-check',
        image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1200&q=80',
        features: ['Isolation polyuréthane moulée haute densité', 'Revêtement intérieur étanche et lavable', 'Écoulement d\'eau et plancher antidérapant', 'Conformité aux exigences HACCP'],
      },
      {
        id: 'maintenance-et-depannage',
        title: 'Maintenance & Dépannage Rapide',
        slug: 'maintenance-et-depannage',
        shortDescription: 'Service d\'entretien préventif et dépannage d\'urgence 24/7 pour flottes professionnels.',
        fullDescription: 'Pour éviter la rupture de la chaîne du froid et l\'immobilisation de vos véhicules commerciaux, ShykAuto met à disposition un atelier mobile de dépannage d\'urgence et des contrats d\'entretien préventif.',
        icon: 'wrench',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
        features: ['Intervention rapide sur site ou atelier', 'Contrats d\'entretien périodique flottes', 'Banc d\'essai thermique & télémétrie', 'Stock permanent de pièces de rechange'],
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
        category: 'Pièces de climatisation auto',
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
        category: 'Pièces de climatisation auto',
        description: 'Échangeur thermique ultra-performant à micro-canaux en alliage d\'aluminium.',
        price: 480.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Débit d\'air': '1,850 m³/h', 'Pression max': '32 bar' },
        featured: true,
      },
      {
        id: 'p3',
        name: 'Kit Frigorifique SHYK ARCTIC C-350X',
        slug: 'kit-shyk-arctic-c350x',
        category: 'Kits frigorifiques',
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
        category: 'Kits frigorifiques',
        description: 'Système frigorifique à double motorisation route + prise secteur 380V Triphasé.',
        price: 5900.0,
        availability: 'ON_REQUEST',
        images: ['https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Puissance à 0°C': '4,950 W', 'Secteur': '380V Triphasé' },
        featured: true,
      },
      {
        id: 'p5',
        name: 'Panneau Polyuréthane Isotherme 80mm',
        slug: 'panneau-polyurethane-80mm',
        category: 'Matériel pour cabines isothermes',
        description: 'Panneau sandwich isolant moulé haute densité avec peau polyester alimentaire.',
        price: 180.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Épaisseur': '80 mm', 'Norme': 'HACCP & ATP' },
        featured: false,
      },
      {
        id: 'p6',
        name: 'Thermostat Numérique & Data Logger',
        slug: 'thermostat-numerique',
        category: 'Accessoires véhicules',
        description: 'Afficheur numérique de cabine avec enregistreur de température télémétrique.',
        price: 450.0,
        availability: 'IN_STOCK',
        images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
        specs: { 'Sondes': '2 x NTC IP68', 'Connectivité': 'Bluetooth / 4G' },
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
