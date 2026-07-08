import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { BookOpen, BrainCircuit, Globe2, GraduationCapIcon, icons, LightbulbIcon, RocketIcon, School2, TargetIcon, Users2 } from 'lucide-react'
import { FaArrowRight, FaBolt, FaCalendarCheck, FaChalkboardTeacher, FaChevronDown, FaMapMarkerAlt, FaPlay, FaRegStar, FaSchool, FaUserGraduate, FaUsers, FaPhone, FaEnvelope, FaFacebook, FaTelegram, FaInstagram, FaFileUpload, FaUser, FaBriefcase, FaYoutube } from 'react-icons/fa'
import { MdArrowRightAlt } from 'react-icons/md'
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import event from '../assets/img/event.jpg'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { BsBookshelf } from 'react-icons/bs';
import { LiaUserGraduateSolid } from 'react-icons/lia';
import { Link } from 'react-router';
import logo from '../assets/img/BZwhite.png'
import useMeasure from "react-use-measure"
import PhoneInput from '../components/PhoneInput'
import Header from '../components/Header'
function useHashScroll() {
  useEffect(() => {
    const scrollToHash = (behavior = "auto") => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.slice(1);

      let tries = 0;
      const maxTries = 30; // ~0.5s

      const tick = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
          return;
        }

        tries += 1;
        if (tries < maxTries) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    // ✅ Initial: auto (sakrashsiz)
    setTimeout(() => scrollToHash("auto"), 0);

    // ✅ Hash o‘zgarsa: smooth
    const onHashChange = () => scrollToHash("smooth");
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
}

const GoogleSheetsService = {
  // ✅ Google Apps Script Web App URLs
  CONTACT_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbyO5rwmugxFXI7XUQiU2queSY_c5kkQIPTLGGYH3l5A1vImC4sC8gELjWiFJH4porgf/exec",
  EVENT_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbyWmlHNp5ovbJkQnIMgGkHPx4ApKbhKnnMC8nYMe1qphAVzb3CUSzIRicp_OYOq2Ops/exec",

  async submitForm(data, formType, scriptUrl) {
    try {
      // ✅ URL bor-yo’qligini tekshiramiz
      if (!scriptUrl || !scriptUrl.includes("script.google.com")) {
        throw new Error("Apps Script URL topilmadi yoki noto’g’ri")
      }

      const fd = new FormData()

      // ✅ Add all form data
      Object.keys(data || {}).forEach((key) => {
        const val = data[key]

        // file fields
        if (key === "ieltsCertificate" || key === "cv") {
          if (val) fd.append(key, val)
          return
        }

        fd.append(key, val ?? "")
      })

      // ✅ Add meta
      fd.append("formType", formType)
      fd.append("timestamp", new Date().toISOString())

      await fetch(scriptUrl, {
        method: "POST",
        body: fd,
        mode: "no-cors", // GAS uchun (client-side)
      })

      return { success: true }
    } catch (error) {
      console.error("Google Sheets submission error:", error)
      throw error
    }
  },

  submitEventForm(formData) {
    return this.submitForm(formData, "event_registration", this.EVENT_SCRIPT_URL)
  },

  submitContactForm(formData) {
    return this.submitForm(formData, "contact_form", this.CONTACT_SCRIPT_URL)
  },

  submitCourseForm(formData) {
    return this.submitForm(formData, "course_registration", this.CONTACT_SCRIPT_URL)
  },
}
const TelegramBotService = {
  // ⚠️ BOT_TOKEN frontendda ochiq – faqat test yoki yopiq loyiha uchun!
  // @bilimziyoforwardbot — "Bilim Ziyo HR | SAYT" kanaliga forward qiladi
  BOT_TOKEN: '8824044382:AAERUREwfvWCu8B42J66K-jJsmc8I843MrY',

  // ✅ Public kanal bo‘lsa:
  CHAT_ID: '-1003290075200',


  // Universal POST — Telegram `ok:false` ni tekshiradi va 429 (flood limit)da
  // retry_after bo'yicha qayta uradi. Xato bo'lsa throw qiladi (jimgina yutilmaydi).
  async _post(url, options, attempt = 0) {
    let result;
    try {
      const response = await fetch(url, options);
      result = await response.json();
    } catch (error) {
      // Tarmoq xatosi — bir necha marta qayta uramiz
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this._post(url, options, attempt + 1);
      }
      console.error('Telegram tarmoq xatosi:', error);
      throw error;
    }

    // Flood limit — kutib qayta yuboramiz
    if (!result.ok && result.error_code === 429 && attempt < 5) {
      const retryAfter = (result.parameters?.retry_after ?? 2) + 1;
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      return this._post(url, options, attempt + 1);
    }

    if (!result.ok) {
      console.error('Telegram API xatosi:', result);
      throw new Error(result.description || 'Telegram API xatosi');
    }
    return result;
  },

  async sendMessage(text) {
    return this._post(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: this.CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });
  },

  async sendDocument(formData) {
    return this._post(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData,
    });
  },

  async sendVacancyApplication(data) {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));

    // 📋 Kanalga yuboriladigan xabar
    const message = `
<b>📋 YANGI VAKANSIYA ARIZASI</b>

<b>👤 Ism-sharif:</b> ${data.name}
<b>📞 Telefon:</b> ${data.phone}
<b>🎂 Tug'ilgan sana:</b> ${data.birthDate}
<b>🌐 Tillari:</b> ${data.languages}
<b>📍 Manzil:</b> ${data.address}
<b>💼 Lavozim:</b> ${data.position}
<b>🎓 Ma'lumoti:</b> ${data.education}
<b>💼 Tajriba:</b> ${data.experience}
<b>📝 Qo'shimcha ma'lumot:</b> ${data.additionalInfo}
<b>🗣️ Til:</b> ${data.language || 'UZ'}

<b>⏰ Yuborilgan vaqt:</b> ${new Date().toLocaleString()}
      `;

    // 1) Matnli xabar
    await this.sendMessage(message);

    // 2) IELTS sertifikat (kanalga tez-tez yuborishda flood limitga tushmaslik uchun pauza)
    if (data.ieltsCertificate) {
      await delay(700);
      const ieltsFormData = new FormData();
      ieltsFormData.append('chat_id', this.CHAT_ID);
      ieltsFormData.append('document', data.ieltsCertificate);
      ieltsFormData.append('caption', '📄 IELTS Sertifikati');
      await this.sendDocument(ieltsFormData);
    }

    // 3) CV / Rezyume
    if (data.cv) {
      await delay(700);
      const cvFormData = new FormData();
      cvFormData.append('chat_id', this.CHAT_ID);
      cvFormData.append('document', data.cv);
      cvFormData.append('caption', '📄 CV / Rezyume');
      await this.sendDocument(cvFormData);
    }

    return { success: true };
  }
};

const BASE_URL = 'https://backend.bilimziyo.uz';

