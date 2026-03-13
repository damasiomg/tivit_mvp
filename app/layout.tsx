import type { Metadata } from 'next';
import AuthProvider from '@/auth/AuthProvider';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'TIVIT MVP',
  description: 'TIVIT Almaviva Group - MVP Application',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
