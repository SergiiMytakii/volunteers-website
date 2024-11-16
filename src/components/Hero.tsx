'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';

interface Translation {
  lang: string;
  header: string;
  title: string;
  description: string;
  button: string;
}

export default function Hero() {
  const { lang} = useLanguage();
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    fetch('/api/translations/hero')
      .then(res => res.json())
      .then(data => setTranslations(data.data));
  }, []);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];
  return (
    <header id="home" className="w-full h-screen bg-cover bg-center relative mt-16" 
      style={{
          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2Fphoto_2024-11-12%2017.40.58.jpeg?alt=media&token=4b8b9d93-85e6-46a5-af8e-f253a16e8950')`
      }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center text-white px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center">
          <div className="text-left">
            <h1 className="text-5xl font-bold">{currentTranslation?.header}</h1>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-2xl mb-4 max-w-2xl">
              {currentTranslation?.title}
            </p>
            <p className="text-1xl mb-8 max-w-2xl text-left">
              {currentTranslation?.description}
            </p>
            <button 
              onClick={() => scrollToSection('help')} 
              className="bg-red-500 text-white px-8 py-4 text-lg rounded-full hover:bg-orange-600 transition-colors"
            >
              {currentTranslation?.button}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
