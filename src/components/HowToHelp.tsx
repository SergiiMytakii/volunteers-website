'use client';

import { db } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";




interface Child {
  id: string;
  name: string;
  age: number;
  dream: string;
  imgSrc: string;
}

export default function HowToHelp() {
    const [childrenData, setChildrenData] = useState<Child[]>([]);

    useEffect(() => {
      const fetchChildren = async () => {
        const querySnapshot = await getDocs(collection(db, "kids"));
        const children: Child[] = [];
        querySnapshot.forEach((doc) => {
          children.push(doc.data()  as Child);
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
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mt-12"
        >
          {childrenData.map((child) => (
            <SwiperSlide key={child.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image src={child.imgSrc} alt={child.name} className="w-full h-64 object-cover" width={500} height={300} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{child.name}, {child.age} років</h3>
                  <p className="text-gray-600">{child.dream}</p>
                  <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition-colors">
                    Хочу допомогти
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}        </Swiper>
      </div>
    </section>
  );
}

