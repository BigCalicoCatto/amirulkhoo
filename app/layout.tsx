import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amirul Khoo | Personal Strength Coach',
  description: 'Live Stronger. Live Longer. Functional movement, consistent effort, zero ego.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
