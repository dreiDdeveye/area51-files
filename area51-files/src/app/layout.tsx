import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'X-Files - Unidentified Aerial Phenomena',
  description: 'Freedom of Information Act - Electronic Reading Room - UAP/UFO Files',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
