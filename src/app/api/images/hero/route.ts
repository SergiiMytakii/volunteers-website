import { storage } from '@/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const heroFolderRef = ref(storage, '/volunteers-website-assets/hero');
    const result = await listAll(heroFolderRef);
    
    const imageUrls = await Promise.all(
      result.items.map(async (imageRef) => {
        const url = await getDownloadURL(imageRef);
        return {
          url,
          alt: imageRef.name
        };
      })
    );
    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}