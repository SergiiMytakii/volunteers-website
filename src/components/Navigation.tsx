import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-red-500 hover:text-red-600 transition-colors">
              <FaHome className="text-2xl" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-red-500 transition-colors">Про проєкт</a>
              <a href="#help" className="text-gray-700 hover:text-red-500 transition-colors">Як допомогти</a>
              <a href="#contact" className="text-gray-700 hover:text-red-500 transition-colors">Контакти</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
