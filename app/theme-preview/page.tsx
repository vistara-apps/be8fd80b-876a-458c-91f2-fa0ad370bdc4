'use client';

import { AppShell } from '../components/AppShell';
import { PlantCard } from '../components/PlantCard';
import { PersonalitySelector } from '../components/PersonalitySelector';
import { ReminderText } from '../components/ReminderText';
import { useTheme } from '../components/ThemeProvider';
import { Plant, ReminderMessage } from '@/lib/types';

const samplePlant: Plant = {
  plantId: '1',
  userId: 'user1',
  plantName: 'Monstera Mike',
  plantType: 'monstera',
  careSchedule: {
    wateringFrequency: 7,
    fertilizingFrequency: 30,
    repottingFrequency: 12
  },
  lastWatered: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  lastFertilized: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  personality: 'cheery-gardener'
};

const sampleReminder: ReminderMessage = {
  plantName: 'Monstera Mike',
  actionType: 'watering',
  personality: 'cheery-gardener',
  message: 'Good morning! Your Monstera Mike is ready for its refreshing drink! 🌱✨',
  timestamp: new Date()
};

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'PlantPal (Default)', description: 'Warm social theme with dark teal and coral' },
    { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
    { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
    { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue' }
  ];

  return (
    <AppShell title="Theme Preview" showBackButton onBack={() => window.history.back()}>
      <div className="space-y-8">
        {/* Theme Selector */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Choose Theme</h2>
          <div className="grid gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`
                  personality-option text-left
                  ${theme === themeOption.id ? 'ring-2 ring-accent bg-accent bg-opacity-20' : ''}
                `}
              >
                <div>
                  <h4 className="font-medium text-fg">{themeOption.name}</h4>
                  <p className="text-sm text-text-secondary">{themeOption.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-fg">Component Preview</h2>
          
          {/* Plant Card */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-3">Plant Card</h3>
            <PlantCard plant={samplePlant} />
          </div>

          {/* Reminder */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-3">Reminder Message</h3>
            <ReminderText reminder={sampleReminder} />
          </div>

          {/* Buttons */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-3">Buttons</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="care-button">Care Button</button>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-3">Cards</h3>
            <div className="grid gap-4">
              <div className="glass-card p-4">
                <h4 className="font-medium text-fg mb-2">Glass Card</h4>
                <p className="text-text-secondary">This is a glass card with backdrop blur effect.</p>
              </div>
              <div className="plant-card">
                <h4 className="font-medium text-fg mb-2">Plant Card Style</h4>
                <p className="text-text-secondary">This uses the plant-card styling with hover effects.</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-3">Typography</h3>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-fg">Display Text</h1>
              <h2 className="text-xl font-semibold text-fg">Heading Text</h2>
              <p className="text-base text-fg">Body text with primary color</p>
              <p className="text-sm text-text-secondary">Secondary text for descriptions</p>
              <p className="text-xs text-text-secondary">Caption text for small details</p>
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-3">Color Palette</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <div className="w-full h-8 bg-bg mb-2 border border-white border-opacity-20"></div>
                <p className="text-sm text-text-secondary">Background</p>
              </div>
              <div className="glass-card p-4">
                <div className="w-full h-8 bg-surface mb-2"></div>
                <p className="text-sm text-text-secondary">Surface</p>
              </div>
              <div className="glass-card p-4">
                <div className="w-full h-8 bg-primary mb-2"></div>
                <p className="text-sm text-text-secondary">Primary</p>
              </div>
              <div className="glass-card p-4">
                <div className="w-full h-8 bg-accent mb-2"></div>
                <p className="text-sm text-text-secondary">Accent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
