export default function VolunteersPage() {
  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <header className="my-8 bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Дива трапляються</h1>
        <p className="mb-4">Допоможіть нам зробити свято для дітей, які цього потребують. Подаруйте трішки дива разом з нами!</p>
        <a href="#contact" className="inline-block px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Долучитися до проєкту
        </a>
      </header>

      {/* About Project Section */}
      <section className="my-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Про наш проєкт</h2>
        <p className="text-center mb-4">«Дива трапляються» - це проєкт, який дає можливість дітям відчути тепло свята та отримати бажані подарунки. Ми працюємо з дітьми, які знаходяться в складних життєвих обставинах, і хочемо принести їм радість у цей особливий час.</p>
        <p className="text-center">Кожна дитина має свою мрію, і ми збираємо подарунки саме для того, щоб ці мрії стали реальністю.</p>
      </section>

      {/* Call to Action Section */}
      <section className="my-8 bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Як ви можете допомогти</h2>
        <p className="mb-4">Ви можете обрати конкретну дитину, дізнатись про її мрію та підготувати подарунок спеціально для неї. Разом ми можемо створити незабутній святковий момент для кожного з них.</p>
        <a href="#contact" className="inline-block px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Зробити подарунок
        </a>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="my-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Контакти</h2>
        <p className="text-center mb-6">Якщо у вас є питання або ви хочете взяти участь, будь ласка, заповніть форму нижче.</p>
        
        <form className="max-w-lg mx-auto space-y-4">
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-bold mb-1">Номер телефону:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+380 ХХХ ХХХ ХХХ"
              required
              className="border rounded-md p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold mb-1">Електронна пошта:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="border rounded-md p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="child_number" className="font-bold mb-1">Номер картки дитини:</label>
            <input
              type="number"
              id="child_number"
              name="child_number"
              placeholder="1, 2, 3..."
              min="1"
              required
              className="border rounded-md p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="comments" className="font-bold mb-1">Коментарі:</label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Ваші коментарі або побажання..."
              rows={4}
              className="border rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Надіслати
          </button>
        </form>
      </section>

      {/* Thank You Section */}
      <section className="my-8 bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Дякуємо за вашу підтримку!</h2>
        <p className="max-w-2xl mx-auto">
          Завдяки вашій допомозі ми зможемо подарувати дітям чудові моменти та яскраві враження, 
          які вони запам`ятають надовго.
        </p>
      </section>
    </div>
  );
}
