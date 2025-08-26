import { storage } from '@/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folderRef = ref(storage, '/volunteers-website-assets/superHeroReport/photos');
    const result = await listAll(folderRef);

    const imageUrls = await Promise.all(
      result.items.map(async (imageRef) => {
        const url = await getDownloadURL(imageRef);
        return {
          url,
          alt: imageRef.name,
        };
      })
    );

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch report images' }, { status: 500 });
  }
}
