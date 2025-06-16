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

  // const scrollToSection = (elementId: string) => {
  //   const element = document.getElementById(elementId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
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
    <div className="absolute inset-0 flex items-start justify-center bg-gray-150 pt-40">
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
    <header id="home" className="w-full h-[60vh] md:h-[90vh] bg-cover bg-center relative mt-16 overflow-hidden">
       {heroImages.length === 0 && <LoadingOverlay />}
      <div className="absolute inset-0">
        <Slider {...settings}>
        {heroImages.map((image, index) => (
          image.url && image.url.trim() !== "" && (  
              <div key={index} className="relative w-screen h-[60vh] md:h-[90vh]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  priority
                  quality={55}
                  decoding='auto'
                  placeholder="blur"
                  blurDataURL="https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2Fplaceholder%2Fblurplaceholder.jpg?alt=media&token=6ba735ae-827f-4896-9844-d460cb9201b3"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'top'
                  }}
                />
              </div>
            )
))}        </Slider>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center text-white px-4">
        <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-3 md:gap-8 justify-center md:items-center h-full">
          <div className="text-left order-1 md:order-1">
            <h1 className="text-3xl md:text-5xl font-bold">{currentTranslation?.header}</h1>
          </div>
          <div className="flex flex-col text-left w-full order-2 md:order-2 md:mt-16">
            <p className="text-xl md:text-3xl mb-4 max-w-2xl" dangerouslySetInnerHTML={{ __html: currentTranslation?.title || '' }} />
            <div className="text-left w-full description-container">
              <p
                className="text-left text-lg md:text-3xl mb-4 md:mb-8 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}
              />
            </div>
            {/* {currentTranslation?.button && (
              <button 
                onClick={() => scrollToSection('help')} 
                className="bg-red-500 text-white px-8 py-4 text-lg rounded-full hover:bg-red-600 transition-colors mt-16"
              >
                {currentTranslation.button}
              </button>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
}
