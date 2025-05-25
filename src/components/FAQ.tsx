'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

interface Translation {
  lang: string;
  title: string;
  items: FAQItem[];
}

interface FAQProps {
  translationsApiEndpoint: string;
}

export default function FAQ({ translationsApiEndpoint }: FAQProps) {
  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(translationsApiEndpoint)
      .then(res => res.json())
      .then(data => setTranslations(data.data))
      .catch(error => console.error(`Failed to fetch translations from ${translationsApiEndpoint}:`, error));
  }, [translationsApiEndpoint]);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{currentTranslation?.title}</h2>
        <div className="space-y-4 max-w-3xl mx-auto  " >
          {currentTranslation?.items.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden  text-left">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-left" >{item.question}</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <p
                  className="px-6 py-4 text-gray-700 text-left"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
