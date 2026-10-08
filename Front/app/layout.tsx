import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DonationsProvider } from '@/context/DonationsContext';

export const metadata: Metadata = {
  title: 'Rede Antidesperdício — Conexão Fome Zero (ODS 2)',
  description: 'Plataforma hiperlocal que conecta feirantes e comércios a ONGs e cozinhas comunitárias para resgate de alimentos próprios para consumo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <DonationsProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </DonationsProvider>
      </body>
    </html>
  );
}
