export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#x27;': "'",
    '&apos;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
  };
  return text.replace(/&(?:#x?[0-9a-f]+|[a-z]+);/gi, (match) => entities[match] || match);
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function extractYearFromBusiness(yearsStr: string): number {
  const match = yearsStr.match(/\d{4}/);
  if (match) return parseInt(match[0]);
  return new Date().getFullYear();
}

export function calculateYearsInBusiness(yearFounded: number): number {
  return new Date().getFullYear() - yearFounded;
}

export const SITE_URL = 'https://electrum.solar';
export const SITE_NAME = 'Electrum Solar';
export const SITE_DESCRIPTION = 'Compare solar panel costs, find top-rated solar companies, and discover available solar incentives in Idaho, California, Texas, and Hawaii. Get free quotes from trusted solar installers.';
export const PHONE_NUMBER = '(888) 555-0199';
