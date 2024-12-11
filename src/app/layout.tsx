'use client';

import { Montserrat } from 'next/font/google';
import "./globals.css";
import { LanguageProvider, useLanguage } from './LanguageContext';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </LanguageProvider>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  return (
    <html lang={lang} className={montserrat.className} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}