import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Business Analytics Agent',
  description: 'AI-powered business analytics dashboard and report generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
