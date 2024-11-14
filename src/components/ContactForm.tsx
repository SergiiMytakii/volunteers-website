'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name:'',
    phone: '',
    email: '',
    cardNumber: '',
    comments: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
            name: '',
            phone: '',
            email: '',
            cardNumber: '',
            comments: '',
        });
        setStatus('Вашу заявку відправлено!  Ми звʼяжемося з вами найближчим часом' );
      } else {
        setStatus('Щось пішло не так... Спробуйте ще раз, будь ласка! ');
      }
    } catch (error) {
      setStatus('Щось пішло не так... Спробуйте ще раз, будь ласка! ');
      console.error(error);
    }finally {
        setIsLoading(false);
      }
  };

  return (
    <section id="contact" className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Відправити заявку</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
            <label className="block text-gray-700 mb-2 font-medium">Ваше імʼя:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              placeholder="Введіть ваше імʼя"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Номер телефону:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              placeholder="+380 ХХХ ХХХ ХХХ"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Електронна пошта:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Номер картки дитини:</label>
            <input
              type="number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              placeholder="001, 002, 003..."
              min="001"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Коментарі:</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              rows={4}
              placeholder="Ваші коментарі або побажання..."
            ></textarea>
          </div>
          <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-red-500 text-white py-4 rounded-full text-lg font-medium hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Надсилаємо...
          </span>
        ) : 'Надіслати'}
      </button>
        </form>
        {status && <p className="text-center mt-4">{status}</p>}
      </div>
    </section>
  );
}
