'use client';
import { useLanguage } from '../app/LanguageContext';
export default function Hero() {
  const { lang, setLang } = useLanguage();
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
    return (
      <header id="home" className="w-full h-screen bg-cover bg-center relative mt-16" 
        style={{
          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2Fphoto_2024-11-12%2017.40.58.jpeg?alt=media&token=4b8b9d93-85e6-46a5-af8e-f253a16e8950')`
        }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
  
        {/* Grid content for responsive layout */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center text-white px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center">
            
            {/* Left side (Title) */}
            <div className="text-left">
              <h1 className="text-5xl font-bold">{lang == 'uk'?  'Дива трапляються' :  'Miracles happens' } </h1>
            </div>
  
            {/* Right side (Paragraphs + Button) */}
            <div className="flex flex-col items-start">
              <p className="text-2xl mb-4 max-w-2xl">
                Допоможіть здійснити дитячі мрії на Різдво
              </p>
              <p className="text-1xl mb-8 max-w-2xl text-left">
                Подаруй частинку дива дітям, які цього потребують. Долучайтеся до нашої ініціативи, щоб жодна дитина не залишилась без омріяного подарунка.
              </p>
              <button 
                onClick={() => scrollToSection('help')} 
                className="bg-red-500 text-white px-8 py-4 text-lg rounded-full hover:bg-orange-600 transition-colors"
              >
                Хочу допомогти
              </button>
            </div>
  
          </div>
        </div>
      </header>
    );
  }
  