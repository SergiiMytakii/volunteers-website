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
    
    const sheet = doc.sheetsByTitle['faq']; 
    const rows = await sheet.getRows(); 
    const formattedData = rows.map(row => {
      const items = [];
      let i = 1;
      while (row.get(`q${i}`)) {
        items.push({
          question: row.get(`q${i}`),
          answer: row.get(`a${i}`)
        });
        i++;
      }
      return {
        lang: row.get('lang'),
        title: row.get('title'),
        items
      };
    });
    return new Response(JSON.stringify({ data: formattedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json',      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', },
    });
  }
}
