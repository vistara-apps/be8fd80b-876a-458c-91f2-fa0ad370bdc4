'use client';

import { ReactNode } from 'react';

interface CareButtonProps {
  variant: 'water' | 'fertilize' | 'repot';
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function CareButton({ variant, onClick, disabled = false, children }: CareButtonProps) {
  const variantStyles = {
    water: 'bg-blue-500 hover:bg-blue-600 text-white',
    fertilize: 'bg-green-500 hover:bg-green-600 text-white',
    repot: 'bg-amber-500 hover:bg-amber-600 text-white'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        care-button
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );
}