const translations = {
  UZ: {
    hero: {
      title: "Yoshlar kelajagi uchun eng yaxshi",
      subtitle: " yo'l shu yerdan boshlanadi",
      description: `15yil ichida "Bilim Ziyo", 20 000 dan ortiq o'quvchilarga ta'lim berdi va 1000 ga yaqin natijalarni qo'lga kiritdi!`,
      registerBtn: "Ro'xatdan o'tish",
      schoolBtn: "Xususiy Maktab"
    },
    features: {
      title: "Nima uchun bizning o'quv markaz?",
      items: [
        {
          id: 1,
          icon: <FaRegStar size={40} />,
          title: "15 yillik tajriba",
        },
        {
          id: 2,
          icon: <FaUserGraduate size={40} />,
          title: "20 000 ga yaqin o'quvchi bizni tanlagan",
        },
        {
          id: 3,
          icon: <FaSchool size={40} />,
          title: "3 ta filialga ega",
        },
        {
          id: 4,
          icon: <FaUsers size={40} />,
          title: "50 dan ortiq tajribali va malakali ustozlar biz bilan",
        },
      ]
    },
    teachers: {
      title: "Bizning",
      subtitle: "jamoamiz:",
      yearsExp: "yillik tajriba",
      students: "o'quvchi o'qitdi"
    },
    teachingTeam: {
      title: "O'qituvchilarimiz",
      subtitle: "haqida",
      joinTeam: "Jamoamizga qo'shiling",
      subjects: {
        english: "Ingliz tili",
        math: "Matematika",
        russian: "Rus tili",
        korean: "Koreys tili",
        programming: "Dasturlash",
        drawing: "Rasm chizish",
        physics: "Fizika",
        chemistry: "Kimyo"
      }
    },
    joinForm: {
      title: "Jamoamizga qo'shiling",
      name: "Ism-sharifingiz",
      phone: "Telefon raqamingiz",
      birthDate: "Tug'ilgan sanangiz",
      languages: "Qaysi tillarni bilasiz?",
      address: "Yashash manzilingiz",
      position: "Qaysi lavozimda ishlamoqchisiz?",
      positions: {
        teacher: "O'qituvchi",
        assistant: "Yordamchi o'qituvchi",
        admin: "Administrator",
        cashier: "Kassir",
        other: "Boshqa"
      },
      education: "Ma'lumotingiz (qayerda o'qigansiz?)",
      experience: "Ish tajribangiz (qayerda va qancha vaqt ishlagansiz?)",
      ieltsCertificate: "IELTS sertifikatingiz rasmini yuklang",
      cv: "Rezyume/CV yuklang",
      additionalInfo: "Qo'shimcha ma'lumot yoki taklifingiz",
      upload: "Faylni yuklash",
      submit: "Ariza yuborish",
      close: "Yopish",
      additionalQuestions: "Agar yana qo'shimcha savollar bo'lsa: @BilimZiyoHR'ga yozishingiz mumkin!",
      required: "* Majburiy maydonlar",
      ieltsRequired: "IELTS sertifikati faqat o'qituvchi yoki yordamchi o'qituvchi tanlaganda majburiy"
    },
    results: {
      title: "Bizning",
      subtitle: "natijalarimiz:",
      ielts: "IELTS",
      cefr: "CEFR"
    },
    courses: {
      title: "Bizning",
      subtitle: "kurslarimiz:",
      details: {
        duration: "Davomiylik:",
        level: "Daraja:",
        format: "Format:",
        price: "Narx:",
        features: "Kurs imkoniyatlari:",
        month: "so'm/oyiga"
      },
      registerBtn: "kursiga yozilish"

    },
    faq: {
      title: "Ko'p so'raladigan",
      subtitle: "savollar:",
      items: [
        {
          q: "Nimaga aynan men bu dargohda o'qishim kerak?",
          a: "Barcha qulayliklar, sharoitlar, sifatli o'quv dasturi, tajribali ustozlar, yordamchi ustozlar, qo'shimcha dars qilish uchun 'Coworking space' zali, yakshanba kungi tadbirlar va boshqa imkoniyatlar bilan birga, siz erishmoqchi bo'lgan natijagacha siz bilan teng harakat qilamiz!"
        },
        {
          q: "Qanday o'quv dasturlaridan foydalaniladi?",
          a: "Xalqaro darajadagi Oxford University Press nashriyotining eng samarali o'quv dasturidan to'liq foydalanamiz!"
        },
        {
          q: "Kursdan natija olishimga kafolat bormi?",
          a: "Albatta bor. Agar siz o'qituvchimiz berayotgan topshiriqlarni o'z vaqtida 100% bajarib borsangiz, aniq yaxshi natija olasiz!"
        },
        {
          q: "Agar o'qishga qiynalsam va natija ko'rsata olmasam pulimni qaytarib olamanmi?",
          a: "Bizning maqsad sifatli ta'lim berish va bu hamma uchun. Agar o'qishga qiynalsangiz, biz sizga qo'shimcha yordamchi ustozlarni jalb qilamiz va bu orqali natijangizni sezilarli darajaga oshiramiz!"
        },
        {
          q: "Turk, Xitoy, Nemis, Fransuz tillari mavjudmi?",
          a: "3/2 filialimizda Turk tili, 2/2 filialimizda esa Nemis tili mavjud. Qolgan tillar hozircha yo'q. Agar qabul ochilsa ijtimoiy tarmoqlardagi kanallarimiz orqali habar beramiz!"
        },
        {
          q: "Dars materiallari qanday taqdim etiladi?",
          a: "Barcha o'quv materiallari zamonaviy darsliklar, multimedia resurslari va maxsus tayyorlangan o'quv qo'llanmalardan iborat. Onlayn platforma orqali qo'shimcha materiallar ham taqdim etiladi."
        },
        {
          q: "Chegirma yoki bonus berasizlarmi?",
          a: "Chegirma qila olmasakda, bizda o'qib eng yaxshi natija ko'rsatayotgan o'quvchilarni munosib taqdirlaymiz. Agar IELTS sertifikatidan 7.5 dan yuqori ball to'plasangiz, 1 000 000 so'mdan boshlab CashBack ham sovg'a qilamiz!"
        },
        {
          q: "Universitetga kirish uchun sizlarda tayyorlansam bo'ladimi?",
          a: "Ha albatta, bizda Ingliz, rus yoki koreys tilini to'liq o'rganib maxsus sertifikatni qo'lga kiritishingiz mumkin. IETLS, CEFR va TOPIK sertifikatlari bilan istalgan universitetga tayyor holda hujjat topshirishingiz mumkin!"
        },
        {
          q: "Necha yoshdan boshlab o'qishga qabul qilinadi?",
          a: "Asosan 2-sinfdan yuqori bo'lgan o'quvchilarni o'qishga qabul qilamiz!"
        },
        {
          q: "30-40 yoshlar ham o'qisa bo'ladimi?",
          a: "Agar sheriklaringiz bo'lsa, albatta dars tashkillashtirib berishimiz mumkin. Ammo boshqa holatda sizga boshqa takliflarimiz mavjud. Buning uchun o'quv markazimizga tashrif buyuring yoki +998 78 333 37 73 raqamiga qo'ng'iroq qiling!"
        },
      ]
    },
    advantages: {
      title: "Bizning",
      subtitle: "ustunliklarimiz:",
      items: [
        {
          icon: <FaBolt size={40} />,
          title: "Bepul coworking zone",
          desc: "O'quvchilar darsdan so'ng o'qish yoki mustaqil ishlash uchun qulay joy!",
        },
        {
          icon: <FaUsers size={40} />,
          title: "Yordamchi ustozlar",
          desc: "Har bir o'quvchiga alohida yondashuv bilan yaqindan yordam beradigan yordamchi ustozlar qo'shimcha BEPUL darslar olib boradi!",
        },
        {
          icon: <FaCalendarCheck size={40} />,
          title: "Yakshanba tadbirlari",
          desc: "Har yakshanba - masterklasslar, viktorinalar va motivatsion uchrashuvlar bo'lib o'tadi!",
        },
        {
          icon: <FaMapMarkerAlt size={40} />,
          title: "Eng qulay lokatsiya",
          desc: "Filiallarimiz shaharning markaziy va qulay joylarida joylashgan!",
        },
      ]
    },
    gallery: {
      title: "Bizning",
      subtitle: "galereya:",
      items: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
          title: "Sinflarimiz",
          desc: "Zamonaviy jihozlangan sinflar"
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=60",
          title: "Kutubxona",
          desc: "Keng kutubxona zali"
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
          title: "Laboratoriya",
          desc: "Zamonaviy laboratoriya"
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
          title: "Sport Zali",
          desc: "Keng sport maydoni"
        },
        {
          id: 5,
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
          title: "O'quv Jarayoni",
          desc: "Samarali o'quv jarayoni"
        },
        {
          id: 6,
          src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
          title: "Tadbir",
          desc: "Madaniy tadbirlar"
        },
      ]
    },
    events: {
      title: "Sunday",
      subtitle: '"event"lar:',
      registerBtn: "Tadbirlarga ro'yxatdan o'ting",
      namePlaceholder: "Ism Familiyangiz",
      agePlaceholder: "Yoshingiz",
      phonePlaceholder: "Telefon raqamingiz",
      submitBtn: "Tadbirlarga ro'yxatdan o'ting"
    },
    contact: {
      title: "Biz bilan bog'laning",
      name: "Ism sharif",
      age: "Yoshi",
      phone1: "Telefon raqam 1",
      phone2: "Telefon raqam 2",
      course: "Kursni tanlang",
      format: "O'qish formati",
      time: "Qulay vaqtni tanlang",
      selectTime: "Vaqtni tanlang",
      submit: "Yuborish",
      formats: [
        { value: "guruh", label: "Guruh bilan" },
        { value: "mini", label: "Mini guruh" },
        { value: "individual", label: "Alohida 1-1" }
      ]
    },
    footer: {
      description: "14 yillik tajribaga ega o'quv markazi. Sizning muvaffaqiyatingiz - bizning g'ururimiz.",
      courses: "Kurslar",
      branches: "Filiallar",
      contact: "Bog'lanish",
      copyright: "© 2024 Study Center. Barcha huquqlar himoyalangan."
    },
    common: {
      mainNumber: "Asosiy raqam",
      additionalNumber: "Qo'shimcha raqam",
      email: "Email",
      select: "Tanlang...",
      close: "Yopish",
      clickToView: "Ko'rish uchun bosing"
    }
  },
  RU: {
    hero: {
      title: "Лучший путь к будущему молодежи",
      subtitle: "начинается здесь",
      description: `За 15 лет "Bilim Ziyo" обучил более 20 000 студентов и добился около 1000 результатов!`,
      registerBtn: "Зарегистрироваться",
      schoolBtn: "Частная школа"
    },
    features: {
      title: "Почему именно наш учебный центр?",
      items: [
        {
          id: 1,
          icon: <FaRegStar size={40} />,
          title: "15 лет опыта",
        },
        {
          id: 2,
          icon: <FaUserGraduate size={40} />,
          title: "Более 20 000 студентов выбрали нас",
        },
        {
          id: 3,
          icon: <FaSchool size={40} />,
          title: "3 филиала",
        },
        {
          id: 4,
          icon: <FaUsers size={40} />,
          title: "Более 50 опытных и квалифицированных учителей с нами",
        },
      ]
    },
    teachers: {
      title: "Наша",
      subtitle: "команда:",
      yearsExp: "лет опыта",
      students: "студентов обучил"
    },
    teachingTeam: {
      title: "Наши",
      subtitle: "преподаватели",
      joinTeam: "Присоединиться к команде",
      subjects: {
        english: "Английский язык",
        math: "Математика",
        russian: "Русский язык",
        korean: "Корейский язык",
        programming: "Программирование",
        drawing: "Рисование",
        physics: "Физика",
        chemistry: "Химия"
      }
    },
    joinForm: {
      title: "Присоединиться к команде",
      name: "Ваше ФИО",
      phone: "Ваш номер телефона",
      birthDate: "Дата рождения",
      languages: "Какие языки вы знаете?",
      address: "Адрес проживания",
      position: "На какую должность претендуете?",
      positions: {
        teacher: "Преподаватель",
        assistant: "Помощник преподавателя",
        admin: "Администратор",
        cashier: "Кассир",
        other: "Другое"
      },
      education: "Ваше образование (где учились?)",
      experience: "Опыт работы (где и сколько работали?)",
      ieltsCertificate: "Загрузите фото сертификата IELTS",
      cv: "Загрузите резюме/CV",
      additionalInfo: "Дополнительная информация или предложения",
      upload: "Загрузить файл",
      submit: "Отправить заявку",
      close: "Закрыть",
      additionalQuestions: "Если есть дополнительные вопросы: пишите @BilimZiyoHR!",
      required: "* Обязательные поля",
      ieltsRequired: "Сертификат IELTS обязателен только для преподавателя или помощника преподавателя"
    },
    results: {
      title: "Наши",
      subtitle: "результаты:",
      ielts: "IELTS",
      cefr: "CEFR"
    },
    courses: {
      title: "Наши",
      subtitle: "курсы:",
      details: {
        duration: "Продолжительность:",
        level: "Уровень:",
        format: "Формат:",
        price: "Стоимость:",
        features: "Возможности курса:",
        month: "сом/месяц"
      },
      registerBtn: "записаться на курс"
    },
    faq: {
      title: "Часто задаваемые",
      subtitle: "вопросы:",
      items: [
        {
          q: "Почему именно я должен учиться в этом центре?",
          a: "Все удобства, условия, качественная учебная программа, опытные учителя, помощники-учителя, коворкинг-зона для дополнительных занятий, воскресные мероприятия и другие возможности вместе с нами - мы будем работать с вами до достижения желаемого результата!"
        },
        {
          q: "Какие учебные программы используются?",
          a: "Мы полностью используем самую эффективную учебную программу от Oxford University Press международного уровня!"
        },
        {
          q: "Есть ли гарантия результата от курса?",
          a: "Конечно есть. Если вы будете выполнять 100% заданий, которые дает наш преподаватель, вовремя, вы обязательно получите хороший результат!"
        },
        {
          q: "Если мне будет трудно учиться и я не смогу показать результат, могу ли я вернуть свои деньги?",
          a: "Наша цель - давать качественное образование, и это для всех. Если вам будет трудно учиться, мы привлечем дополнительных помощников-учителей и значительно улучшим ваш результат!"
        },
        {
          q: "Есть ли турецкий, китайский, немецкий, французский языки?",
          a: "В 3/2 наших филиалах есть турецкий язык, в 2/2 - немецкий. Остальные языки пока недоступны. Если набор откроется, сообщим в наших социальных сетях!"
        },
        {
          q: "Как предоставляются учебные материалы?",
          a: "Все учебные материалы состоят из современных учебников, мультимедийных ресурсов и специально подготовленных учебных пособий. Дополнительные материалы также предоставляются через онлайн-платформу."
        },
        {
          q: "Предоставляете ли вы скидки или бонусы?",
          a: "Хотя мы не можем предоставить скидки, мы достойно награждаем студентов, которые показывают лучшие результаты. Если вы наберете более 7,5 баллов на сертификате IELTS, мы также подарим CashBack от 1 000 000 сумов!"
        },
        {
          q: "Можно ли у вас подготовиться к поступлению в университет?",
          a: "Да, конечно, у нас вы можете полностью выучить английский, русский или корейский язык и получить специальный сертификат. С сертификатами IELTS, CEFR и TOPIK вы можете подать документы в любой университет!"
        },
        {
          q: "С какого возраста принимают на обучение?",
          a: "В основном мы принимаем учащихся выше 2-го класса!"
        },
        {
          q: "Могут ли учиться люди 30-40 лет?",
          a: "Если у вас есть партнеры, мы обязательно организуем занятия. Но в других случаях у нас есть другие предложения для вас. Посетите наш учебный центр или позвоните по номеру +998 78 333 37 73!"
        },
      ]
    },
    advantages: {
      title: "Наши",
      subtitle: "преимущества:",
      items: [
        {
          icon: <FaBolt size={40} />,
          title: "Бесплатная коворкинг-зона",
          desc: "Удобное место для студентов для учебы или самостоятельной работы после занятий!",
        },
        {
          icon: <FaUsers size={40} />,
          title: "Помощники-учителя",
          desc: "Помощники-учителя, которые помогают каждому студенту с индивидуальным подходом, проводят дополнительные БЕСПЛАТНЫЕ занятия!",
        },
        {
          icon: <FaCalendarCheck size={40} />,
          title: "Воскресные мероприятия",
          desc: "Каждое воскресенье проходят мастер-классы, викторины и мотивационные встречи!",
        },
        {
          icon: <FaMapMarkerAlt size={40} />,
          title: "Самое удобное расположение",
          desc: "Наши филиалы расположены в центральных и удобных местах города!",
        },
      ]
    },
    gallery: {
      title: "Наша",
      subtitle: "галерея:",
      items: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
          title: "Наши классы",
          desc: "Современные оснащенные классы"
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=60",
          title: "Библиотека",
          desc: "Просторный читальный зал"
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
          title: "Лаборатория",
          desc: "Современная лаборатория"
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
          title: "Спортзал",
          desc: "Просторная спортивная площадка"
        },
        {
          id: 5,
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
          title: "Учебный процесс",
          desc: "Эффективный учебный процесс"
        },
        {
          id: 6,
          src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
          title: "Мероприятие",
          desc: "Культурные мероприятия"
        },
      ]
    },
    events: {
      title: "Воскресные",
      subtitle: "мероприятия:",
      registerBtn: "Зарегистрироваться на мероприятия",
      namePlaceholder: "Ваше имя и фамилия",
      agePlaceholder: "Ваш возраст",
      phonePlaceholder: "Ваш номер телефона",
      submitBtn: "Зарегистрироваться"
    },
    contact: {
      title: "Свяжитесь с нами",
      name: "Имя и фамилия",
      age: "Возраст",
      phone1: "Номер телефона 1",
      phone2: "Номер телефона 2",
      course: "Выберите курс",
      format: "Формат обучения",
      time: "Выберите удобное время",
      selectTime: "Выберите время",
      submit: "Отправить",
      formats: [
        { value: "guruh", label: "В группе" },
        { value: "mini", label: "Мини-группа" },
        { value: "individual", label: "Индивидуально 1-1" }
      ]
    },
    footer: {
      description: "Учебный центр с 14-летним опытом. Ваш успех - наша гордость.",
      courses: "Курсы",
      branches: "Филиалы",
      contact: "Контакты",
      copyright: "© 2024 Study Center. Все права защищены."
    },
    common: {
      mainNumber: "Основной номер",
      additionalNumber: "Дополнительный номер",
      email: "Email",
      select: "Выберите...",
      close: "Закрыть",
      clickToView: "Нажмите для просмотра"
    }
  },
  EN: {
    hero: {
      title: "The best path for youth's future",
      subtitle: "starts here",
      description: `In 15 years, "Bilim Ziyo" has taught over 20,000 students and achieved about 1,000 results!`,
      registerBtn: "Register",
      schoolBtn: "Private School"
    },
    features: {
      title: "Why our study center?",
      items: [
        {
          id: 1,
          icon: <FaRegStar size={40} />,
          title: "15 years of experience",
        },
        {
          id: 2,
          icon: <FaUserGraduate size={40} />,
          title: "Over 20,000 students chose us",
        },
        {
          id: 3,
          icon: <FaSchool size={40} />,
          title: "3 branches",
        },
        {
          id: 4,
          icon: <FaUsers size={40} />,
          title: "Over 50 experienced and qualified teachers with us",
        },
      ]
    },
    teachers: {
      title: "Our",
      subtitle: "team:",
      yearsExp: "years of experience",
      students: "students taught"
    },
    teachingTeam: {
      title: "Our",
      subtitle: "Teaching Staff",
      joinTeam: "Join Our Team",
      subjects: {
        english: "English Language",
        math: "Mathematics",
        russian: "Russian Language",
        korean: "Korean Language",
        programming: "Programming",
        drawing: "Drawing",
        physics: "Physics",
        chemistry: "Chemistry"
      }
    },
    joinForm: {
      title: "Join Our Team",
      name: "Your Full Name",
      phone: "Your Phone Number",
      birthDate: "Date of Birth",
      languages: "Which languages do you know?",
      address: "Your Address",
      position: "Which position are you interested in?",
      positions: {
        teacher: "Teacher",
        assistant: "Assistant Teacher",
        admin: "Administrator",
        cashier: "Cashier",
        other: "Other"
      },
      education: "Your Education (where did you study?)",
      experience: "Work Experience (where and how long have you worked?)",
      ieltsCertificate: "Upload IELTS Certificate Photo",
      cv: "Upload Resume/CV",
      additionalInfo: "Additional Information or Suggestions",
      upload: "Upload File",
      submit: "Submit Application",
      close: "Close",
      additionalQuestions: "If you have additional questions: write to @BilimZiyoHR!",
      required: "* Required fields",
      ieltsRequired: "IELTS certificate is required only for Teacher or Assistant Teacher positions"
    },
    results: {
      title: "Our",
      subtitle: "results:",
      ielts: "IELTS",
      cefr: "CEFR"
    },
    courses: {
      title: "Our",
      subtitle: "courses:",
      details: {
        duration: "Duration:",
        level: "Level:",
        format: "Format:",
        price: "Price:",
        features: "Course features:",
        month: "sum/month"
      },
      registerBtn: "register for course"
    },
    faq: {
      title: "Frequently asked",
      subtitle: "questions:",
      items: [
        {
          q: "Why should I study at this center?",
          a: "All the amenities, conditions, quality curriculum, experienced teachers, assistant teachers, coworking space for additional classes, Sunday events and other opportunities together with us - we will work with you until you achieve the desired result!"
        },
        {
          q: "What study programs are used?",
          a: "We fully use the most effective study program from Oxford University Press at an international level!"
        },
        {
          q: "Is there a guarantee of results from the course?",
          a: "Of course there is. If you complete 100% of the assignments given by our teacher on time, you will definitely get good results!"
        },
        {
          q: "If I have difficulty studying and cannot show results, can I get my money back?",
          a: "Our goal is to provide quality education, and this is for everyone. If you have difficulty studying, we will involve additional assistant teachers and significantly improve your results!"
        },
        {
          q: "Are Turkish, Chinese, German, French languages available?",
          a: "Turkish language is available in 3/2 of our branches, and German language in 2/2. Other languages are not available yet. If enrollment opens, we will inform you through our social media channels!"
        },
        {
          q: "How are study materials provided?",
          a: "All study materials consist of modern textbooks, multimedia resources and specially prepared study guides. Additional materials are also provided through an online platform."
        },
        {
          q: "Do you offer discounts or bonuses?",
          a: "Although we cannot offer discounts, we adequately reward students who show the best results. If you score more than 7.5 on the IELTS certificate, we also give CashBack starting from 1,000,000 soums!"
        },
        {
          q: "Can I prepare for university entrance with you?",
          a: "Yes, of course, with us you can fully learn English, Russian or Korean and get a special certificate. With IELTS, CEFR and TOPIK certificates, you can apply to any university!"
        },
        {
          q: "From what age are students accepted?",
          a: "We mainly accept students above 2nd grade!"
        },
        {
          q: "Can 30-40 year olds study?",
          a: "If you have partners, we will definitely organize classes. But in other cases, we have other offers for you. Visit our study center or call +998 78 333 37 73!"
        },
      ]
    },
    advantages: {
      title: "Our",
      subtitle: "advantages:",
      items: [
        {
          icon: <FaBolt size={40} />,
          title: "Free coworking zone",
          desc: "Convenient place for students to study or work independently after classes!",
        },
        {
          icon: <FaUsers size={40} />,
          title: "Assistant teachers",
          desc: "Assistant teachers who help each student with an individual approach conduct additional FREE classes!",
        },
        {
          icon: <FaCalendarCheck size={40} />,
          title: "Sunday events",
          desc: "Every Sunday - master classes, quizzes and motivational meetings are held!",
        },
        {
          icon: <FaMapMarkerAlt size={40} />,
          title: "Most convenient location",
          desc: "Our branches are located in central and convenient locations in the city!",
        },
      ]
    },
    gallery: {
      title: "Our",
      subtitle: "gallery:",
      items: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
          title: "Our Classes",
          desc: "Modern equipped classrooms"
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=60",
          title: "Library",
          desc: "Spacious library hall"
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
          title: "Laboratory",
          desc: "Modern laboratory"
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
          title: "Gym",
          desc: "Spacious sports ground"
        },
        {
          id: 5,
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
          title: "Study Process",
          desc: "Effective study process"
        },
        {
          id: 6,
          src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
          title: "Event",
          desc: "Cultural events"
        },
      ]
    },
    events: {
      title: "Sunday",
      subtitle: "events:",
      registerBtn: "Register for events",
      namePlaceholder: "Your full name",
      agePlaceholder: "Your age",
      phonePlaceholder: "Your phone number",
      submitBtn: "Register"
    },
    contact: {
      title: "Contact us",
      name: "Full name",
      age: "Age",
      phone1: "Phone number 1",
      phone2: "Phone number 2",
      course: "Select course",
      format: "Study format",
      time: "Select convenient time",
      selectTime: "Select time",
      submit: "Submit",
      formats: [
        { value: "guruh", label: "In group" },
        { value: "mini", label: "Mini group" },
        { value: "individual", label: "Individually 1-1" }
      ]
    },
    footer: {
      description: "Study center with 14 years of experience. Your success is our pride.",
      courses: "Courses",
      branches: "Branches",
      contact: "Contacts",
      copyright: "© 2024 Study Center. All rights reserved."
    },
    common: {
      mainNumber: "Main number",
      additionalNumber: "Additional number",
      email: "Email",
      select: "Select...",
      close: "Close",
      clickToView: "Click to view"
    }
  }
};

