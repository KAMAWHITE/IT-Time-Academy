"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaReact, FaNode, FaGitAlt, FaPython, FaHtml5, FaCss3Alt } from "react-icons/fa";
import HeroUz from '../../../locales/uz/Hero.json';
import HeroRu from '../../../locales/ru/Hero.json';
import HeroEn from '../../../locales/en/Hero.json';
import HeroUzk from '../../../locales/uzk/Hero.json';
import OptionsUz from '../../../locales/uz/ConsultationHeader.json';
import OptionsRu from '../../../locales/ru/ConsultationHeader.json';
import OptionsEn from '../../../locales/en/ConsultationHeader.json';
import OptionsUzk from '../../../locales/uzk/ConsultationHeader.json';
import ModalUz from '../../../locales/uz/Modal.json';
import ModalRu from '../../../locales/ru/Modal.json';
import ModalEn from '../../../locales/en/Modal.json';
import ModalUzk from '../../../locales/uzk/Modal.json';
import { useApp } from "@/app/LanguageContext";

export default function Hero() {
  const { til } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN || '7147216021:AAGMuN5Lt37qcPAY62u6eccBjVcDKwMK0nE';
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7317699848';

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const content = {
    uz: HeroUz,
    ru: HeroRu,
    en: HeroEn,
    uzk: HeroUzk,
  }[til] || HeroUz;

  const optionsContent = {
    uz: OptionsUz,
    ru: OptionsRu,
    en: OptionsEn,
    uzk: OptionsUzk,
  }[til] || OptionsUz;

  const modals = {
    uz: ModalUz,
    ru: ModalRu,
    en: ModalEn,
    uzk: ModalUzk,
  }[til] || ModalUz;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setCourse('');
    setPhone('');
    setError(null);
    setSuccess(false);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = async () => {
    if (!name || !course || !phone) {
      setError(modals?.error || 'Iltimos, barcha maydonlarni to‘ldiring!');
      return;
    }

    if (!/^\d{9}$/.test(phone)) {
      setError(modals?.invalidPhone || 'Telefon raqami 9 raqamdan iborat bo‘lishi kerak!');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const message = `Yangi arizacha:\nIsm: ${name}\nKurs: ${course}\nTelefon: ${phone}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );

      const result = await response.json();
      if (result.ok) {
        setSuccess(true);
        setName('');
        setCourse('');
        setPhone('');
        setTimeout(() => {
          closeModal();
          setSuccess(false);
        }, 2000);
      } else {
        throw new Error(modals?.error || 'Ma\'lumot yuborishda xatolik yuz berdi');
      }
    } catch (err) {
      setError(err.message || modals?.error || 'Nimadir xato ketdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`w-full grid grid-cols-1 lg:grid-cols-2 pt-2 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className='p-10 space-y-5 pt-20'>
          <div data-aos="fade-up" data-aos-duration="1000">
            <h1 className='text-red-600 leading-14 text-[50px] font-extrabold'>
              {content.title}
            </h1>
          </div>
          <div data-aos="fade-left" data-aos-duration="1000">
            <p className='text-[18px] font-semibold leading-7'>
              {content.text}
            </p>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000">
            <button
              onClick={openModal}
              className='px-8 py-5 bg-red-600 rounded-[15px] text-white text-[16px] font-semibold'
            >
              {content.BtnText}
            </button>
          </div>
        </div>
        <div data-aos="fade-right" data-aos-duration="1000" className='flex justify-center items-center'>
          <Image src="/logo_name.jpg" width={350} height={400} alt="logo" />
        </div>
      </div>
      <div data-aos="fade-up" data-aos-duration="1000" className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5 mx-auto px-16 pb-10 ${isModalOpen ? 'blur-sm' : ''}`}>
        {content.tools.map((tool, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#801c1c] bg-gradient-to-r from-[#801c1c] via-[#570d0d] to-[#1f0000] rounded-lg pt-5 relative text-white text-center"
          >
            {tool.icon === "react" && <FaReact className="text-4xl text-white" />}
            {tool.icon === "node" && <FaNode className="text-4xl text-white" />}
            {tool.icon === "git" && <FaGitAlt className="text-4xl text-white" />}
            {tool.icon === "python" && <FaPython className="text-4xl text-white" />}
            {tool.icon === "html" && <FaHtml5 className="text-4xl text-white" />}
            {tool.icon === "css" && <FaCss3Alt className="text-4xl text-white" />}
            <div className="bg-[#a62d2d] bg-gradient-to-r from-[#a62d2d] via-[#631212] to-[#3b0404] w-full rounded-lg mt-2">
              <p className="text-lg font-bold p-2">{tool.text}</p>
            </div>
            <div className="absolute top-2 left-2 w-5 h-5 bg-[#e74c3c] rotate-45"></div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#e74c3c] rotate-45"></div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{optionsContent.modalTitle}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {optionsContent.modalDescription}
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={optionsContent.fields.nameLabel}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
              />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
              >
                <option value="">{optionsContent.fields.courseLabel}</option>
                {optionsContent.courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{optionsContent.fields.phonePlaceholder}</span>
                <input
                  type="tel"
                  placeholder={optionsContent.fields.phoneLabel || "Telefon raqamingiz"}
                  value={phone}
                  onChange={handlePhoneChange}
                  pattern="[0-9]*"
                  maxLength="9"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-red-600"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{modals.muvaffaqiyatli}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 ${loading ? 'bg-gray-400' : 'bg-red-600'} text-white rounded-lg font-semibold`}
              >
                {loading ? modals.sending : optionsContent.button}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}