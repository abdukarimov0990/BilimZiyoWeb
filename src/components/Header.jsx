import React, { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';
import uzbFlag from '../assets/img/uzb.svg';
import rusFlag from '../assets/img/rus.svg';
import engFlag from '../assets/img/eng.svg';
import { Link } from 'react-router';
import { navs } from '../data/data';
import { BiUser, BiMenu, BiX, BiChevronDown } from 'react-icons/bi';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState({
    code: 'UZ',
    name: "O'zbek",
    flag: uzbFlag
  });

  const languages = [
    { code: 'UZ', name: "O'zbek", flag: uzbFlag },
    { code: 'RU', name: 'Русский', flag: rusFlag },
    { code: 'EN', name: 'English', flag: engFlag }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSelect = (lang) => {
    setActiveLanguage(lang);
    setLanguageOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-gray-900 shadow-xl' : 'py-5 bg-gradient-to-r from-red-800 to-red-900 shadow-md'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="transition-all duration-500 hover:scale-105 z-10"
        >
          <img 
            src={logo} 
            alt="logo" 
            className={`transition-all duration-500 ${isScrolled ? 'w-40' : 'w-52'}`} 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
          <ul className="flex gap-8 items-center font-medium text-white">
            {navs.map((nav, index) => (
              <li key={index} className="relative group">
                <Link
                  to={nav.link}
                  className="transition-colors duration-300 hover:text-yellow-400 py-2 px-1"
                >
                  {nav.nav}
                </Link>
                {/* Animated underline */}
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10"></span>
              </li>
            ))}
          </ul>

          {/* Language Selector - Modern Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 text-white hover:bg-gray-800 transition-colors duration-300"
            >
              <img src={activeLanguage.flag} alt={activeLanguage.name} className="w-6 h-6 object-cover rounded" />
              <span className="text-sm font-medium">{activeLanguage.code}</span>
              <BiChevronDown className={`transition-transform duration-300 ${languageOpen ? 'rotate-180' : ''}`} />
            </button>

            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-700 shadow-xl overflow-hidden z-20">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors duration-200 ${activeLanguage.code === lang.code ? 'bg-red-700 text-white' : 'text-gray-200 hover:bg-gray-700'}`}
                  >
                    <img src={lang.flag} alt={lang.name} className="w-6 h-6 object-cover rounded" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-xs text-gray-400">{lang.code}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Registration Button */}
          <button className="px-6 py-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-medium shadow-lg transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:scale-105 active:scale-95 group">
            <BiUser size={18} className="transition-transform duration-300 group-hover:animate-pulse" />
            <span>Ro'yxatdan o'tish</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white z-10 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed lg:hidden inset-0 bg-gray-900/95 backdrop-blur-md z-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-10">
            <ul className="flex flex-col gap-8 items-center text-white text-xl">
              {navs.map((nav, index) => (
                <li key={index}>
                  <Link
                    to={nav.link}
                    className="transition-colors duration-300 hover:text-yellow-400 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {nav.nav}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Language Selector */}
            <div className="flex flex-col gap-3 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-4 mt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageSelect(lang);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-colors duration-300 ${activeLanguage.code === lang.code ? 'bg-red-700 text-white' : 'text-gray-200 hover:bg-gray-700'}`}
                >
                  <img src={lang.flag} alt={lang.name} className="w-6 h-6 object-cover rounded" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-400">{lang.code}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Registration Button */}
            <button className="px-8 py-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-medium text-lg mt-6 transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700">
              <BiUser size={20} />
              <span>Ro'yxatdan o'tish</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;