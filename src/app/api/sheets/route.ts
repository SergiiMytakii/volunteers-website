
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { SHEET_ID } from '@/app/constants';



export async function GET() {
  console.log('Fetching data from Google Sheets...');
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    
    await doc.loadInfo(); // loads document properties and worksheets
    await doc.updateProperties({ title: "children data" });
    
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows(); 
    const formattedData = rows.map(row => ({
      id: row.get('id'),
      name: row.get('name'),
      nameEn: row.get('nameEn'),
      age: row.get('age'),
      dream: row.get('dream'),
      dreamEn: row.get('dreamEn'),
      imgSrc: row.get('imgSrc'),
      fundOpen: row.get('fundOpen') === 'TRUE'
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

