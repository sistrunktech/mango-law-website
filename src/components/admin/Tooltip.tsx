import { ReactNode, useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: ReactNode;
  children?: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const [tooltipId] = useState(() => `tooltip-${Math.random().toString(36).substring(7)}`);

  const handleFocus = () => setShow(true);
  const handleBlur = () => setShow(false);
  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShow(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-describedby={show ? tooltipId : undefined}
        aria-label="Help information"
        className="text-slate-400 hover:text-slate-300 transition focus-visible:ring-2 focus-visible:ring-brand-mango/50 rounded"
      >
        {children || <HelpCircle className="w-4 h-4" />}
      </button>
      {show && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-xl border border-slate-700 whitespace-nowrap"
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-slate-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}
