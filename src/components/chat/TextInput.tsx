'use client';

import { useState } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
}

export default function TextInput({
  value,
  onChange,
  onSubmit,
  placeholder = '',
  multiline = false,
  error,
}: TextInputProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !multiline && !error && localValue.trim()) {
      onSubmit();
    }
    if (e.key === 'Enter' && multiline && e.ctrlKey && !error && localValue.trim()) {
      onSubmit();
    }
  };

  const inputClasses = `w-full rounded-xl border-2 px-4 py-3 text-sm transition-colors focus:outline-none resize-none ${
    error
      ? 'border-red-300 bg-red-50 focus:border-red-500'
      : 'border-brand-black/10 bg-white focus:border-brand-mango'
  }`;

  return (
    <div>
      {multiline ? (
        <textarea
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className={inputClasses}
          aria-label={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
        />
      ) : (
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClasses}
          aria-label={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
        />
      )}
      {error && (
        <p id="input-error" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
