export type ActiveTab = 'home' | 'heritage' | 'inventory' | 'services' | 'contact';

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

export interface InventoryItem {
  id: string;
  name: string;
  category: 'direct-drive' | 'electric-standby' | 'multi-temp' | 'ac-systems';
  modelCode: string;
  coolingCapacity0C: string;
  coolingCapacityMinus20C: string;
  boxVolume: string;
  refrigerant: string;
  technology: string;
  tag: string;
  image: string;
  description: string;
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
