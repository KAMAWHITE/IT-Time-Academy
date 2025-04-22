"use client";
import React, { useRef, useState, useEffect } from 'react';
import AOS from 'aos'; // AOS import qilindi
import 'aos/dist/aos.css'; // AOS CSS import qilindi
import { FaPlay, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import StudentsUz from '../../../locales/uz/Students.json';
import StudentsRu from '../../../locales/ru/Students.json';
import StudentsEn from '../../../locales/en/Students.json';
import StudentsUzk from '../../../locales/uzk/Students.json';
import { useApp } from '@/app/LanguageContext';

const VideoCard = ({ name, position, description, skills, company, incomeGrowth, videoSrc }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="group relative w-full h-[450px] bg-black rounded-2xl overflow-hidden shadow-lg transition-all duration-300">
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                src={videoSrc}
                loop
                muted={isMuted}
            />
            <div className="relative z-10 p-6 flex flex-col h-full justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-center">
                    <button onClick={toggleMute}>
                        {isMuted ? (
                            <FaVolumeMute className="text-white text-xl" />
                        ) : (
                            <FaVolumeUp className="text-white text-xl" />
                        )}
                    </button>
                    <button onClick={handlePlay}>
                        <FaPlay className="text-white text-xl" />
                    </button>
                </div>
                <div className="mt-4">
                    <span className="text-green-500 text-sm font-semibold">Bitiruvchi</span>
                    <h2 className="text-white text-2xl font-bold mt-2">{name}</h2>
                    <h3 className="text-white text-lg font-semibold mt-2">{position}</h3>
                    <p className="text-gray-400 text-sm mt-2">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="mt-6">
                    <p className="text-gray-400 text-sm">
                        <span className="font-semibold text-white">KOMPANIYA</span>
                        <br />
                        {company}
                    </p>
                    <p className="text-red-500 text-sm mt-2">
                        <span className="font-semibold">Daromad o‘sishi</span>
                        <br />
                        {incomeGrowth}
                    </p>
                </div>
            </div>
        </div>
    );
};

const VideoCardsSection = () => {
    const { til } = useApp();

    // AOS ni ishga tushirish
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animatsiya davomiyligi
            once: true, // Animatsiya faqat bir marta ishlaydi
        });
    }, []);

    const studentsData = {
        uz: StudentsUz,
        ru: StudentsRu,
        en: StudentsEn,
        uzk: StudentsUzk,
    }[til] || StudentsUz;

    return (
        <div className='text-center bg-[#e7e7e7]'>
            <h1 className='text-[30px] md:text-[40px] lg:text-[40px] font-bold py-10'>Bitiruvchilarimiz muvaffaqiyat tarixi</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {studentsData.map((data, index) => (
                    <div data-aos="flip-left" key={index}>
                        <VideoCard
                            name={data.name}
                            position={data.position}
                            description={data.description}
                            skills={data.skills}
                            company={data.company}
                            incomeGrowth={data.incomeGrowth}
                            videoSrc={data.videoSrc}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoCardsSection;