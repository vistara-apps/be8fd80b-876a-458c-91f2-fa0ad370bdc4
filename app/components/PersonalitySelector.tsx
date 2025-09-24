'use client';

import { PersonalityType } from '@/lib/types';
import { PERSONALITIES } from '@/lib/constants';

interface PersonalitySelectorProps {
  selectedPersonality: PersonalityType;
  onSelect: (personality: PersonalityType) => void;
}

export function PersonalitySelector({ selectedPersonality, onSelect }: PersonalitySelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-fg mb-4">Choose Your Plant Care Personality</h3>
      
      <div className="grid gap-3">
        {PERSONALITIES.map((personality) => (
          <div
            key={personality.id}
            className={`
              personality-option
              ${selectedPersonality === personality.id ? 'ring-2 ring-accent bg-accent bg-opacity-20' : ''}
            `}
            onClick={() => onSelect(personality.id)}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{personality.emoji}</div>
              <div className="flex-1">
                <h4 className="font-medium text-fg">{personality.name}</h4>
                <p className="text-sm text-text-secondary mb-2">{personality.description}</p>
                <div className="text-xs text-text-secondary italic">
                  "{personality.sampleMessage}"
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
