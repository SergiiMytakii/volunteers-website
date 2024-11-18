'use client';

import { useLanguage } from '@/app/LanguageContext';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cardNumber: searchParams.get('cardNumber') || '',
    comments: '',
    kidName: searchParams.get("kidName") || "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cardNumber = searchParams.get('cardNumber');
    const kidName = searchParams.get('kidName');

    if (cardNumber) {
      setFormData(prev => ({ ...prev, cardNumber }));
    }
    if (kidName) {
      setFormData((prev) => ({ ...prev, kidName }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    console.log(formData);
    try {
     fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

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
          kidName: "",
        });
        setStatus(
          lang == "uk"
            ? "Вашу заявку відправлено!  Ми звʼяжемося з вами найближчим часом"
            : "Your request has been sent! We will contact you soon"
        );
      } else {
        setStatus(lang == "uk"
            ? "Щось пішло не так... Спробуйте ще раз, будь ласка! "
            : "Something went wrong... Please try again!"
        );
      }
    } catch (error) {
      setStatus(lang == "uk"
          ? "Щось пішло не так... Спробуйте ще раз, будь ласка! "
          : "Something went wrong... Please try again!"
      );
      console.error(error);
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <section id="contact" className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{lang === 'uk' ? "Відправити заявку" : "Submit an application" }</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{lang === 'uk' ? "Ваше імʼя:": "Your name"} </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              placeholder={
                lang === "uk" ? "Введіть ваше імʼя" : "Enter your name"
              }
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{lang === 'uk' ? "Номер телефону" : "Phone number" }:</label>
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
            <label className="block text-gray-700 mb-2 font-medium">{lang === 'uk' ? "Електронна пошта:":"Email"}</label>
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
            <label className="block text-gray-700 mb-2 font-medium">{lang === 'uk' ? "Подарунок для дитини:": "Gift for child:"} </label>
            <input
              type="text"
              name='kidname'
              value={formData.kidName}
            
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              placeholder={
                lang === "uk"
                  ? "Для якої дитини ви хочете надіслати подарунок"
                  : "For which child do you want to send a gift"
              }
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{lang === 'uk' ? "Коментарі:": "Comment"}</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500"
              rows={4}
              placeholder={
                lang === "uk"
                  ? "Ваші коментарі або побажання..."
                  : "Your comments or wishes..."
              }
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
                {lang === "uk" ? "Надсилаємо..." : "Sending..."}
              </span>
            ) : (lang === 'uk' ? 'Надіслати' : 'Submit')}
          </button>
        </form>
        {status && <p className="text-center mt-4">{status}</p>}
      </div>
    </section>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}