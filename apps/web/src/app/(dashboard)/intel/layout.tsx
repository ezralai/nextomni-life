import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cognitive Intel Digest',
  description: 'Evidence-based cognitive study tips and AI morning synthesis.',
};

export default function IntelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
