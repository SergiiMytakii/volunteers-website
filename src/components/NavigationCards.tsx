'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';

interface NavCardLink {
  id: string; // Retained for key and potentially other uses
  href: string;
}

// Represents the structure of translations for the NavigationCards section
interface NavigationCardsTranslations {
  lang: string;
  sectionTitle: string;
  title1?: string;
  description1?: string;
  imageUrl1?: string;
  title2?: string;
  description2?: string;
  imageUrl2?: string;
  title3?: string;
  description3?: string;
  imageUrl3?: string;
  title4?: string;
  description4?: string;
  imageUrl4?: string;
}

// Props for the individual NavCard component
interface NavCardProps {
  href: string;
  title: string;
  description: string;
  imageUrl: string;
}

const NavCard: React.FC<NavCardProps> = ({ href, title, description, imageUrl }) => {
  return (
    <Link href={href} className="group block bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={imageUrl || '/logoTransperentOrange.png'} // Fallback placeholder
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" // Simple SVG placeholder
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-red-500 transition-colors duration-300">{title}</h5>
        <p className="font-normal text-gray-700 text-sm sm:text-base text-left">{description}</p>
      </div>
    </Link>
  );
};

const NavigationCards = () => {
  const { lang } = useLanguage();
  // State to hold the specific translations for the NavigationCards section for the current language
  const [currentCardTranslations, setCurrentCardTranslations] = useState<NavigationCardsTranslations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Base structure for the cards, defining their IDs and links.
  // Titles, descriptions, and images will come from translations.
  const baseCardLinks: NavCardLink[] = [
    {
      id: 'card1',
      href: '/diva-traplaytsya', // Link for the first card
    },
    {
      id: 'card2',
      href: '#', // Placeholder link for the second card
    },
    // {
    //   id: 'card3',
    //   href: '#', // Placeholder link for the third card
    // },
    // {
    //   id: 'card4',
    //   href: '#', // Placeholder link for the fourth card
    // },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/translations/hero') // Fetching from the unified hero endpoint
      .then((res) => res.json())
      .then((apiResponse) => {
        // apiResponse.data is expected to be an array of objects, one for each language
        // Each object contains a 'hero' and a 'navigationCards' property
        if (apiResponse.data && Array.isArray(apiResponse.data)) {
          const langData = apiResponse.data.find((item: { lang: string; }) => item.lang === lang);
          if (langData && langData.navigationCards) {
            console.log(langData.navigationCards)
            setCurrentCardTranslations(langData.navigationCards);
          } else {
            // Fallback to English if current language or its navigationCards data isn't found
            const enData = apiResponse.data.find((item: { lang: string; }) => item.lang === 'en');
            if (enData && enData.navigationCards) {
              setCurrentCardTranslations(enData.navigationCards);
            }
          }
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch translations for navigation cards:", error);
        setIsLoading(false);
      });
  }, [lang]); // Re-fetch if language changes

  if (isLoading || !currentCardTranslations) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">Loading projects...</p>
          {/* You can add a spinner or a more sophisticated loading animation here */}
        </div>
      </section>
    );
  }

  // Dynamically create card data using base links and fetched translations
  const cardsToDisplay = baseCardLinks.map((linkInfo, index) => {
    const cardIndex = index + 1; // For accessing title1, title2, etc.
    return {
      id: linkInfo.id,
      href: linkInfo.href,
      title: currentCardTranslations?.[`title${cardIndex}` as keyof NavigationCardsTranslations] as string || 'Project Title',
      description: currentCardTranslations?.[`description${cardIndex}` as keyof NavigationCardsTranslations] as string || 'Details about the project.',
      imageUrl: currentCardTranslations?.[`imageUrl${cardIndex}` as keyof NavigationCardsTranslations] as string || '/logoTransperentOrange.png',
    };
  }).filter(card => card.title !== 'Project Title'); // Optionally filter out cards if title is still placeholder (i.e., not in translation)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
          {currentCardTranslations?.sectionTitle || 'Our Projects and Initiatives'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 md:gap-8 lg:gap-10">
          {cardsToDisplay.map((card) => (
            <NavCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationCards;