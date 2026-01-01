'use client';

import { useState } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error?: string;
}

export default function PhoneInput({ value, onChange, onSubmit, error }: PhoneInputProps) {
  const [localValue, setLocalValue] = useState(value);

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return input;

    const [, area, prefix, line] = match;

    if (line) {
      return `(${area}) ${prefix}-${line}`;
    } else if (prefix) {
      return `(${area}) ${prefix}`;
    } else if (area) {
      return area.length === 3 ? `(${area}) ` : area;
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setLocalValue(formatted);
    onChange(formatted.replace(/\D/g, ''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !error && localValue.replace(/\D/g, '').length >= 10) {
      onSubmit();
    }
  };

  return (
    <div>
      <input
        type="tel"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="(555) 123-4567"
        className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-colors focus:outline-none ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-500'
            : 'border-brand-black/10 bg-white focus:border-brand-mango'
        }`}
        aria-label="Phone number"
        aria-invalid={!!error}
        aria-describedby={error ? 'phone-error' : undefined}
      />
      {error && (
        <p id="phone-error" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
