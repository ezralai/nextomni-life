import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Study Suite',
  description: 'Course timetabling, active recall flashcards, and GPA projections.',
};

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
