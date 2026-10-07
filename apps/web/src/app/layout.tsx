import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#080c14',
};

export const metadata: Metadata = {
  title: {
    default: 'NextOmni Life | The Intelligent Operating System for Human Flourishing',
    template: '%s | NextOmni Life',
  },
  description: 'The Intelligent Personal Life Operating System (LifeOS) designed to balance behavioral habits, deep focus, circadian health, and multi-year life OKRs.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian-900 text-slate-100 selection:bg-omni-indigo/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
