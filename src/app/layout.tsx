'use client';

import { Montserrat } from 'next/font/google';
import "./globals.css";
import { LanguageProvider, useLanguage } from './LanguageContext';
import type { Metadata } from "next";

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});


// export const metadata: Metadata = {
//     title: "Очима До Очей",
//     description: "Волонтерський проект",
//   };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  return (
    <html lang={lang} className={montserrat.className}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}