"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaPhone, FaBars, FaTimes, FaHeadset } from "react-icons/fa";
import { useApp } from '../../app/LanguageContext';
import { FaTelegram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ConsultModal from './ConsultModal';
import uz from '../../../locales/uz/Header.json';
import en from '../../../locales/en/Header.json';
import ru from '../../../locales/ru/Header.json';
import uzk from '../../../locales/uzk/Header.json';

export default function Header() {
    const { til, changeLanguage } = useApp();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLanguageChange = (newLang) => {
        changeLanguage(newLang);
        setIsDropdownOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleContactToggle = () => {
        setIsContactOpen(!isContactOpen);
    };

    useEffect(() => {
        if (isMenuOpen || isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMenuOpen, isModalOpen]);

    const translations = {
        uz: uz.header,
        en: en.header,
        ru: ru.header,
        uzk: uzk.header,
    };

    const t = translations[til] || translations.uz;

    return (
        <header className="w-full">
            <div className="bg-red-800 text-white flex justify-between items-center px-5 py-3 text-sm relative">
                <div className="relative">
                    <span
                        className="cursor-pointer pl-2"
                        onClick={handleDropdownToggle}
                    >
                        {til === 'uz' ? 'uz UZ' : til === 'en' ? 'en EN' : til === 'uzk' ? 'uz КР' : 'ru RU'} ▼
                    </span>
                    {isDropdownOpen && (
                        <ul className="absolute bg-white text-black shadow-md rounded-md mt-1 py-1 w-20 z-10">
                            <li
                                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleLanguageChange('uz')}
                            >
                                uz UZ
                            </li>
                            <li
                                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleLanguageChange('uzk')}
                            >
                                uz КР
                            </li>
                            <li
                                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleLanguageChange('en')}
                            >
                                en EN
                            </li>
                            <li
                                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleLanguageChange('ru')}
                            >
                                ru RU
                            </li>
                        </ul>
                    )}
                </div>

                <button
                    className="md:hidden text-xl text-white"
                    onClick={handleContactToggle}
                >
                    <FaHeadset />
                </button>

                <div
                    className={`${isContactOpen ? 'flex' : 'hidden'
                        } md:flex items-center space-x-5 text-[16px] flex-col md:flex-row absolute md:static top-12 left-0 w-full md:w-auto bg-red-800 md:bg-transparent p-4 md:p-0 z-20`}
                >
                    <a
                        href="tel:+998947820092"
                        className="flex items-center space-x-1 text-white hover:text-gray-200"
                    >
                        <FaPhone />
                        <span>+998 (94) 782 00 92</span>
                    </a>
                    <a
                        href="https://t.me/it_time"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-white hover:text-gray-200"
                    >
                        <FaTelegram />
                        <span>{t.telegram}</span>
                    </a>
                    <a
                        href="https://t.me/it_time_admin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white rounded-full px-3 py-1 flex items-center text-white hover:text-gray-200"
                    >
                        <span className="mr-1"><MdEmail /></span> {t.contactUs}
                    </a>
                </div>
            </div>

            <nav className="flex justify-between items-center w-full px-4 py-7 bg-white shadow-md relative">
                <div className="flex items-center">
                    <div className="mr-2">
                        <img src="/logo.png" alt="logo" width={40} height={40} />
                    </div>
                    <div className="text-red-800">
                        <span className="text-black font-extrabold text-[16px] leading-0">
                            <span>IT TIME</span><br />
                            <span className='text-red-600'>ACADEMY</span>
                        </span>
                    </div>
                </div>

                <button
                    className="md:hidden text-2xl text-gray-700"
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div
                    className={`${isMenuOpen ? 'flex' : 'hidden'
                        } md:flex flex-col md:flex-row absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-20 md:gap-0 p-5 md:p-0`}
                >
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 list-none m-0 p-0 items-center w-full">
                        <li>
                            <Link
                                href="/"
                                className="no-underline font-semibold text-[15px] lg:text-[18px] text-gray-700 hover:text-red-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t.home}
                            </Link>
                        </li>
                        <li className="text-red-400 font-semibold text-[22px] hidden md:block">/</li>
                        <li>
                            <Link
                                href="/kurslar"
                                className="no-underline font-semibold text-[15px] lg:text-[18px] text-gray-700 hover:text-red-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t.courses}
                            </Link>
                        </li>
                        <li className="text-red-400 font-semibold text-[22px] hidden md:block">/</li>
                        <li>
                            <Link
                                href="/mentorlar"
                                className="no-underline font-semibold text-[15px] lg:text-[18px] text-gray-700 hover:text-red-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t.mentors}
                            </Link>
                        </li>
                        <li className="text-red-400 font-semibold text-[22px] hidden md:block">/</li>
                        <li>
                            <Link
                                href="/bizhaqimizda"
                                className="no-underline font-semibold text-[15px] lg:text-[18px] text-gray-700 hover:text-red-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t.about}
                            </Link>
                        </li>
                        <li className="text-red-400 font-semibold text-[22px] hidden md:block">/</li>
                        <li>
                            <Link
                                href="/aloqa"
                                className="no-underline font-semibold text-[15px] lg:text-[18px] text-gray-700 hover:text-red-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t.contact}
                            </Link>
                        </li>
                    </ul>

                    <button
                        onClick={() => {
                            handleModalOpen();
                            setIsMenuOpen(false);
                        }}
                        className="bg-red-700 text-white border-none w-full md:w-[250px] px-4 py-2.5 text-[16px] rounded-md cursor-pointer text-sm hover:bg-red-900 mt-4 md:mt-0"
                    >
                        {t.consult}
                    </button>
                </div>
            </nav>

            <ConsultModal isOpen={isModalOpen} onClose={handleModalClose} />
        </header>
    );
}