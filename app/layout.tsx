import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://camposdallage.com'),
  title: { default: 'CamposDallage - Dallage industriel, béton décoratif', template: '%s | CamposDallage' },
  description: 'Spécialiste du dallage industriel, béton décoratif, rénovation de sols et sous-traitance. Rennes, Bretagne.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#2d384b' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans">{children}</body>
    </html>
  );
}
