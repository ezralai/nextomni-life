import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth & Statement OCR',
  description: 'Multi-institution wealth aggregation, net worth telemetrics, and statement OCR.',
};

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
