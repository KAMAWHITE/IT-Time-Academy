"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/app/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ConsultationSection = () => {
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
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    useEffect(() => {
        const loadData = async () => {
            let file;
            let Mod;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/Consultation.json');
                    Mod = await import('../../../locales/uz/Modal.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/Consultation.json');
                    Mod = await import('../../../locales/ru/Modal.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/Consultation.json');
                    Mod = await import('../../../locales/en/Modal.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/Consultation.json');
                    Mod = await import('../../../locales/uzk/Modal.json');
                    break;
                default:
                    file = await import('../../../locales/uz/Consultation.json');
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

        const message = `Yangi konsultatsiya arizasi:\nIsm: ${name}\nTelefon: ${phone}`;

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
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
                <div data-aos="fade-right" className="w-full md:w-2/3 flex flex-col items-start border py-5 px-10 rounded-2xl">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        {data.left.title}
                    </h1>
                    <div className="flex gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <Image
                                src="/consult-1.png"
                                alt="Consultation Image 1"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <Image
                                src="/consult-2.png"
                                alt="Consultation Image 2"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <Image
                                src="/consult-3.png"
                                alt="Consultation Image 3"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
                <div data-aos="fade-left" className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{data.right.title}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder={data.right.name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 border-gray-500 focus:border-white"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="+998"
                                value="+998"
                                readOnly
                                className="w-1/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 border-gray-500 focus:border-white bg-gray-100"
                            />
                            <input
                                type="tel"
                                placeholder={data.right.phone || "Telefon raqamingiz"}
                                value={phone}
                                onChange={handlePhoneChange}
                                pattern="[0-9]*"
                                maxLength="9"
                                className="w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 border-gray-500 focus:border-white"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{modal.muvaffaqiyatli}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? modal.sending : data.right.BtnText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConsultationSection;