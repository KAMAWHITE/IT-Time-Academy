"use client";
import React, { useState, useEffect } from "react";
import AOS from 'aos'; // AOS import qilindi
import 'aos/dist/aos.css'; // AOS CSS import qilindi
import TrophyUz from "../../../locales/uz/Trophies.json";
import TrophyRu from "../../../locales/ru/Trophies.json";
import TrophyEn from "../../../locales/en/Trophies.json";
import TrophyUzk from "../../../locales/uzk/Trophies.json";
import { useApp } from "@/app/LanguageContext";

const Achievements = () => {
    const { til } = useApp();

    // Tilga qarab mos JSON faylni tanlash
    const trophiesData = {
        uz: TrophyUz,
        ru: TrophyRu,
        en: TrophyEn,
        uzk: TrophyUzk,
    };

    const data = trophiesData[til] || trophiesData["uz"]; // Agar til topilmasa, 'uz' standart bo‘ladi

    // Har bir stat uchun raqamlar animatsiyasi uchun state
    const [counts, setCounts] = useState(data.stats.map(() => 0));

    // AOS ni ishga tushirish
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animatsiya davomiyligi
            once: true, // Animatsiya faqat bir marta ishlaydi
        });
    }, []);

    // Raqamlarni 3 soniya ichida oshirish animatsiyasi
    useEffect(() => {
        const duration = 3000; // 3 soniya
        const intervalTime = 50; // Har 50ms da yangilanadi
        const steps = duration / intervalTime; // Umumiy qadamlar soni

        const targetValues = data.stats.map(stat => parseInt(stat.value.replace(/\D/g, ''))); // Raqamlarni olish (masalan, "5+" dan 5 ni olamiz)

        const intervals = targetValues.map((target, index) => {
            const increment = target / steps; // Har bir qadamda oshiriladigan qiymat
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

        // Komponent unmount bo‘lganda intervallarni tozalash
        return () => intervals.forEach(interval => clearInterval(interval));
    }, [data.stats]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-10 bg-red-600">
            {/* Sarlavha */}
            <div data-aos="fade-down" data-aos-duration="1000">
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">{data.title}</h1>
            </div>

            {/* Statistik Kartalar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-11/12 lg:w-3/4">
                {data.stats.map((stat, index) => (
                    <div
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
                    >
                        <span className="text-2xl mb-2">{stat.icon}</span>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {counts[index]}{stat.value.includes('+') ? '+' : ''}
                        </h2>
                        <p className="text-gray-600">{stat.description}</p>
                    </div>
                ))}
            </div>

            {/* Markaziy Matn Qismi */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 lg:w-3/4 mb-10 text-center">
                <div data-aos="fade-right" data-aos-duration="1000">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {data.mainSection.title}
                    </h2>
                </div>
                <div data-aos="fade-left" data-aos-duration="1000">
                    <p className="text-gray-600">{data.mainSection.description}</p>
                </div>
            </div>

            {/* Pastki Kartalar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 lg:w-3/4">
                {data.bottomCards.map((card, index) => (
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
                    >
                        <span className="text-2xl mb-2">{card.icon}</span>
                        <p className="text-gray-600">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;