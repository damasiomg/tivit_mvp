'use client';

import React, { memo } from 'react';
import './Alert.scss';

interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  onClose?: () => void;
}

const Alert = memo(function Alert({ message, type = 'error', onClose }: AlertProps) {
  if (!message) return null;

  return (
    <div className={`alert alert--${type}`} role="alert">
      <span className="alert__message">{message}</span>
      {onClose ? (
        <button className="alert__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
      ) : null}
    </div>
  );
});

export default Alert;
