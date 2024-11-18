'use client';

// import { db } from "../firebase";
// import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState,  useRef } from "react";
import DonationDialog, { DonationFormData } from "./DonationDialog";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MONO_JAR_LINK,} from "@/app/constants";
import { useLanguage } from "@/app/LanguageContext";

interface Child {
  id: string;
  name: string;
  nameEn: string;
  age: number;
  dream: string;
  dreamEn: string;
  imgSrc: string;
  fundOpen: boolean;
}

interface Translation {
  lang: string;
  card: string;
  title: string;
  description: string;
  giftButton: string;
  donateButton: string;
  closedLabel: string;
}

export default function HowToHelp() {
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);

  const fetchChildrenData = async () => {
   try {
     const response = await fetch('/api/sheets', {
      method: "GET"
     });
     if (!response.ok) {
      console.error('Failed to fetch Google Sheet data');
    }
    
    const { data } = await response.json();
    return data;
   } catch (error) {
   console.error('Error fetching Google Sheet data:', error);
    return null;
   }
  };

const handleDonation = async (formData: DonationFormData) => {
  fetch('/api/submitDonation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  fetch('/api/sendEmailDonation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
    window.open(
      `${MONO_JAR_LINK}?t=from:${formData.name},%20child:${formData.cardNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  setActiveCardId(null);
};
// 
  useEffect(() => {
    fetch('/api/translations/help')
      .then(res => res.json())
      .then(data => setTranslations(data.data));

    const fetchData = async () => {
      const children = await fetchChildrenData();
      if(children)
      setChildrenData(children);
    };
    
    fetchData();
    
  }, []);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="help" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{currentTranslation?.title}</h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 text-center">
          <p className="mb-8">{currentTranslation?.description}</p>
          {/* <a href="#contact" className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-colors inline-block">
            Зробити подарунок
          </a> */}
        </div>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          onInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}          observer={true}
          observeParents={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mt-12 relative !pb-12"
        >
          {childrenData.map((child) => (
            <SwiperSlide key={child.id} className="h-[600px] pb-4 ">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-[300px] relative">
                  <Image 
                    src={child.imgSrc} 
                    alt={child.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{lang == 'uk'? child.name : child.nameEn}, {child.age}</h3>
                    <p className="text-gray-600 min-h-[3rem] line-clamp-2">{lang == 'uk'?  child.dream : child.dreamEn}</p>
                    <p className="text-gray-600 min-h-[1rem] line-clamp-2">{currentTranslation?.card}  {child.id}</p>
                  </div>
                  <div className="mt-auto pt-8 flex gap-4">
                  {child.fundOpen ? (
                     <>
                    <button 
                    onClick={() => scrollToSection("contact")}  
                    className="w-1/2 bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors text-center px-1">
                        {currentTranslation?.giftButton}
                    </button>
                    <button 
                        onClick={() => setActiveCardId(child.id)} 
                        className="w-1/2 border-2 border-red-500 text-red-500 py-3 rounded-full hover:bg-red-50 transition-colors text-center px-1">
                        
                         {currentTranslation?.donateButton}
                        </button>
                        <DonationDialog 
                              isOpen={activeCardId === child.id}
                              onClose={() => setActiveCardId(null)}
                            onConfirm={handleDonation}
                            cardNumber={child.id}
                          kidName={lang == "uk" ? child.name : child.nameEn}
                          />
                        
                          </>
                    ) : (
                        <div className="w-full text-center py-3 bg-gray-200 rounded-full text-gray-600">
                       {currentTranslation?.closedLabel}
                        </div>
                    )}
                                        </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        <div ref={prevRef} className="swiper-button-prev"></div>
        <div ref={nextRef} className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
}
