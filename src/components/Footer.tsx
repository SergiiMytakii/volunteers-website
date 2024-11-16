'use client';

import Image from 'next/image';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from "@/app/LanguageContext";
import { useEffect, useState } from "react";

interface Translation {
  lang: string;
  titleSocial: string;
  titleContacts: string;
  description: string;
  phone: string;
  rights: string;
  facebookLink: string;
  instagramLink: string;
}

export default function Footer() {
  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    fetch('/api/translations/footer')
      .then(res => res.json())
      .then(data => setTranslations(data.data));
  }, []);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="object-contain mb-4"
            />
            <p className="text-gray-600 max-w-sm text-center md:text-left">
              {currentTranslation?.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">{currentTranslation?.titleSocial}</h3>
            <div className="flex space-x-6">
              <a href={currentTranslation?.facebookLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href={currentTranslation?.instagramLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">{currentTranslation?.titleContacts}</h3>
            <a href="mailto:alex@ochimadoochey.com" className="flex items-center text-gray-600 hover:text-red-500 transition-colors mb-2">
              <FaEnvelope className="mr-2" />
              alex@ochimadoochey.com
            </a>
            <p className="text-gray-600">
              {currentTranslation?.phone}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-gray-200 text-gray-500">
          <p>{currentTranslation?.rights}</p>
        </div>
      </div>
    </footer>
  );
}
