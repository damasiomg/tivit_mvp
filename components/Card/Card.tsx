'use client';

import React, { memo } from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = memo(function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
});

export default Card;
