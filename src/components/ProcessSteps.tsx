import { Phone, ClipboardCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    number: '1',
    title: 'Call or Text',
    description: 'Reach Nick directly',
  },
  {
    icon: ClipboardCheck,
    number: '2',
    title: 'Quick Assessment',
    description: 'Understand your options',
  },
  {
    icon: ArrowRight,
    number: '3',
    title: 'Clear Next Steps',
    description: 'Know what to do',
  },
];

export default function ProcessSteps() {
  return (
    <section className="relative overflow-hidden border-y border-brand-black/5 bg-white py-8">
      <div className="container">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-leaf/10">
                  <step.icon className="h-6 w-6 text-brand-leaf" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-mango text-xs font-bold text-brand-black">
                    {step.number}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-brand-black">{step.title}</p>
                  <p className="text-sm text-brand-black/60">{step.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-6 hidden h-px w-12 bg-gradient-to-r from-brand-leaf/40 to-brand-mango/40 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
