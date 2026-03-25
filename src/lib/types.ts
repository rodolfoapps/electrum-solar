export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  state?: string;
  propertyType: 'residential' | 'commercial' | 'nonprofit';
  roofType?: 'asphalt_shingle' | 'tile' | 'metal' | 'flat' | 'other';
  monthlyBill?: string;
  timeline?: 'asap' | '1-3_months' | '3-6_months' | '6-12_months' | 'just_researching';
  sourcePage?: string;
  utmSource?: string;
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
