import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Phone, FileText } from 'lucide-react';
import ConversationWindow from './chat/ConversationWindow';
import { OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackChatOpen, trackCtaClick } from '../lib/analytics';

interface ChatIntakeLauncherProps {
  onOpenLeadModal: () => void;
  bottomOffsetClass?: string;
}

export default function ChatIntakeLauncher({ onOpenLeadModal, bottomOffsetClass = 'bottom-6' }: ChatIntakeLauncherProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChooserOpen, setIsChooserOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const shouldShowLabel = useMemo(() => !isCollapsed, [isCollapsed]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setIsCollapsed(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const timer = window.setTimeout(() => setIsCollapsed(true), 10_000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsChooserOpen(false);
    };
    if (!isChooserOpen) return;
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isChooserOpen]);

  return (
    <>
      {isChatOpen && (
        <ConversationWindow
          bottomOffsetClass={bottomOffsetClass}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => {
          if (isChatOpen) {
            setIsChatOpen(false);
            setIsChooserOpen(false);
            return;
          }
          setIsChooserOpen((v) => !v);
          trackCtaClick('floating_action_toggle');
        }}
        className={[
          'fixed right-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-black px-5 py-4 text-sm font-semibold text-brand-offWhite shadow-lg transition-all hover:bg-brand-gold hover:text-brand-black hover:shadow-xl active:scale-95 sm:right-6',
          bottomOffsetClass,
        ].join(' ')}
        aria-label={isChatOpen ? 'Close chat' : 'Open contact options'}
        aria-expanded={isChooserOpen || isChatOpen}
        data-cta="floating_action"
      >
        <MessageCircle size={18} aria-hidden="true" />
        {shouldShowLabel && <span>Chat</span>}
      </button>

      {isChooserOpen && !isChatOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 cursor-default bg-transparent"
            onClick={() => setIsChooserOpen(false)}
            aria-label="Close contact options"
          />
          <div
            className={[
              'fixed right-4 z-40 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-2xl sm:right-6',
              bottomOffsetClass === 'bottom-24' ? 'bottom-40' : 'bottom-20',
            ].join(' ')}
            role="dialog"
            aria-label="Contact options"
          >
            <div className="p-2">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-black/5"
                onClick={() => {
                  setIsChooserOpen(false);
                  setIsChatOpen(true);
                  trackChatOpen('floating_chooser');
                }}
                data-cta="floating_chooser_chat"
              >
                <MessageCircle className="h-4 w-4 text-brand-mango" aria-hidden="true" />
                Chat now
              </button>
              <a
                href={`tel:${OFFICE_PHONE_TEL}`}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-black/5"
                onClick={() => trackCtaClick('floating_chooser_call')}
                data-cta="floating_chooser_call"
              >
                <Phone className="h-4 w-4 text-brand-mango" aria-hidden="true" />
                Call the office
              </a>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-black/5"
                onClick={() => {
                  setIsChooserOpen(false);
                  onOpenLeadModal();
                  trackCtaClick('floating_chooser_consult');
                }}
                data-cta="floating_chooser_consult"
              >
                <FileText className="h-4 w-4 text-brand-mango" aria-hidden="true" />
                Request consult
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
