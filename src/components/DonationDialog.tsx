'use client';

import { useLanguage } from '@/app/LanguageContext';
import { useState } from 'react';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: DonationFormData) => void;
  cardNumber: string;
  kidName: string;
  kidNameEn: string;
}

export interface DonationFormData {
  name: string;
  phone: string;
  cardNumber: string;
  amount: string;
  kidName: string;

  comments: string;
}

export default function DonationDialog({ isOpen, onClose, onConfirm, cardNumber, kidName, kidNameEn }: DonationDialogProps)  {
  const [formData, setFormData] = useState<DonationFormData>({
    name: '',
    phone: '',
    cardNumber: cardNumber,
    amount: '',
    kidName: kidName,
    comments: '',
  });
  const { lang } = useLanguage();
  const handleSubmit = (e: React.FormEvent) =>  {
    e.preventDefault();
    onConfirm(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center select-none  z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full m-4">
        <h2 className="text-xl font-bold mb-4">{lang === 'uk' ? `На подарунок для ${kidName}` : `For a gift for ${kidNameEn}`} </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">{lang === 'uk' ? "Ваше ім`я:": "Your name"}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 rounded border"
              placeholder={
                lang === "uk" ? "Введіть ваше імʼя" : "Enter your name"
              }
            />
          </div>
          {/* not needed for now
          <div>
            <label className="block text-gray-700 mb-2">Телефон:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 rounded border"
                placeholder="+380 ХХХ ХХХ ХХХ"
              required
            />
          </div> */}
          {/* <div>
            <label className="block text-gray-700 mb-2">Сума:</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-3 py-2 rounded border"
               min="10"
              placeholder="Введіть суму"
              required
            />
          </div> */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{lang === 'uk' ? "Коментар:" : "Comment"}</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              className="w-full px-3 py-2 rounded border"
              rows={1}
              placeholder={lang === "uk" ? "Ваш коментар." : "Your comment."}
            ></textarea>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-full"
            >
              {lang === "uk" ? " Скасувати" : "Cancel"}
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              {lang === "uk" ? "Продовжити" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
