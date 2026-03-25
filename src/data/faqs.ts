export interface FAQ {
  question: string;
  answer: string;
}

export const homepageFAQs: FAQ[] = [
  {
    question: 'How much do solar panels cost in 2026?',
    answer: 'The average cost of solar panels in 2026 ranges from $2.60 to $3.35 per watt, or $15,600 to $20,100 for a typical 6kW residential system before incentives. Costs vary significantly by state — Texas offers the lowest rates while Hawaii costs more due to logistics but offers the highest savings due to expensive electricity.',
  },
  {
    question: 'What is the federal solar tax credit?',
    answer: 'The federal Investment Tax Credit (ITC) allows you to deduct 30% of the cost of your solar energy system from your federal taxes. This applies to both residential and commercial installations and is available through 2032.',
  },
  {
    question: 'How long does it take for solar panels to pay for themselves?',
    answer: 'The average solar payback period ranges from 5 to 9 years depending on your state, electricity rates, available incentives, and system size. States like California and Hawaii see faster payback due to high electricity costs.',
  },
  {
    question: 'Do solar panels work in cloudy or cold climates?',
    answer: 'Yes, solar panels work in all weather conditions. They generate electricity from light, not heat. While output is reduced on cloudy days, modern panels are efficient enough to produce significant energy even in less sunny areas like Idaho.',
  },
  {
    question: 'What solar incentives are available in my state?',
    answer: 'In addition to the 30% federal tax credit, many states offer additional incentives. California has NEM 3.0 for net metering, Hawaii offers state tax credits, Texas has property tax exemptions, and Idaho offers net metering. Use our state pages to find specific incentives.',
  },
  {
    question: 'How do I choose the right solar company?',
    answer: 'Look for companies with strong reviews, proper licensing and certifications (like NABCEP), at least 5 years of experience, comprehensive warranties, and transparent pricing. We recommend getting quotes from at least 3 installers to compare.',
  },
];

export const costFAQs: FAQ[] = [
  {
    question: 'What factors affect solar panel cost?',
    answer: 'Key factors include system size, panel brand and type, installation complexity, your location, local labor costs, roof condition, and available incentives. Premium panels cost more upfront but often deliver better long-term value.',
  },
  {
    question: 'Is financing available for solar panels?',
    answer: 'Yes, most solar companies offer multiple financing options including solar loans, leases, and power purchase agreements (PPAs). Solar loans let you own the system while spreading costs over 10-25 years with competitive interest rates.',
  },
  {
    question: 'What is the average ROI for solar panels?',
    answer: 'Solar panels typically deliver 10-20% annual ROI, with total savings of $28,000 to $65,000 over 25 years depending on your state and electricity rates. The 30% federal tax credit significantly improves the return.',
  },
];

export const incentiveFAQs: FAQ[] = [
  {
    question: 'What is net metering?',
    answer: 'Net metering is a billing arrangement where your utility credits you for excess solar electricity you send back to the grid. California, Hawaii, and Idaho all offer forms of net metering, while Texas has buyback programs through some retailers.',
  },
  {
    question: 'Can I combine federal and state solar incentives?',
    answer: 'Yes, you can stack federal and state incentives. For example, you can claim the 30% federal ITC and also receive state tax credits, property tax exemptions, and utility rebates where available.',
  },
  {
    question: 'How do I claim the solar tax credit?',
    answer: 'File IRS Form 5695 with your federal tax return. You need documentation of your solar system purchase, including the total cost and installation date. The credit reduces your tax liability dollar-for-dollar.',
  },
];

export function getStateCostFAQs(stateName: string, costPerWatt: number, systemCost: number, savings25Year: number, paybackYears: number): FAQ[] {
  return [
    {
      question: `How much do solar panels cost in ${stateName}?`,
      answer: `The average cost of solar panels in ${stateName} is $${costPerWatt.toFixed(2)} per watt, or approximately $${systemCost.toLocaleString()} for a typical 6kW residential system before the 30% federal tax credit.`,
    },
    {
      question: `What is the solar payback period in ${stateName}?`,
      answer: `The average solar payback period in ${stateName} is approximately ${paybackYears} years. After that, you enjoy free electricity for the remaining life of your panels (typically 25+ years).`,
    },
    {
      question: `How much can I save with solar in ${stateName}?`,
      answer: `Homeowners in ${stateName} can save an estimated $${savings25Year.toLocaleString()} over 25 years by switching to solar, factoring in the federal tax credit and local incentives.`,
    },
    {
      question: `What size solar system do I need in ${stateName}?`,
      answer: `Most homes in ${stateName} need a 5-8kW system. The exact size depends on your electricity usage, roof space, and sun exposure. A typical household uses about 10,000 kWh per year.`,
    },
  ];
}
