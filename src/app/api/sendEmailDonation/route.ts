import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, amount, cardNumber, comments } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: 'info@aiassist4u.com',
        pass: 'RrnCrZ2GaSdD',
      },
    });
    // const transporter = nodemailer.createTransport({
    //   host: process.env.ZOHO_SMTP_HOST,
    //   port: parseInt(process.env.ZOHO_SMTP_PORT || '465', 10),
    //   secure: false,
    //   auth: {
    //     user: process.env.ZOHO_EMAIL,
    //     pass: process.env.ZOHO_PASSWORD,
    //   },
    // });

    await transporter.sendMail({
      from: 'info@aiassist4u.com',
      // from: process.env.ZOHO_EMAIL,
      // to: 'bukaskina1989@gmail.com', 
      to: process.env.ZOHO_EMAIL, 
      subject: "Новий донат на подарунок",
      text: `Імʼя: ${name}\n Телефон: ${phone}\nНомер картки дитини: ${cardNumber}\Коментарі: ${comments}`,
      html: `
      <p><strong>Імʼя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Номер картки дитини:</strong> ${cardNumber}</p>
      <p><strong>Сумa:</strong> ${amount}грн</p> 
      <p><strong>Коментарі:</strong> ${comments}</p>
    `,
    });

    return NextResponse.json({ message: 'Вашу заявку відправлено!  Ми звʼяжемося з вами найближчим часом' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Щось пішло не так... Спробуйте ще раз, будь ласка! ' }, { status: 500 });
  }
}
