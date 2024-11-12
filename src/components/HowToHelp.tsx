'use client';

import { useEffect, useState,  useRef } from "react";
import { db } from "../firebase";
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
}

export default function HowToHelp() {
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="help" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Як ви можете допомогти</h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 text-center">
          <p className="mb-8">Ви можете обрати конкретну дитину, дізнатись про її мрію та підготувати подарунок спеціально для неї. Разом ми можемо створити незабутній святковий момент для кожного з них.</p>
          <a href="#contact" className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-colors inline-block">
            Зробити подарунок
          </a>
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
            <SwiperSlide key={child.id} className="h-[500px] pb-4 ">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-[250px] relative">
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
                  </div>
                  <div className="mt-auto pt-6">
                    <button className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors">
                      Хочу допомогти
                    </button>
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
