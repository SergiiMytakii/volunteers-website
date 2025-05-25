import { NextRequest, NextResponse } from 'next/server';
import { ContactFormTranslations } from '@/components/ContactForm'; // Assuming the interface is exported

const translations: Record<string, ContactFormTranslations> = {
  en: {
    title: "Submit an application",
    nameLabel: "Your name:",
    namePlaceholder: "Enter your name",
    phoneLabel: "Phone number:",
    phonePlaceholder: "+380 XXX XXX XXX",
    emailLabel: "Email:",
    emailPlaceholder: "you@example.com",
    giftLabel: "Gift for child:",
    giftPlaceholder: "For which child do you want to send a gift",
    commentsLabel: "Comments:",
    commentsPlaceholder: "Your comments or wishes...",
    submitButton: "Submit",
    sendingButton: "Sending...",
    statusSuccess: "Your request has been sent! We will contact you soon",
    statusError: "Something went wrong... Please try again!"
  },
  uk: {
    title: "Відправити заявку",
    nameLabel: "Ваше імʼя:",
    namePlaceholder: "Введіть ваше імʼя",
    phoneLabel: "Номер телефону:",
    phonePlaceholder: "+380 ХХХ ХХХ ХХХ",
    emailLabel: "Електронна пошта:",
    emailPlaceholder: "you@example.com",
    giftLabel: "Подарунок для дитини:",
    giftPlaceholder: "Для якої дитини ви хочете надіслати подарунок",
    commentsLabel: "Коментарі:",
    commentsPlaceholder: "Ваші коментарі або побажання...",
    submitButton: "Надіслати",
    sendingButton: "Надсилаємо...",
    statusSuccess: "Вашу заявку відправлено! Ми звʼяжемося з вами найближчим часом",
    statusError: "Щось пішло не так... Спробуйте ще раз, будь ласка!"
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en'; // Default to English

  const selectedTranslations = translations[lang] || translations.en;

  return NextResponse.json(selectedTranslations);
}