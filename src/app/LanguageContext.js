"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    // Til holati
    const [til, setTil] = useState('uz');

    useEffect(() => {
        // Saqlangan tilni yuklash
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) setTil(savedLanguage);
    }, []);

    useEffect(() => {
        // Tilni saqlash
        localStorage.setItem('language', til);
    }, [til]);

    // Tilni o'zgartirish funktsiyasi
    const changeLanguage = (newLanguage) => {
        setTil(newLanguage);
    };

    return (
        <AppContext.Provider value={{ til, changeLanguage }}>
            {children}
        </AppContext.Provider>
    );
}

function useApp() {
    return useContext(AppContext);
}

export { AppProvider, useApp };