import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatIntakeLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-brand-black/10 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-brand-black">Start a conversation</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-brand-black hover:bg-brand-black/5"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-2 text-xs text-brand-black/70">
            Share a few details and we’ll follow up promptly. For immediate help, call the office.
          </p>
          <form className="mt-3 space-y-2 text-xs">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border-brand-black/10 text-brand-black"
              aria-label="Name"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border-brand-black/10 text-brand-black"
              aria-label="Email"
            />
            <textarea
              placeholder="How can we help?"
              className="w-full rounded-lg border-brand-black/10 text-brand-black"
              rows={3}
              aria-label="Message"
            />
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-full bg-brand-mango px-3 py-2 font-semibold text-brand-black transition hover:bg-brand-gold"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-brand-black px-4 py-3 text-sm font-semibold text-brand-offWhite shadow-lg transition hover:bg-brand-gold hover:text-brand-black"
      >
        <MessageCircle size={16} />
        {open ? 'Close' : 'Chat intake'}
      </button>
    </div>
  );
}
