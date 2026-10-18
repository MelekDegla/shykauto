import { ServiceItem, ProductItem, ProjectItem, MessageItem, AdminStats } from '../types';
import { fileToBase64 } from '../utils/imageUtils';

const API_BASE = '/api';

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('shyk_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Local storage keys for resilient persistence (v3 uses real NeonDB data)
const STORAGE_KEYS = {
  PROJECTS: 'shyk_projects_data_v3',
  PRODUCTS: 'shyk_products_data_v3',
  SERVICES: 'shyk_services_data_v3',
};

// Helper to safely read and write JSON to localStorage
function getLocalCache<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as T;
      if (parsed && typeof parsed === 'object') return parsed as T;
    }
  } catch (e) {
    console.warn(`Error reading localStorage key ${key}:`, e);
  }
  return defaultValue;
}

function setLocalCache<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage key ${key}:`, e);
  }
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
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { ...getAuthHeaders() },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) return data;
      }
    } catch (e) {
      console.warn('Unable to reach /api/auth/me:', e);
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('shyk_admin_token') : null;
    if (token) {
      return {
        success: true,
        user: { id: 'admin-1', email: 'admin@shykauto.com', name: 'Admin ShykAuto', role: 'ADMIN' },
      };
    }
    return { success: false, error: 'Non authentifié' };
  },

  logoutAdmin() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shyk_admin_token');
    }
  },

  // --- SERVICES ---
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocalCache(STORAGE_KEYS.SERVICES, json.data);
          return json.data;
        }
      }
    } catch (e) {
      console.warn('API /api/services unavailable, using persistent cache:', e);
    }

    return getLocalCache<ServiceItem[]>(STORAGE_KEYS.SERVICES, []);
  },

  async createService(data: Partial<ServiceItem>) {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la création du service');
    }

    const cached = getLocalCache<ServiceItem[]>(STORAGE_KEYS.SERVICES, []);
    cached.unshift(json.data);
    setLocalCache(STORAGE_KEYS.SERVICES, cached);
    return json;
  },

  async updateService(id: string, data: Partial<ServiceItem>) {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la mise à jour du service');
    }

    const cached = getLocalCache<ServiceItem[]>(STORAGE_KEYS.SERVICES, []);
    const idx = cached.findIndex((s) => s.id === id || s.slug === id);
    if (idx !== -1) {
      cached[idx] = json.data;
    } else {
      cached.push(json.data);
    }
    setLocalCache(STORAGE_KEYS.SERVICES, cached);
    return json;
  },

  async deleteService(id: string) {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la suppression du service');
    }

    const cached = getLocalCache<ServiceItem[]>(STORAGE_KEYS.SERVICES, []);
    const filtered = cached.filter((s) => s.id !== id && s.slug !== id);
    setLocalCache(STORAGE_KEYS.SERVICES, filtered);
    return json;
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
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocalCache(STORAGE_KEYS.PRODUCTS, json.data);
          return json.data;
        }
      }
    } catch (e) {
      console.warn('API /api/products unavailable, using persistent cache:', e);
    }

    return getLocalCache<ProductItem[]>(STORAGE_KEYS.PRODUCTS, []);
  },

  async createProduct(data: Partial<ProductItem>) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la création du produit');
    }

    const cached = getLocalCache<ProductItem[]>(STORAGE_KEYS.PRODUCTS, []);
    cached.unshift(json.data);
    setLocalCache(STORAGE_KEYS.PRODUCTS, cached);
    return json;
  },

  async updateProduct(id: string, data: Partial<ProductItem>) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la mise à jour du produit');
    }

    const cached = getLocalCache<ProductItem[]>(STORAGE_KEYS.PRODUCTS, []);
    const idx = cached.findIndex((p) => p.id === id || p.slug === id);
    if (idx !== -1) {
      cached[idx] = json.data;
    } else {
      cached.push(json.data);
    }
    setLocalCache(STORAGE_KEYS.PRODUCTS, cached);
    return json;
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la suppression du produit');
    }

    const cached = getLocalCache<ProductItem[]>(STORAGE_KEYS.PRODUCTS, []);
    const filtered = cached.filter((p) => p.id !== id && p.slug !== id);
    setLocalCache(STORAGE_KEYS.PRODUCTS, filtered);
    return json;
  },

  // --- PROJECTS / REALISATIONS ---
  async getProjects(params?: { category?: string; type?: string }): Promise<ProjectItem[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.set('category', params.category);
      if (params?.type) queryParams.set('type', params.type);
      const qs = queryParams.toString();

      const res = await fetch(`${API_BASE}/projects${qs ? '?' + qs : ''}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLocalCache(STORAGE_KEYS.PROJECTS, json.data);
          return json.data;
        }
      }
    } catch (e) {
      console.warn('API /api/projects unavailable, using persistent cache:', e);
    }

    return getLocalCache<ProjectItem[]>(STORAGE_KEYS.PROJECTS, []);
  },

  async createProject(data: Partial<ProjectItem>) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la création du projet');
    }

    const cached = getLocalCache<ProjectItem[]>(STORAGE_KEYS.PROJECTS, []);
    cached.unshift(json.data);
    setLocalCache(STORAGE_KEYS.PROJECTS, cached);
    return json;
  },

  async updateProject(id: string, data: Partial<ProjectItem>) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la mise à jour du projet');
    }

    const cached = getLocalCache<ProjectItem[]>(STORAGE_KEYS.PROJECTS, []);
    const idx = cached.findIndex((p) => p.id === id || p.slug === id);
    if (idx !== -1) {
      cached[idx] = json.data;
    } else {
      cached.push(json.data);
    }
    setLocalCache(STORAGE_KEYS.PROJECTS, cached);
    return json;
  },

  async deleteProject(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors de la suppression du projet');
    }

    const cached = getLocalCache<ProjectItem[]>(STORAGE_KEYS.PROJECTS, []);
    const filtered = cached.filter((p) => p.id !== id && p.slug !== id);
    setLocalCache(STORAGE_KEYS.PROJECTS, filtered);
    return json;
  },

  // --- CONTACT & MESSAGES ---
  async sendContactMessage(payload: any) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Erreur lors de l'envoi du message");
    }
    return json;
  },

  async getMessages(status?: string): Promise<{ success: boolean; data: MessageItem[]; unreadCount: number }> {
    const qs = status ? `?status=${encodeURIComponent(status)}` : '';
    const res = await fetch(`${API_BASE}/messages${qs}`, {
      headers: { ...getAuthHeaders() },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Erreur lors du chargement des messages');
    }
    return json;
  },

  async updateMessageStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  async deleteMessage(id: string) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return await res.json();
  },

  // --- UPLOAD & BASE64 HELPER ---
  async uploadImage(file: File): Promise<{ success: boolean; url: string }> {
    try {
      const base64Url = await fileToBase64(file);

      try {
        fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ base64: base64Url, fileName: file.name }),
        }).catch(() => {});
      } catch {}

      return { success: true, url: base64Url };
    } catch (err: any) {
      console.error('Error during image conversion to Base64:', err);
      return { success: false, url: '' };
    }
  },

  // --- STATS ---
  async getStats(): Promise<{ success: boolean; data: AdminStats }> {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: { ...getAuthHeaders() },
    });
    const json = await res.json();
    if (res.ok && json.success) {
      return json;
    }

    const projects = getLocalCache<ProjectItem[]>(STORAGE_KEYS.PROJECTS, []);
    const products = getLocalCache<ProductItem[]>(STORAGE_KEYS.PRODUCTS, []);
    const services = getLocalCache<ServiceItem[]>(STORAGE_KEYS.SERVICES, []);

    const totalProjects = projects.length;
    const beforeAfter = projects.filter((p) => p.type === 'BEFORE_AFTER').length;
    const carousel = projects.filter(
      (p) => p.type === 'CAROUSEL' || (Array.isArray(p.images) && p.images.length > 1)
    ).length;
    const simple = Math.max(0, totalProjects - beforeAfter);

    return {
      success: true,
      data: {
        products: { total: products.length },
        services: { total: services.length },
        projects: {
          total: totalProjects,
          beforeAfter,
          simple,
          carousel,
        },
        messages: { total: 0, unread: 0 },
        visits: { total: 0 },
        recentMessages: [],
      },
    };
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

  // --- USER MANAGEMENT ---
  async getUsers(): Promise<{ success: boolean; data: any[] }> {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async createUser(data: { name: string; email: string; password: string; role?: string }): Promise<{ success: boolean; data?: any; error?: string }> {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateUser(id: string, data: { name?: string; email?: string; password?: string; role?: string }): Promise<{ success: boolean; data?: any; error?: string }> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  // --- PROFILE ---
  async getProfile(): Promise<{ success: boolean; user?: any }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    return res.json();
  },

  async updateProfile(data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }): Promise<{ success: boolean; user?: any; token?: string; error?: string }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
