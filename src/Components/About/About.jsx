"use client";
import React, { useEffect } from 'react';
import AOS from 'aos'; // AOS import qilindi
import 'aos/dist/aos.css'; // AOS CSS import qilindi
import WalletIcon from './WalletIcon';
import AboutUz from '../../../locales/uz/About.json';
import AboutRu from '../../../locales/ru/About.json';
import AboutEn from '../../../locales/en/About.json';
import AboutUzk from '../../../locales/uzk/About.json';
import { useApp } from '@/app/LanguageContext';

const SolutionCard = ({ title, text }) => (
  <div className="relative bg-white shadow-2xl rounded-2xl p-8 md:p-12 mx-auto max-w-6xl flex items-center space-x-6 mt-16 hover:scale-110 hover:duration-300">
    <div className="absolute -top-0 -left-0 w-40 h-40 rounded-full border-2 border-[#E74C3C] opacity-20"></div>
    <div className="absolute top-5 left-5 w-24 h-24 rounded-full border-2 border-[#3498DB] opacity-20"></div>
    <div className="absolute -top-0 -right-5 w-48 h-48 rounded-full border-2 border-[#E74C3C] opacity-20"></div>
    <div className="absolute top-5 right-5 w-32 h-32 rounded-full border-2 border-[#3498DB] opacity-20"></div>
    <div className="flex-shrink-0">
      <WalletIcon />
    </div>
    <div className="flex-1">
      <h1 className="text-[20px] md:text-4xl font-extrabold text-gray-900 pt-4">
        {title}
        <span className="block w-16 h-1 bg-[#E74C3C] mt-2"></span>
      </h1>
      <p className="mt-4 text-gray-700 text-[15px] md:text-lg leading-relaxed pb-4">
        {text}
      </p>
    </div>
  </div>
);

const SolutionSection = () => {
  const { til } = useApp();

  // AOS ni ishga tushirish
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animatsiya davomiyligi
      once: true, // Animatsiya faqat bir marta ishlaydi
    });
  }, []);

  const content = {
    uz: AboutUz,
    ru: AboutRu,
    en: AboutEn,
    uzk: AboutUzk,
  }[til] || AboutUz;

  return (
    <div className="mx-auto w-full bg-[#fdfafa] px-5 md:px-5 lg:px-5 pb-10">
      <div data-aos="fade-right" className="w-full text-center">
        <h1 className="text-[30px] md:text-[40px] lg:text-[40px] text-gray-900 font-bold pb-5 pt-16">
          {content.BigTitle}
        </h1>
      </div>
      {content.Cards.map((section, index) => (
        <div key={index} data-aos="zoom-in">
          <SolutionCard
            title={section.title}
            text={section.text}
          />
        </div>
      ))}
    </div>
  );
};

export default SolutionSection;