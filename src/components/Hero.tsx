'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Translation {
  lang: string;
  header: string;
  title: string;
  description: string;
  button: string;
}

interface HeroImage {
  url: string;
  alt: string;
}

export default function Hero() {
  const { lang } = useLanguage();
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [translations, setTranslations] = useState<Translation[]>([{
    lang: 'uk',
    header: '',
    title: '',
    description: '',
    button: ''
  }]);

  useEffect(() => {
    fetch('/api/images/hero')
      .then(res => res.json())
      .then(data => {
        if (data.images) {
          setHeroImages(data.images);
        }
      });
  }, []);

  useEffect(() => {
    fetch('/api/translations/hero')
      .then(res => res.json())
      .then(data => setTranslations(data.data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: false,
    cssEase: "linear"
  };

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  const LoadingOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <div className="animate-spin">
        <Image 
          src="/logoTransperentOrange.png"
          alt="Loading"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  );
  return (
    <header id="home" className="w-full  h-[120vh] bg-cover bg-center relative mt-16 overflow-hidden">
       {heroImages.length === 0 && <LoadingOverlay />}
      <div className="absolute inset-0">
        <Slider {...settings}>
        {heroImages.map((image, index) => (
            image.url && image.url.trim() !== "" && (  
              <div key={index} className="relative w-screen h-[120vh]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority
                  sizes="100vw"
                  quality={65}
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'top'
                  }}
                />
              </div>
            )
))}
        </Slider>
      </div>
      {/* <div className="absolute inset-0 bg-black/20"></div> */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center text-white px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center">
          <div className="text-left">
            <h1 className="text-5xl font-bold">{currentTranslation?.header}</h1>
          </div>
          <div className="flex flex-col items-center text-left w-full mt-16">

            <p className="text-2xl mb-4 max-w-2xl" dangerouslySetInnerHTML={{ __html: currentTranslation?.title || '' }} />
            <div className="text-left self-start w-full description-container">
              <p
                className="text-left text-1xl mb-8 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}
              />
            </div>
            {currentTranslation?.button && (
              <button 
                onClick={() => scrollToSection('help')} 
                className="bg-red-500 text-white px-8 py-4 text-lg rounded-full hover:bg-orange-600 transition-colors mt-16"
              >
                {currentTranslation.button}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
