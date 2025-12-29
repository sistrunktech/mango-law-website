import { ReactNode } from 'react';
import { User, Bot } from 'lucide-react';

interface ChatBubbleProps {
  message: string | ReactNode;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

export default function ChatBubble({ message, sender, timestamp }: ChatBubbleProps) {
  const isBot = sender === 'bot';

  return (
    <div className={`flex items-start gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 rounded-full p-2 ${
          isBot
            ? 'bg-brand-mango text-brand-black'
            : 'bg-brand-black text-brand-offWhite'
        }`}
        aria-label={isBot ? 'Bot' : 'You'}
      >
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>

      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[85%]`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBot
              ? 'bg-white text-brand-black shadow-sm ring-1 ring-brand-black/5'
              : 'bg-brand-mango text-brand-black shadow-sm'
          }`}
        >
          {typeof message === 'string' ? (
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message}</p>
          ) : (
            message
          )}
        </div>

        {timestamp && (
          <span className="mt-1 text-xs text-brand-black/40">
            {timestamp.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
    </div>
  );
}
