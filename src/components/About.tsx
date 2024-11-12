import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="w-full bg-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 h-full">

        {/* Flex container for image and content */}
        <div className="flex flex-col md:flex-row gap-8 items-center relative h-full">
          
          {/* Image container */}
          <div className="w-full md:w-1/2 relative h-[400px] md:-ml-6">
            <div className="absolute bottom-0 left-0 w-full h-[400px]">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2FScreenshot%202024-11-12%20at%2018.58.32.png?alt=media&token=31461abd-7a42-47f9-be9e-2ccc9e7004b7"
                alt="Volunteers Project"
                fill
                className="object-cover "
              />
            </div>
          </div>

          {/* Text and new content */}
          <div className="w-full md:w-1/2 text-lg text-gray-700">
            <h4 className="text-2xl font-bold mb-4">
              Будь частиною дива. Подаруй тепло та радість цього Різдва
            </h4>

            <h3 className="text-1xl font-semibold mb-6">
              Дива трапляються — і ти можеш бути частиною цього дива!
            </h3>

            <p className="mb-6">
              Проект `Дива трапляються` — це наша ініціатива, щоб подарувати радість і
              надію дітям, які пережили складні часи та живуть у деокупованих селах.
              Вони вже написали свої бажання, і ми хочемо допомогти їм отримати омріяні подарунки.
              Але для цього нам потрібна ваша підтримка!
            </p>

            {/* Stats section */}
            <div className="flex flex-col gap-8 md:flex-row md:gap-8 text-center">
              <div className="text-purple-700 text-5xl font-bold">
                16
                <span className="block text-lg font-normal text-gray-700">подарунків зібрано</span>
              </div>
              <div className="text-purple-700 text-5xl font-bold">
                25,000
                <span className="block text-lg font-normal text-gray-700">
                  Очікує підтвердження 2024
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
