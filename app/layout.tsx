import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlantPal - Your Plant\'s Personal Wellness Coach',
  description: 'Personalized plant care reminders delivered by text on Celo',
  keywords: ['plants', 'care', 'reminders', 'celo', 'base', 'miniapp'],
  authors: [{ name: 'PlantPal Team' }],
  openGraph: {
    title: 'PlantPal - Your Plant\'s Personal Wellness Coach',
    description: 'Keep your plants alive and thriving with personality-driven care reminders',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
