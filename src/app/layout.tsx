'use client';

import { Montserrat } from 'next/font/google';
import "./globals.css";
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});

function LayoutWithLang({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  return (
    <html lang={lang} className={montserrat.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navigation />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutWithLang>{children}</LayoutWithLang>
    </LanguageProvider>
  );
}