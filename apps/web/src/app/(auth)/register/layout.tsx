import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your NextOmni Life personal life operating system account.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
