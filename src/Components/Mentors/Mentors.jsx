"use client";
import React, { useState, useEffect } from 'react';
import { useApp } from '../../app/LanguageContext';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const MentorCards = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [modal, setModal] = useState('')

    useEffect(() => {
        const loadData = async () => {
            let file;
            let Mod
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/Mentors.json');
                    Mod = await import('../../../locales/uz/Modal.json')
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/Mentors.json');
                    Mod = await import('../../../locales/ru/Modal.json')
                    break;
                case 'en':
                    file = await import('../../../locales/en/Mentors.json');
                    Mod = await import('../../../locales/en/Modal.json')
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/Mentors.json');
                    Mod = await import('../../../locales/uzk/Modal.json')
                    break;
                default:
                    file = await import('../../../locales/uz/Mentors.json');
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
            <div data-aos="flip-left">
                <h1 className="text-4xl font-bold text-red-600 mb-4">{data.BigTitle}</h1>
                <p className="text-lg text-gray-600 mb-8 text-center">
                    {data.BigText}
                </p>
            </div>
            <div className="w-full max-w-5xl px-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className='h-[400px] w-[100%]'
                >
                    {data.Mentors.map((mentor, index) => (
                        <SwiperSlide key={index}>
                            <div data-aos="zoom-in-up" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center border border-white h-[370px] hover:border hover:border-red-500">
                                <div className="w-24 h-24 rounded-full border-4 border-red-500 mb-4 overflow-hidden">
                                    <Image
                                        src={mentor.img}
                                        alt={mentor.fullname}
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{mentor.fullname}</h2>
                                <p className="text-sm text-red-600 font-semibold mt-2">{mentor.work}</p>
                                <p className="text-sm text-gray-600 text-center mt-2">{mentor.about}</p>
                                <p className="text-sm text-gray-900 text-center mt-4">{mentor.tools}</p>
                                <div className="flex space-x-3 mt-4">
                                    <a href={`${mentor.links.link1}`} className="text-gray-500 hover:text-gray-700">
                                        <FaLinkedin className='text-[20px]' />
                                    </a>
                                    <a href={`${mentor.links.link2}`} className="text-gray-500 hover:text-gray-700">
                                        <FaTelegram className='text-[20px]' />
                                    </a>
                                    <a href={`${mentor.links.link3}`} className="text-gray-500 hover:text-gray-700">
                                        <FaGithub className='text-[20px]' />
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MentorCards;