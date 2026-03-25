export interface StateIncentive {
  name: string;
  type: 'tax_credit' | 'rebate' | 'exemption' | 'program';
  description: string;
  value: string;
  eligibility: string;
}

export interface StateIncentiveData {
  stateSlug: string;
  stateName: string;
  incentives: StateIncentive[];
  netMeteringDetails: string;
  rpsTarget: string;
}

export const stateIncentives: Record<string, StateIncentiveData> = {
  california: {
    stateSlug: 'california',
    stateName: 'California',
    incentives: [
      {
        name: 'Net Energy Metering (NEM 3.0)',
        type: 'program',
        description: 'Earn credits for excess solar energy exported to the grid under California\'s updated net metering program.',
        value: 'Varies by utility and time of export',
        eligibility: 'Customers of PG&E, SCE, and SDG&E',
      },
      {
        name: 'Property Tax Exclusion',
        type: 'exemption',
        description: 'Solar energy systems are excluded from property tax assessments through 2025.',
        value: '100% property tax exemption on added value',
        eligibility: 'All residential solar installations',
      },
      {
        name: 'Self-Generation Incentive Program (SGIP)',
        type: 'rebate',
        description: 'Rebates for installing energy storage systems paired with solar.',
        value: 'Up to $1,000/kWh for battery storage',
        eligibility: 'Customers of eligible utilities',
      },
      {
        name: 'PACE Financing',
        type: 'program',
        description: 'Property Assessed Clean Energy financing allows you to finance solar through your property tax bill.',
        value: 'Financing up to 100% of project cost',
        eligibility: 'Property owners in participating jurisdictions',
      },
    ],
    netMeteringDetails: 'California\'s NEM 3.0 program provides credits for exported solar energy at rates that vary by time of day. While rates are lower than retail, pairing solar with battery storage maximizes savings.',
    rpsTarget: '100% clean energy by 2045',
  },
  hawaii: {
    stateSlug: 'hawaii',
    stateName: 'Hawaii',
    incentives: [
      {
        name: 'Hawaii State Tax Credit',
        type: 'tax_credit',
        description: 'Hawaii offers a state tax credit for solar energy systems.',
        value: '35% of cost (up to $5,000)',
        eligibility: 'Residential installations',
      },
      {
        name: 'Net Energy Metering (NEM)',
        type: 'program',
        description: 'Customer Grid Supply and Smart Export programs allow you to earn credits for excess solar energy.',
        value: 'Varies by program and island',
        eligibility: 'HECO, MECO, HELCO customers',
      },
      {
        name: 'Property Tax Exemption',
        type: 'exemption',
        description: 'Solar energy systems are exempt from property tax assessments.',
        value: '100% exemption on added value',
        eligibility: 'All residential solar installations',
      },
      {
        name: 'Green Energy Money $aver Program',
        type: 'program',
        description: 'On-bill financing for solar and energy efficiency upgrades.',
        value: 'No upfront cost, repay through utility bill',
        eligibility: 'Qualifying homeowners',
      },
    ],
    netMeteringDetails: 'Hawaii offers Customer Grid Supply (CGS) and Smart Export programs. While traditional net metering has been phased out, these programs still provide credits for exported solar energy at competitive rates.',
    rpsTarget: '100% renewable energy by 2045',
  },
  idaho: {
    stateSlug: 'idaho',
    stateName: 'Idaho',
    incentives: [
      {
        name: 'Idaho State Tax Deduction',
        type: 'tax_credit',
        description: 'Idaho offers a state income tax deduction for residential solar installations.',
        value: '40% of cost in Year 1 (up to $5,000), 20% in Years 2-4 (up to $5,000 each)',
        eligibility: 'Residential installations',
      },
      {
        name: 'Net Metering',
        type: 'program',
        description: 'Idaho utilities offer net metering, crediting you for excess solar energy at the full retail rate.',
        value: 'Full retail rate credit',
        eligibility: 'Customers of Idaho Power and other regulated utilities',
      },
      {
        name: 'Property Tax Exemption',
        type: 'exemption',
        description: 'Solar energy systems do not increase your property tax assessment.',
        value: '100% exemption on added value',
        eligibility: 'All residential solar installations',
      },
    ],
    netMeteringDetails: 'Idaho offers full retail rate net metering through Idaho Power and other regulated utilities. Excess credits roll over month-to-month, making it one of the more favorable net metering states in the region.',
    rpsTarget: 'No mandatory RPS (voluntary goals)',
  },
  texas: {
    stateSlug: 'texas',
    stateName: 'Texas',
    incentives: [
      {
        name: 'Property Tax Exemption',
        type: 'exemption',
        description: 'Texas exempts 100% of the added home value from solar panels from property taxes.',
        value: '100% exemption on added value',
        eligibility: 'All residential solar installations',
      },
      {
        name: 'Sales Tax Exemption',
        type: 'exemption',
        description: 'Solar energy equipment is exempt from state sales tax in Texas.',
        value: '6.25% state sales tax exemption',
        eligibility: 'All solar equipment purchases',
      },
      {
        name: 'Utility Buyback Programs',
        type: 'program',
        description: 'Many Texas retail electricity providers offer solar buyback programs that credit you for excess generation.',
        value: 'Varies by provider (some offer 1:1 credits)',
        eligibility: 'Customers in deregulated areas (most of Texas)',
      },
      {
        name: 'Local Utility Rebates',
        type: 'rebate',
        description: 'Some Texas utilities (CPS Energy, Austin Energy) offer rebates for solar installations.',
        value: 'Up to $2,500 depending on utility',
        eligibility: 'Customers of participating utilities',
      },
    ],
    netMeteringDetails: 'Texas does not have a statewide net metering mandate, but many retail electricity providers in the deregulated market offer solar buyback plans. Some providers offer 1:1 credits for exported solar energy.',
    rpsTarget: 'No mandatory solar carve-out (exceeded wind/solar voluntary targets)',
  },
};

export function getIncentivesByState(stateSlug: string): StateIncentiveData | undefined {
  return stateIncentives[stateSlug];
}
