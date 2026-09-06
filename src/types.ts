export type ActiveTab = 'home' | 'about' | 'services' | 'products' | 'projects' | 'contact' | 'admin';

export interface Milestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface TechnicalPart {
  id: string;
  name: string;
  code: string;
  category: string;
  x: number; // percentage in blueprint
  y: number;
  description: string;
  specs: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon?: string;
  image?: string;
  features?: string[] | any;
  order?: number;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price?: number | null;
  availability: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_REQUEST';
  images: string[];
  specs?: Record<string, string> | any;
  featured?: boolean;
}

export type InventoryItem = ProductItem | any;

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: 'BEFORE_AFTER' | 'SIMPLE';
  description: string;
  client?: string | null;
  images?: string[];
  beforeImage?: string | null;
  afterImage?: string | null;
  date?: string | null;
  featured?: boolean;
}

export interface MessageItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  vehicleType?: string | null;
  serviceType?: string | null;
  message: string;
  status: 'NEW' | 'READ' | 'ARCHIVED';
  createdAt: string;
}

export interface AdminStats {
  products: { total: number };
  services: { total: number };
  projects: { total: number; beforeAfter: number; simple: number };
  messages: { total: number; unread: number };
  visits: { total: number };
  recentMessages?: MessageItem[];
}

export interface InquireFormState {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  vehicleType: string;
  serviceType: string;
  temperatureTarget: string;
  boxVolumeM3: string;
  partnerPreference: string;
  notes: string;
}
