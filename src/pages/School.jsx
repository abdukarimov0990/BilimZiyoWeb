import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PiPhone, PiMapPin, PiEnvelope, PiClock, PiUsers, 
  PiChalkboardTeacher, PiMonitor, PiShield, PiForkKnife, 
  PiBookOpen, PiGlobe, PiStar, PiLightbulb, PiHeart, 
  PiShootingStar, PiCaretDown, PiCheckCircle, PiX 
} from "react-icons/pi";
import { BsAward, BsRobot, BsArrowRight, BsPlayCircle } from "react-icons/bs";
import { TbGymnastics } from "react-icons/tb";

const School = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState({
    code: "uz",
    name: "O'zbek",
    flag: "🇺🇿"
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const languages = [
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇺🇸" }
  ];

  const content = {
    uz: {
      hero: {
        title: "Zamonaviy Ta'lim Muassasasi",
        subtitle: "Kelajakni Qurish - Bilimlar Orqali",
        description: "Bizning maktabimizda har bir bola o'z potentsialini to'liq ro'yobga chiqarish imkoniyatiga ega. Zamonaviy ta'lim texnologiyalari, tajribali o'qituvchilar va qulay sharoitlar bilan ta'minlang.",
        button: "Qabulga yoziling",
        video: "Xususiy maktab"
      },
      advantages: {
        title: "Bizning Afzalliklarimiz",
        subtitle: "Har bir bola uchun maxsus yaratilgan zamonaviy ta'lim muhiti",
        items: [
          {
            icon: <PiClock className="text-3xl" />,
            title: "Qulay Dars Jadvali",
            description: "Darslar ertalab 8:00 dan 16:00 gacha davom etadi",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
          },
          {
            icon: <PiForkKnife className="text-3xl" />,
            title: "Sifatli Ovqatlanish",
            description: "Kuniga ikki marta to'liq issiq ovqat bilan ta'minlash",
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50"
          },
          {
            icon: <PiUsers className="text-3xl" />,
            title: "Kichik Sinflar",
            description: "Har bir sinfda maksimal 18 nafargacha o'quvchi",
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
          },
          {
            icon: <PiChalkboardTeacher className="text-3xl" />,
            title: "Tajribali O'qituvchilar",
            description: "Yuqori malakali va tajribali o'qituvchilar jamoasi",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
          },
          {
            icon: <PiMonitor className="text-3xl" />,
            title: "Zamonaviy Texnologiyalar",
            description: "Har bir sinfda zamonaviy interaktiv doskalar",
            gradient: "from-indigo-500 to-blue-500",
            bgGradient: "from-indigo-50 to-blue-50"
          },
          {
            icon: <BsRobot className="text-3xl" />,
            title: "IT va Robototexnika",
            description: "IT va robototexnika to'garaklari",
            gradient: "from-teal-500 to-green-500",
            bgGradient: "from-teal-50 to-green-50"
          },
          {
            icon: <PiShield className="text-3xl" />,
            title: "Xavfsiz Muhit",
            description: "24/7 kamera nazorati va xavfsizlik xizmati",
            gradient: "from-red-500 to-pink-500",
            bgGradient: "from-red-50 to-pink-50"
          },
          {
            icon: <TbGymnastics className="text-3xl" />,
            title: "Sport Faoliyati",
            description: "Turli sport turlari va jismoniy tarbiya",
            gradient: "from-yellow-500 to-orange-500",
            bgGradient: "from-yellow-50 to-orange-50"
          },
          {
            icon: <PiBookOpen className="text-3xl" />,
            title: "Kutubxona",
            description: "Zamonaviy kutubxona va o'qish zali",
            gradient: "from-purple-500 to-indigo-500",
            bgGradient: "from-purple-50 to-indigo-50"
          },
          {
            icon: <PiHeart className="text-3xl" />,
            title: "Psixologik Yordam",
            description: "Maktab psixologi tomonidan yordam",
            gradient: "from-pink-500 to-rose-500",
            bgGradient: "from-pink-50 to-rose-50"
          }
        ]
      },
      stats: {
        title: "Raqamlarda Biz",
        items: [
          { number: "500+", label: "O'quvchi", suffix: "", icon: "👨‍🎓" },
          { number: "50", label: "Malakali o'qituvchi", suffix: "+", icon: "👩‍🏫" },
          { number: "15", label: "Yillik tajriba", suffix: "+", icon: "📅" },
          { number: "98", label: "Muvaffaqiyat foizi", suffix: "%", icon: "🏆" }
        ]
      },
      faq: {
        title: "Ko'p So'raladigan Savollar",
        items: [
          {
            question: "Qabul qanday amalga oshiriladi?",
            answer: "Qabul har yili 1-iyundan boshlanadi. Online ariza topshirish yoki maktabimizga kelib ro'yxatdan o'tishingiz mumkin. Dastlab sinov darsida qatnashishingiz va o'qituvchilarimiz bilan maslahatlashishingiz mumkin."
          },
          {
            question: "Maktabda ovqatlanish qanday tashkil etilgan?",
            answer: "Kuniga ikki marta to'liq issiq ovqat bilan ta'minlaymiz. Oshxanamizda sifatli va foydali ovqatlar tayyorlanadi. Ovqat menyusi har hafta o'zgarib turadi va dietolog tomonidan tuziladi."
          },
          {
            question: "To'lov qanday amalga oshiriladi?",
            answer: "To'lov oyiga bir marta, naqd pul yoki bank orqali amalga oshiriladi. O'quvchilar uchun chegirmalar va bonuslar mavjud. Bir nechta farzandli oilalar uchun maxsus chegirmalar qo'llaniladi."
          },
          {
            question: "Maktabda qanday qo'shimcha to'garaklar mavjud?",
            answer: "Maktabimizda IT, robototexnika, taekwon-do, gimnastika, shaxmat, rus va koreys tillari to'garaklari mavjud. Barcha to'garaklar tajribali mutaxassislar tomonidan olib boriladi."
          },
          {
            question: "Xavfsizlik qanday ta'minlanadi?",
            answer: "Maktabimizda 24/7 kamera nazorati, xavfsizlik xizmati va zamonaviy xavfsizlik tizimlari o'rnatilgan. Kirish-chiqishlar qat'iy nazorat qilinadi."
          }
        ]
      },
      gallery: {
        title: "Maktab Hayotimiz",
        subtitle: "Bizning maktabimizda kun qanday o'tadi"
      },
      contact: {
        title: "Bog'laning",
        subtitle: "Qo'shiling - Kelajakni Birga Qurylik",
        form: {
          name: "Ismingiz",
          phone: "Telefon raqamingiz",
          studentAge: "O'quvchi yoshi",
          class: "Sinf",
          message: "Xabar",
          button: "Ariza yuborish"
        },
        info: {
          title: "Joylashuv",
          address: "Toshkent shahar, Yunusobod tumani",
          phone: "+998 90 123 45 67",
          email: "info@bilimmaktab.uz",
          hours: "Dushanba - Juma: 8:00 - 18:00"
        }
      }
    },
    ru: {
      hero: {
        title: "Современное Образовательное Учреждение",
        subtitle: "Строим Будущее - Через Знания",
        description: "В нашей школе каждый ребенок имеет возможность полностью раскрыть свой потенциал. Современные образовательные технологии, опытные преподаватели и комфортные условия.",
        button: "Записаться",
        video: "Частная школа"
      },
      advantages: {
        title: "Наши Преимущества",
        subtitle: "Современная образовательная среда, созданная специально для каждого ребенка",
        items: [
          {
            icon: <PiClock className="text-3xl" />,
            title: "Удобное Расписание",
            description: "Уроки проходят с 8:00 утра до 16:00",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
          },
          {
            icon: <PiForkKnife className="text-3xl" />,
            title: "Качественное Питание",
            description: "Двухразовое полноценное горячее питание в день",
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50"
          },
          {
            icon: <PiUsers className="text-3xl" />,
            title: "Маленькие Классы",
            description: "Максимум 18 учеников в каждом классе",
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
          },
          {
            icon: <PiChalkboardTeacher className="text-3xl" />,
            title: "Опытные Учителя",
            description: "Команда высококвалифицированных и опытных учителей",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
          },
          {
            icon: <PiMonitor className="text-3xl" />,
            title: "Современные Технологии",
            description: "Современные интерактивные доски в каждом классе",
            gradient: "from-indigo-500 to-blue-500",
            bgGradient: "from-indigo-50 to-blue-50"
          },
          {
            icon: <BsRobot className="text-3xl" />,
            title: "IT и Робототехника",
            description: "Кружки IT и робототехники",
            gradient: "from-teal-500 to-green-500",
            bgGradient: "from-teal-50 to-green-50"
          },
          {
            icon: <PiShield className="text-3xl" />,
            title: "Безопасная Среда",
            description: "Круглосуточное видеонаблюдение и служба безопасности",
            gradient: "from-red-500 to-pink-500",
            bgGradient: "from-red-50 to-pink-50"
          },
          {
            icon: <TbGymnastics className="text-3xl" />,
            title: "Спортивная Деятельность",
            description: "Различные виды спорта и физическое воспитание",
            gradient: "from-yellow-500 to-orange-500",
            bgGradient: "from-yellow-50 to-orange-50"
          },
          {
            icon: <PiBookOpen className="text-3xl" />,
            title: "Библиотека",
            description: "Современная библиотека и читальный зал",
            gradient: "from-purple-500 to-indigo-500",
            bgGradient: "from-purple-50 to-indigo-50"
          },
          {
            icon: <PiHeart className="text-3xl" />,
            title: "Психологическая Помощь",
            description: "Помощь школьного психолога",
            gradient: "from-pink-500 to-rose-500",
            bgGradient: "from-pink-50 to-rose-50"
          }
        ]
      },
      stats: {
        title: "Мы в цифрах",
        items: [
          { number: "500+", label: "Учеников", suffix: "", icon: "👨‍🎓" },
          { number: "50", label: "Квалифицированных учителей", suffix: "+", icon: "👩‍🏫" },
          { number: "15", label: "Лет опыта", suffix: "+", icon: "📅" },
          { number: "98", label: "Успеваемость", suffix: "%", icon: "🏆" }
        ]
      },
      faq: {
        title: "Часто Задаваемые Вопросы",
        items: [
          {
            question: "Как проходит процесс поступления?",
            answer: "Прием начинается каждый год с 1 июня. Вы можете подать заявку онлайн или зарегистрироваться в нашей школе. Вы также можете посетить пробный урок и проконсультироваться с нашими учителями."
          },
          {
            question: "Как организовано питание в школе?",
            answer: "Мы обеспечиваем двухразовое полноценное горячее питание. В нашей столовой готовят качественную и полезную еду. Меню меняется каждую неделю и составляет диетолог."
          },
          {
            question: "Как осуществляется оплата?",
            answer: "Оплата производится ежемесячно, наличными или через банк. Для студентов доступны скидки и бонусы. Для семей с несколькими детьми предусмотрены специальные скидки."
          },
          {
            question: "Какие дополнительные кружки есть в школе?",
            answer: "В нашей школе есть кружки IT, робототехники, тхэквондо, гимнастики, шахмат, русского и корейского языков. Все кружки проводятся опытными специалистами."
          },
          {
            question: "Как обеспечивается безопасность?",
            answer: "В нашей школе установлено круглосуточное видеонаблюдение, служба безопасности и современные системы безопасности. Вход и выход строго контролируются."
          }
        ]
      },
      gallery: {
        title: "Наша Школьная Жизнь",
        subtitle: "Как проходит день в нашей школе"
      },
      contact: {
        title: "Свяжитесь с нами",
        subtitle: "Присоединяйтесь - Давайте Строить Будущее Вместе",
        form: {
          name: "Ваше имя",
          phone: "Ваш телефон",
          studentAge: "Возраст ученика",
          class: "Класс",
          message: "Сообщение",
          button: "Отправить заявку"
        },
        info: {
          title: "Расположение",
          address: "г. Ташкент, Юнусабадский район",
          phone: "+998 90 123 45 67",
          email: "info@bilimmaktab.uz",
          hours: "Понедельник - Пятница: 8:00 - 18:00"
        }
      }
    },
    en: {
      hero: {
        title: "Modern Educational Institution",
        subtitle: "Building the Future - Through Knowledge",
        description: "In our school, every child has the opportunity to fully realize their potential. Modern educational technologies, experienced teachers and comfortable conditions.",
        button: "Enroll Now",
        video: "Private school"
      },
      advantages: {
        title: "Our Advantages",
        subtitle: "Modern educational environment created specifically for each child",
        items: [
          {
            icon: <PiClock className="text-3xl" />,
            title: "Convenient Schedule",
            description: "Lessons run from 8:00 AM to 4:00 PM",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
          },
          {
            icon: <PiForkKnife className="text-3xl" />,
            title: "Quality Nutrition",
            description: "Two full hot meals per day",
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50"
          },
          {
            icon: <PiUsers className="text-3xl" />,
            title: "Small Classes",
            description: "Maximum 18 students in each class",
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
          },
          {
            icon: <PiChalkboardTeacher className="text-3xl" />,
            title: "Experienced Teachers",
            description: "Team of highly qualified and experienced teachers",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
          },
          {
            icon: <PiMonitor className="text-3xl" />,
            title: "Modern Technologies",
            description: "Modern interactive boards in every classroom",
            gradient: "from-indigo-500 to-blue-500",
            bgGradient: "from-indigo-50 to-blue-50"
          },
          {
            icon: <BsRobot className="text-3xl" />,
            title: "IT and Robotics",
            description: "IT and robotics clubs",
            gradient: "from-teal-500 to-green-500",
            bgGradient: "from-teal-50 to-green-50"
          },
          {
            icon: <PiShield className="text-3xl" />,
            title: "Safe Environment",
            description: "24/7 camera surveillance and security service",
            gradient: "from-red-500 to-pink-500",
            bgGradient: "from-red-50 to-pink-50"
          },
          {
            icon: <TbGymnastics className="text-3xl" />,
            title: "Sports Activities",
            description: "Various sports and physical education",
            gradient: "from-yellow-500 to-orange-500",
            bgGradient: "from-yellow-50 to-orange-50"
          },
          {
            icon: <PiBookOpen className="text-3xl" />,
            title: "Library",
            description: "Modern library and reading room",
            gradient: "from-purple-500 to-indigo-500",
            bgGradient: "from-purple-50 to-indigo-50"
          },
          {
            icon: <PiHeart className="text-3xl" />,
            title: "Psychological Support",
            description: "Help from school psychologist",
            gradient: "from-pink-500 to-rose-500",
            bgGradient: "from-pink-50 to-rose-50"
          }
        ]
      },
      stats: {
        title: "Our Numbers",
        items: [
          { number: "500+", label: "Students", suffix: "", icon: "👨‍🎓" },
          { number: "50", label: "Qualified Teachers", suffix: "+", icon: "👩‍🏫" },
          { number: "15", label: "Years Experience", suffix: "+", icon: "📅" },
          { number: "98", label: "Success Rate", suffix: "%", icon: "🏆" }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "What is the admission process?",
            answer: "Admission starts every year from June 1st. You can apply online or register at our school. You can also attend a trial lesson and consult with our teachers."
          },
          {
            question: "How is food organized at school?",
            answer: "We provide two full hot meals per day. Our kitchen prepares quality and healthy food. The menu changes weekly and is prepared by a dietitian."
          },
          {
            question: "How is payment made?",
            answer: "Payment is made monthly, in cash or through bank. Discounts and bonuses are available for students. Special discounts are provided for families with multiple children."
          },
          {
            question: "What additional clubs are available at school?",
            answer: "Our school has IT, robotics, taekwondo, gymnastics, chess, Russian and Korean language clubs. All clubs are conducted by experienced specialists."
          },
          {
            question: "How is security ensured?",
            answer: "Our school has 24/7 camera surveillance, security service and modern security systems. Entry and exit are strictly controlled."
          }
        ]
      },
      gallery: {
        title: "Our School Life",
        subtitle: "How a day goes in our school"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Join Us - Let's Build the Future Together",
        form: {
          name: "Your Name",
          phone: "Your Phone",
          studentAge: "Student Age",
          class: "Class",
          message: "Message",
          button: "Submit Application"
        },
        info: {
          title: "Location",
          address: "Tashkent city, Yunusabad district",
          phone: "+998 90 123 45 67",
          email: "info@bilimmaktab.uz",
          hours: "Monday - Friday: 8:00 - 18:00"
        }
      }
    }
  };

  const currentContent = content[activeLanguage.code];

  const galleryImages = [
    { id: 1, src: "/g1.jpg", title: "Sinflarimiz", emoji: "🏫" },
    { id: 2, src: "/g2.jpg", title: "Laboratoriya", emoji: "🔬" },
    { id: 3, src: "/g3.jpg", title: "Sport Zali", emoji: "⚽" },
    { id: 4, src: "/g4.jpg", title: "Kutubxona", emoji: "📚" },
    { id: 5, src: "/g5.jpg", title: "Oshxona", emoji: "🍽️" },
    { id: 6, src: "/g6.jpg", title: "Hovli", emoji: "🌳" }
  ];

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleLanguageSelect = (lang) => {
    setActiveLanguage(lang);
    setLanguageOpen(false);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-auto">
      {/* Language Selector */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative">
          <motion.button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PiGlobe className="text-gray-600" size={20} />
            <span className="font-medium text-gray-700 text-xl">{activeLanguage.flag}</span>
            <span className="text-gray-600 font-semibold">{activeLanguage.code.toUpperCase()}</span>
            <motion.div
              animate={{ rotate: languageOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <PiCaretDown className="text-gray-500" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {languageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-2xl overflow-hidden z-20"
              >
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`w-full px-4 py-4 flex items-center gap-4 text-left transition-all duration-200 ${
                      activeLanguage.code === lang.code 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{lang.name}</span>
                      <span className="text-xs opacity-70">{lang.code.toUpperCase()}</span>
                    </div>
                    {activeLanguage.code === lang.code && (
                      <PiCheckCircle className="ml-auto text-xl" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
        
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >📚</motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-5xl opacity-20"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >✏️</motion.div>
        <motion.div 
          className="absolute bottom-32 left-20 text-4xl opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >🔬</motion.div>
        <motion.div 
          className="absolute bottom-40 right-16 text-6xl opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
        >🎓</motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-8 border border-gray-200 shadow-lg"
            >
              <PiStar className="text-orange-500 animate-pulse" />
              <span className="text-gray-700">2024-2025 O'quv Yili Qabuli Boshlandi</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gray-900">Zamonaviy</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Ta'lim
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentContent.hero.subtitle}
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentContent.hero.description}
            </motion.p>

            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 shadow-lg flex items-center gap-3 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{currentContent.hero.button}</span>
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                className="border-2 border-orange-500 text-orange-500 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg flex items-center gap-3 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{currentContent.hero.video}</span>
                <BsPlayCircle className="text-xl" />
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="mb-2 text-sm font-medium">Aylantiring</span>
          <motion.div 
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.stats.items.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-6xl mb-4">{stat.icon}</div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}<span className="text-orange-300">{stat.suffix}</span>
                </motion.div>
                <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-full text-base font-medium mb-6 shadow-lg"
            >
              <PiStar className="animate-pulse" />
              <span>Eng Yaxshi Ta'lim</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-gray-900">{currentContent.advantages.title.split(' ')[0]}</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                {currentContent.advantages.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {currentContent.advantages.subtitle}
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            </div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column - 5 Advantages */}
            <div className="lg:w-2/5 space-y-6">
              {currentContent.advantages.items.slice(0, 5).map((advantage, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-r ${advantage.gradient} text-white shadow-lg flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {advantage.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center Image */}
            <motion.div 
              className="lg:w-1/5 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🏫</div>
                    <div className="text-xl font-bold">Maktabimiz</div>
                  </div>
                </div>
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <PiStar className="text-2xl text-orange-500" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <PiHeart className="text-2xl text-red-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - 5 Advantages */}
            <div className="lg:w-2/5 space-y-6">
              {currentContent.advantages.items.slice(5, 10).map((advantage, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-r ${advantage.gradient} text-white shadow-lg flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {advantage.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Maktab</span>{" "}
              <span className="text-orange-500">hayotimiz</span>
            </h2>
            <p className="text-xl text-gray-600">
              {currentContent.gallery.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openImageModal(image)}
              >
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{image.emoji}</div>
                    <div className="text-xl font-bold text-gray-800">{image.title}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 rounded-full p-4"
                  >
                    <BsPlayCircle className="text-3xl text-orange-500" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={closeImageModal}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="relative max-w-4xl max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeImageModal}
                    className="absolute -top-16 right-0 text-white hover:text-orange-500 transition-colors z-10"
                  >
                    <PiX className="text-3xl" />
                  </button>
                  
                  <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-6">{selectedImage.emoji}</div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                        <p className="text-gray-600 text-lg">Maktabimizning {selectedImage.title.toLowerCase()} haqida</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{selectedImage.title}</h4>
                          <p className="text-gray-600">Maktab hayotimizning ajralmas qismi</p>
                        </div>
                        <button
                          onClick={closeImageModal}
                          className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition-colors"
                        >
                          Yopish
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Maktabimiz</span>{" "}
              <span className="text-orange-500">haqida savollar</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {currentContent.faq.items.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-r from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  className="w-full p-8 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-300 group"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: faqOpen === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-orange-500 group-hover:text-orange-600 flex-shrink-0"
                  >
                    <PiCaretDown size={24} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-gray-600 bg-white leading-relaxed text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Maktabimiz</span>{" "}
              <span className="text-orange-500">bilan bog'laning</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.contact.subtitle}
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 backdrop-blur-sm">
                <form className="space-y-6 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-3 font-medium">{currentContent.contact.form.name}</label>
                      <input 
                        type="text" 
                        placeholder={currentContent.contact.form.name} 
                        className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-3 font-medium">{currentContent.contact.form.phone}</label>
                      <input 
                        type="tel" 
                        placeholder={currentContent.contact.form.phone} 
                        className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-3 font-medium">{currentContent.contact.form.studentAge}</label>
                      <input 
                        type="number" 
                        placeholder={currentContent.contact.form.studentAge} 
                        className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-3 font-medium">{currentContent.contact.form.class}</label>
                      <select className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300">
                        <option value="">Tanlang...</option>
                        <option>1-sinf</option>
                        <option>2-sinf</option>
                        <option>3-sinf</option>
                        <option>4-sinf</option>
                        <option>5-sinf</option>
                        <option>6-sinf</option>
                        <option>7-sinf</option>
                        <option>8-sinf</option>
                        <option>9-sinf</option>
                        <option>10-sinf</option>
                        <option>11-sinf</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-3 font-medium">{currentContent.contact.form.message}</label>
                    <textarea 
                      placeholder={currentContent.contact.form.message}
                      rows="4"
                      className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{currentContent.contact.form.button}</span>
                    <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
                
                <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-xl mt-1">
                      <PiMapPin size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Manzil</p>
                      <p className="text-gray-600">{currentContent.contact.info.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-xl mt-1">
                      <PiPhone size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Telefon</p>
                      <p className="text-gray-600">{currentContent.contact.info.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-xl mt-1">
                      <PiEnvelope size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Email</p>
                      <p className="text-gray-600">{currentContent.contact.info.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-xl mt-1">
                      <PiClock size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Ish vaqti</p>
                      <p className="text-gray-600">{currentContent.contact.info.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white h-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <h3 className="text-2xl font-bold mb-8 relative z-10">{currentContent.contact.info.title}</h3>
                
                <div className="mt-8 bg-white/20 rounded-2xl p-6 h-48 flex items-center justify-center backdrop-blur-sm relative z-10">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏫</div>
                    <p className="font-semibold text-lg">Maktabimiz</p>
                    <p className="text-white/80">Sizni kutmoqdamiz!</p>
                  </div>
                </div>
                
                <div className="mt-6 text-white/90 text-center relative z-10">
                  <p className="text-lg font-semibold">Qabul jarayoni boshlandi!</p>
                  <p className="mt-2">2024-2025 o'quv yili uchun joylar cheklangan</p>
                </div>

                <div className="mt-8 relative z-10">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="font-semibold text-lg mb-4">Tez Aloqa</h4>
                    <div className="space-y-3">
                      <button className="w-full bg-white text-orange-500 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                        Telegram orqali bog'lanish
                      </button>
                      <button className="w-full bg-white text-orange-500 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                        WhatsApp orqali bog'lanish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default School;