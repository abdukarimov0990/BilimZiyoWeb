import React, { createContext, useState, useContext, useEffect } from 'react';
import uzbFlag from '../assets/img/uzb.svg';
import rusFlag from '../assets/img/rus.svg';
import engFlag from '../assets/img/eng.svg';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const languages = [
    { code: 'UZ', name: "O'zbek", flag: uzbFlag },
    { code: 'RU', name: 'Русский', flag: rusFlag },
    { code: 'EN', name: 'English', flag: engFlag },
  ];

  // LocalStorage'dan tilni o'qish
  const getInitialLanguage = () => {
    try {
      const savedLang = localStorage.getItem('selectedLanguage');
      if (savedLang) {
        return JSON.parse(savedLang);
      }
      return languages[0]; // Default til
    } catch (error) {
      console.error('Error loading language from localStorage:', error);
      return languages[0];
    }
  };

  const [activeLanguage, setActiveLanguage] = useState(getInitialLanguage);

  // Tilni o'zgartirish funksiyasi
  const changeLanguage = (langCode) => {
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      setActiveLanguage(selectedLang);
      localStorage.setItem('selectedLanguage', JSON.stringify(selectedLang));
    }
  };

  // Til o'zgarganda localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem('selectedLanguage', JSON.stringify(activeLanguage));
  }, [activeLanguage]);

  // Tilni qaytarish funksiyasi (boshqa komponentlar uchun)
  const getLanguageContent = (translations) => {
    return translations[activeLanguage.code] || translations.UZ;
  };

  const value = {
    activeLanguage,
    languages,
    changeLanguage,
    getLanguageContent,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};