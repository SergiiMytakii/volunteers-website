import { storage } from '@/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folderRef = ref(storage, '/volunteers-website-assets/superHeroReport/videos');
    const result = await listAll(folderRef);

    // Separate files by extension and map by basename
    const imageExts = new Set(['jpg', 'jpeg', 'png', 'webp']);
    const videoExts = new Set(['mp4', 'mov', 'webm', 'm4v']);

    const stem = (name: string): string => name.replace(/\.[^/.]+$/, '');
    const ext = (name: string): string => {
      const idx = name.lastIndexOf('.');
      return idx >= 0 ? name.slice(idx + 1).toLowerCase() : '';
    };

    const imageMap = new Map<string, ReturnType<typeof ref>>();
    const videoRefs: ReturnType<typeof ref>[] = [];

    for (const fileRef of result.items) {
      const e = ext(fileRef.name);
      if (imageExts.has(e)) {
        imageMap.set(stem(fileRef.name), fileRef);
      } else if (videoExts.has(e)) {
        videoRefs.push(fileRef);
      }
    }

    const videos = await Promise.all(
      videoRefs.map(async (fileRef) => {
        const [url, thumbUrl] = await Promise.all([
          getDownloadURL(fileRef),
          (async () => {
            const key = stem(fileRef.name);
            const imgRef = imageMap.get(key);
            return imgRef ? getDownloadURL(imgRef) : null;
          })(),
        ]);
        return {
          url,
          name: fileRef.name,
          thumbnail: thumbUrl,
        } as { url: string; name: string; thumbnail: string | null };
      })
    );

    return NextResponse.json({ videos });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch report videos' }, { status: 500 });
  }
}
