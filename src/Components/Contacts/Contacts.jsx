"use client";
import React, { useState, useEffect } from 'react';
import { FaTelegram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useApp } from '@/app/LanguageContext';

const ContactSection = () => {
    const { til } = useApp();
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            let file;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/Contacts.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/Contacts.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/Contacts.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/Contacts.json');
                    break;
                default:
                    file = await import('../../../locales/uz/Contacts.json');
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

    const iconMap = {
        telegram: <FaTelegram className="text-white p-2 bg-red-700 rounded-[8px] text-2xl mr-3 text-[30px]" />,
        phone: <FaPhoneAlt className="text-white p-2 bg-red-700 rounded-[8px] text-2xl mr-3 text-[30px]" />,
        email: <MdEmail className="text-white p-2 bg-red-700 rounded-[8px] text-2xl mr-3 text-[30px]" />,
        location: <FaLocationDot className="text-white p-2 bg-red-700 rounded-[8px] text-2xl mr-3 text-[30px]" />,
    };

    return (
        <div className="bg-gray-100 py-10 px-4 flex justify-center items-center">
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
                <div data-aos="fade-right" className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.BigTitle}</h2>
                    <div className="space-y-4">
                        <div className="flex items-center p-2 bg-gray-100 rounded-2xl hover:bg-white hover:mt-2 hover:shadow-2xl">
                            {iconMap[data.div1.icon]}
                            <div>
                                <a href="https://t.me/it_time">
                                    <p className="text-gray-700 font-semibold">{data.div1.title}</p>
                                    <p className="text-gray-600">{data.div1.text}</p>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center p-2 bg-gray-100 rounded-2xl hover:bg-white hover:mt-2 hover:shadow-2xl">
                            {iconMap[data.div2.icon]}
                            <div>
                                <a href="tel:+998947820092">
                                    <p className="text-gray-700 font-semibold">{data.div2.title}</p>
                                    <p className="text-gray-600">{data.div2.text}</p>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center p-2 bg-gray-100 rounded-2xl hover:bg-white hover:mt-2 hover:shadow-2xl">
                            {iconMap[data.div3.icon]}
                            <div>
                                <a href="ittimeacademy@gmail.com">
                                    <p className="text-gray-700 font-semibold">{data.div3.title}</p>
                                    <p className="text-gray-600">{data.div3.text}</p>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center p-2 bg-gray-100 rounded-2xl hover:bg-white hover:mt-2 hover:shadow-2xl">
                            {iconMap[data.div4.icon]}
                            <div>
                                <a href="https://www.google.com/maps/place/41°20'20.4%22N+69°17'07.2%22E/@41.338997,69.28534,16z/data=!4m4!3m3!8m2!3d41.338997!4d69.28534?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D">
                                    <p className="text-gray-700 font-semibold">{data.div4.title}</p>
                                    <p className="text-gray-600">{data.div4.text}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-left" className="w-full md:w-2/3 h-96 rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5991.228851155584!2d69.28534!3d41.338997!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDIwJzIwLjQiTiA2OcKwMTcnMDcuMiJF!5e0!3m2!1sru!2s!4v1733551675958!5m2!1sru!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;