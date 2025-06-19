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
    
    const sheet = doc.sheetsByTitle['footer'];
    const rows = await sheet.getRows();
    const formattedData = rows.map(row => ({
      lang: row.get('lang'),
      titleSocial: row.get('title_social'),
      titleContacts: row.get('title_contacts'),
      description: row.get('description'),
      phone: row.get('phone'),
      rights: row.get('rights'),
      facebookLink: row.get('facebook_link'),
      instagramLink: row.get('instagram_link'),
			email: row.get('email'),
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
