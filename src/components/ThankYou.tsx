'use client';

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/LanguageContext";

interface Translation {
  lang: string;
  title: string;
  description: string;
}

export default function ThankYou() {
  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    fetch('/api/translations/thankyou')
      .then(res => res.json())
      .then(data => setTranslations(data.data));
  }, []);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">{currentTranslation?.title}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {currentTranslation?.description}
        </p>
      </div>
    </section>
  );
}
