import Image from 'next/image';

export default function About() {
    return (
      <section id="about" className="w-full bg-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Про наш проєкт</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 relative h-[400px]">
            <Image 
                src="https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2F1444.jpg?alt=media&token=e7e703cc-0eca-40e4-b032-b4a152260f08"
                alt="Volunteers Project"
                fill
                className="object-cover rounded-lg"
                />

            </div>
            <div className="w-full md:w-1/2 text-lg text-gray-700">
              <p className="mb-6">«Дива трапляються» - це проєкт, який дає можливість дітям відчути тепло свята та отримати бажані подарунки. Ми працюємо з дітьми, які знаходяться в складних життєвих обставинах, і хочемо принести їм радість у цей особливий час.</p>
              <p>Кожна дитина має свою мрію, і ми збираємо подарунки саме для того, щоб ці мрії стали реальністю.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  