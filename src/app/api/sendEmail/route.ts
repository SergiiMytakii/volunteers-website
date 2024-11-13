import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  console.log('send email') 
  console.log(process.env.ZOHO_SMTP_HOST,) 

  try {
    const { name, phone, email, cardNumber, comments } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST,
      port: parseInt(process.env.ZOHO_SMTP_PORT || '465', 10),
      secure: false,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      // to: 'bukaskina1989@gmail.com', 
      to: process.env.ZOHO_EMAIL, 
      subject: "Нова заявка на подарунок",
      text: `Імʼя: ${name}\n Телефон: ${phone}\nEmail: ${email}\nНомер картки дитини: ${cardNumber}\Коментарі: ${comments}`,
      html: `
      <p><strong>Імʼя:</strong> ${name}</p>
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
