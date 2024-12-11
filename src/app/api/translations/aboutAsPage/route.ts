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
    
    const sheet = doc.sheetsByTitle['aboutAsPage']; 
    const rows = await sheet.getRows(); 
    const formattedData = rows.map(row => ({
      lang: row.get('lang'),
      title: row.get('title'),
      description: row.get('description'),
      title2: row.get('title2'),
      description2: row.get('description2'),
      title3: row.get('title3'),
      description3: row.get('description3'),
    }));

    return new Response(JSON.stringify({ data: formattedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
