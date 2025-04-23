"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa';
import { useApp } from '@/app/LanguageContext';

const MentorsSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [modal, setModal] = useState('')

    useEffect(() => {
        const loadData = async () => {
            let file;
            let Mod
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/MentorsHeader.json');
                    Mod = await import('../../../locales/uz/Modal.json')
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/MentorsHeader.json');
                    Mod = await import('../../../locales/ru/Modal.json')
                    break;
                case 'en':
                    file = await import('../../../locales/en/MentorsHeader.json');
                    Mod = await import('../../../locales/en/Modal.json')
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/MentorsHeader.json');
                    Mod = await import('../../../locales/uzk/Modal.json')
                    break;
                default:
                    file = await import('../../../locales/uz/MentorsHeader.json');
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

    const mentors = [
        { image: "/mentor1.jpg" },
        { image: "/mentor2.jpg" },
        { image: "/mentor3.jpg" },
        { image: "/mentor4.jpg" },
        { image: "/mentor5.jpg" },
    ];

    return (
        <div className="bg-gray-100 py-10 px-4 flex justify-center items-center">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                        {data.BigTitle}
                    </h2>
                    <p className="text-gray-600 text-[20px]">{data.BigText}</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {data.Mentors.map((mentor, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_4fr] items-start gap-6"
                        >
                            <div className="relative w-full h-64 sm:h-48 md:h-56 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={mentors[index].image}
                                    alt={mentor.fullname}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="flex-1 py-6 px-4 sm:px-0">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{mentor.fullname}</h3>
                                <p className="text-gray-600 font-semibold mb-2">{mentor.profession}</p>
                                <p className="text-gray-600 mb-4">{mentor.info}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {mentor.tools.tools.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-red-200 text-red-700 text-sm font-semibold px-3 py-1 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <a
                                        href={mentor.links.link1}
                                        className="text-blue-600 hover:text-blue-700 text-2xl"
                                    >
                                        <FaLinkedin />
                                    </a>
                                    <a
                                        href={mentor.links.link2}
                                        className="text-blue-400 hover:text-blue-700 text-2xl"
                                    >
                                        <FaTelegram />
                                    </a>
                                    <a
                                        href={mentor.links.link3}
                                        className="text-gray-800 hover:text-blue-700 text-2xl"
                                    >
                                        <FaGithub />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorsSection;