'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

interface Translation {
  lang: string;
  title: string;
  items: FAQItem[];
}

export default function FAQ() {
  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    fetch('/api/translations/faq')
      .then(res => res.json())
      .then(data => setTranslations(data.data));
  }, []);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  return (
    <section id="faq" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{currentTranslation?.title}</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {currentTranslation?.items.map((item, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
