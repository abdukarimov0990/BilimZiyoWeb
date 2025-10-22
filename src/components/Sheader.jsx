import React, { useState, useEffect } from 'react';
import logo from '../assets/img/logo02.png';
import uzbFlag from '../assets/img/uzb.svg';
import rusFlag from '../assets/img/rus.svg';
import engFlag from '../assets/img/eng.svg';
import { Link } from 'react-router';
import { BiUser, BiMenu, BiX, BiChevronDown } from 'react-icons/bi';

const Sheader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState({
    code: 'UZ',
    name: "O'zbek",
    flag: uzbFlag,
  });

  const navs = [
    { nav: "Asosiy", link: "/school" },
    { nav: "Kurslarimiz", link: "/courses" },
    { nav: "Jamoa", link: "/team" },
    { nav: "FAQ", link: "/faq" },
  ];

  const languages = [
    { code: 'UZ', name: "O'zbek", flag: uzbFlag },
    { code: 'RU', name: 'Русский', flag: rusFlag },
    { code: 'EN', name: 'English', flag: engFlag },
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
          bg-gradient-to-br from-orange-400/15 via-orange-500/12 to-orange-600/10
          backdrop-blur-3xl
          border border-orange-300/40
          rounded-2xl
          shadow-2xl shadow-orange-500/20
          overflow-hidden
          transition-all duration-500
          ${isScrolled ? 'shadow-orange-500/25' : 'shadow-orange-500/15'}
        `}
        style={{
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          backdropFilter: 'blur(50px) saturate(200%)',
        }}
      >
        {/* Orange Light Effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at 20% 80%,
                rgba(251, 146, 60, 0.25) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 80% 20%,
                rgba(253, 186, 116, 0.2) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 40% 40%,
                rgba(254, 215, 170, 0.15) 0%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Top Light Reflection */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent pointer-events-none"
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
            {navs.map((nav, i) => (
              <Link
                key={i}
                to={nav.link}
                className="relative text-white font-medium tracking-wide transition-all duration-300 group"
              >
                <span className="relative z-10 group-hover:text-orange-100 drop-shadow-sm">
                  {nav.nav}
                </span>
                <span 
                  className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-gradient-to-r from-orange-300 to-orange-100 transition-all duration-300 group-hover:w-full shadow-lg shadow-orange-300/50"
                />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-300/30 text-white backdrop-blur-lg hover:bg-orange-500/20 transition-all duration-300 group shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(251, 146, 60, 0.15) 0%,
                      rgba(253, 186, 116, 0.08) 100%
                    )
                  `,
                }}
              >
                <img 
                  src={activeLanguage.flag} 
                  alt={activeLanguage.name} 
                  className="w-5 h-5 rounded-full transition-transform duration-300 group-hover:scale-110 drop-shadow" 
                />
                <BiChevronDown
                  className={`transition-all duration-300 ${languageOpen ? 'rotate-180 text-orange-200' : 'text-orange-100'}`}
                />
              </button>

              {/* Language Dropdown */}
              {languageOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-orange-500/15 to-orange-600/10 backdrop-blur-3xl rounded-xl border border-orange-300/40 shadow-2xl shadow-orange-500/25 overflow-hidden"
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
                          rgba(254, 215, 170, 0.2) 0%,
                          transparent 50%
                        )
                      `,
                    }}
                  />
                  
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 group relative z-10 ${
                        activeLanguage.code === lang.code
                          ? 'bg-orange-500/25 text-white shadow-inner shadow-orange-500/20'
                          : 'text-orange-100 hover:bg-orange-500/15 hover:text-white'
                      }`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name} 
                        className="w-5 h-5 rounded-full transition-transform duration-300 group-hover:scale-110 drop-shadow" 
                      />
                      <span className="font-medium drop-shadow-sm">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Register Button */}
            <button 
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/25 to-orange-400/20 backdrop-blur-lg text-white font-medium shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 group border border-orange-300/40"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    rgba(251, 146, 60, 0.25) 0%,
                    rgba(253, 186, 116, 0.15) 50%,
                    rgba(254, 215, 170, 0.1) 100%
                  )
                `,
              }}
            >
              <BiUser size={18} className="transition-transform duration-300 group-hover:scale-110 drop-shadow" />
              <span className="font-semibold drop-shadow-sm">Ro'yxatdan o'tish</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white text-2xl p-2 rounded-xl bg-orange-500/10 border border-orange-300/30 hover:bg-orange-500/20 transition-all duration-300 shadow-lg shadow-orange-500/10"
            >
              {mobileMenuOpen ? <BiX /> : <BiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-orange-900/30 backdrop-blur-lg"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div 
          className={`
            absolute top-4 right-4 left-4
            bg-gradient-to-br from-orange-500/15 via-orange-400/12 to-orange-600/10
            backdrop-blur-3xl
            border border-orange-300/40
            rounded-2xl shadow-2xl shadow-orange-500/25
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
                  rgba(254, 215, 170, 0.25) 0%,
                  transparent 60%
                )
              `,
            }}
          />

          <div className="relative z-10 p-6 flex flex-col items-center gap-6">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="self-end text-white text-2xl p-2 rounded-xl bg-orange-500/10 border border-orange-300/30 hover:bg-orange-500/20 transition-all duration-300 shadow-lg shadow-orange-500/10"
            >
              <BiX />
            </button>

            {/* Navigation Links */}
            {navs.map((nav, i) => (
              <Link
                key={i}
                to={nav.link}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-medium text-orange-100 hover:text-white transition-all duration-300 py-3 px-6 rounded-xl hover:bg-orange-500/15 w-full text-center border border-transparent hover:border-orange-300/20 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
              >
                {nav.nav}
              </Link>
            ))}

            {/* Mobile Register Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500/25 to-orange-400/20 text-white font-semibold shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 border border-orange-300/40 w-full mt-4"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    rgba(251, 146, 60, 0.25) 0%,
                    rgba(253, 186, 116, 0.15) 50%,
                    rgba(254, 215, 170, 0.1) 100%
                  )
                `,
              }}
            >
              <BiUser className="inline-block mr-2" /> Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Sheader;