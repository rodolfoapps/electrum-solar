export interface StateData {
  name: string;
  slug: string;
  abbreviation: string;
  region: string;
  avgSunHours: number;
  avgCostPerWatt: number;
  avgSystemCost: number;
  avgSavings25Year: number;
  avgPaybackYears: number;
  electricityRate: number;
  netMetering: boolean;
  srecAvailable: boolean;
  neighboringStates: string[];
}

export const states: StateData[] = [
  {
    name: 'California',
    slug: 'california',
    abbreviation: 'CA',
    region: 'West',
    avgSunHours: 5.8,
    avgCostPerWatt: 2.80,
    avgSystemCost: 16800,
    avgSavings25Year: 50000,
    avgPaybackYears: 5,
    electricityRate: 0.28,
    netMetering: true,
    srecAvailable: false,
    neighboringStates: ['oregon', 'nevada', 'arizona'],
  },
  {
    name: 'Hawaii',
    slug: 'hawaii',
    abbreviation: 'HI',
    region: 'West',
    avgSunHours: 5.5,
    avgCostPerWatt: 3.35,
    avgSystemCost: 20100,
    avgSavings25Year: 65000,
    avgPaybackYears: 5,
    electricityRate: 0.39,
    netMetering: true,
    srecAvailable: false,
    neighboringStates: [],
  },
  {
    name: 'Idaho',
    slug: 'idaho',
    abbreviation: 'ID',
    region: 'West',
    avgSunHours: 4.7,
    avgCostPerWatt: 2.90,
    avgSystemCost: 17400,
    avgSavings25Year: 28000,
    avgPaybackYears: 9,
    electricityRate: 0.10,
    netMetering: true,
    srecAvailable: false,
    neighboringStates: ['montana', 'wyoming', 'utah', 'nevada', 'oregon', 'washington'],
  },
  {
    name: 'Texas',
    slug: 'texas',
    abbreviation: 'TX',
    region: 'Southwest',
    avgSunHours: 5.5,
    avgCostPerWatt: 2.60,
    avgSystemCost: 15600,
    avgSavings25Year: 38000,
    avgPaybackYears: 6,
    electricityRate: 0.13,
    netMetering: false,
    srecAvailable: false,
    neighboringStates: ['new-mexico', 'oklahoma', 'arkansas', 'louisiana'],
  },
];

export function getStateBySlug(slug: string): StateData | undefined {
  return states.find((state) => state.slug === slug);
}

export function getAllStateSlugs(): string[] {
  return states.map((state) => state.slug);
}
