export default function ContactForm() {
    return (
      <section id="contact" className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Контакти</h2>
          <form className="max-w-xl mx-auto space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Номер телефону:</label>
              <input type="tel" className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500" placeholder="+380 ХХХ ХХХ ХХХ" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Електронна пошта:</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Номер картки дитини:</label>
              <input type="number" className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500" placeholder="1, 2, 3..." min="1" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Коментарі:</label>
              <textarea className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500" rows={4} placeholder="Ваші коментарі або побажання..."></textarea>
            </div>
            <button type="submit" className="w-full bg-red-500 text-white py-4 rounded-full text-lg font-medium hover:bg-red-600 transition-colors">
              Надіслати
            </button>
          </form>
        </div>
      </section>
    );
  }
  