const StudyCenter = () => {
  const { activeLanguage, getLanguageContent } = useLanguage();
  const [ref, { height }] = useMeasure()
  const [teamData, setTeamData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [cefrResults, setCefrResults] = useState([]);
  const [ieltsResults, setIeltsResults] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState({
    team: true,
    teachers: true,
    courses: true,
    cefr: true,
    ielts: true,
    gallery: true
  });
  const [error, setError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const currentContent = getLanguageContent(translations);
  
  // Helper function to get localized field
  const getLocalizedField = useCallback((item, field) => {
    if (!item) return '';
  
    const suffix =
      activeLanguage.code === 'RU' ? '_ru' :
      activeLanguage.code === 'EN' ? '_en' : '';
  
    return item[`${field}${suffix}`]?.toString().trim() || item[field] || '';
  }, [activeLanguage.code]);
  
  // Helper function to get image URL
  const getImageUrl = useCallback((imageData) => {
    if (!imageData) return 'https://via.placeholder.com/300x300.png?text=No+Image';
  
    if (imageData.formats?.small?.url)
      return `${BASE_URL}${imageData.formats.small.url}`;
  
    if (imageData.formats?.medium?.url)
      return `${BASE_URL}${imageData.formats.medium.url}`;
  
    if (imageData.url)
      return `${BASE_URL}${imageData.url}`;
  
    return 'https://via.placeholder.com/300x300.png?text=No+Image';
  }, []);
  
const branches = [
  {name:"Karvon 3/2", link:"https://www.google.com/maps/place/23GF%2B6X2,+Angren,+Toshkent+Viloyati,+Oʻzbekiston/@41.0257195,70.0748662,146m/data=!3m1!1e3!4m6!3m5!1s0x38afe98ad77c9f73:0x34fcfef85a0ffa85!8m2!3d41.0257247!4d70.0748298!16s%2Fg%2F11lmntrs9v?entry=tts&g_ep=EgoyMDI1MTIwOS4wIPu8ASoASAFQAw%3D%3D&skid=1df2538d-1fb8-4165-b342-d4fdf125210e"},
  {name:"Angren 2/2",link:"https://www.google.com/maps/search/41.019491,+70.087877?entry=tts&g_ep=EgoyMDI1MTIwOS4wIPu8ASoASAFQAw%3D%3D&skid=04b2b2ed-f16d-48cd-95b4-ecc1a549a4dd"}
]

useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          teamRes,
          teachersRes,
          coursesRes,
          cefrRes,
          ieltsRes,
          galleryRes
        ] = await Promise.all([
          fetch(`${BASE_URL}/api/teams?populate=*`),
          fetch(`${BASE_URL}/api/teachers?populate=*`),
          fetch(`${BASE_URL}/api/courses?populate=*`),
          fetch(`${BASE_URL}/api/cefrs?populate=*`),
          fetch(`${BASE_URL}/api/ieltsses?populate=*`),
          fetch(`${BASE_URL}/api/galleries?populate=*`)
        ]);
  
        const [
          teamData,
          teachersData,
          coursesData,
          cefrData,
          ieltsData,
          galleryData
        ] = await Promise.all([
          teamRes.json(),
          teachersRes.json(),
          coursesRes.json(),
          cefrRes.json(),
          ieltsRes.json(),
          galleryRes.json()
        ]);
  
        setTeamData(teamData.data || []);
        setTeachersData(teachersData.data || []);
        setCoursesData(coursesData.data || []);
        setCefrResults(cefrData.data || []);
        setIeltsResults(ieltsData.data || []);
        setGalleryData(galleryData.data || []);
  
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading({
          team: false,
          teachers: false,
          courses: false,
          cefr: false,
          ielts: false,
          gallery: false
        });
      }
    };
  
    fetchAllData();
  }, []);
  

  // Format courses data for display
  const formattedCourses = useMemo(() => {
    const colors = ["bg-blue-500","bg-cyan-500","bg-green-500","bg-red-500","bg-purple-500","bg-yellow-500"];
  
    return coursesData.map(course => {
      // Get localized features based on language
      let features = [];
      
      if (activeLanguage.code === 'RU' && course.feature_ru) {
        features = course.feature_ru.map(f => f.title || '');
      } else if (activeLanguage.code === 'EN' && course.feature_en) {
        features = course.feature_en.map(f => f.title || '');
      } else if (course.feature) {
        features = course.feature.map(f => f.title || '');
      }
  
      return {
        id: course.id,
        name: getLocalizedField(course, 'kurs_name'),
        desc: getLocalizedField(course, 'kurs_desc'),
        icon: getImageUrl(course, 'kurs_icon'),
        color: colors[course.id % colors.length],
        details: {
          duration: `${course.kurs_davomiyligi || 6} ${
            activeLanguage.code === 'UZ' ? 'oy' :
            activeLanguage.code === 'RU' ? 'месяцев' : 'months'
          }`,
          price: `${course.kurs_narx?.toLocaleString() || '300,000'}`,
          features: features.filter(f => f.trim() !== '')
        }
      };
    });
  }, [coursesData, activeLanguage.code, getLocalizedField]);
  

  // Format teachers data for display
  const formattedTeachers = useMemo(() => {
    const colors = ["bg-blue-500","bg-cyan-500","bg-green-500","bg-red-500","bg-purple-500","bg-yellow-500"];
  
    return teamData.map(member => ({
      id: member.id,
      name: getLocalizedField(member, 'ism_familiya'),
      score: getLocalizedField(member, 'result'),
      img: getImageUrl(member.rasm),
      video: getImageUrl(member.video),
      exp: member.tajriba || 0,
      students: member.oquvchilar_soni || 0,
      color: colors[member.id % colors.length],
      desc: getLocalizedField(member, 'desc')
    }));
  }, [teamData, getLocalizedField, getImageUrl]);
  

  const formattedIeltsResults = useMemo(() =>
    ieltsResults.map(r => ({
      id: r.id,
      name: r.name,
      score: `IELTS ${r.result}`,
      img: getImageUrl(r.rasm)
    }))
  , [ieltsResults, getImageUrl]);
  
  const formattedCefrResults = useMemo(() =>
    cefrResults.map(r => ({
      id: r.id,
      name: r.name,
      score: `CEFR ${r.result}`,
      img: getImageUrl(r.Rasm)
    }))
  , [cefrResults, getImageUrl]);
  
  const formattedGallery = useMemo(() =>
    galleryData.map(item => ({
      id: item.id,
      src: getImageUrl(item.image)
    }))
  , [galleryData, getImageUrl]);
  

  // Format teaching staff from teachers data
  const teachingStaff = teachersData.map((teacher, index) => {
    const images = [
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60"
    ];
    
    return {
      id: teacher.id,
      name: getLocalizedField(teacher, 'ism'),
      subject: getLocalizedField(teacher, 'fan'),
      image: getImageUrl(teacher.img) || images[index % images.length],
      experience: activeLanguage.code === 'UZ' ? "5 yillik tajriba" : 
                 activeLanguage.code === 'RU' ? "5 лет опыта" : 
                 "5 years experience",
      degree: activeLanguage.code === 'UZ' ? "Mutaxassis" : 
             activeLanguage.code === 'RU' ? "Специалист" : 
             "Specialist"
    };
  });

  // State variables
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    age: '',
    phone1: '',
    phone2: '',
    course: '',
    format: 'guruh',
    time: ''
  });
  
  // Event form state
  const [eventForm, setEventForm] = useState({
    name: '',
    age: '',
    phone: ''
  });
  
  // Join form state
  const [joinForm, setJoinForm] = useState({
    name: '',
    phone: '',
    birthDate: '',
    languages: '',
    address: '',
    position: '',
    education: '',
    experience: '',
    ieltsCertificate: null,
    cv: null,
    additionalInfo: ''
  });

  useEffect(() => {
    if (formattedTeachers.length) {
      setActiveTeacher(formattedTeachers[0]);
    }
  }, [formattedTeachers]);
  
  useEffect(() => {
    if (formattedCourses.length) {
      setActiveCourse(formattedCourses[0]);
    }
  }, [formattedCourses]);
  
  const loopImages = formattedGallery.length > 0 
    ? [...formattedGallery, ...formattedGallery]
    : [...currentContent.gallery.items, ...currentContent.gallery.items];
  
  const loopIeltsResults = formattedIeltsResults.length > 0
    ? [...formattedIeltsResults, ...formattedIeltsResults]
    : [{ id: 1, name: "Abdukarimov Oyatbek", score: "IELTS 9.0", img: "https://via.placeholder.com/300x350.png?text=Abdukarimov" }];
  
  const loopCefrResults = formattedCefrResults.length > 0
    ? [...formattedCefrResults, ...formattedCefrResults]
    : [{ id: 1, name: "Abdukarimov Oyatbek", score: "CEFR B2", img: "https://via.placeholder.com/300x350.png?text=Abdukarimov" }];

  // Background illustrations array
  const backgroundIcons = [
    { icon: <BookOpen className="w-6 h-6 lg:w-8 lg:h-8" />, style: "top-10 left-5 text-blue-200" },
    { icon: <GraduationCapIcon className="w-8 h-8 lg:w-10 lg:h-10" />, style: "top-20 right-10 text-blue-300" },
    { icon: <School2 className="w-10 h-10 lg:w-12 lg:h-12" />, style: "bottom-20 left-8 text-blue-100" },
    { icon: <Users2 className="w-7 h-7 lg:w-9 lg:h-9" />, style: "bottom-10 right-5 text-blue-400" },
    { icon: <BrainCircuit className="w-9 h-9 lg:w-11 lg:h-11" />, style: "top-1/3 left-1/4 text-blue-200" },
    { icon: <LightbulbIcon className="w-6 h-6 lg:w-8 lg:h-8" />, style: "top-1/2 right-1/4 text-blue-300" },
    { icon: <TargetIcon className="w-8 h-8 lg:w-10 lg:h-10" />, style: "bottom-1/3 left-1/3 text-blue-100" },
    { icon: <RocketIcon className="w-10 h-10 lg:w-12 lg:h-12" />, style: "top-40 right-20 text-blue-400" },
    { icon: <BsBookshelf className="w-7 h-7 lg:w-9 lg:h-9" />, style: "bottom-40 left-20 text-blue-200" },
    { icon: <LiaUserGraduateSolid className="w-9 h-9 lg:w-11 lg:h-11" />, style: "top-60 right-40 text-blue-300" },
    { icon: <FaChalkboardTeacher className="w-8 h-8 lg:w-10 lg:h-10" />, style: "bottom-60 left-40 text-blue-100" },
    { icon: <Globe2 className="w-10 h-10 lg:w-12 lg:h-12" />, style: "top-32 left-60 text-blue-400" },
  ];

  // Background Illustration Component
  const BackgroundIllustrations = ({ sectionClass = "" }) => (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${sectionClass}`}>

      {backgroundIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute opacity-10 ${item.style} hidden sm:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );

// ---------------------- FORM HANDLERS ----------------------
const handleContactChange = (e) => {
  const { name, value } = e.target;
  setContactForm(prev => ({ ...prev, [name]: value }));
};

const handleEventChange = (e) => {
  const { name, value } = e.target;
  setEventForm(prev => ({ ...prev, [name]: value }));
};

const handleJoinChange = (e) => {
  const { name, value } = e.target;
  setJoinForm(prev => ({ ...prev, [name]: value }));
};

const handleJoinFileChange = (e, field) => {
  const file = e.target.files[0];
  if (file) {
    setJoinForm(prev => ({ ...prev, [field]: file }));
  }
};

const handlePhoneChange = (value, field) => {
  if (field === 'phone1') {
    setContactForm(prev => ({ ...prev, phone1: value }));
  } else if (field === 'phone2') {
    setContactForm(prev => ({ ...prev, phone2: value }));
  } else if (field === 'phone') {
    setEventForm(prev => ({ ...prev, phone: value }));
    setJoinForm(prev => ({ ...prev, phone: value }));
  }
};

// ---------------------- SUBMIT HANDLERS ----------------------

// Contact form (misol uchun) - agar Sheetsga kerak bo‘lsa
const handleContactSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitting(true);

  try {
    const formData = {
      ...contactForm,
      language: activeLanguage.code,
      timestamp: new Date().toISOString(),
      formType: 'contact'
    };

    await GoogleSheetsService.submitContactForm(formData);

    setSubmitStatus({
      type: 'success',
      message: activeLanguage.code === 'UZ'
        ? "Muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz."
        : activeLanguage.code === 'RU'
        ? "Успешно отправлено! Мы свяжемся с вами в ближайшее время."
        : "Successfully submitted! We'll contact you soon."
    });

    setContactForm({
      name: '',
      age: '',
      phone1: '',
      phone2: '',
      course: '',
      format: 'guruh',
      time: ''
    });

    setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);

  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: activeLanguage.code === 'UZ'
        ? "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        : activeLanguage.code === 'RU'
        ? "Произошла ошибка. Пожалуйста, попробуйте еще раз."
        : "An error occurred. Please try again."
    });
    console.error('Contact form error:', error);
  } finally {
    setFormSubmitting(false);
  }
};

// Event form → Event sheet
const handleEventSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitting(true);

  try {
    const formData = {
      ...eventForm,
      language: activeLanguage.code,
      timestamp: new Date().toISOString(),
      formType: 'event' // <-- Apps Script uchun
    };

    await GoogleSheetsService.submitEventForm(formData);

    setSubmitStatus({
      type: 'success',
      message: activeLanguage.code === 'UZ'
        ? "Eventga muvaffaqiyatli ro'yxatdan o'tdingiz!"
        : activeLanguage.code === 'RU'
        ? "Вы успешно зарегистрировались на мероприятие!"
        : "Successfully registered for the event!"
    });

    setEventForm({ name: '', age: '', phone: '' });
    setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);

  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: activeLanguage.code === 'UZ'
        ? "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        : activeLanguage.code === 'RU'
        ? "Произошла ошибка. Пожалуйста, попробуйте еще раз."
        : "An error occurred. Please try again."
    });
    console.error('Event form error:', error);
  } finally {
    setFormSubmitting(false);
  }
};

// Join/Vacancy form → faqat Telegram
const handleJoinSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitting(true);

  try {
    await TelegramBotService.sendVacancyApplication({
      ...joinForm,
      language: activeLanguage.code
    });

    setSubmitStatus({
      type: 'success',
      message: activeLanguage.code === 'UZ'
        ? "Arizangiz muvaffaqiyatli yuborildi! Tez orada HR xodim siz bilan bog'lanadi."
        : activeLanguage.code === 'RU'
        ? "Ваша заявка успешно отправлена! Сотрудник HR свяжется с вами в ближайшее время."
        : "Your application has been successfully submitted! An HR representative will contact you soon."
    });

    // Reset form
    setJoinForm({
      name: '',
      phone: '',
      birthDate: '',
      languages: '',
      address: '',
      position: '',
      education: '',
      experience: '',
      ieltsCertificate: null,
      cv: null,
      additionalInfo: ''
    });

    setJoinModalOpen(false);
    setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);

  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: activeLanguage.code === 'UZ'
        ? "Xatolik yuz berdi. Iltimos, @BilimZiyoHR'ga to'g'ridan-to'g'ri yozing."
        : activeLanguage.code === 'RU'
        ? "Произошла ошибка. Пожалуйста, напишите напрямую @BilimZiyoHR."
        : "An error occurred. Please write directly to @BilimZiyoHR."
    });
    console.error('Join form error:', error);
  } finally {
    setFormSubmitting(false);
  }
};

// Course register → Qabul sheet
const handleCourseRegister = async (course) => {
  setFormSubmitting(true);

  try {
    const formData = {
      courseName: course.name,
      price: course.details.price,
      duration: course.details.duration,
      language: activeLanguage.code,
      timestamp: new Date().toISOString(),
      formType: 'course' // <-- Apps Script uchun
    };

    await GoogleSheetsService.submitCourseForm(formData);

    setSubmitStatus({
      type: 'success',
      message: activeLanguage.code === 'UZ'
        ? `${course.name} kursiga muvaffaqiyatli ro'yxatdan o'tdingiz!`
        : activeLanguage.code === 'RU'
        ? `Вы успешно зарегистрировались на курс ${course.name}!`
        : `Successfully registered for ${course.name} course!`
    });

    setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);

  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: activeLanguage.code === 'UZ'
        ? "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        : activeLanguage.code === 'RU'
        ? "Произошла ошибка. Пожалуйста, попробуйте еще раз."
        : "An error occurred. Please try again."
    });
    console.error('Course registration error:', error);
  } finally {
    setFormSubmitting(false);
  }
};

// ---------------------- UI COMPONENTS ----------------------
const openImageModal = (image) => setSelectedImage(image);
const closeImageModal = () => setSelectedImage(null);
const isIELTSRequired = joinForm.position === 'teacher' || joinForm.position === 'assistant';

const LoadingSpinner = ({ text = "Yuklanmoqda..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue mb-4"></div>
    <span className="text-gray-600">{text}</span>
  </div>
);

const StatusMessage = () => {
  if (!submitStatus.message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
        submitStatus.type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}
    >
      {submitStatus.message}
    </motion.div>
  );
};
useHashScroll();
  return (
    <div className='font-Main relative'>
      <StatusMessage />
      
      {/* Background illustrations for entire site */}
      <BackgroundIllustrations />

      {/* Floating Contact Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
      >
        <motion.button
          onClick={() => setContactOpen(!contactOpen)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 lg:p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPhone size={20} className="lg:w-6 lg:h-6" />
        </motion.button>

        <AnimatePresence>
          {contactOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute bottom-full right-0 mb-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200 min-w-64"
            >
              <a href="tel:+998783333773" className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <FaPhone className="text-green-600 w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <a href="tel:+998783333773">
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">+998 78 333 37 73</p>
                    <p className="text-xs lg:text-sm text-gray-600">{currentContent.common.mainNumber}</p>
                  </a>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <FaEnvelope className="text-purple-600 w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">Bilimziyo1@gmail.com</p>
                    <p className="text-xs lg:text-sm text-gray-600">{currentContent.common.email}</p>
                  </div>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <section id='hero' className='h-auto min-h-[87vh] py-10 lg:py-0 flex flex-col justify-center items-center relative overflow-hidden'>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0"></div>
        <BackgroundIllustrations sectionClass="z-0" />

        {/* Background elements */}
        <motion.div
          className="absolute top-20 left-5 lg:left-10 text-4xl lg:text-6xl opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >📚</motion.div>
        <motion.div
          className="absolute top-40 right-5 lg:right-20 text-3xl lg:text-5xl opacity-20"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        >✏️</motion.div>
        <motion.div
          className="absolute bottom-32 left-5 lg:left-20 text-2xl lg:text-4xl opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        >🔬</motion.div>
        <motion.div
          className="absolute bottom-40 right-4 lg:right-16 text-4xl lg:text-6xl opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        >🎓</motion.div>

        <div className="relative z-10 text-center px-4 lg:px-0">
          <motion.h1
            className='text-4xl lg:text-6xl text-center font-semibold leading-[1.2]'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {currentContent.hero.title} <br />
            <span className='italic text-blue font-semibold'>{currentContent.hero.subtitle}</span>
          </motion.h1>
          <motion.p
            className='font-normal text-base lg:text-lg mt-4 text-center leading-relaxed lg:leading-normal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          >
            {currentContent.hero.description}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-5 items-center mt-6 lg:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          >
            <a href='#contact' className="
              relative overflow-hidden 
              py-3 lg:py-2 pl-6 pr-3 
              bg-blue text-white 
              rounded-full flex gap-6 lg:gap-8 items-center
              group
              transition-all duration-500
              before:content-[''] before:absolute before:inset-0 
              before:bg-white before:translate-x-full before:transition-transform before:duration-500 before:rounded-full
              hover:before:translate-x-0
              border border-blue w-full sm:w-auto justify-center
            ">
              <span className="relative z-10 group-hover:text-blue transition-colors duration-500 text-sm lg:text-base">
                {currentContent.hero.registerBtn}
              </span>
              <div className="relative z-10 rounded-full w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center transition-colors duration-500 group-hover:bg-blue">
                <FaArrowRight className="text-blue rotate-[-45deg] transition-colors duration-500 group-hover:text-white w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </a>
            
            <a href='https://school.bilimziyo.uz/' className="
              relative overflow-hidden 
              px-6 lg:px-8 py-3 lg:py-5 border rounded-full border-blue text-blue
              group transition-all duration-500
              before:content-[''] before:absolute before:inset-0 
              before:bg-blue before:translate-x-full before:transition-transform before:duration-500 before:rounded-full
              hover:before:translate-x-0 w-full sm:w-auto text-center
            ">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white text-sm lg:text-base">
                {currentContent.hero.schoolBtn}
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className="py-12 lg:py-16 bg-gradient-to-b from-white to-blue/5 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl text-center font-semibold mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent?.features?.title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentContent?.features?.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                className="relative border border-blue group p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-blue/30 
                           bg-white transition-all duration-500 cursor-pointer overflow-hidden"
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  whileHover={{
                    y: [0, -6, 0],
                    transition: { repeat: Infinity, duration: 1, ease: "easeInOut" },
                  }}
                  className="text-blue flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                >
                  {React.cloneElement(item.icon, { size: window.innerWidth < 1024 ? 32 : 40 })}
                </motion.div>

                <p className="text-base lg:text-lg font-medium text-center transition-all duration-500 group-hover:text-blue">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id='teachers' className="py-12 lg:py-20 bg-gradient-to-b from-blue/5 to-white relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12 text-blue"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent?.teachers?.title}{" "}
            <span className="text-gray-800">{currentContent?.teachers?.subtitle}</span>
          </motion.h2>

          {loading.team ? (
            <LoadingSpinner text={activeLanguage.code === 'UZ' ? "O'qituvchilar yuklanmoqda..." : "Loading teachers..."} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{activeLanguage.code === 'UZ' ? "Xatolik yuz berdi:" : "Error:"} {error}</p>
            </div>
          ) : formattedTeachers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {activeLanguage.code === 'UZ' ? "Hozircha jamoa a'zolari mavjud emas" : "No team members available yet"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-start">
              {/* Teachers list */}
              <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-1/4 overflow-x-auto pb-4 lg:pb-0">
                {formattedTeachers.map((t) => (
                  <motion.div
                    key={t.id}
                    onClick={() => setActiveTeacher(t)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl cursor-pointer transition-all duration-300 min-w-[280px] lg:min-w-0
                      ${activeTeacher?.id === t.id ? "bg-blue text-white" : "hover:bg-blue/10 bg-white"}`}
                  >
                    <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full ${t.color}`} />
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm lg:text-base truncate ${activeTeacher?.id === t.id ? "text-white" : "text-gray-800"}`}>
                        {t.name}
                      </p>
                      <p className={`text-xs lg:text-sm ${activeTeacher?.id === t.id ? "text-white/80" : "text-gray-500"}`}>
                        {t.score}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected teacher details */}
              {activeTeacher && (
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center w-full lg:w-3/4">
                  {/* Video section */}
                  <motion.div
                    key={activeTeacher?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative rounded-2xl overflow-hidden shadow-lg w-full lg:w-auto"
                  >
                    <img
                      src={activeTeacher.video}
                      alt={activeTeacher.name}
                      className="w-full lg:w-[320px] xl:w-[400px] 2xl:w-[420px] h-64 lg:h-auto object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white text-blue flex items-center justify-center rounded-full shadow-md hover:scale-110 transition-transform">
                        <FaPlay size={18} className="lg:w-5 lg:h-5" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Description section */}
                  <motion.div
                    key={activeTeacher.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex flex-col gap-4 lg:gap-6 w-full"
                  >
                    <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                      {activeTeacher.desc}
                    </p>

                    <div className="flex gap-4 lg:gap-6">
                      <div className="bg-blue text-white rounded-xl px-4 lg:px-6 py-3 lg:py-4 flex flex-col items-center flex-1">
                        <span className="text-xl lg:text-3xl font-bold">{activeTeacher.exp}</span>
                        <span className="text-xs lg:text-sm opacity-80 text-center">{currentContent?.teachers?.yearsExp}</span>
                      </div>
                      <div className="bg-gray-100 text-blue rounded-xl px-4 lg:px-6 py-3 lg:py-4 flex flex-col items-center flex-1">
                        <span className="text-xl lg:text-3xl font-bold">
                          {activeTeacher.students.toLocaleString()}
                        </span>
                        <span className="text-xs lg:text-sm opacity-80 text-center">{currentContent?.teachers?.students}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Teaching Team Section */}
      <section id='team' className="py-12 lg:py-20 bg-gradient-to-b from-white to-blue/10 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12 text-blue"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent.teachingTeam.title}{" "}
            <span className="text-gray-800 italic">{currentContent.teachingTeam.subtitle}</span>
          </motion.h2>

          {/* Swiper for Teachers */}
          <div className="mb-12 lg:mb-16">
            {loading.teachers ? (
              <LoadingSpinner text={activeLanguage.code === 'UZ' ? "O'qituvchilar yuklanmoqda..." : "Loading teaching staff..."} />
            ) : teachingStaff.length === 0 ? (
              <p className="text-center text-gray-600 py-12">
                {activeLanguage.code === 'UZ' ? "O'qituvchilar ma'lumotlari mavjud emas" : "No teaching staff information available"}
              </p>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                slidesPerView={4}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="mySwiper"
              >
                {teachingStaff.map((teacher) => (
                  <SwiperSlide key={teacher.id}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                    >
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="text-lg lg:text-xl font-bold">{teacher.name}</h3>
                        <p className="text-sm opacity-90">{teacher.subject}</p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Join Team Button */}
          <motion.div
            id="Vacancy"
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setJoinModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full text-lg lg:text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <FaUser className="w-5 h-5 lg:w-6 lg:h-6" />
              {currentContent.teachingTeam.joinTeam}
              <FaArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Join Team Modal */}
      <AnimatePresence>
        {joinModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed h-full inset-0 bg-black/70 z-[100] flex items-start justify-start lg:items-center lg:justify-center p-0 lg:p-4 "
            onClick={() => setJoinModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="
              bg-white
              h-screen lg:h-full
              rounded-none lg:rounded-2xl
              shadow-2xl
              max-w-2xl w-full
              overflow-y-auto
            "
                onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-blue">{currentContent.joinForm.title}</h3>
                <button
                  onClick={() => setJoinModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleJoinSubmit} className="p-6 space-y-4">
                <p className="text-sm text-red-500 mb-4">{currentContent.joinForm.required}</p>

                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.name} *</label>
                  <input
                    type="text"
                    name="name"
                    value={joinForm.name}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all"
                    placeholder={currentContent.joinForm.name}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.phone} *</label>
                  <PhoneInput
                    value={joinForm.phone}
                    onChange={(value) => handlePhoneChange(value, 'phone')}
                    required={true}
                    placeholder={currentContent.joinForm.phone}
                  />
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.birthDate} *</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={joinForm.birthDate}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all"
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.languages} *</label>
                  <textarea
                    name="languages"
                    value={joinForm.languages}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all h-24"
                    placeholder={activeLanguage.code === 'UZ' ? "Masalan: Ingliz tili, Rus tili, Koreys tili" : activeLanguage.code === 'RU' ? "Например: Английский, Русский, Корейский" : "Example: English, Russian, Korean"}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.address} *</label>
                  <input
                    type="text"
                    name="address"
                    value={joinForm.address}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all"
                    placeholder={currentContent.joinForm.address}
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.position} *</label>
                  <select
                    name="position"
                    value={joinForm.position}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all"
                  >
                    <option value="">{currentContent.common.select}</option>
                    <option value="teacher">{currentContent.joinForm.positions.teacher}</option>
                    <option value="assistant">{currentContent.joinForm.positions.assistant}</option>
                    <option value="admin">{currentContent.joinForm.positions.admin}</option>
                    <option value="cashier">{currentContent.joinForm.positions.cashier}</option>
                    <option value="other">{currentContent.joinForm.positions.other}</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.education} *</label>
                  <textarea
                    name="education"
                    value={joinForm.education}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all h-24"
                    placeholder={currentContent.joinForm.education}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.experience} *</label>
                  <textarea
                    name="experience"
                    value={joinForm.experience}
                    onChange={handleJoinChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all h-32"
                    placeholder={currentContent.joinForm.experience}
                  />
                </div>

                {/* IELTS Certificate */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    {currentContent.joinForm.ieltsCertificate}
                    {isIELTSRequired && ' *'}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleJoinFileChange(e, 'ieltsCertificate')}
                        required={isIELTSRequired}
                        className="hidden"
                        id="ieltsUpload"
                      />
                      <div className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-center">
                        <FaFileUpload className="inline-block mr-2" />
                        {currentContent.joinForm.upload}
                      </div>
                    </label>
                    {joinForm.ieltsCertificate && (
                      <span className="text-sm text-green-600">
                        {joinForm.ieltsCertificate.name}
                      </span>
                    )}
                  </div>
                  {isIELTSRequired && (
                    <p className="text-sm text-blue-600 mt-1">{currentContent.joinForm.ieltsRequired}</p>
                  )}
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.cv} *</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleJoinFileChange(e, 'cv')}
                        required
                        className="hidden"
                        id="cvUpload"
                      />
                      <div className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-center">
                        <FaFileUpload className="inline-block mr-2" />
                        {currentContent.joinForm.upload}
                      </div>
                    </label>
                    {joinForm.cv && (
                      <span className="text-sm text-green-600">
                        {joinForm.cv.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-gray-700 mb-2">{currentContent.joinForm.additionalInfo}</label>
                  <textarea
                    name="additionalInfo"
                    value={joinForm.additionalInfo}
                    onChange={handleJoinChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all h-24"
                    placeholder={currentContent.joinForm.additionalInfo}
                  />
                </div>

                {/* Additional Questions */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">{currentContent.joinForm.additionalQuestions}</p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 ${formSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {formSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {currentContent.joinForm.submit}...
                      </span>
                    ) : (
                      currentContent.joinForm.submit
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <section id='result' className="py-12 lg:py-20 bg-gradient-to-b from-white to-blue/5 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12 text-blue"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent.results.title}{" "}
            <span className="text-gray-800">{currentContent.results.subtitle}</span>
          </motion.h2>

          {/* IELTS Results Marquee */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-blue">{currentContent.results.ielts}</h3>
            {loading.ielts ? (
              <LoadingSpinner text={activeLanguage.code === 'UZ' ? "IELTS natijalari yuklanmoqda..." : "Loading IELTS results..."} />
            ) : formattedIeltsResults.length === 0 ? (
              <p className="text-center text-gray-600 py-12">
                {activeLanguage.code === 'UZ' ? "IELTS natijalari mavjud emas" : "No IELTS results available"}
              </p>
            ) : (
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-4 lg:gap-6"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  {loopIeltsResults.map((res, index) => (
                    <motion.div
                      key={`${res.id}-${index}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex-shrink-0 w-64 lg:w-80 bg-white rounded-2xl shadow-md hover:shadow-blue/30 transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={res.img}
                          alt={res.name}
                          className="w-full h-48 lg:h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                          <p className="text-base lg:text-lg font-semibold">{res.name}</p>
                          <p className="text-xs lg:text-sm opacity-80">{res.score}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
                <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
              </div>
            )}
          </div>

          {/* CEFR Results Marquee */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-green-600">{currentContent.results.cefr}</h3>
            {loading.cefr ? (
              <LoadingSpinner text={activeLanguage.code === 'UZ' ? "CEFR natijalari yuklanmoqda..." : "Loading CEFR results..."} />
            ) : formattedCefrResults.length === 0 ? (
              <p className="text-center text-gray-600 py-12">
                {activeLanguage.code === 'UZ' ? "CEFR natijalari mavjud emas" : "No CEFR results available"}
              </p>
            ) : (
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-4 lg:gap-6"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                  }}
                >
                  {loopCefrResults.map((res, index) => (
                    <motion.div
                      key={`${res.id}-${index}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex-shrink-0 w-64 lg:w-80 bg-white rounded-2xl shadow-md hover:shadow-green-300/30 transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={res.img}
                          alt={res.name}
                          className="w-full h-48 lg:h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                          <p className="text-base lg:text-lg font-semibold">{res.name}</p>
                          <p className="text-xs lg:text-sm opacity-80">{res.score}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
                <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id='courses' className="py-12 lg:py-20 bg-gradient-to-b from-blue/5 to-white relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent.courses.title}{" "}
            <span className="text-blue italic">{currentContent.courses.subtitle}</span>
          </motion.h2>

          {loading.courses ? (
            <LoadingSpinner text={activeLanguage.code === 'UZ' ? "Kurslar yuklanmoqda..." : "Loading courses..."} />
          ) : formattedCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {activeLanguage.code === 'UZ' ? "Hozircha kurslar mavjud emas" : "No courses available yet"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Courses list */}
              <div className="w-full lg:w-2/5">
                {/* Mobile & Tablet - Horizontal Scroll */}
                <div className="block lg:hidden">
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {formattedCourses.map((course) => (
                      <motion.div
                        key={course.id}
                        onClick={() => setActiveCourse(course)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 min-w-[200px] snap-center ${activeCourse?.id === course.id
                            ? 'bg-blue text-white border-blue shadow-lg'
                            : 'bg-white border-blue/20 hover:border-blue/50 hover:bg-blue/5'
                          }`}
                      >
                        <div className="text-2xl"><img src={course.icon} alt="" /></div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm truncate ${activeCourse?.id === course.id ? 'text-white' : 'text-gray-800'
                            }`}>
                            {course.name}
                          </h3>
                          <p className={`text-xs mt-1 line-clamp-1 ${activeCourse?.id === course.id ? 'text-white/80' : 'text-gray-600'
                            }`}>
                            {course.desc}
                          </p>
                        </div>
                        {activeCourse?.id === course.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-2 h-2 bg-white rounded-full flex-shrink-0"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Desktop - Vertical List */}
                <div className="hidden lg:block space-y-4">
                  {formattedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      onClick={() => setActiveCourse(course)}
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${activeCourse?.id === course.id
                          ? 'bg-blue text-white border-blue shadow-lg'
                          : 'bg-white border-blue/20 hover:border-blue/50 hover:bg-blue/5'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl"><img src={course.icon} alt="" /></div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold ${activeCourse?.id === course.id ? 'text-white' : 'text-gray-800'
                            }`}>
                            {course.name}
                          </h3>
                          <p className={`mt-1 ${activeCourse?.id === course.id ? 'text-white/80' : 'text-gray-600'
                            }`}>
                            {course.desc}
                          </p>
                        </div>
                        {activeCourse?.id === course.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selected course details */}
              {activeCourse && (
                <motion.div
                  key={activeCourse?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full lg:w-3/5 bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-blue/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl lg:text-4xl"><img src={activeCourse.icon} alt="" /></div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">{activeCourse.name}</h3>
                      <p className="text-gray-600 text-base lg:text-lg mt-1">{activeCourse.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 lg:p-4 bg-blue/5 rounded-xl">
                        <span className="font-semibold text-gray-700 text-sm lg:text-base">{currentContent.courses.details.duration}</span>
                        <span className="text-blue font-bold text-sm lg:text-base">{activeCourse.details.duration}</span>
                      </div>
                  
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 lg:p-4 bg-blue/5 rounded-xl">
                        <span className="font-semibold text-gray-700 text-sm lg:text-base">{currentContent.courses.details.price}</span>
                        <span className="text-blue font-bold text-sm lg:text-base">{activeCourse.details.price} {currentContent.courses.details.month}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 lg:mb-8">
                    <h4 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4">{currentContent.courses.details.features}</h4>
                    <div className="grid grid-cols-1 gap-2 lg:gap-3">
                      {activeCourse?.details.features && activeCourse.details.features.length > 0 ? (
                        activeCourse.details.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeInOut" }}
                            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm lg:text-base">{feature}</span>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          {activeLanguage.code === 'UZ' 
                            ? "Kurs imkoniyatlari mavjud emas" 
                            : activeLanguage.code === 'RU'
                            ? "Возможности курса не указаны"
                            : "Course features not available"}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCourseRegister(activeCourse)}
                    disabled={formSubmitting}
                    className={`w-full bg-blue text-white py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg hover:bg-blue/90 transition-all duration-300 shadow-lg ${formSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {formSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {activeCourse.name} {currentContent.courses.registerBtn}...
                      </span>
                    ) : (
                      `${currentContent.courses.registerBtn}`
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section - Improved */}
      <section id="FAQ" className="py-12 lg:py-24 bg-gradient-to-b from-white to-blue/10 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto max-w-4xl relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent.faq.title}{" "}
            <span className="text-blue italic">{currentContent.faq.subtitle}</span>
          </motion.h2>

          <div className="space-y-3 lg:space-y-4">
            {currentContent.faq.items.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isOpen={activeIndex === index}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id='Advantages' className="py-12 lg:py-24 bg-gradient-to-b from-blue/10 to-white relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent.advantages.title}{" "}
            <span className="text-blue italic">{currentContent.advantages.subtitle}</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentContent.advantages.items.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                className="p-6 lg:p-10 rounded-3xl bg-white shadow-md border border-blue/10 hover:shadow-blue/30 
                           transition-all duration-500 flex flex-col gap-3 lg:gap-4 items-start hover:bg-blue/5"
                viewport={{ once: true }}
              >
                <div className="text-blue">
                  {React.cloneElement(adv.icon, { size: window.innerWidth < 1024 ? 32 : 40 })}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold">{adv.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id='Gallery' className="py-12 lg:py-24 bg-gradient-to-b from-blue/10 to-white overflow-hidden relative">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto text-center mb-8 lg:mb-12 relative z-10 px-4 lg:px-0">
          <motion.h2
            className="text-3xl lg:text-5xl font-bold text-blue"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {currentContent.gallery.title}{" "}
            <span className="text-gray-800 italic">{currentContent.gallery.subtitle}</span>
          </motion.h2>
        </div>

        {loading.gallery ? (
          <LoadingSpinner text={activeLanguage.code === 'UZ' ? "Galereya yuklanmoqda..." : "Loading gallery..."} />
        ) : formattedGallery.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            {activeLanguage.code === 'UZ' ? "Galereya rasmlari mavjud emas" : "No gallery images available"}
          </p>
        ) : (
          <>
            {/* MARQUEE ANIMATION */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4 lg:gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
              >
                {loopImages.map((image, index) => (
                  <motion.div
                    key={`${image.id}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex-shrink-0 w-[280px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-2xl overflow-hidden shadow-md hover:shadow-blue/40 transition-all duration-300 cursor-pointer"
                    onClick={() => openImageModal(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
              <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                  onClick={closeImageModal}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 300,
                      ease: "easeInOut"
                    }}
                    className="relative max-w-4xl max-h-full w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={closeImageModal}
                      className="absolute -top-12 lg:-top-16 right-0 text-white hover:text-orange-500 transition-colors z-10 text-2xl lg:text-3xl"
                    >
                      ✕
                    </button>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        className="w-full h-64 lg:h-96 object-cover"
                      />

                      <div className="p-4 lg:p-6">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                        <p className="text-gray-600 text-sm lg:text-base">{selectedImage.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </section>

      {/* Events Section */}
      <section id="event" className=' py-12 lg:py-24 overflow-hidden relative'>
        <motion.div
          className="container text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-blue mb-8 lg:mb-12">
            {currentContent.events.title}{" "}
            <span className="text-gray-800 italic">{currentContent.events.subtitle}</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.img
              src={event}
              alt="sunday event"
              className='rounded-2xl w-full h-64 lg:h-auto object-cover'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <motion.div
              className="p-6 lg:p-8 bg-gray-100 rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6'>
                {currentContent.events.registerBtn}
              </h3>
              <form onSubmit={handleEventSubmit} className='flex flex-col gap-5 items-start'>
                <label className='flex flex-col gap-2 items-start w-full'>
                  <span className="text-gray-700">{currentContent.events.namePlaceholder}</span>
                  <input 
                    type="text" 
                    name="name"
                    value={eventForm.name}
                    onChange={handleEventChange}
                    placeholder={currentContent.events.namePlaceholder} 
                    className='p-3 bg-white outline-none w-full rounded-lg border border-gray-300 focus:border-blue transition-colors' 
                    required
                  />
                </label>
                <label className='flex flex-col gap-2 items-start w-full'>
                  <span className="text-gray-700">{currentContent.events.agePlaceholder}</span>
                  <input 
                    type="number" 
                    name="age"
                    value={eventForm.age}
                    onChange={handleEventChange}
                    placeholder={currentContent.events.agePlaceholder} 
                    className='p-3 bg-white outline-none w-full rounded-lg border border-gray-300 focus:border-blue transition-colors' 
                    required
                  />
                </label>
                <label className='flex flex-col gap-2 items-start w-full'>
                  <span className="text-gray-700">{currentContent.events.phonePlaceholder}</span>
                  <PhoneInput
                    value={eventForm.phone}
                    onChange={(value) => handlePhoneChange(value, 'phone')}
                    placeholder={currentContent.events.phonePlaceholder}
                    required={true}
                  />
                </label>
                <motion.input
                  type="submit"
                  value={formSubmitting ? `${currentContent.events.submitBtn}...` : currentContent.events.submitBtn}
                  disabled={formSubmitting}
                  className={`bg-blue text-white text-lg lg:text-xl px-6 py-3 w-full rounded-xl hover:bg-blue/90 transition-colors duration-300 cursor-pointer ${formSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={formSubmitting ? {} : { scale: 1.02 }}
                  whileTap={formSubmitting ? {} : { scale: 0.98 }}
                />
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 lg:py-24 bg-gradient-to-b from-white to-blue/10 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start relative z-10 px-4 lg:px-0">

          {/* LEFT - MAP */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden shadow-md border border-blue/10 h-[400px] lg:h-full order-2 lg:order-1"
            viewport={{ once: true }}
          >
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d767.2987854251852!2d70.0830324!3d41.0165412!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38afe9b89fe40131%3A0x52b7789ffb115067!2sBILIM%20ZIYO!5e1!3m2!1sen!2s!4v1767764585715!5m2!1sen!2s" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>          </motion.div>

          {/* RIGHT - FORM */}
          <motion.form
            onSubmit={handleContactSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-md border border-blue/10 p-6 lg:p-8 space-y-4 lg:space-y-6 order-1 lg:order-2"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-blue mb-4 lg:mb-6">{currentContent.contact.title}</h2>

            {/* Ism + Yosh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.name}</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder={currentContent.contact.name}
                  className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.age}</label>
                <input
                  type="number"
                  name="age"
                  value={contactForm.age}
                  onChange={handleContactChange}
                  placeholder={currentContent.contact.age}
                  className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
                  required
                />
              </div>
            </div>

            {/* Telefonlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.phone1}</label>
                <PhoneInput
                  value={contactForm.phone1}
                  onChange={(value) => handlePhoneChange(value, 'phone1')}
                  placeholder={currentContent.contact.phone1}
                  required={true}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.phone2}</label>
                <PhoneInput
                  value={contactForm.phone2}
                  onChange={(value) => handlePhoneChange(value, 'phone2')}
                  placeholder={currentContent.contact.phone2}
                  required={false}
                />
              </div>
            </div>

            {/* Kurs tanlash */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.course}</label>
              <select 
                name="course"
                value={contactForm.course}
                onChange={handleContactChange}
                className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
              >
                <option value="">{currentContent.common.select}</option>
                {formattedCourses.map(course => (
                  <option key={course.id} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>

            {/* O'qish formati */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.format}</label>
              <div className="grid grid-cols-3 gap-2 lg:gap-3">
                {currentContent.contact.formats.map((format) => (
                  <button
                    key={format.value}
                    type="button"
                    onClick={() => setContactForm(prev => ({ ...prev, format: format.value }))}
                    className={`p-2 lg:p-3 rounded-xl border transition-all duration-300 text-xs lg:text-sm ${contactForm.format === format.value
                        ? "bg-blue text-white border-blue"
                        : "border-blue/20 hover:bg-blue/5"
                      }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vaqt tanlash */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.time}</label>
              <select
                name="time"
                value={contactForm.time}
                onChange={handleContactChange}
                className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none mb-3 transition-all duration-300 text-sm lg:text-base"
                required
              >
                <option value="">{currentContent.contact.selectTime}</option>
                <option value="09:00 - 10:30">09:00 - 10:30</option>
                <option value="10:30 - 12:00">10:30 - 12:00</option>
                <option value="12:00 - 14:00">12:00 - 14:00</option>
                <option value="15:30 - 17:00">15:30 - 17:00</option>
                <option value="17:00 - 18:30">17:00 - 18:30</option>
              </select>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              type="submit"
              disabled={formSubmitting}
              className={`w-full bg-blue text-white py-3 lg:py-4 rounded-xl font-semibold hover:bg-blue/90 transition-all duration-300 shadow-lg text-sm lg:text-base ${formSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {formSubmitting ? `${currentContent.contact.submit}...` : currentContent.contact.submit}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Logo va description */}
            <div className="lg:col-span-1">
              <Link to="/"><img src={logo} alt="" className='w-40 lg:w-60 mb-4 lg:mb-6' /></Link>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm lg:text-base">
                {currentContent.footer.description}
              </p>
              <div className="flex gap-3 lg:gap-4">
                <a href="https://www.youtube.com/@BilimZiyoUz" className="text-gray-400 hover:text-blue transition-colors duration-300">
                  <FaYoutube size={18} className="lg:w-5 lg:h-5" />
                </a>
                <a href="https://t.me/BilimZiyoUz" className="text-gray-400 hover:text-blue transition-colors duration-300">
                  <FaTelegram size={18} className="lg:w-5 lg:h-5" />
                </a>
                <a href="https://www.instagram.com/bilimziyouz/" className="text-gray-400 hover:text-blue transition-colors duration-300">
                  <FaInstagram size={18} className="lg:w-5 lg:h-5" />
                </a>
              </div>
            </div>

            {/* Kurslar */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">{currentContent.footer.courses}</h4>
              <ul className="space-y-1 lg:space-y-2">
                {formattedCourses.map((course, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm lg:text-base">
                      {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filiallar */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">{currentContent.footer.branches}</h4>
              <ul className="space-y-1 lg:space-y-2">
                {activeLanguage.code === 'UZ'
                  ? branches.map((branch, index) => (
                      <li key={index}>
                        <a href={branch.link} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm lg:text-base">
                          {branch.name}
                        </a>
                      </li>
                    ))
                  : activeLanguage.code === 'RU'
                  ? branches.map((branch, index) => (
                      <li key={index}>
                        <a href={branch.link} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm lg:text-base">
                          {branch.name}
                        </a>
                      </li>
                    ))
                  : branches.map((branch, index) => (
                      <li key={index}>
                        <a href={branch.link} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm lg:text-base">
                          {branch.name}
                        </a>
                      </li>
                    ))}
              </ul>
            </div>

            {/* Kontaktlar */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">{currentContent.footer.contact}</h4>
              <ul className="space-y-2 lg:space-y-3">
                {["+998 78 333 37 73", "+998 94 731 37 73", "Bilimziyo1@gmail.com"].map((contact, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-400 text-sm lg:text-base">
                    {index < 2 ? <FaPhone size={12} className="lg:w-3 lg:h-3" /> : <FaEnvelope size={12} className="lg:w-3 lg:h-3" />}
                    {contact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-gray-400 text-sm lg:text-base">
            <p>2026 | BILIM ZIYO O'QUV MARKAZI | BARCHA HUQUQLAR HIMOYALANGAN!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FaqItem({ faq, isOpen, onClick }) {
  const [ref, { height }] = useMeasure()

  return (
    <div className="bg-white border border-blue/10 rounded-2xl overflow-hidden">
      
      {/* QUESTION */}
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 lg:p-6 text-left"
      >
        <span className="text-gray-800 text-sm lg:text-base">
          {faq.q}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ⌄
        </motion.span>
      </button>

      {/* ANSWER — HAQIQIY ACCORDION */}
      <motion.div
        animate={{ height: isOpen ? height : 0 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="overflow-hidden"
      >
        <div
          ref={ref}
          className="px-4 lg:px-6 pb-4 pt-6 lg:pb-6 border-t border-blue/10 text-gray-600 text-sm lg:text-base"
        >
          {faq.a}
        </div>
      </motion.div>
    </div>
  )
}

export default StudyCenter
