'use client';

import React, { memo } from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Button = memo(function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`}
    >
      {isLoading ? (
        <span className="btn__spinner" />
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
