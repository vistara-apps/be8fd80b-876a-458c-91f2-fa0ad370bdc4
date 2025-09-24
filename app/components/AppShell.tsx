'use client';

import { ReactNode } from 'react';
import { Leaf, Settings2, Plus } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: ReactNode;
}

export function AppShell({ 
  children, 
  title = 'PlantPal', 
  showBackButton = false, 
  onBack,
  actions 
}: AppShellProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-white border-opacity-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton ? (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                >
                  ←
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold text-fg">PlantPal</span>
                </div>
              )}
              {title !== 'PlantPal' && (
                <h1 className="text-lg font-semibold text-fg">{title}</h1>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {actions}
              <button
                onClick={() => {
                  const themes = ['default', 'celo', 'solana', 'base', 'coinbase'];
                  const currentIndex = themes.indexOf(theme);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme as any);
                }}
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                title="Switch theme"
              >
                <Settings2 className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-white border-opacity-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center gap-1 p-2 text-primary">
              <Leaf className="w-5 h-5" />
              <span className="text-xs">Plants</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-primary transition-colors duration-200">
              <Plus className="w-5 h-5" />
              <span className="text-xs">Add</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-primary transition-colors duration-200">
              <Settings2 className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
}
