"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import FormUz from "../../../locales/uz/Form.json";
import FormRu from "../../../locales/ru/Form.json";
import FormEn from "../../../locales/en/Form.json";
import FormUzk from "../../../locales/uzk/Form.json";
import { useApp } from "@/app/LanguageContext";
import { FaGraduationCap, FaLaptop, FaStar } from "react-icons/fa6";
import OptionsUz from '../../../locales/uz/ConsultationHeader.json';
import OptionsRu from '../../../locales/ru/ConsultationHeader.json';
import OptionsEn from '../../../locales/en/ConsultationHeader.json';
import OptionsUzk from '../../../locales/uzk/ConsultationHeader.json';
import { MdWork } from "react-icons/md";
import { FaMoneyBillAlt, FaRocket } from "react-icons/fa";
import ModalUz from '../../../locales/uz/Modal.json';
import ModalRu from '../../../locales/ru/Modal.json';
import ModalEn from '../../../locales/en/Modal.json';
import ModalUzk from '../../../locales/uzk/Modal.json';

export default function Form() {
  const [activeTab, setActiveTab] = useState("kurs");
  const { til } = useApp();

  const [kursName, setKursName] = useState("");
  const [kursPhone, setKursPhone] = useState("");
  const [kursCourse, setKursCourse] = useState("");
  const [kursMessage, setKursMessage] = useState("");

  const [ishName, setIshName] = useState("");
  const [ishPhone, setIshPhone] = useState("");
  const [ishEmail, setIshEmail] = useState("");
  const [ishAbout, setIshAbout] = useState("");
  const [ishExperience, setIshExperience] = useState("");
  const [ishSkills, setIshSkills] = useState("");
  const [ishFile, setIshFile] = useState(null);

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

  const translations = {
    uz: FormUz,
    ru: FormRu,
    en: FormEn,
    uzk: FormUzk,
  }[til] || FormUz;

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

  const handlePhoneChange = (e, setter) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleKursSubmit = async () => {
    if (!kursName || !kursPhone || !kursCourse || !kursMessage) {
      setError(modals?.error || 'Iltimos, barcha maydonlarni to‘ldiring!');
      return;
    }

    if (!/^\d{9}$/.test(kursPhone)) {
      setError(modals?.invalidPhone || 'Telefon raqami 9 raqamdan iborat bo‘lishi kerak!');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const message = `Yangi kurs arizasi:\nIsm: ${kursName}\nTelefon: ${kursPhone}\nKurs: ${kursCourse}\nXabar: ${kursMessage}`;

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
        setKursName('');
        setKursPhone('');
        setKursCourse('');
        setKursMessage('');
        setTimeout(() => setSuccess(false), 2000);
      } else {
        throw new Error(modals?.error || 'Ma\'lumot yuborishda xatolik yuz berdi');
      }
    } catch (err) {
      setError(err.message || modals?.error || 'Nimadir xato ketdi');
    } finally {
      setLoading(false);
    }
  };

  const handleIshSubmit = async () => {
    if (!ishName || !ishPhone || !ishEmail || !ishAbout || !ishExperience || !ishSkills || !ishFile) {
      setError(modals?.error || 'Iltimos, barcha maydonlarni to‘ldiring va faylni tanlang!');
      return;
    }

    if (!/^\d{9}$/.test(ishPhone)) {
      setError(modals?.invalidPhone || 'Telefon raqami 9 raqamdan iborat bo‘lishi kerak!');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const message = `Yangi ish arizasi:\nIsm: ${ishName}\nTelefon: ${ishPhone}\nEmail: ${ishEmail}\nHaqida: ${ishAbout}\nTajriba: ${ishExperience}\nKo‘nikmalar: ${ishSkills}\nFayl tanlandi: Ha`;

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
        setIshName('');
        setIshPhone('');
        setIshEmail('');
        setIshAbout('');
        setIshExperience('');
        setIshSkills('');
        setIshFile(null);
        setTimeout(() => setSuccess(false), 2000);
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
    <div className="py-5 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-5xl w-full rounded-lg shadow-lg p-6">
        <div className="flex justify-between mb-6">
          <div data-aos="fade-right">
            <button
              onClick={() => setActiveTab("kurs")}
              className={`px-4 py-2 rounded-lg ${activeTab === "kurs" ? "bg-red-500 text-white" : "text-gray-500"}`}
            >
              {translations.tabs.kurs}
            </button>
          </div>
          <div data-aos="fade-left">
            <button
              onClick={() => setActiveTab("ish")}
              className={`px-4 py-2 rounded-lg ${activeTab === "ish" ? "bg-red-500 text-white" : "text-gray-500"}`}
            >
              {translations.tabs.ish}
            </button>
          </div>
        </div>
        {activeTab === "kurs" && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <div data-aos="fade-right">
                <h1 className="text-2xl font-bold mb-4">{translations.kurs.title}</h1>
              </div>
              <div data-aos="fade-right">
                <p className="text-gray-600 mb-6">{translations.kurs.description}</p>
              </div>
              <div data-aos="fade-up" className="space-y-4">
                <div className="flex items-center gap-4">
                  <FaGraduationCap className="text-[30px] text-red-700" />
                  <div>
                    <h3 className="font-semibold">{translations.kurs.features[0].title}</h3>
                    <p className="text-gray-500">{translations.kurs.features[0].description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaLaptop className="text-[30px] text-gray-700" />
                  <div>
                    <h3 className="font-semibold">{translations.kurs.features[1].title}</h3>
                    <p className="text-gray-500">{translations.kurs.features[1].description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaStar className="text-[30px] text-yellow-400" />
                  <div>
                    <h3 className="font-semibold">{translations.kurs.features[2].title}</h3>
                    <p className="text-gray-500">{translations.kurs.features[2].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div data-aos="fade-left">
                <h2 className="text-xl font-bold mb-4">{translations.kurs.formTitle}</h2>
              </div>
              <div data-aos="zoom-in" className="space-y-4">
                <input
                  type="text"
                  placeholder={optionsContent.fields.nameLabel}
                  value={kursName}
                  onChange={(e) => setKursName(e.target.value)}
                  className="w-full p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500 rounded-lg"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={optionsContent.fields.phonePlaceholder}
                    value={optionsContent.fields.phonePlaceholder}
                    readOnly
                    className="w-1/4 p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500 rounded-lg bg-gray-100"
                  />
                  <input
                    type="tel"
                    placeholder={optionsContent.fields.phoneLabel || "Telefon raqamingiz"}
                    value={kursPhone}
                    onChange={(e) => handlePhoneChange(e, setKursPhone)}
                    pattern="[0-9]*"
                    maxLength="9"
                    className="w-3/4 p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500 rounded-lg"
                  />
                </div>
                <select
                  value={kursCourse}
                  onChange={(e) => setKursCourse(e.target.value)}
                  className="w-full p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500 rounded-lg"
                >
                  <option value="">{optionsContent.fields.courseLabel}</option>
                  {optionsContent.courseOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder={translations.kurs.form.message}
                  value={kursMessage}
                  onChange={(e) => setKursMessage(e.target.value)}
                  className="w-full p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500 rounded-lg"
                />
                {error && activeTab === "kurs" && <p className="text-red-500 text-sm">{error}</p>}
                {success && activeTab === "kurs" && <p className="text-green-500 text-sm">{modals.muvaffaqiyatli}</p>}
                <button
                  onClick={handleKursSubmit}
                  disabled={loading}
                  className={`bg-red-500 text-white w-full py-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? modals.sending : optionsContent.button}
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ish" && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <div data-aos="fade-right">
                <h1 className="text-2xl font-bold mb-4">{translations.ish.title}</h1>
              </div>
              <div data-aos="fade-right">
                <p className="text-gray-600 mb-6">{translations.ish.description}</p>
              </div>
              <div data-aos="fade-up" className="space-y-4">
                <div className="flex items-center gap-4">
                  <MdWork className="text-[30px] text-amber-900" />
                  <div>
                    <h3 className="font-semibold">{translations.ish.features[0].title}</h3>
                    <p className="text-gray-500">{translations.ish.features[0].description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMoneyBillAlt className="text-[30px] text-green-800" />
                  <div>
                    <h3 className="font-semibold">{translations.ish.features[1].title}</h3>
                    <p className="text-gray-500">{translations.ish.features[1].description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaRocket className="text-[30px] text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">{translations.ish.features[2].title}</h3>
                    <p className="text-gray-500">{translations.ish.features[2].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div data-aos="fade-left">
                <h2 className="text-xl font-bold mb-4">{translations.ish.formTitle}</h2>
              </div>
              <div data-aos="zoom-in" className="space-y-4">
                <input
                  type="text"
                  placeholder={optionsContent.fields.nameLabel}
                  value={ishName}
                  onChange={(e) => setIshName(e.target.value)}
                  className="w-full p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={optionsContent.fields.phonePlaceholder}
                    value={optionsContent.fields.phonePlaceholder}
                    readOnly
                    className="w-1/4 p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500 bg-gray-100"
                  />
                  <input
                    type="tel"
                    placeholder={optionsContent.fields.phoneLabel || "Telefon raqamingiz"}
                    value={ishPhone}
                    onChange={(e) => handlePhoneChange(e, setIshPhone)}
                    pattern="[0-9]*"
                    maxLength="9"
                    className="w-3/4 p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder={translations.ish.form.email}
                  value={ishEmail}
                  onChange={(e) => setIshEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                />
                <select
                  value={ishAbout}
                  onChange={(e) => setIshAbout(e.target.value)}
                  className="w-full p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                >
                  <option value="">{translations.ish.form.about}</option>
                  {optionsContent.courseOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder={translations.ish.form.experience}
                  value={ishExperience}
                  onChange={(e) => setIshExperience(e.target.value)}
                  className="w-full p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder={translations.ish.form.skills}
                  value={ishSkills}
                  onChange={(e) => setIshSkills(e.target.value)}
                  className="w-full p-3 border rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:border-white focus:ring-red-500"
                />
                <div className="flex gap-4">
                  <label className="bg-red-500 text-white w-1/2 py-3 rounded-lg text-center cursor-pointer">
                    {translations.ish.form.fileSelect}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setIshFile(e.target.files[0])}
                    />
                  </label>
                  <button className="bg-gray-200 text-gray-600 w-1/2 py-3 rounded-lg">
                    {ishFile ? ishFile.name : translations.ish.form.fileNotSelected}
                  </button>
                </div>
                {error && activeTab === "ish" && <p className="text-red-500 text-sm">{error}</p>}
                {success && activeTab === "ish" && <p className="text-green-500 text-sm">{modals.muvaffaqiyatli}</p>}
                <button
                  onClick={handleIshSubmit}
                  disabled={loading}
                  className={`bg-red-500 text-white w-full py-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? modals.sending : optionsContent.button}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}