import { storage } from '@/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folderRef = ref(storage, '/volunteers-website-assets/superHeroReport/videos');
    const result = await listAll(folderRef);

    const videoUrls = await Promise.all(
      result.items.map(async (fileRef) => {
        const url = await getDownloadURL(fileRef);
        return {
          url,
          name: fileRef.name,
        };
      })
    );

    return NextResponse.json({ videos: videoUrls });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch report videos' }, { status: 500 });
  }
}
