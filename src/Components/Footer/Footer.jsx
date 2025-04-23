"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import { useApp } from '@/app/LanguageContext';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaStopwatch } from "react-icons/fa6";

const FooterSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);
    const [modal, setModal] = useState('')

    useEffect(() => {
        const loadData = async () => {
            let file;
            let Mod
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/Footer.json');
                    Mod = await import('../../../locales/uz/Modal.json')
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/Footer.json');
                    Mod = await import('../../../locales/ru/Modal.json')
                    break;
                case 'en':
                    file = await import('../../../locales/en/Footer.json');
                    Mod = await import('../../../locales/en/Modal.json')
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/Footer.json');
                    Mod = await import('../../../locales/uzk/Modal.json')
                    break;
                default:
                    file = await import('../../../locales/uz/Footer.json');
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

    const iconMap = {
        facebook: <FaFacebookF size={20} />,
        instagram: <FaInstagram size={20} />,
        telegram: <FaTelegramPlane size={20} />,
        youtobe: <FaYoutube size={20} />,
    };

    const contactIconMap = {
        location: <FaLocationDot size={20} />,
        phone: <FaPhoneAlt size={20} />,
        email: <MdEmail size={20} />,
        time: <FaStopwatch size={20} />,
    };

    return (
        <footer className="bg-white py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div data-aos="right">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.It_Time_Academy.title}</h2>
                    </div>
                    <div data-aos="fade-up">
                        <p className="text-gray-600 mb-4 hover:ml-5 hover:duration-500">
                            {data.It_Time_Academy.text}
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/it_time_academy/" className="bg-white p-2 rounded-lg shadow shadow-red-600 text-blue-600 hover:bg-red-700 hover:text-white hover:duration-500">
                                {iconMap[data.It_Time_Academy.icons.icon1]}
                            </a>
                            <a href="https://www.instagram.com/it_time_academy/" className="bg-white p-2 rounded-lg shadow shadow-red-600 text-pink-500 hover:bg-red-700 hover:text-white hover:duration-500">
                                {iconMap[data.It_Time_Academy.icons.icon2]}
                            </a>
                            <a href="https://t.me/it_time" className="bg-white p-2 rounded-lg shadow shadow-red-600 text-blue-500 hover:bg-red-700 hover:text-white hover:duration-500">
                                {iconMap[data.It_Time_Academy.icons.icon3]}
                            </a>
                            <a href="https://www.youtube.com/@it-time-academy" className="bg-white p-2 rounded-lg shadow shadow-red-600 text-red-500 hover:bg-red-700 hover:text-white hover:duration-500">
                                {iconMap[data.It_Time_Academy.icons.icon4]}
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div data-aos="fade-right">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{data.Kurslar.title}</h3>
                    </div>
                    <div data-aos="fade-up">
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="/" className="hover:text-red-500 duration-500">{data.Kurslar.link1}</a></li>
                            <li><a href="/kurslar" className="hover:text-red-500 duration-500">{data.Kurslar.link2}</a></li>
                            <li><a href="/mentorlar" className="hover:text-red-500 duration-500">{data.Kurslar.link3}</a></li>
                            <li><a href="/bizhaqimizda" className="hover:text-red-500 duration-500">{data.Kurslar.link4}</a></li>
                            <li><a href="/aloqa" className="hover:text-red-500 duration-500">{data.Kurslar.link5}</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div data-aos="fade-right">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{data.Contacts.title}</h3>
                    </div>
                    <div data-aos="fade-up">
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <a className="flex items-center" href="https://www.google.com/maps/place/41°20'20.4%22N+69°17'07.2%22E/@41.338997,69.28534,16z/data=!4m4!3m3!8m2!3d41.338997!4d69.28534?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D">
                                    <span className="text-red-500 mr-2">{contactIconMap[data.Contacts.div1.icon]}</span>
                                    <p className='hover:ml-6 hover:duration-500'>{data.Contacts.div1.text}</p>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center" href="tel:+998947820092">
                                    <span className="text-red-500 mr-2">{contactIconMap[data.Contacts.div2.icon]}</span>
                                    <p className='hover:ml-6 hover:duration-500'>{data.Contacts.div2.text}</p>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center" href="ittimeacademy@gmail.com">
                                    <span className="text-red-500 mr-2">{contactIconMap[data.Contacts.div3.icon]}</span>
                                    <p className='hover:ml-6 hover:duration-500'>{data.Contacts.div3.text}</p>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center" href="#">
                                    <span className="text-red-500 mr-2">{contactIconMap[data.Contacts.div4.icon]}</span>
                                    <p className='hover:ml-6 hover:duration-500'>{data.Contacts.div4.text}</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                <p>© {data.text1}</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-red-500">{data.text2}</a>
                    <a href="#" className="hover:text-red-500">{data.text3}</a>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;