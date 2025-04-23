"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/app/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CourseCard = () => {
  const { til } = useApp();
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState('')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      let file;
      let Mod;
      switch (til) {
        case 'uz':
          file = await import('../../../locales/uz/CoursesHeader.json');
          Mod = await import('../../../locales/uz/Modal.json')
          break;
        case 'ru':
          file = await import('../../../locales/ru/CoursesHeader.json');
          Mod = await import('../../../locales/ru/Modal.json')
          break;
        case 'en':
          file = await import('../../../locales/en/CoursesHeader.json');
          Mod = await import('../../../locales/en/Modal.json')
          break;
        case 'uzk':
          file = await import('../../../locales/uzk/CoursesHeader.json');
          Mod = await import('../../../locales/uzk/Modal.json')
          break;
        default:
          file = await import('../../../locales/uz/CoursesHeader.json');
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
        <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">{modal.muvaffaqiyatli}</p>
      </div>
    </div>
  );

  const course = data.Backend;
  const details = data.batafsil.Backend;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`w-full mx-auto ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className='grid grid-cols-1 sm:grid-cols-2 w-4xl mx-auto gap-5 py-5'>
          <div className="relative">
            <Image
              src="/courses-2.png"
              alt="Backend Course"
              width={500}
              height={3500}
              className="rounded-lg object-cover"
            />
            <div data-aos="fade-right" className="mb-4">
              <h3 className="text-lg font-semibold pt-2 text-red-600 mb-1">{details.left.about.title}</h3>
              <p className="text-gray-600">{details.left.about.text}</p>
            </div>
            <div data-aos="fade-right" className="mb-4">
              <h3 className="text-lg font-semibold text-red-600 mb-1">{details.left.time.title}</h3>
              <p className="text-gray-600">{details.left.time.text}</p>
            </div>
            <button
              onClick={openModal}
              className="mt-2.5 w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              {details.left.BtnText}
            </button>
          </div>
          <div>
            <div data-aos="fade-left">
              <h1 className="text-3xl pl-4 font-bold mb-4">{details.right.BigTitle}</h1>
            </div>
            <div data-aos="zoom-in" className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">{details.right.price.title}</h3>
                <p className="text-red-500 text-xl font-bold">{details.right.price.price}</p>
                <p className="text-gray-600">{details.right.price.text}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">{details.right.all_price.title}</h3>
                <p className="text-red-500 text-xl font-bold">{details.right.all_price.price}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">{details.right.credit.title}</h3>
                <p className="text-red-500 text-xl font-bold">{details.right.credit.price}</p>
                <p className="text-gray-600">{details.right.credit.text}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">{details.right.all_credit.title}</h3>
                <p className="text-red-500 text-xl font-bold">{details.right.all_credit.price}</p>
                <p className="text-gray-600">{details.right.all_credit.text}</p>
              </div>
            </div>
          </div>
        </div>
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
            <h2 className="text-xl font-bold mb-2">{details.modal.BigTitle}</h2>
            <p className="text-lg font-semibold mb-4">{details.modal.text}</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <p className="text-gray-700">{details.modal.text1}</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <p className="text-gray-700">{details.modal.text2}</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <p className="text-gray-700">{details.modal.text3}</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <p className="text-gray-700">{details.modal.text4}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;