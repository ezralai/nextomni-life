import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LifeOS Command Center',
  description: 'Behavioral habit matrix, deep work flow engine, circadian energy optimization, and life OKRs.',
};

export default function LifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
