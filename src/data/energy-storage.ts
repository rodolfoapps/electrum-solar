export interface BatterySystem {
  name: string;
  slug: string;
  manufacturer: string;
  capacity: number;
  power: number;
  chemistry: string;
  warranty: string;
  costRange: { min: number; max: number };
  roundTripEfficiency: number;
  features: string[];
}

export const batterySystems: BatterySystem[] = [
  {
    name: 'Tesla Powerwall 3',
    slug: 'tesla-powerwall-3',
    manufacturer: 'Tesla',
    capacity: 13.5,
    power: 11.5,
    chemistry: 'Lithium Iron Phosphate (LFP)',
    warranty: '10 years',
    costRange: { min: 8500, max: 12500 },
    roundTripEfficiency: 97.5,
    features: ['Integrated solar inverter', 'Storm Watch', 'Time-Based Control', 'Backup Gateway', 'Stackable up to 4 units'],
  },
  {
    name: 'Enphase IQ Battery 5P',
    slug: 'enphase-iq-battery-5p',
    manufacturer: 'Enphase',
    capacity: 5.0,
    power: 3.84,
    chemistry: 'Lithium Iron Phosphate (LFP)',
    warranty: '15 years',
    costRange: { min: 5500, max: 7500 },
    roundTripEfficiency: 96,
    features: ['Modular design', 'Microinverter compatible', 'Grid-forming capability', 'Easy to expand'],
  },
  {
    name: 'Franklin WH aPower2',
    slug: 'franklin-wh-apower2',
    manufacturer: 'Franklin WH',
    capacity: 15.0,
    power: 10.0,
    chemistry: 'Lithium Iron Phosphate (LFP)',
    warranty: '12 years',
    costRange: { min: 9000, max: 13000 },
    roundTripEfficiency: 95,
    features: ['Whole-home backup', 'Smart management', 'Generator compatible', 'Mobile app monitoring'],
  },
  {
    name: 'Generac PWRcell',
    slug: 'generac-pwrcell',
    manufacturer: 'Generac',
    capacity: 18.0,
    power: 11.0,
    chemistry: 'Lithium NMC',
    warranty: '10 years',
    costRange: { min: 10000, max: 18000 },
    roundTripEfficiency: 96.5,
    features: ['Scalable capacity', 'PWRview monitoring', 'Automatic transfer switch', 'Generator integration'],
  },
  {
    name: 'SolarEdge Home Battery',
    slug: 'solaredge-home-battery',
    manufacturer: 'SolarEdge',
    capacity: 9.7,
    power: 5.0,
    chemistry: 'Lithium Iron Phosphate (LFP)',
    warranty: '10 years',
    costRange: { min: 6000, max: 9000 },
    roundTripEfficiency: 94.5,
    features: ['SolarEdge ecosystem integration', 'Stackable', 'Smart energy management', 'Compact design'],
  },
];
