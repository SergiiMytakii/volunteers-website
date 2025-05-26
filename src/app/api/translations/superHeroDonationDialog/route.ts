import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'uk';

  const translations = {
    uk: {
      title: 'На табір для {kidName}',
      nameLabel: 'Ваше ім\'я:',
      namePlaceholder: 'Введіть ваше ім\'я',
      commentLabel: 'Коментар:',
      commentPlaceholder: 'Ваш коментар.'
    },
    en: {
     
      title: 'For a camp for {kidNameEn}',
      nameLabel: 'Your name',
      namePlaceholder: 'Enter your name',
      commentLabel: 'Comment',
      commentPlaceholder: 'Your comment.'
    }
  };

  return NextResponse.json(translations[lang as keyof typeof translations]);
}