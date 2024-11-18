import {  ADMIN_EMAIL, SENDER_EMAIL, ZOHO_SMTP_HOST, ZOHO_SMTP_PORT } from '@/app/constants';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, cardNumber, comments } = await req.json();

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
      to: ADMIN_EMAIL,
      subject: "Новий донат на подарунок",
      text: `Імʼя: ${name}\nНомер картки дитини: ${cardNumber}\Коментар: ${comments}`,
      html: `
      <p><strong>Імʼя:</strong> ${name}</p>
      <p><strong>Номер картки дитини:</strong> ${cardNumber}</p>
      <p><strong>Коментар:</strong> ${comments}</p>
    `,
    });

    return NextResponse.json({ message: 'Вашу заявку відправлено!  Ми звʼяжемося з вами найближчим часом' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Щось пішло не так... Спробуйте ще раз, будь ласка! ' }, { status: 500 });
  }
}
