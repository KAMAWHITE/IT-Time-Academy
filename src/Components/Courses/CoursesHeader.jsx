"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/LanguageContext';
import AOS from 'aos'; // AOS import qilindi
import 'aos/dist/aos.css'; // AOS CSS import qilindi
import { FaStopwatch } from "react-icons/fa6";

const CoursesSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const router = useRouter();

    // AOS ni ishga tushirish
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animatsiya davomiyligi
            once: true, // Animatsiya faqat bir marta ishlaydi
        });
    }, []);

    useEffect(() => {
        const loadData = async () => {
            let file;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/CoursesHeader.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/CoursesHeader.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/CoursesHeader.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/CoursesHeader.json');
                    break;
                default:
                    file = await import('../../../locales/uz/CoursesHeader.json');
            }
            setData(file.default);
        };

        loadData();
    }, [til]);

    if (!data) return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">Yuklanmoqda...</p>
            </div>
        </div>
    );

    const courses = [
        {
            key: "Frontend",
            image: "/courses-1.png",
        },
        {
            key: "Backend",
            image: "/courses-2.png",
        },
        {
            key: "Dizayn",
            image: "/courses-3.png",
        },
    ];

    const timeIconMap = {
        time: <FaStopwatch className='text-[25px] text-red-500' />,
    };

    const handleNavigation = (courseKey) => {
        router.push(`/${courseKey.toLowerCase()}`);
    };

    return (
        <div className="bg-gray-100 py-10 px-4 flex justify-center items-center">
            <div data-aos="fade-up" className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courses.map((course, index) => {
                    const courseData = data[course.key];
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden relative hover:scale-105"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={course.image}
                                    alt={courseData.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg"
                                />
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                    {courseData.bookmark}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-[25px] font-bold text-gray-800 mb-2">{courseData.title}</h3>
                                <p className="text-gray-500 mb-4 text-[15px]">{courseData.text}</p>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <span className="mr-1">
                                        {timeIconMap[courseData.time.icon]}
                                    </span>
                                    <span className='mr-4'>
                                        {courseData.time.text}
                                    </span>
                                    <span className='font-bold'>{courseData.price}</span>
                                </div>
                                <button
                                    onClick={() => handleNavigation(course.key)}
                                    className="w-full bg-transparent border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                                >
                                    {courseData.BtnText}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoursesSection;