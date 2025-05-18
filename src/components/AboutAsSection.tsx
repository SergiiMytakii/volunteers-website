'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';
import { useRouter } from 'next/navigation';

interface Translation {
	lang: string;
	title: string;
	subtitle: string;
	description: string;
	photoUrl: string;
}

export default function AboutAsSection() {
    const router = useRouter();
	const { lang } = useLanguage();
	const [translations, setTranslations] = useState<Translation[]>([]);

	useEffect(() => {
		fetch('/api/translations/aboutAsSection')
			.then((res) => res.json())
			.then((data) => setTranslations(data.data));
	}, []);

	const currentTranslation = translations.find((t) => t.lang === lang) || translations[0];

	return (
		<section id="aboutAsSection" className="w-full min-h-screen flex flex-col mt-16">
			{/* Title at the top */}
			<div className="w-full text-center py-3">
				<h1
					className="text-4xl font-bold text-center mb-8"
					dangerouslySetInnerHTML={{ __html: currentTranslation?.title || '' }}></h1>
			</div>

			{/* Content columns */}
			<div className="flex flex-col md:flex-row flex-1">
				{/* Left Column - Content */}
				<div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
					{currentTranslation?.subtitle && (
						<h2
							className="text-2xl md:text-3xl mb-6"
							dangerouslySetInnerHTML={{ __html: currentTranslation?.subtitle || '' }}></h2>
					)}
					<p
						className="text-lg text-left mb-4"
						dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}></p>
					<button 
                    onClick={() => router.push('/about-us')}
                    className="w-1/2 bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors text-center mx-auto">
						{lang === 'uk' ? 'Докладніше' : 'Read More'}
					</button>
				</div>

				{/* Right Column - Image */}
				<div className="w-full md:w-1/2 relative min-h-[400px]">
					{currentTranslation?.photoUrl && currentTranslation.photoUrl.trim() !== '' && (
						<Image
							src={currentTranslation.photoUrl}
							alt={currentTranslation.title}
							fill
							priority
							quality={65}
							decoding="auto"
							placeholder="blur"
							blurDataURL="https://firebasestorage.googleapis.com/v0/b/cherch-od2024.appspot.com/o/volunteers-website-assets%2Fplaceholder%2Fblurplaceholder.jpg?alt=media&token=6ba735ae-827f-4896-9844-d460cb9201b3"
							style={{
								objectFit: 'cover',
								objectPosition: 'top',
							}}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
