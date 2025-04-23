"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCode, FaUserGraduate, FaUsers, FaGlobe, FaBook, FaCalendarAlt, FaRocket, FaStar } from 'react-icons/fa';
import { useApp } from '@/app/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutAndAchievementsSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const [modal, setModal] = useState('');

    // AOS ni ishga tushirish
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
                    file = await import('../../../locales/uz/AboutHeader.json');
                    Mod = await import('../../../locales/uz/Modal.json')
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/AboutHeader.json');
                    Mod = await import('../../../locales/ru/Modal.json')
                    break;
                case 'en':
                    file = await import('../../../locales/en/AboutHeader.json');
                    Mod = await import('../../../locales/en/Modal.json')
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/AboutHeader.json');
                    Mod = await import('../../../locales/uzk/Modal.json')
                    break;
                default:
                    file = await import('../../../locales/uz/AboutHeader.json');
                    Mod = await import('../../../locales/uz/Modal.json')
            }
            setData(file.default);
            setModal(Mod.default);
        };

        loadData();
    }, [til]);

    useEffect(() => {
        const statsValues = ["500+", "10+", "10+", "80%"];
        const duration = 3000;
        const intervalTime = 50;
        const steps = duration / intervalTime;

        const targetValues = statsValues.map(value => parseInt(value.replace(/\D/g, '')));

        const intervals = targetValues.map((target, index) => {
            const increment = target / steps;
            let currentCount = 0;

            const interval = setInterval(() => {
                currentCount += increment;
                if (currentCount >= target) {
                    currentCount = target;
                    clearInterval(interval);
                }
                setCounts(prevCounts => {
                    const newCounts = [...prevCounts];
                    newCounts[index] = Math.floor(currentCount);
                    return newCounts;
                });
            }, intervalTime);

            return interval;
        });

        return () => intervals.forEach(interval => clearInterval(interval));
    }, []);

    if (!data) return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">{modal.loading}</p>
            </div>
        </div>
    );

    const iconMap = {
        noutbook: <FaCode className="text-red-500 text-3xl" />,
        teacher: <FaUserGraduate className="text-red-500 text-3xl" />,
        friends: <FaUsers className="text-red-500 text-5xl" />,
        globus: <FaGlobe className="text-red-500 text-5xl" />,
        books: <FaBook className="text-red-500 text-5xl" />,
        calendar: <FaCalendarAlt className="text-red-700 text-xl mr-2" />,
        people: <FaUsers className="text-red-500 text-5xl" />,
        quality: <FaStar className="text-red-500 text-5xl" />,
        raketa: <FaRocket className="text-red-500 text-5xl" />,
    };

    const statsValues = ["500+", "10+", "10+", "80%"];
    const statsLabels = [data.Stats.text1, data.Stats.text2, data.Stats.text3, data.Stats.text4];

    return (
        <div className="bg-gray-100 py-10 px-4 flex justify-center items-center">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-16">
                    <div className="inline-flex bg-red-100 text-red-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 items-center justify-center">
                        {iconMap[data.data.icon]}
                        {data.data.text}
                    </div>
                    <div data-aos="fade-up">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {data.BigTitle}
                        </h1>
                        <h2 className="text-xl md:text-[20px] text-gray-600 mb-6">
                            {data.BigText}
                        </h2>
                        <p className="text-gray-600 mb-10 max-w-3xl mx-auto text-[18px]">
                            {data.text}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.Cards.map((card, index) => (
                            <div
                                data-aos="fade-right"
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                            >
                                <div className="mb-4">{iconMap[card.icon]}</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                                <p className="text-gray-600">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 bg-white rounded-lg shadow-md py-14 px-10">
                    {statsValues.map((value, index) => (
                        <div data-aos="fade-left" key={index} className="bg-white rounded-lg border border-white hover:border-red-500 p-6 text-center">
                            <h3 className="text-3xl font-bold text-red-500 mb-2">
                                {counts[index]}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
                            </h3>
                            <p className="text-gray-600">{statsLabels[index]}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        {data.AcademyTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.Academy.map((academy, index) => (
                            <div
                                key={index}
                                data-aos="fade-right"
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                            >
                                <div className="relative w-16 h-16 mb-4 ml-4">
                                    {iconMap[academy.icon]}
                                </div>
                                <p className="text-black font-semibold text-lg">{academy.title}</p>
                                <p className="text-gray-500 text-sm mt-2">{academy.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        {data.ValuesTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.Values.map((value, index) => (
                            <div
                                key={index}
                                data-aos="fade-left"
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                            >
                                <div className="mb-4">{iconMap[value.icon]}</div>
                                <h3 className="text-lg font-semibold text-black mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutAndAchievementsSection;