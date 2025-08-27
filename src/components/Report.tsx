'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { useLanguage } from '@/app/LanguageContext';

interface MediaItem {
  name: string;
  url: string;
}

interface ReportProps {
  photosApiEndpoint: string; // e.g. "/api/images/superHeroReport"
  videosApiEndpoint: string; // e.g. "/api/videos/superHeroReport"
  title?: string;
}

function LazyVideo({
  src,
  containerClassName,
  videoClassName,
}: {
  src: string;
  containerClassName?: string;
  videoClassName?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    const el = ref.current;

    const checkInView = () => {
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Consider 200px margin similar to rootMargin
      const inView =
        rect.bottom >= -200 &&
        rect.right >= -200 &&
        rect.top <= vh + 200 &&
        rect.left <= vw + 200;
      if (inView) setVisible(true);
      return inView;
    };

    // If already in view, render immediately
    if (checkInView()) return undefined;

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setVisible(true);
            observer?.disconnect();
          }
        },
        { root: null, rootMargin: '200px', threshold: 0.01 }
      );
      observer.observe(el);
    }

    // Scroll/resize fallback in case IO doesn't fire
    const onScrollOrResize = () => {
      if (checkInView()) {
        window.removeEventListener('scroll', onScrollOrResize);
        window.removeEventListener('resize', onScrollOrResize);
      }
    };
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div ref={ref} className={containerClassName}>
      {visible ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video preload="metadata" className={videoClassName}>
          <source src={src} />
        </video>
      ) : (
        <div className={videoClassName ? `${videoClassName} bg-black/20` : 'w-full h-full bg-black/20'} />
      )}
    </div>
  );
}

export default function Report({ photosApiEndpoint, videosApiEndpoint }: ReportProps) {
  const { lang } = useLanguage();
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<
    { type: 'photo' | 'video'; name: string; url: string } | null
  >(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMedia() {
      setLoading(true);
      setError(null);
      try {
        const [photosRes, videosRes] = await Promise.all([
          fetch(photosApiEndpoint),
          fetch(videosApiEndpoint),
        ]);

        if (!photosRes.ok) throw new Error('Failed to fetch photos');
        if (!videosRes.ok) throw new Error('Failed to fetch videos');

        const photosJson = await photosRes.json();
        const videosJson = await videosRes.json();

        const photoItems: MediaItem[] = Array.isArray(photosJson.images)
          ? photosJson.images.map((img: { url: string; alt?: string }) => ({
              name: img.alt || img.url,
              url: img.url,
            }))
          : [];

        const videoItems: MediaItem[] = Array.isArray(videosJson.videos)
          ? videosJson.videos.map((vid: { url: string; name?: string }) => ({
              name: vid.name || vid.url,
              url: vid.url,
            }))
          : [];

        if (!cancelled) {
          setPhotos(photoItems);
          setVideos(videoItems);
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load media from Firebase');
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMedia();
    return () => {
      cancelled = true;
    };
  }, [photosApiEndpoint, videosApiEndpoint]);
  // Build combined media list (interleave videos and photos)
  const maxLen = Math.max(videos.length, photos.length);
  const combined: Array<{ type: 'photo' | 'video'; name: string; url: string }> = [];
  for (let i = 0; i < maxLen; i += 1) {
    if (i < videos.length) combined.push({ type: 'video', name: videos[i].name, url: videos[i].url });
    if (i < photos.length) combined.push({ type: 'photo', name: photos[i].name, url: photos[i].url });
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const firstCount = isMobile ? 6 : 9;
  const secondCount = isMobile ? 4 : 8;
  const first = combined.slice(0, firstCount);
  const second = combined.slice(firstCount, firstCount + secondCount);
  const rest = combined.slice(firstCount + secondCount);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="report" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{ lang === 'uk' ? 'Як це було?' : 'How was it?'}</h2>

        {loading && <p className="text-center">Loading media...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && combined.length > 0 && (
          <>
            {/* Mobile: single vertical list */}
            <div className="md:hidden space-y-4 mt-12">
              {combined.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="relative hover:scale-[1.01] transition-transform cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightbox(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setLightbox(item);
                  }}
                >
                  {item.type === 'photo' ? (
                    <Image
                      src={item.url}
                      alt={item.name}
                      width={1200}
                      height={800}
                      quality={65}
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      className="w-full h-auto rounded-lg rotate-0"
                    />
                  ) : (
                    <div className="relative">
                      <LazyVideo src={item.url} containerClassName="" videoClassName="w-full rounded-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 text-white rounded-full p-3">
                          <FaPlay className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: multi-section layout */}
            <div className="hidden md:block">
              <div className="space-y-16">
                {/* Section 1: Grid (like About Us 3x3) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {first.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="aspect-square relative hover:scale-105 transition-transform cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightbox(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setLightbox(item);
                  }}
                >
                  {item.type === 'photo' ? (
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      quality={65}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      decoding="auto"
                      placeholder="blur"
                      blurDataURL="https://firebasestorage.googleapis.com/v0/b/cherch-od2024.firebasestorage.app/o/volunteers-website-assets%2Fplaceholder%2Fblurplaceholder.jpg?alt=media&token=6ba735ae-827f-4896-9844-d460cb9201b3"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      className="w-full rounded-lg rotate-0"
                    />
                  ) : (
                    <div className="absolute inset-0">
                      <LazyVideo
                        src={item.url}
                        containerClassName="absolute inset-0"
                        videoClassName="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 text-white rounded-full p-3">
                          <FaPlay className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 2: Masonry (columns) */}
            {second.length > 0 && (
              <div className="columns-1 md:columns-3 gap-4 mt-12">
                {second.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="mb-4 relative hover:scale-105 transition-transform cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => setLightbox(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setLightbox(item);
                    }}
                  >
                    {item.type === 'photo' ? (
                      <Image
                        src={item.url}
                        alt={item.name}
                        width={800}
                        height={600}
                        quality={65}
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="w-full rounded-lg rotate-0"
                      />
                    ) : (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <div className="relative">
                        <LazyVideo src={item.url} containerClassName="" videoClassName="w-full rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 text-white rounded-full p-3">
                            <FaPlay className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Section 3: Horizontal scroll */}
            {rest.length > 0 && (
              <div className="flex overflow-x-auto gap-4 py-8 snap-x">
                {rest.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex-none w-80 snap-center hover:scale-105 transition-transform cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => setLightbox(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setLightbox(item);
                    }}
                  >
                    {item.type === 'photo' ? (
                      <Image
                        src={item.url}
                        alt={item.name}
                        width={800}
                        height={600}
                        quality={65}
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="w-full rounded-lg rotate-0"
                      />
                    ) : (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <div className="relative">
                        <video preload="metadata" className="w-full rounded-lg">
                          <source src={item.url} />
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 text-white rounded-full p-3">
                            <FaPlay className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
              </div>
            </div>
          </>
        )}
        {/* Lightbox Modal */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute -top-10 right-0 text-white bg-black/50 hover:bg-black/70 rounded px-3 py-1"
                onClick={() => setLightbox(null)}
              >
                Close
              </button>
              {lightbox.type === 'photo' ? (
                <div className="relative w-full h-[70vh] md:h-[80vh]">
                  <Image
                    src={lightbox.url}
                    alt={lightbox.name}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded"
                >
                  <source src={lightbox.url} />
                </video>
              )}
              <p className="mt-3 text-sm text-gray-200 break-all">{lightbox.name}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
