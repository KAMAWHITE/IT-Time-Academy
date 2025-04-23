"use client";
import React, { useState, useEffect } from 'react';
import { useApp } from '@/app/LanguageContext';

const ConsultModal = ({ isOpen, onClose }) => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN || '7147216021:AAGMuN5Lt37qcPAY62u6eccBjVcDKwMK0nE';
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7317699848';

    useEffect(() => {
        const loadData = async () => {
            let file;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/ConsultModal.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/ConsultModal.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/ConsultModal.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/ConsultModal.json');
                    break;
                default:
                    file = await import('../../../locales/uz/ConsultModal.json');
            }
            setData(file.default);
        };
        loadData();
    }, [til]);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPhone(value);
        }
    };

    const handleSubmit = async () => {
        if (!name || !course || !phone) {
            setError(data?.error || 'Iltimos, barcha maydonlarni to‘ldiring!');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const message = `Yangi arizacha:\nIsm: ${name}\nKurs: ${course}\nTelefon: ${phone}`;

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
                setCourse('');
                setPhone('');
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                }, 2000);
            } else {
                throw new Error(data?.error || 'Ma\'lumot yuborishda xatolik yuz berdi');
            }
        } catch (err) {
            setError(err.message || data?.error || 'Nimadir xato ketdi');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-2">{data.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{data.description}</p>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder={data.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                    />
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                    >
                        <option value="">{data.coursePlaceholder}</option>
                        <option value="Frontend">{data.courses.frontend}</option>
                        <option value="Backend">{data.courses.backend}</option>
                        <option value="Dizayn">{data.courses.design}</option>
                    </select>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">+998</span>
                        <input
                            type="tel"
                            placeholder={data.phonePlaceholder}
                            value={phone}
                            onChange={handlePhoneChange}
                            pattern="[0-9]*"
                            maxLength="9"
                            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{data.success}</p>}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 ${loading ? 'bg-gray-400' : 'bg-red-600'} text-white rounded-lg font-semibold`}
                    >
                        {loading ? data.loadingButton : data.submitButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultModal;