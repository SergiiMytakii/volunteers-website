'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '../app/LanguageContext';
import { useRouter } from 'next/navigation';


export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { lang, setLang } = useLanguage();
	const router = useRouter();


	const menuItems: {
		[key: string]: { home: string, diva: string; superHero: string; aboutAs: string };
	} = {
		uk: {
			home: 'Головна',
			diva: 'Дива трапляються',
			superHero: 'Супер Герой',
			aboutAs: 'Про нас',
		},
		en: {
			home: 'Home',
			diva: 'Miracles Happen',
			superHero: 'Superhero',
			aboutAs: 'About Us',
		},
	};

	return (
		<nav className="w-full bg-white shadow-md fixed top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-1">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0 px-2">
						<div className="flex flex-row gap-4">
							<button onClick={() => router.push('/')} className="flex items-center">
								<Image
									src="/logoTransperentOrange.png"
									alt="Logo"
									width={60}
									height={60}
									className="object-contain"
								/>
							</button>
						</div>
					</div>

					<div className="hidden md:block">
						<div className="flex items-center space-x-8">
							<button
								onClick={() => router.push('/')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].home}
							</button>
							<button
								onClick={() => router.push('/super-hero')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].superHero}
							</button>
							<button
								onClick={() => router.push('/diva-traplaytsya')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].diva}
							</button>
							{/* <button
								onClick={() => scrollToSection('contact')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].contact}
							</button>
							<button
								onClick={() => scrollToSection('faq')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].faq}
							</button> */}
							<button
									onClick={() => router.push('/about-us')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].aboutAs}
							</button>
							<button
								onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{lang === 'uk' ? 'UK' : 'EN'}
							</button>
						</div>
					</div>

					{/* Mobile menu button */}
					<button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<svg
							className="h-6 w-6 text-gray-600"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor">
							{isMenuOpen ? (
								<path d="M6 18L18 6M6 6l12 12" />
							) : (
								<path d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden py-4">
						<div className="flex flex-col space-y-4">
						<button
								onClick={() => router.push('/')}
								className="text-gray-700 hover:text-red-500 transition-colors">
								{menuItems[lang].home}
							</button>
							<button
									onClick={() => router.push('/super-hero')}
								className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left">
								{menuItems[lang].superHero}
							</button>
							<button
									onClick={() => router.push('/diva-traplaytsya')}
								className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left">
								{menuItems[lang].diva}
							</button>
							{/* <button
								onClick={() => scrollToSection('contact')}
								className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left">
								{menuItems[lang].contact}
							</button>
							<button
								onClick={() => scrollToSection('faq')}
								className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left">
								{menuItems[lang].faq}
							</button> */}
							<button
									onClick={() => router.push('/about-us')}
								className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left">
								{menuItems[lang].aboutAs}
							</button>
							<button
								onClick={() => {
									setLang(lang === 'uk' ? 'en' : 'uk');
									setIsMenuOpen(false);
								}}
								className="text-gray-700 hover:text-red-500 transition-colors px-4 py-2 text-left">
								{lang === 'uk' ? 'EN' : 'UK'}
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
