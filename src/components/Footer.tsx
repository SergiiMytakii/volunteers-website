import Image from 'next/image';
import { FaFacebook, FaInstagram,FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="/logoTransperent.png"
              alt="Logo"
              width={60}
              height={60}
              className="object-contain mb-4"
            />
            <p className="text-gray-600 max-w-sm text-center md:text-left">
              Допомагаємо здійснювати дитячі мрії та даруємо радість святкових моментів
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Слідкуйте за нами</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              {/* <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 transition-colors">
                <FaTelegram size={24} />
              </a> */}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Контакти</h3>
            <a href="mailto:contact@example.com" className="flex items-center text-gray-600 hover:text-red-500 transition-colors mb-2">
              <FaEnvelope className="mr-2" />
              alex@ochimadoochey.com
            </a>
            <p className="text-gray-600">
              Телефон: +380 (67) 274 04 52
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-gray-200 text-gray-500">
          <p>© 2024 Очима до Очей. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
