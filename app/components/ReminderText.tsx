'use client';

import { ReminderMessage } from '@/lib/types';
import { formatDate, getPlantEmoji } from '@/lib/utils';
import { PERSONALITIES } from '@/lib/constants';

interface ReminderTextProps {
  reminder: ReminderMessage;
  onAction?: (action: 'completed' | 'snoozed') => void;
}

export function ReminderText({ reminder, onAction }: ReminderTextProps) {
  const personality = PERSONALITIES.find(p => p.id === reminder.personality);

  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">
          {getPlantEmoji(reminder.plantName.toLowerCase())}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-primary">
              {personality?.name || 'PlantPal'}
            </span>
            <span className="text-xs text-text-secondary">
              {formatDate(reminder.timestamp)}
            </span>
          </div>
          <p className="text-fg leading-relaxed">{reminder.message}</p>
        </div>
      </div>

      {onAction && (
        <div className="flex gap-2 pt-2 border-t border-white border-opacity-10">
          <button
            onClick={() => onAction('completed')}
            className="btn-primary flex-1 text-sm py-2"
          >
            ✅ Done!
          </button>
          <button
            onClick={() => onAction('snoozed')}
            className="btn-secondary flex-1 text-sm py-2"
          >
            ⏰ Snooze
          </button>
        </div>
      )}
    </div>
  );
}
