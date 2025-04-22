"use client";
import React, { useState } from 'react';

const ConsultModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const token = '7147216021:AAGMuN5Lt37qcPAY62u6eccBjVcDKwMK0nE';
    const chatId = '7317699848';

    const handleSubmit = async () => {
        if (!name || !course || !phone) {
            setError('Iltimos, barcha maydonlarni to‘ldiring!');
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
                }, 2000); // Modal 2 soniyadan so‘ng yopiladi
            } else {
                throw new Error('Ma\'lumot yuborishda xatolik yuz berdi');
            }
        } catch (err) {
            setError(err.message || 'Nimadir xato ketdi');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

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
                <h2 className="text-xl font-bold mb-2">Konsultatsiya uchun ro‘yxatdan o‘tish</h2>
                <p className="text-sm text-gray-600 mb-4">Ma'lumotlaringizni kiriting, tez orada siz bilan bog‘lanamiz.</p>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Ismingiz"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                    />
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                    >
                        <option value="">Kursni tanlang</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Dizayn">Dizayn</option>
                    </select>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">+998</span>
                        <input
                            type="text"
                            placeholder="Telefon raqamingiz"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">Ma'lumotlar muvaffaqiyatli yuborildi!</p>}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 ${loading ? 'bg-gray-400' : 'bg-red-600'} text-white rounded-lg font-semibold`}
                    >
                        {loading ? 'Yuborilmoqda...' : 'Yuborish'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultModal;