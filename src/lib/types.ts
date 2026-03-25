export interface LeadFormData {
  propertyType: 'Residential' | 'Commercial';
  fullAddress: string;
  averageEnergyBill: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  homeowner: 'Yes' | 'No';
  projectDescription?: string;
  sourcePage?: string;
}

export interface SolarCompany {
  name: string;
  slug: string;
  logoUrl?: string;
  profileUrl?: string;
  serviceArea: string;
  rating: number;
  reviewCount: number;
  phone?: string;
  website?: string;
  addresses: string[];
  yearsInBusiness: number;
  yearFounded?: number;
  certifications: string[];
  city: string;
  state: string;
  stateSlug: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface QuoteSubmissionResult {
  leadId: number;
  message: string;
}
