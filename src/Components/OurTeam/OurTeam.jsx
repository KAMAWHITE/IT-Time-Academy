"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/app/LanguageContext';

const TeamSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [modal, setModal] = useState('')

    useEffect(() => {
        const loadData = async () => {
            let file;
            let Mod
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/OurTeam.json');
                    Mod = await import('../../../locales/uz/Modal.json')
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/OurTeam.json');
                    Mod = await import('../../../locales/ru/Modal.json')
                    break;
                case 'en':
                    file = await import('../../../locales/en/OurTeam.json');
                    Mod = await import('../../../locales/en/Modal.json')
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/OurTeam.json');
                    Mod = await import('../../../locales/uzk/Modal.json')
                    break;
                default:
                    file = await import('../../../locales/uz/OurTeam.json');
                    Mod = await import('../../../locales/uz/Modal.json')
            }
            setData(file.default);
            setModal(Mod.default)
        };

        loadData();
    }, [til]);

    if (!data) return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">{modal.loading}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 flex flex-col items-center py-10">
            <div data-aos="fade-right">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    {data.BigTitle.toUpperCase()}
                </h1>
            </div>
            <div data-aos="fade-up" className="flex flex-col md:flex-row gap-6 px-4 max-w-2xl">
                <div className="bg-white rounded-lg shadow-lg flex-1 overflow-hidden hover:scale-105">
                    <div className="relative h-64">
                        <Image
                            src="/frontend.jpg"
                            alt="Frontend Team"
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-blue-500 mb-2">{data.FrontEnd.title}</h2>
                        <p className="text-gray-600 font-semibold">
                            {data.FrontEnd.text}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg flex-1 overflow-hidden hover:scale-105">
                    <div className="relative h-64">
                        <Image
                            src="/backend.jpg"
                            alt="Backend Team"
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-blue-500 mb-2">{data.BackEnd.title}</h2>
                        <p className="text-gray-600 font-semibold">
                            {data.BackEnd.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;