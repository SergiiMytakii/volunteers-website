'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaPaypal } from 'react-icons/fa';
import Image from 'next/image';

interface DonationDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirmMono: (formData: DonationFormData) => void;
	onConfirmPayPal: (formData: DonationFormData) => void;
	cardNumber: string;
	kidName: string;
	kidNameEn: string;
	translations: {
		title: string;
		nameLabel: string;
		namePlaceholder: string;
		commentLabel: string;
		commentPlaceholder: string;
	};
}

export interface DonationFormData {
	name: string;
	phone: string;
	cardNumber: string;
	amount: string;
	kidName: string;
	comments: string;
}

export default function DonationDialog({
	isOpen,
	onClose,
	onConfirmMono,
	onConfirmPayPal,
	cardNumber,
	kidName,
	kidNameEn,
	translations,
}: DonationDialogProps) {
	const [formData, setFormData] = useState<DonationFormData>({
		name: '',
		phone: '',
		cardNumber: cardNumber,
		amount: '',
		kidName: kidName,
		comments: '',
	});

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center select-none z-50"
			role="dialog"
			aria-modal="true">
			<div className="bg-white rounded-lg p-6 max-w-sm w-full m-4 relative">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
					<FaTimes size={20} />
				</button>

				<h2 className="text-xl font-bold mb-4">
					{translations.title.replace('{kidName}', kidName).replace('{kidNameEn}', kidNameEn)}
				</h2>

				<form className="space-y-4">
					<div>
						<label className="block text-gray-700 mb-2">
							{translations.nameLabel}
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-3 py-2 rounded border"
							placeholder={translations.namePlaceholder}
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-2 font-medium">
							{translations.commentLabel}
						</label>
						<textarea
							name="comments"
							value={formData.comments}
							onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
							className="w-full px-3 py-2 rounded border"
							rows={1}
							placeholder={translations.commentPlaceholder}></textarea>
					</div>
					<div className="flex gap-3 mt-6" >
						{/* Mono Button */}
						<button
							type="button"
							onClick={() => onConfirmMono(formData)}
							className="relative flex-1 h-12 rounded-full ">
							<div className="relative w-full h-full rounded-full overflow-hidden">
								<Image
									src="/mono1.png"
									alt="MonoBank"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</button>
						<button
							type="button"
							onClick={() => onConfirmPayPal(formData)}
							className="flex-1 bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:bg-blue-700">
							<FaPaypal size={28} />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
