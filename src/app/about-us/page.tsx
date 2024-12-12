'use client';

import { useLanguage } from '../../app/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

interface Translation {
	lang: string;
	title: string;
	description: string;
	title2: string;
	description2: string;
	title3: string;
	description3: string;
}
interface AboutImages {
	url: string;
	alt: string;
}

const LoadingOverlay = () => (
	<div className="absolute inset-0 flex items-start justify-center bg-gray-150 pt-40">
		<div className="animate-spin">
			<Image
				src="/logoTransperentOrange.png"
				alt="Loading"
				width={100}
				height={100}
				className="object-contain"
			/>
		</div>
	</div>
);
export default function AboutAsPage() {
	const router = useRouter();
	const { lang } = useLanguage();
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [aboutImages, setAboutImages] = useState<AboutImages[] | null>(null);

	useEffect(() => {
		fetch('/api/translations/aboutAsPage')
			.then((res) => res.json())
			.then((data) => setTranslations(data.data));

		fetch('/api/images/aboutAsPage')
			.then((res) => res.json())
			.then((data) => {
				if (data.images && data.images.length > 0) {
					setAboutImages(data.images);
				}
			});
	}, []);

	const currentTranslation = translations.find((t) => t.lang === lang) || translations[0];

	return (
		<div className="w-full min-h-screen pt-24">
			{!currentTranslation && <LoadingOverlay />}
			<nav className="w-full bg-white shadow-md fixed top-0 z-50 px-6 py-1">
				<div className="flex flex-row gap-4">
					<button onClick={() => router.back()} className="flex flex-row gap-2 items-center">
						<FaHome className="text-3xl text-red-600" />
					</button>
				</div>
			</nav>
			<div className="max-w-7xl mx-auto px-4">
				<h1 className="text-4xl md:text-5xl font-bold mb-8">{currentTranslation?.title}</h1>
				{/* First Text Section */}
				<div className="py-16">
					<div className="prose max-w-none">
						<div
							className="text-lg text-left"
							dangerouslySetInnerHTML={{ __html: currentTranslation?.description || '' }}></div>
					</div>

					{/* Photo Grid - 3x3 */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
						{aboutImages?.slice(0, window.innerWidth < 768 ? 6 : 9).map((photo, index) => (
							<div
								key={index}
								className="aspect-square relative hover:scale-105 transition-transform">
								<Image
									src={photo.url}
									alt={photo.alt}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									fill
									quality={65}
									decoding="auto"
									placeholder="blur"
									blurDataURL="https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2Fplaceholder%2Fblurplaceholder.jpg?alt=media&token=6ba735ae-827f-4896-9844-d460cb9201b3"
									style={{
										objectFit: 'cover',
										objectPosition: 'top',
									}}
									className="w-full rounded-lg rotate-0"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Quote Section - Full Width */}
				{/* <div className="bg-gray-50 py-24 my-16">
					<blockquote className="text-2xl italic text-center max-w-4xl mx-auto px-4">
						quote
					</blockquote>
				</div> */}

				{/* Second Text Section with Masonry Gallery */}
				<div className="py-16">
					<div className="prose max-w-none">
						<h2 className="text-3xl mb-8">{currentTranslation?.title2}</h2>
						<div
							className="text-lg text-left"
							dangerouslySetInnerHTML={{ __html: currentTranslation?.description2 || '' }}></div>
					</div>

					<div className="columns-1 md:columns-3 gap-4 mt-12">
						{aboutImages?.slice(9, window.innerWidth < 768 ? 13 : 17).map((photo, index) => (
							<div key={index} className="mb-4 relative hover:scale-105 transition-transform">
								<Image
									src={photo.url}
									alt={photo.alt}
									width={800}
									height={600}
									quality={65}
									style={{
										objectFit: 'cover',
										objectPosition: 'top',
									}}
									className="w-full rounded-lg rotate-0"
								/>
							</div>
						))}
					</div>
				</div>

				<div className="py-16">
					<div className="prose max-w-none">
						<h2 className="text-3xl mb-8">{currentTranslation?.title3}</h2>
						<div
							className="text-lg text-left"
							dangerouslySetInnerHTML={{ __html: currentTranslation?.description3 || '' }}></div>
					</div>

					<div className="flex overflow-x-auto gap-4 py-8 snap-x">
						{aboutImages?.slice(17).map((photo, index) => (
							<div
								key={index}
								className="flex-none w-80 snap-center hover:scale-105 transition-transform">
								<Image
									src={photo.url}
									alt={photo.alt}
									quality={65}
									width={800}
									height={600}
									style={{
										objectFit: 'cover',
										objectPosition: 'top',
									}}
									className="w-full rounded-lg rotate-0"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
