import { Accordion } from '@/components/ui/Accordion';

interface FAQSectionProps {
  title?: string;
  faqs: { question: string; answer: string }[];
}

export function FAQSection({ title = 'Frequently Asked Questions', faqs }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="rounded-xl bg-gray-50 px-6 py-10 sm:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <Accordion items={faqs} />
    </section>
  );
}
