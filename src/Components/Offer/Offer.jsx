"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/app/LanguageContext';

const PromotionSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            let file;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/Offer.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/Offer.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/Offer.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/Offer.json');
                    break;
                default:
                    file = await import('../../../locales/uz/Offer.json');
            }
            setData(file.default);
        };

        loadData();
    }, [til]);

    if (!data) return
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">Yuklanmoqda...</p>
        </div>
    </div>;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={`relative bg-gray-100 py-10 px-4 flex justify-center items-center ${isModalOpen ? 'blur-sm' : ''}`}>
                <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center">
                    <div className="relative w-full md:w-1/2">
                        <div className="relative rounded-lg overflow-hidden">
                            <Image
                                src="/saleaction.jpg"
                                alt="Promotion Image"
                                width={500}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg border-2 border-white">
                                <p className="text-lg font-bold">{data.bonus1}</p>
                                <p className="text-2xl font-bold">{data.bonus2} {data.bonus3}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0 flex flex-col items-start">
                        <p className="text-sm text-gray-500 py-1.5 px-3 rounded-2xl bg-[#ffc5c5] mb-2">{data.offer}</p>
                        <div data-aos="fade-up-right">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                {data.title.split(' ').slice(0, -1).join(' ')} <span className="text-red-500">{data.title.split(' ').slice(-1)}</span>
                            </h1>
                        </div>
                        <div data-aos="fade-up-right">
                            <p className="text-lg text-gray-600 mb-4">
                                {data.text.split('! ')[0]}! <br />
                                {data.text.split('! ')[1]}
                            </p>
                        </div>
                        <div data-aos="fade-up-right">
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✔️</span>
                                    <p className="text-gray-700">{data.div1.text}</p>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✔️</span>
                                    <p className="text-gray-700">{data.div2.text}</p>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✔️</span>
                                    <p className="text-gray-700">{data.div3.text}</p>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✔️</span>
                                    <p className="text-gray-700">{data.div4.text}</p>
                                </li>
                            </ul>
                        </div>
                        <div data-aos="fade-up">
                            <button
                                onClick={openModal}
                                className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center hover:bg-red-600 transition"
                            >
                                {data.BtnText}
                                <svg
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                            <p className="text-sm text-gray-500 mt-4">
                                {data.info}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-2">{data.modal.title}</h2>
                        <p className="text-lg font-semibold mb-4">{data.modal.text}</p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">{data.modal.action.title}</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">●</span>
                                        <p className="text-gray-700">{data.modal.action.text1}</p>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">●</span>
                                        <p className="text-gray-700">{data.modal.action.text2}</p>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">{data.bonus}</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-yellow-500 mr-2">💰</span>
                                        <p className="text-gray-700">{data.modal.bonus.div1.text}</p>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-orange-500 mr-2">🎁</span>
                                        <p className="text-gray-700">{data.modal.bonus.div2.text}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">{data.modal.info}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default PromotionSection;