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
    
    const sheet = doc.sheetsByTitle['superHero-about']; 
    const rows = await sheet.getRows(); 
    const formattedData = rows.map(row => ({
      lang: row.get('lang'),
      title: row.get('title'),
      subtitle: row.get('subtitle'),
      description: row.get('description'),
      statsGifts: row.get('statsGifts'),
      statsWaiting: row.get('statsWaiting'),
      statsGiftsLabel: row.get('statsGiftsLabel'),
      statsWaitingLabel: row.get('statsWaitingLabel'),
    }));

    return new Response(JSON.stringify({ data: formattedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json',      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
