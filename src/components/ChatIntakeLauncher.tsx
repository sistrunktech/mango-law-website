import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ConversationWindow from './chat/ConversationWindow';

export default function ChatIntakeLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ConversationWindow onClose={() => setOpen(false)} />}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-brand-black px-5 py-4 text-sm font-semibold text-brand-offWhite shadow-lg transition-all hover:bg-brand-gold hover:text-brand-black hover:shadow-xl active:scale-95"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
      >
        <MessageCircle size={18} />
        <span>{open ? 'Close' : 'Chat with us'}</span>
      </button>
    </>
  );
}
