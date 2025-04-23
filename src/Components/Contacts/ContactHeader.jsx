"use client";
import React, { useState, useEffect } from 'react';
import { useApp } from '@/app/LanguageContext';

const ContactSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN || '7147216021:AAGMuN5Lt37qcPAY62u6eccBjVcDKwMK0nE';
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7317699848';

    useEffect(() => {
        const loadData = async () => {
            let file;
            let Mod;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/ContactHeader.json');
                    Mod = await import('../../../locales/uz/Modal.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/ContactHeader.json');
                    Mod = await import('../../../locales/ru/Modal.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/ContactHeader.json');
                    Mod = await import('../../../locales/en/Modal.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/ContactHeader.json');
                    Mod = await import('../../../locales/uzk/Modal.json');
                    break;
                default:
                    file = await import('../../../locales/uz/ContactHeader.json');
                    Mod = await import('../../../locales/uz/Modal.json');
            }
            setData(file.default);
            setModal(Mod.default);
        };

        loadData();
    }, [til]);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPhone(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            setError(modal?.error || 'Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        if (!/^\d{9}$/.test(phone)) {
            setError(modal?.invalidPhone || 'Telefon raqami 9 raqamdan iborat bo‘lishi kerak!');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const message = `Yangi aloqa arizasi:\nIsm: ${name}\nTelefon: ${phone}`;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${token}/sendMessage`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    }),
                }
            );

            const result = await response.json();
            if (result.ok) {
                setSuccess(true);
                setName('');
                setPhone('');
                setTimeout(() => setSuccess(false), 2000);
            } else {
                throw new Error(modal?.error || 'Ma\'lumot yuborishda xatolik yuz berdi');
            }
        } catch (err) {
            setError(err.message || modal?.error || 'Nimadir xato ketdi');
        } finally {
            setLoading(false);
        }
    };

    if (!data || !modal) return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">{modal?.loading || 'Yuklanmoqda...'}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 py-10 px-4 flex justify-center items-center">
            <div className="max-w-md w-full">
                <h2 className="text-3xl font-bold text-red-700 mb-4 text-center">
                    {data.BigTitle}
                </h2>
                <p className="text-black font-semibold mb-6 text-center">
                    {data.Bigtext}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">{data.fullname}</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={data.fullnamePlaceholder}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">{data.phone}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value="+998"
                                readOnly
                                className="w-1/4 px-4 py-2 border border-gray-500 rounded-lg bg-gray-100 focus:outline-none"
                            />
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder={data.phonePlaceholder}
                                pattern="[0-9]*"
                                maxLength="9"
                                className="w-3/4 px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{modal.muvaffaqiyatli}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? modal.sending : data.BtnText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactSection;