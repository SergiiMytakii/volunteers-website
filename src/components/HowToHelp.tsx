'use client';

// import { db } from "../firebase";
// import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState, useRef } from "react";
import DonationDialog, { DonationFormData } from "./DonationDialog";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MONO_JAR_LINK, PAYPAL_LINK, } from "@/app/constants";
import { useLanguage } from "@/app/LanguageContext";
import { Virtual } from 'swiper/modules';
import { SheetsService } from "@/service/SheetService";
import { ChildrenData } from "@/models/ChildrenData";



interface Translation {
  lang: string;
  card: string;
  title: string;
  description: string;
  giftButton: string;
  donateButton: string;
  closedLabel: string;
}

interface HowToHelpProps {
  translationsApiEndpoint: string;
  childrenDataApiEndpoint: string;
  giftButton: boolean
  donationDialogApiEndpoint: string
}

const sheetsService = SheetsService.getInstance();
export default function HowToHelp({ translationsApiEndpoint, childrenDataApiEndpoint, giftButton , donationDialogApiEndpoint}: HowToHelpProps) {
  const [childrenData, setChildrenData] = useState<ChildrenData[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(false);

  const [scale, setScale] = useState(1);



  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const { lang } = useLanguage();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [donationDialogTranslations, setDonationDialogTranslations] = useState();



  const loadMore = async () => {
    if (isLoading || childrenData.length === 0) return;

    setIsLoading(true);
    const nextPage = page + 1;
    const newData = await sheetsService.getChildrenData(nextPage, itemsPerPage, childrenDataApiEndpoint);
    if (newData) {
      setChildrenData(prev => [...prev, ...newData]);
      setPage(nextPage);
    }
    setIsLoading(false);
  };

  const handleImageClick = (imageSrc: string) => {
    setIsFullScreenLoading(true);
    setFullScreenImage(imageSrc);
    setScale(1);
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };


  const handleDonationMono = async (formData: DonationFormData) => {
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
  const handleDonationPayPal = async (formData: DonationFormData) => {
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
      `${PAYPAL_LINK}`,
      "_blank",
      "noopener,noreferrer"
    );
    setActiveCardId(null);
  };
  // 
  useEffect(() => {
    fetch(translationsApiEndpoint)
      .then(res => res.json())
      .then(data => setTranslations(data.data))
      .catch(error => console.error(`Failed to fetch translations from ${translationsApiEndpoint}:`, error));

    const fetchData = async () => {
      // Assuming childrenDataApiEndpoint will be used by SheetsService or similar
      // For now, let's assume SheetsService is modified or can take an endpoint/parameter
      // If SheetsService.getChildrenData needs direct endpoint, this needs adjustment
      const children = await sheetsService.getChildrenData(1, itemsPerPage, childrenDataApiEndpoint);
      if (children)
        setChildrenData(children);
    };

    fetchData();

    fetch(`${donationDialogApiEndpoint}?lang=${lang}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setDonationDialogTranslations(data))
      .catch(error => console.error('Failed to fetch donation dialog translations:', error));

  }, [donationDialogApiEndpoint, translationsApiEndpoint, childrenDataApiEndpoint, lang]);

  const currentTranslation = translations.find(t => t.lang === lang) || translations[0];

  const scrollToContactWithId = (childId: string, childName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.history.pushState({}, '', `?cardNumber=${childId}&kidName=${childName}#contact`);
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="help" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{currentTranslation?.title}</h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 margin-bottom">
          <p className="mb-8 text-left" dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}></p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, A11y, Virtual]}
          virtual
          onReachEnd={loadMore}
          observer={true}
          observeParents={true}
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
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
         className="mt-12 relative !pb-12 custom-swiper"
        >
          {childrenData.map((child, index) => (
            
            <SwiperSlide key={child.id} virtualIndex={index} className="h-[950px] pb-4 ">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-[550px] relative">
                  {child.imgSrc && child.imgSrc.trim() !== "" && (
                    // Update the Image component inside SwiperSlide
                    <Image
                      src={child.imgSrc}
                      alt={child.name}
                      fill
                      loading="eager"
                      priority
                      quality={100}
                      placeholder="blur"
                      blurDataURL="./logoTransperentOrange.png"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover cursor-pointer"
                      onClick={() => handleImageClick(child.imgSrc)}
                      onError={(e) => {
                        e.currentTarget.src = '/logoTransparentOrange.png'
                      }}
                    />

                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="h-[250px]" >
                    <h3 className="text-xl font-semibold mb-2">{lang == 'uk' ? child.name : child.nameEn}  {child.age && `, ${child.age} ${lang == 'uk' ? "років" : "years"}`}</h3>
                    <p className="text-gray-600 min-h-[4.5rem] line-clamp-9" dangerouslySetInnerHTML={{ __html: lang == 'uk' ? child.dream : child.dreamEn }}></p>
                    	
                    {/* <p className="text-gray-600 min-h-[1rem] line-clamp-2">{currentTranslation?.card}  {child.id}</p> */}
                  </div>
                  {/* Progress bar START */}
                  {(child.desiredAmount ) && (

                    <div className="my-4 flex flex-col items-center">
                      <div className="text-sm text-gray-600 mb-1">
                        {lang === 'uk' ? 'Зібрано:' : 'Collected:'} {child.funded?.toLocaleString() || 0} / {child.desiredAmount?.toLocaleString()}
                      </div>
                      <div className="w-3/4 h-12 bg-gray-200 rounded border-2 border-gray-400 relative flex items-center pr-2">
                        {/* Battery top */}
                        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-gray-400 rounded-r-sm"></div>
                        {/* Battery fill */}
                        <div
                          className={`h-[calc(100%-4px)] ml-0.5 rounded-sm transition-all duration-500 ease-in-out flex items-center justify-center text-xs font-medium text-white`}
                          style={{
                            width: `calc(${Math.min((child.funded || 0) / child.desiredAmount * 100, 100)}% - 3px)`,
                            backgroundColor: 
                              (child.funded || 0) / child.desiredAmount * 100 < 30 ? '#ef4444' : // red-500
                              (child.funded || 0) / child.desiredAmount * 100 < 70 ? '#f59e0b' : // amber-500
                              '#22c55e', // green-500
                          }}
                        >
                         {child.funded && `${Math.round((child.funded || 0) / child.desiredAmount * 100)}%`}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Progress bar END */}
                  {/* buttons block */}
                  <div className="mt-auto pt-8 flex gap-4 justify-center">
                    {child.fundOpen ? (
                      <>
                        {giftButton && (<button
                          onClick={() => scrollToContactWithId(child.id, child.name)}
                          className="w-1/2 bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors text-center px-1">
                          {currentTranslation?.giftButton}
                        </button>)}
                        <button
                          onClick={() => setActiveCardId(child.id)}
                          className="w-1/2 border-2 border-red-500 text-red-500 py-3 rounded-full hover:bg-red-50 transition-colors text-center px-1">

                          {currentTranslation?.donateButton}
                        </button>
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

          ))}          <div ref={prevRef} className="swiper-button-prev"></div>
          <div ref={nextRef} className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>

          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[999]">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </Swiper>


      </div>
      {activeCardId && (
        <DonationDialog
          isOpen={!!activeCardId}
          onClose={() => setActiveCardId(null)}
          onConfirmMono={handleDonationMono}
          onConfirmPayPal={handleDonationPayPal}
          cardNumber={activeCardId}
          kidName={childrenData.find(child => child.id === activeCardId)?.name || ''}
          kidNameEn={childrenData.find(child => child.id === activeCardId)?.nameEn || ''}
          translations={donationDialogTranslations || {
            title: '',
            nameLabel: '',
            namePlaceholder: '',
            commentLabel: '',
            commentPlaceholder: ''
          }}
        />
      )}
      {fullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => {
            setFullScreenImage(null);
            setScale(1);
          }}
        >
          <div
            className="relative cursor-zoom-in"
            onClick={e => e.stopPropagation()}
            onWheel={(e) => handleZoom(e.deltaY > 0 ? -0.1 : 0.1)}
          >
            {isFullScreenLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={fullScreenImage}
              alt="Full screen view"
              width={1920}
              height={1080}
              quality={100}
              onLoadingComplete={() => setIsFullScreenLoading(false)}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s',
                maxHeight: '90vh',
                width: 'auto'
              }}
              className="object-contain"
            />
            {!isFullScreenLoading && (
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => {
                  setFullScreenImage(null);
                  setScale(1);
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
