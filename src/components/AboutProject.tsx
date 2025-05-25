'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../app/LanguageContext';

interface Translation {
	lang: string;
	title: string;
	subtitle: string;
	description: string;
	statsGifts: string;
	statsWaiting: string;
	statsGiftsLabel: string;
	statsWaitingLabel: string;
}

interface AboutImage {
	url: string;
	alt: string;
}

export default function AboutProject() {
	const { lang } = useLanguage();
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [aboutImage, setAboutImage] = useState<AboutImage | null>(null);

	useEffect(() => {
		fetch('/api/translations/aboutProject')
			.then((res) => res.json())
			.then((data) => setTranslations(data.data));

		fetch('/api/images/about')
			.then((res) => res.json())
			.then((data) => {
				if (data.images && data.images.length > 0) {
					setAboutImage(data.images[0]);
				}
			});
	}, []);

	const currentTranslation = translations.find((t) => t.lang === lang) || translations[0];

	return (
		<section id="about" className="w-full min-h-screen flex flex-col mt-16">
			{/* Title at the top */}
			<div className="w-full text-center py-3">
				<h1
					className="text-4xl font-bold text-center mb-8"
					dangerouslySetInnerHTML={{ __html: currentTranslation?.title || '' }}></h1>
			</div>

			<div className="flex flex-col md:flex-row flex-1">
				<div className="w-full md:w-1/2 relative min-h-[400px]">
					{aboutImage && aboutImage.url.trim() !== '' && (
						<Image
							src={aboutImage.url}
							alt={aboutImage.alt}
							fill
							sizes="(max-width: 600px) 150vw, 100vw"
							style={{
								objectFit: 'cover',
								objectPosition: 'top',
							}}
						/>
					)}
				</div>

				<div className="w-full md:w-1/2 text-lg text-gray-700 px-8">
					<div className="text-left self-start w-full description-container font-semibold mb-6">
						<p
							className="text-left text-1xl mb-8 max-w-2xl"
							dangerouslySetInnerHTML={{ __html: currentTranslation?.subtitle || '' }}
						/>
					</div>
					<p
						className="text-lg text-left mb-6"
						dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}></p>

					<div className="flex flex-col gap-8 md:flex-row md:gap-8 text-center justify-center">
						<div className="text-purple-700 text-3xl font-bold">
							{currentTranslation?.statsGifts}
							<span className="block text-lg font-normal text-gray-700">
								{currentTranslation?.statsGiftsLabel}
							</span>
						</div>
						<div className="text-purple-700 text-3xl font-bold">
							{currentTranslation?.statsWaiting}
							<span className="block text-lg font-normal text-gray-700">
								{currentTranslation?.statsWaitingLabel}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
