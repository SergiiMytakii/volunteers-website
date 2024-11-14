'use client';

import { useEffect, useState,  useRef } from "react";
import { db } from "../firebase";
import DonationDialog, { DonationFormData } from "./DonationDialog";
import { collection, getDocs } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Child {
  id: string;
  name: string;
  age: number;
  dream: string;
  imgSrc: string;
  fundOpen: boolean;
}

export default function HowToHelp() {
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

const handleDonation = async (formData: DonationFormData) => {
  const response =  fetch('/api/sendEmailDonation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
    window.open(
      `https://send.monobank.ua/jar/4cancXNM46?amount=${formData.amount}?t=from:${formData.name},%20phone:${formData.phone},%20child:${formData.cardNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  setActiveCardId(null);
};
// 
  useEffect(() => {
    const fetchChildren = async () => {
      const querySnapshot = await getDocs(collection(db, "kids"));
      const children: Child[] = [];
      querySnapshot.forEach((doc) => {
        children.push(doc.data() as Child);
      });
      setChildrenData(children);
    };

    fetchChildren();
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="help" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Як ви можете допомогти</h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 text-center">
          <p className="mb-8">Ви можете обрати конкретну дитину, дізнатись про її мрію та підготувати подарунок спеціально для неї. Разом ми можемо створити незабутній святковий момент для кожного з них.</p>
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
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{child.name}, {child.age} років</h3>
                    <p className="text-gray-600 min-h-[3rem] line-clamp-2">{child.dream}</p>
                    <p className="text-gray-600 min-h-[1rem] line-clamp-2">Картка  {child.id}</p>
                  </div>
                  <div className="mt-auto pt-8 flex gap-4">
                  {child.fundOpen ? (
                     <>
                    <button 
                    onClick={() => scrollToSection("contact")}  
                    className="w-1/2 bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors text-center">
                        Зберу подарунок
                    </button>
                    <button 
                        onClick={() => setActiveCardId(child.id)} 
                        className="w-1/2 border-2 border-red-500 text-red-500 py-3 rounded-full hover:bg-red-50 transition-colors text-center"
                        >
                        Хочу допомогти
                        </button>
                        <DonationDialog 
                              isOpen={activeCardId === child.id}
                              onClose={() => setActiveCardId(null)}
                            onConfirm={handleDonation}
                            cardNumber={child.id}
                          kidName={child.name}
                          />
                        
                          </>
                    ) : (
                        <div className="w-full text-center py-3 bg-gray-200 rounded-full text-gray-600">
                        Збір закрито
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
