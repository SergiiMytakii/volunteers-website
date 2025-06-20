import { ACCOUNT_EMAIL, ADMIN_EMAIL, SENDER_EMAIL, ZOHO_SMTP_HOST, ZOHO_SMTP_PORT } from '@/app/constants';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {

  try {
    const { name, phone, email, cardNumber, comments } = await req.json();

    const transporter = nodemailer.createTransport({
      host: ZOHO_SMTP_HOST,
      port: ZOHO_SMTP_PORT,
      secure: false,
      auth: {
        user: SENDER_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });
  

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: SENDER_EMAIL, 
      cc: [ADMIN_EMAIL, ACCOUNT_EMAIL],
      subject: process.env.IS_LOCAL === 'true' ? "Нова заявка на подарунок TEST" : "Нова заявка на подарунок",
      text: `Імʼя: ${name}\n Телефон: ${phone}\nEmail: ${email}\nНомер картки дитини: ${cardNumber}\Коментарі: ${comments}`,
      html: `
      <p><strong>Імʼя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Номер картки дитини:</strong> ${cardNumber}</p>
      <p><strong>Коментарі:</strong> ${comments}</p>
    `,
    });

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: process.env.IS_LOCAL === 'true' ? SENDER_EMAIL : email, 
      subject: process.env.IS_LOCAL === 'true' ? "Підтвердження заявки на подарунок TEST" : "Підтвердження заявки на подарунок",
      text: `Привіт ${name}! 
      Ми отримали вашу заявку на подарунок та звʼяжемося с вами найближчим часом.
      Дякуємо за участь у проєкті!`,
            html: `
            <h2>Привіт ${name}!</h2>
            <p>Ми отримали вашу заявку на подарунок та звʼяжемося с вами найближчим часом.</p>
            <p>Дякуємо за участь у проєкті!</p>
            <br>
            <h3>Деталі заявки:</h3>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Номер картки дитини:</strong> ${cardNumber}</p>
            <p><strong>Коментарі:</strong> ${comments}</p>
          `,
    });

    return NextResponse.json({ message: 'Вашу заявку відправлено!  Ми звʼяжемося з вами найближчим часом' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Щось пішло не так... Спробуйте ще раз, будь ласка! ' }, { status: 500 });
  }
}
