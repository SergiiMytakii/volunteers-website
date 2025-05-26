import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { SHEET_ID } from '@/app/constants';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByTitle['superHero-cards'];
    const rows = await sheet.getRows();
    
    const targetRow = rows.find(row => row.get('id') === formData.cardNumber);
    
    if (targetRow) {
      const currentDateTime = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });
      
      targetRow.set('отправлен донат', currentDateTime);
      targetRow.set('имя', formData.name);
      targetRow.set('оставлен комментарий', formData.comments || '');
      await targetRow.save();
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Row not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to submit donation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
