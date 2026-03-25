export interface UtilityData {
  name: string;
  avgRate: number;
  serviceArea: string;
}

export interface StateElectricityData {
  stateSlug: string;
  stateName: string;
  avgRate: number;
  nationalAvgRate: number;
  utilities: UtilityData[];
  rateHistory: { year: number; rate: number }[];
}

export const stateElectricityData: Record<string, StateElectricityData> = {
  california: {
    stateSlug: 'california',
    stateName: 'California',
    avgRate: 0.28,
    nationalAvgRate: 0.16,
    utilities: [
      { name: 'Pacific Gas & Electric (PG&E)', avgRate: 0.30, serviceArea: 'Northern & Central California' },
      { name: 'Southern California Edison (SCE)', avgRate: 0.27, serviceArea: 'Southern California (excluding LA & San Diego)' },
      { name: 'San Diego Gas & Electric (SDG&E)', avgRate: 0.36, serviceArea: 'San Diego area' },
      { name: 'Los Angeles Department of Water and Power (LADWP)', avgRate: 0.20, serviceArea: 'City of Los Angeles' },
      { name: 'Sacramento Municipal Utility District (SMUD)', avgRate: 0.16, serviceArea: 'Sacramento area' },
    ],
    rateHistory: [
      { year: 2020, rate: 0.20 }, { year: 2021, rate: 0.22 }, { year: 2022, rate: 0.25 },
      { year: 2023, rate: 0.26 }, { year: 2024, rate: 0.27 }, { year: 2025, rate: 0.28 },
    ],
  },
  hawaii: {
    stateSlug: 'hawaii',
    stateName: 'Hawaii',
    avgRate: 0.39,
    nationalAvgRate: 0.16,
    utilities: [
      { name: 'Hawaiian Electric (HECO)', avgRate: 0.38, serviceArea: 'Oahu' },
      { name: 'Maui Electric (MECO)', avgRate: 0.42, serviceArea: 'Maui, Molokai, Lanai' },
      { name: 'Hawaii Electric Light (HELCO)', avgRate: 0.40, serviceArea: 'Big Island' },
      { name: 'Kauai Island Utility Cooperative (KIUC)', avgRate: 0.37, serviceArea: 'Kauai' },
    ],
    rateHistory: [
      { year: 2020, rate: 0.32 }, { year: 2021, rate: 0.34 }, { year: 2022, rate: 0.37 },
      { year: 2023, rate: 0.38 }, { year: 2024, rate: 0.39 }, { year: 2025, rate: 0.39 },
    ],
  },
  idaho: {
    stateSlug: 'idaho',
    stateName: 'Idaho',
    avgRate: 0.10,
    nationalAvgRate: 0.16,
    utilities: [
      { name: 'Idaho Power', avgRate: 0.10, serviceArea: 'Southern Idaho' },
      { name: 'Avista Utilities', avgRate: 0.09, serviceArea: 'Northern Idaho' },
      { name: 'Rocky Mountain Power', avgRate: 0.11, serviceArea: 'Eastern Idaho' },
      { name: 'Idaho Falls Power', avgRate: 0.08, serviceArea: 'Idaho Falls area' },
    ],
    rateHistory: [
      { year: 2020, rate: 0.08 }, { year: 2021, rate: 0.09 }, { year: 2022, rate: 0.09 },
      { year: 2023, rate: 0.10 }, { year: 2024, rate: 0.10 }, { year: 2025, rate: 0.10 },
    ],
  },
  texas: {
    stateSlug: 'texas',
    stateName: 'Texas',
    avgRate: 0.13,
    nationalAvgRate: 0.16,
    utilities: [
      { name: 'TXU Energy', avgRate: 0.13, serviceArea: 'ERCOT deregulated areas' },
      { name: 'Reliant Energy', avgRate: 0.12, serviceArea: 'ERCOT deregulated areas' },
      { name: 'Green Mountain Energy', avgRate: 0.14, serviceArea: 'ERCOT deregulated areas' },
      { name: 'CPS Energy', avgRate: 0.11, serviceArea: 'San Antonio' },
      { name: 'Austin Energy', avgRate: 0.11, serviceArea: 'Austin' },
      { name: 'Oncor', avgRate: 0.13, serviceArea: 'Dallas-Fort Worth (delivery)' },
    ],
    rateHistory: [
      { year: 2020, rate: 0.11 }, { year: 2021, rate: 0.12 }, { year: 2022, rate: 0.13 },
      { year: 2023, rate: 0.13 }, { year: 2024, rate: 0.13 }, { year: 2025, rate: 0.13 },
    ],
  },
};

export function getElectricityDataByState(stateSlug: string): StateElectricityData | undefined {
  return stateElectricityData[stateSlug];
}
