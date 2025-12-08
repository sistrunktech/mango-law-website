import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex-shrink-0 rounded-full bg-brand-mango p-2 text-brand-black"
        aria-label="Bot"
      >
        <Bot size={16} />
      </div>

      <div className="flex items-center gap-1 rounded-2xl bg-brand-black/5 px-4 py-3">
        <div className="h-2 w-2 animate-bounce rounded-full bg-brand-black/40 [animation-delay:-0.3s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-brand-black/40 [animation-delay:-0.15s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-brand-black/40" />
      </div>
    </div>
  );
}
