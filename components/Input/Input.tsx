'use client';

import React, { memo, useCallback } from 'react';
import './Input.scss';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

const Input = memo(function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  autoComplete,
}: InputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e?.target?.value ?? '');
    },
    [onChange]
  );

  return (
    <div className={`input-group ${error ? 'input-group--error' : ''}`}>
      <label htmlFor={id} className="input-group__label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className="input-group__field"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <span id={`${id}-error`} className="input-group__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
});

export default Input;
