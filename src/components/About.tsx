'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';

interface Translation {
  lang: string;
  title: string;
  subtitle: string;
  description: string;
  statsGifts: string;
  statsWaiting: string;
  statsGiftsLabel: string;
  statsWaitingLabel: string;
}

interface AboutImage {
  url: string;
  alt: string;
}

export default function About() {
  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [aboutImage, setAboutImage] = useState<AboutImage | null>(null);

  useEffect(() => {
    fetch('/api/translations/about')
      .then(res => res.json())
      .then(data => setTranslations(data.data));

      fetch('/api/images/about')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setAboutImage(data.images[0]);
        }
      });
  }, []);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  return (
    <section id="about" className="w-full bg-grey-50 py-20">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex flex-col md:flex-row gap-8 items-center relative h-full">
          <div className="w-full md:w-1/2 relative h-[500px] md:-ml-8">
            <div className="absolute bottom-0 left-0 w-full h-[500px]">
            {aboutImage  && aboutImage.url.trim() !== "" && (
                <Image 
                src={aboutImage.url}
                alt={aboutImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ 
                  objectFit: 'contain', // Changed to contain to show whole image
                  objectPosition: 'center'
                }}
                />
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 text-lg text-gray-700">
            <h4 className="text-2xl font-bold mb-4">
              {currentTranslation?.title}
            </h4>

            <div className="text-left self-start w-full description-container font-semibold mb-6">
              <p
                className="text-left text-1xl mb-8 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: currentTranslation?.subtitle || '' }}
              />
            </div>

            <div className="text-left self-start w-full description-container">
              <p
                className="text-left text-1xl mb-8 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}
              />
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:gap-8 text-center">
              <div className="text-purple-700 text-3xl font-bold">
                {currentTranslation?.statsGifts}
                <span className="block text-lg font-normal text-gray-700">
                  {currentTranslation?.statsGiftsLabel}
                </span>
              </div>
              <div className="text-purple-700 text-3xl font-bold">
                {currentTranslation?.statsWaiting}
                <span className="block text-lg font-normal text-gray-700">
                  {currentTranslation?.statsWaitingLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
