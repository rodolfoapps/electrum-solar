import { slugify, decodeHtmlEntities, extractYearFromBusiness, calculateYearsInBusiness } from './utils';
import { SolarCompany } from './types';

import californiaData from '@/data/companies/california.json';
import texasData from '@/data/companies/texas.json';
import idahoData from '@/data/companies/idaho.json';
import hawaiiData from '@/data/companies/hawaii.json';

interface RawCompany {
  name: string;
  logo_url?: string;
  profile_url?: string;
  service_area: string;
  rating: number;
  review_count: number;
  phone?: string;
  website?: string;
  addresses: string[];
  years_in_business: string;
  certifications: string[];
}

interface RawStateData {
  state: string;
  cities: Record<string, {
    total_found: number;
    companies: RawCompany[];
  }>;
}

const stateJsonMap: Record<string, RawStateData> = {
  california: californiaData as unknown as RawStateData,
  texas: texasData as unknown as RawStateData,
  idaho: idahoData as unknown as RawStateData,
  hawaii: hawaiiData as unknown as RawStateData,
};

const companiesByStateCache = new Map<string, SolarCompany[]>();
const companiesByCityCache = new Map<string, SolarCompany[]>();

function loadStateData(stateSlug: string): RawStateData | null {
  return stateJsonMap[stateSlug] || null;
}

function transformCompany(raw: RawCompany, city: string, stateName: string, stateSlug: string): SolarCompany {
  const yearFounded = extractYearFromBusiness(raw.years_in_business);
  return {
    name: decodeHtmlEntities(raw.name),
    slug: slugify(decodeHtmlEntities(raw.name)),
    logoUrl: raw.logo_url || undefined,
    profileUrl: raw.profile_url || undefined,
    serviceArea: raw.service_area,
    rating: raw.rating,
    reviewCount: raw.review_count,
    phone: raw.phone || undefined,
    website: raw.website || undefined,
    addresses: raw.addresses,
    yearsInBusiness: calculateYearsInBusiness(yearFounded),
    yearFounded,
    certifications: raw.certifications,
    city,
    state: stateName,
    stateSlug,
  };
}

export function getCompaniesByState(stateSlug: string): SolarCompany[] {
  if (companiesByStateCache.has(stateSlug)) {
    return companiesByStateCache.get(stateSlug)!;
  }
  const data = loadStateData(stateSlug);
  if (!data) return [];

  const seen = new Set<string>();
  const companies: SolarCompany[] = [];

  for (const [city, cityData] of Object.entries(data.cities)) {
    for (const raw of cityData.companies) {
      const name = decodeHtmlEntities(raw.name);
      if (!seen.has(name)) {
        seen.add(name);
        companies.push(transformCompany(raw, city, data.state, stateSlug));
      }
    }
  }

  companies.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  companiesByStateCache.set(stateSlug, companies);
  return companies;
}

export function getCompaniesByCity(stateSlug: string, citySlug: string): SolarCompany[] {
  const cacheKey = `${stateSlug}-${citySlug}`;
  if (companiesByCityCache.has(cacheKey)) {
    return companiesByCityCache.get(cacheKey)!;
  }
  const data = loadStateData(stateSlug);
  if (!data) return [];

  for (const [city, cityData] of Object.entries(data.cities)) {
    if (slugify(city) === citySlug) {
      const companies = cityData.companies.map((raw) =>
        transformCompany(raw, city, data.state, stateSlug)
      );
      companies.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      companiesByCityCache.set(cacheKey, companies);
      return companies;
    }
  }
  return [];
}

export function getTopCompaniesByState(stateSlug: string, limit = 5): SolarCompany[] {
  return getCompaniesByState(stateSlug).slice(0, limit);
}

export function getCitiesWithCompanies(stateSlug: string): Map<string, number> {
  const data = loadStateData(stateSlug);
  if (!data) return new Map();

  const cities = new Map<string, number>();
  for (const [city, cityData] of Object.entries(data.cities)) {
    cities.set(city, cityData.total_found);
  }
  return cities;
}

export function getAllCitiesForState(stateSlug: string): Map<string, string> {
  const data = loadStateData(stateSlug);
  if (!data) return new Map();

  const cities = new Map<string, string>();
  for (const city of Object.keys(data.cities)) {
    cities.set(city, slugify(city));
  }
  return cities;
}

export function getCityNameFromSlug(stateSlug: string, citySlug: string): string | undefined {
  const cities = getAllCitiesForState(stateSlug);
  for (const [name, slug] of cities.entries()) {
    if (slug === citySlug) return name;
  }
  return undefined;
}

export function getCompanyCountByState(stateSlug: string): number {
  return getCompaniesByState(stateSlug).length;
}
