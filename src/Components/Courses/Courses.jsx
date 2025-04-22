"use client";
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CoursesUz from '../../../locales/uz/Courses.json';
import CoursesRu from '../../../locales/ru/Courses.json';
import CoursesEn from '../../../locales/en/Courses.json';
import CoursesUzk from '../../../locales/uzk/Courses.json';
import { useApp } from '@/app/LanguageContext';
import { FaReact } from "react-icons/fa";
import { FaVuejs } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaHtml5 } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { TbFileTypeSql } from "react-icons/tb";
import { GiCyberEye } from "react-icons/gi";
import { SiHackclub } from "react-icons/si";
import { MdOutlineSecurity } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { FaTools } from "react-icons/fa";

const icons = {
    react: <FaReact className='text-[40px] text-blue-700' />,
    vue: <FaVuejs className='text-[40px] text-green-700' />,
    angular: <FaAngular className='text-[40px] text-red-700' />,
    javascript: <IoLogoJavascript className='text-[40px] text-yellow-500' />,
    htmlcss: <FaHtml5 className='text-[40px] text-red-500' />,
    python: <FaPython className='text-[40px] text-white bg-[linear-gradient(89deg,rgba(116,116,181,1)_51%,rgba(99,18,18,1)_49%,rgba(166,168,30,1)_50%)]'/>,
    nodejs: <FaNode className='text-[40px] text-green-500' />,
    express: <svg className="w-10 h-10" viewBox="0 0 24 24"><rect width="24" height="24" fill="black" /><text x="12" y="16" fontSize="8" fill="white" textAnchor="middle">Express</text></svg>,
    mongodb: <SiMongodb className='text-[40px] text-green-800' />,
    sql: <TbFileTypeSql className='text-[40px] text-violet-950' />,
    php: <svg className="w-10 h-10" viewBox="0 0 24 24"><rect width="24" height="24" fill="#787CB5" /><text x="12" y="16" fontSize="8" fill="white" textAnchor="middle">PHP</text></svg>,
    cybersecurity: <GiCyberEye className='text-[40px] text-blue-700' />,
    ethicalhacking: <SiHackclub className='text-[40px] text-red-800' />,
    networksecurity: <MdOutlineSecurity className='text-[40px] text-gray-800' />,
    pentesting: <PiExam className='text-[40px] text-green-800' />,
    securitytools: <FaTools className='text-[40px] text-teal-800' />,
};

const CoursesSection = () => {
    const { til } = useApp();
    const [openIndex, setOpenIndex] = useState(null);

    const coursesData = {
        uz: CoursesUz,
        ru: CoursesRu,
        en: CoursesEn,
        uzk: CoursesUzk,
    }[til] || CoursesUz;

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-6xl px-5 mx-auto py-10">
            <h1 className="text-4xl text-gray-900 font-bold text-center mb-8">{coursesData.title}</h1>
            <div className="space-y-4">
                {coursesData.categories.map((category, index) => (
                    <div key={index} data-aos="fade-right" data-aos-duration="1000" className="rounded-lg">
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex justify-between items-center p-4 bg-red-600 text-white rounded-lg duration-300 focus:outline-none hover:bg-red-700 hover:scale-105"
                        >
                            <span className="text-lg font-semibold">{category.name}</span>
                            <FaPlus
                                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {category.items.map((item, itemIndex) => (
                                    <div
                                        data-aos="zoom-in"
                                        data-aos-duration="1000"
                                        key={itemIndex}
                                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:scale-110 duration-300"
                                    >
                                        <div className="mb-4">{icons[item.icon]}</div>
                                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesSection;