
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { SHEET_ID } from '@/app/constants';



export async function GET() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    
    await doc.loadInfo();
    
    const sheet = doc.sheetsByTitle['hero']; 
    const rows = await sheet.getRows(); 
    const formattedData = rows.map(row => ({
      lang: row.get('lang'),
      // Hero section translations
      header: row.get('header'),
      title: row.get('title'),
      description: row.get('description'),
      button: row.get('button'),
      // NavigationCards section translations
      navigationCards: {
        sectionTitle: row.get('sectionTitle'),
        title1: row.get('title1'),
        description1: row.get('description1'),
        imageUrl1: row.get('imageUrl1'),
        title2: row.get('title2'),
        description2: row.get('description2'),
        imageUrl2: row.get('imageUrl2'),
        title3: row.get('title3'),
        description3: row.get('description3'),
        imageUrl3: row.get('imageUrl3'),
        title4: row.get('title4'),
        description4: row.get('description4'),
        imageUrl4: row.get('imageUrl4'),
      }
    }));
    return new Response(JSON.stringify({ data: formattedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error ) {
    console.log(error);
    return new Response(JSON.stringify({ error: error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

