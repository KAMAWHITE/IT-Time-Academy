"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/app/LanguageContext';

const PartnersSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            let file;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/Partners.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/Partners.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/Partners.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/Partners.json');
                    break;
                default:
                    file = await import('../../../locales/uz/Partners.json');
            }
            setData(file.default);
        };

        loadData();
    }, [til]);

    const partners = [
        { src: "/partner-1.png", alt: "1" },
        { src: "/partner-2.png", alt: "2" },
        { src: "/partner-3.png", alt: "3" },
        { src: "/partner-4.svg", alt: "4" },
        { src: "/partner-5.png", alt: "5" },
        { src: "/partner-6.svg", alt: "6" },
        { src: "/partner-7.png", alt: "7" },
        { src: "/partner-8.png", alt: "8" },
        { src: "/partner-1.png", alt: "1" },
        { src: "/partner-2.png", alt: "2" },
        { src: "/partner-3.png", alt: "3" },
        { src: "/partner-4.svg", alt: "4" },
        { src: "/partner-5.png", alt: "5" },
        { src: "/partner-6.svg", alt: "6" },
        { src: "/partner-7.png", alt: "7" },
        { src: "/partner-8.png", alt: "8" },
    ];

    if (!data) return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">Yuklanmoqda...</p>
            </div>
        </div>
    );

    return (
        <div className="bg-white py-10">
            <div data-aos="fade-right">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    {data.title}
                </h1>
            </div>
            <div className="overflow-hidden">
                <div className="flex animate-scroll text-center items-center gap-10">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex-shrink-0 mx-4">
                            <Image
                                src={partner.src}
                                alt={partner.alt}
                                width={100}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnersSection;