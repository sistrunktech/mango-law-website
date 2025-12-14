import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs: FAQ[];
  title?: string;
};

export default function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-brand-offWhite">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-brand-goldText">FAQ</p>
            <div className="accent-line" />
          </div>
          <h2 className="text-display-sm md:text-display-md">{title}</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden border-brand-black/5 bg-white transition-all hover:shadow-soft-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-brand-black/5"
              >
                <h3 className="flex-1 font-semibold text-brand-black">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-brand-mangoText transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-brand-black/5 px-6 pb-6 pt-4">
                  <p className="text-brand-black/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
