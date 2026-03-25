const steps = [
  {
    number: 1,
    title: 'Get Your Free Quote',
    description: 'Tell us about your property and energy needs.',
  },
  {
    number: 2,
    title: 'Compare Options',
    description: 'Review quotes from top-rated local installers.',
  },
  {
    number: 3,
    title: 'Start Saving',
    description: 'Choose the best offer and start generating clean energy.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-xl font-bold text-white shadow-sm">
              {step.number}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
