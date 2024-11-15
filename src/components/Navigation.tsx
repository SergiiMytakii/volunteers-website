'use client';

import Image from 'next/image'
import { useState } from 'react';
import { useLanguage } from '../app/LanguageContext';



export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' , });
      setIsMenuOpen(false);
    }
  };

  

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 px-2">
            <button     onClick={() => scrollToSection('home')} 
            className="flex items-center">
             <Image 
             src="/logoTransperent.png"
             alt="Logo"
             width={60}
             height={60}
             
             className="object-contain"
           />
           </button>
           
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-700 hover:text-red-500 transition-colors"
              >
                Про проєкт
              </button>
              <button 
                onClick={() => scrollToSection('help')} 
                className="text-gray-700 hover:text-red-500 transition-colors"
              >
                Як допомогти
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 hover:text-red-500 transition-colors"
              >
                Контакти
              </button>
              <button 
              onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              {lang === 'uk' ? 'EN' : 'UK'}
            </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="h-6 w-6 text-gray-600" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left"
              >
                Про проєкт
              </button>
              <button 
                onClick={() => scrollToSection('help')} 
                className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left"
              >
                Як допомогти
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left"
              >
                Контакти
              </button>
              <button 
              onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
              className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left"
            >
              {lang === 'uk' ? 'EN' : 'UK'}
            </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
