"use client";
import React, { useRef, useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import StudentsUz from '../../../locales/uz/Students.json';
import StudentsRu from '../../../locales/ru/Students.json';
import StudentsEn from '../../../locales/en/Students.json';
import StudentsUzk from '../../../locales/uzk/Students.json';
import { useApp } from '@/app/LanguageContext';

const VideoCard = ({ name, position, description, skills, company, incomeGrowth, videoSrc, labels }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
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
                        {isPlaying ? (
                            <FaPause className="text-white text-xl" />
                        ) : (
                            <FaPlay className="text-white text-xl" />
                        )}
                    </button>
                </div>
                <div className="mt-4">
                    <span className="text-green-500 text-sm font-semibold">{labels.graduateLabel}</span>
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
                        <span className="font-semibold text-white">{labels.companyLabel}</span>
                        <br />
                        {company}
                    </p>
                    <p className="text-red-500 text-sm mt-2">
                        <span className="font-semibold">{labels.incomeGrowthLabel}</span>
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
    const [labels, setLabels] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        return () => AOS.refresh();
    }, [til]);

    useEffect(() => {
        const loadLabels = async () => {
            let file;
            switch (til) {
                case 'uz':
                    file = await import('../../../locales/uz/VideoCards.json');
                    break;
                case 'ru':
                    file = await import('../../../locales/ru/VideoCards.json');
                    break;
                case 'en':
                    file = await import('../../../locales/en/VideoCards.json');
                    break;
                case 'uzk':
                    file = await import('../../../locales/uzk/VideoCards.json');
                    break;
                default:
                    file = await import('../../../locales/uz/VideoCards.json');
            }
            setLabels(file.default);
        };
        loadLabels();
    }, [til]);

    const studentsData = {
        uz: StudentsUz,
        ru: StudentsRu,
        en: StudentsEn,
        uzk: StudentsUzk,
    }[til] || StudentsUz;

    if (!labels) return null;

    return (
        <div className="text-center bg-[#e7e7e7]">
            <h1 className="text-[30px] md:text-[40px] lg:text-[40px] font-bold py-10">{labels.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {studentsData.map((data, index) => (
                    <div data-aos="flip-left" key={index}>
                        <VideoCard
                            name={data.name}
                            position={data.occupation}
                            description={data.about}
                            skills={data.skills}
                            company={data.company}
                            incomeGrowth={data.incomeGrowth}
                            videoSrc={data.videoSrc}
                            labels={labels}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoCardsSection;