import React, { useState, useEffect } from 'react';
import logo from '../assets/img/BZ.png';
import { Link } from 'react-router';
import { BiUser, BiMenu, BiX, BiChevronDown } from 'react-icons/bi';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  
  const { activeLanguage, languages, changeLanguage } = useLanguage();

  // Navigation links for different languages
  const translations = {
    UZ: {
      navs: [
        { nav: "Asosiy", link: "#hero" },
        { nav: "Kurslarimiz", link: "#courses" },
        { nav: "Jamoa", link: "#teachers" },
        { nav: "FAQ", link: "#FAQ" },
        { nav: "Vakansiya", link: "#Vacancy" },

      ],
      register: "Ro'yxatdan o'tish",
    },
    RU: {
      navs: [
        { nav: "Главная", link: "#hero" },
        { nav: "Курсы", link: "#courses" },
        { nav: "Команда", link: "#teachers" },
        { nav: "FAQ", link: "#FAQ" },
        { nav: "Vakansiya", link: "#Vacancy" },

      ],
      register: "Регистрация",
    },
    EN: {
      navs: [
        { nav: "Home", link: "#hero" },
        { nav: "Courses", link: "#courses" },
        {nav: "Teachers", link: "#teachers"  },
        { nav: "FAQ", link: "#FAQ" },
      ],
      register: "Register",
    },
  };

  const currentTranslations = translations[activeLanguage.code] || translations.UZ;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang.code);
    setLanguageOpen(false);
    // Refresh the page to update all content
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <header
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500
        w-[95%] max-w-7xl
        ${isScrolled ? 'scale-[0.98]' : 'scale-100'}
      `}
    >
      {/* Liquid Glass Container */}
      <div
        className={`
          relative w-full
          bg-gradient-to-br from-blue-400/15 via-blue-500/12 to-blue-600/10
          backdrop-blur-3xl
          border border-blue-300/40
          rounded-2xl
          shadow-2xl shadow-blue-500/20
          transition-all duration-500
          ${isScrolled ? 'shadow-blue-500/25' : 'shadow-blue-500/15'}
        `}
        style={{
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          backdropFilter: 'blur(50px) saturate(200%)',
        }}
      >
        {/* Blue Light Effect */}
        <div
          className=""
        />

        {/* Top Light Reflection */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent pointer-events-none"
        />

        {/* Content Container */}
        <div className="relative z-10 px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
          >
            <img src={logo} alt="logo" className="w-36 md:w-44 transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-lg" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {currentTranslations.navs.map((nav, i) => (
              <a
                key={i}
                href={nav.link}
                className="relative text-black font-medium tracking-wide transition-all duration-300 group"
              >
                <span className="relative z-10 group-hover:text-blue-100 drop-shadow-sm">
                  {nav.nav}
                </span>
                <span 
                  className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-gradient-to-r from-blue-300 to-blue-100 transition-all duration-300 group-hover:w-full shadow-lg shadow-blue-300/50"
                />
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3 z-50">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black backdrop-blur-lg hover:bg-blue-500/20 transition-all duration-300 group shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(59, 130, 246, 0.15) 0%,
                      rgba(96, 165, 250, 0.08) 100%
                    )
                  `,
                }}
              >
                <img 
                  src={activeLanguage.flag} 
                  alt={activeLanguage.name} 
                  className="w-5 h-5 rounded-full transition-transform duration-300 group-hover:scale-110 drop-shadow" 
                />
                <span className="text-sm font-medium drop-shadow-sm text-black">
                  {activeLanguage.code}
                </span>
                <BiChevronDown
                  className={`transition-all duration-300 ${languageOpen ? 'rotate-180 text-black' : 'text-text-black'}`}
                />
              </button>

              {/* Language Dropdown */}
              {languageOpen && (
  <>
    {/* Overlay (transparent) */}
    <div
      className="fixed inset-0 w-full h-screen z-[60]"
      onClick={() => setLanguageOpen(false)}
      aria-hidden="true"
    />

    {/* Dropdown */}
    <div 
                  className="absolute right-0 mt-2 w-48 bg-white backdrop-blur-3xl rounded-xl border border-blue-300/40 shadow-2xl shadow-blue-500/25 overflow-hidden z-50"
                  style={{
                    WebkitBackdropFilter: 'blur(50px) saturate(200%)',
                    backdropFilter: 'blur(50px) saturate(200%)',
                  }}
                >
                  {/* Dropdown Light Effect */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(
                          circle at 50% 0%,
                          rgba(147, 197, 253, 0.2) 0%,
                          transparent 50%
                        )
                      `,
                    }}
                  />
                  
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`w-full flex items-center gap-3 border-b border-black/20 px-4 py-3 text-sm transition-all duration-200 group relative z-10 ${
                        activeLanguage.code === lang.code
                          ? 'bg-blue-500/50 text-black '
                          : 'text-black hover:bg-blue-500/15  hover:text-black'
                      }`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name} 
                        className="w-5 h-5 rounded-full transition-transform duration-300 group-hover:scale-110 drop-shadow" 
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-medium drop-shadow-sm">{lang.code}</span>
                        <span className="text-xs text-blue-black">{lang.name}</span>
                      </div>
                      {activeLanguage.code === lang.code && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-black shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
  </>
)}

            </div>

            {/* Register Button */}
            <a
            href='#contact' 
              className="hidden md:flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/25 to-blue-400/20 backdrop-blur-lg text-black font-medium shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 group border border-blue-300/40"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    rgba(59, 130, 246, 0.25) 0%,
                    rgba(96, 165, 250, 0.15) 50%,
                    rgba(147, 197, 253, 0.1) 100%
                  )
                `,
              }}
            >
              <BiUser size={18} className="transition-transform duration-300 group-hover:scale-110 drop-shadow" />
              <span className="font-semibold drop-shadow-sm">{currentTranslations.register}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-black text-2xl p-2 rounded-xl bg-blue-500/10 border border-blue-300/30 hover:bg-blue-500/20 transition-all duration-300 shadow-lg shadow-blue-500/10"
            >
              {mobileMenuOpen ? <BiX /> : <BiMenu />}
            </button>
          </div>
        </div>
      </div>

  {
    mobileMenuOpen && (
      <div className="w-full h-screen inset-0" onClick={()=> setMobileMenuOpen(false)}>
              <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-blue-900/30 backdrop-blur-lg"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div 
          className={`
            absolute top-4 right-4 left-4
            bg-gradient-to-br from-blue-500/15 via-blue-400/12 to-blue-600/10
            backdrop-blur-3xl
            border border-blue-300/40
            rounded-2xl shadow-2xl shadow-blue-500/25
            transition-all duration-500
            ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{
            WebkitBackdropFilter: 'blur(50px) saturate(200%)',
            backdropFilter: 'blur(50px) saturate(200%)',
          }}
        >
          {/* Mobile Menu Light Effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  circle at 50% 0%,
                  rgba(147, 197, 253, 0.25) 0%,
                  transparent 60%
                )
              `,
            }}
          />

          <div className="relative z-10 p-6 flex flex-col items-center gap-6">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="self-end text-black text-2xl p-2 rounded-xl bg-blue-500/10 border border-blue-300/30 hover:bg-blue-500/20 transition-all duration-300 shadow-lg shadow-blue-500/10"
            >
              <BiX />
            </button>

            {/* Navigation Links */}
            {currentTranslations.navs.map((nav, i) => (
              <a
                href={i}
                to={nav.link}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl flex justify-center font-medium text-black hover:text-black transition-all duration-300 py-3 px-6 rounded-xl hover:bg-blue-500/15 w-full text-center border border-transparent hover:border-blue-300/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
              >
                {nav.nav}
              </a>
            ))}

            {/* Mobile Register Button */}
            <a
            href='#contact'
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-4 rounded-xl flex justify-center items-center bg-gradient-to-r from-blue-500/25 to-blue-400/20 text-black font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 border border-blue-300/40 w-full mt-4"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    rgba(59, 130, 246, 0.25) 0%,
                    rgba(96, 165, 250, 0.15) 50%,
                    rgba(147, 197, 253, 0.1) 100%
                  )
                `,
              }}
            >
              <BiUser className="inline-block mr-2" /> {currentTranslations.register}
            </a>
          </div>
        </div>
      </div>
      </div>
    )
  }
    </header>
  );
};

export default Header;